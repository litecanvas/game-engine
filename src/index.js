// @ts-check
import { zzfx } from './zzfx.js'
import { defaultPalette } from './palette.js'
import { assert } from './dev.js'

/**
 * The litecanvas constructor
 *
 * @param {LitecanvasOptions} [settings]
 * @returns {LitecanvasInstance}
 */
export default function litecanvas(settings = {}) {
    const /** @type {typeof globalThis} */
        root = globalThis,
        math = Math,
        TWO_PI = math.PI * 2,
        raf = requestAnimationFrame,
        /** @type {Function[]} */
        _browserEventListeners = [],
        /** @type {(elem:HTMLElement, evt:string, callback:(event:Event)=>void)=>void} */
        on = (elem, evt, callback) => {
            elem.addEventListener(evt, callback, false)
            _browserEventListeners.push(() => elem.removeEventListener(evt, callback, false))
        },
        isNumber = Number.isFinite,
        /** @type {LitecanvasOptions} */
        defaults = {
            width: null,
            height: null,
            autoscale: true,
            pixelart: false,
            antialias: false,
            canvas: null,
            global: true,
            loop: null,
            tapEvents: true,
            keyboardEvents: true,
            animate: true,
        }

    // setup the settings default values
    settings = Object.assign(defaults, settings)

    let /** @type {boolean} */
        _initialized = false,
        /** @type {any[]} */
        _plugins = [],
        /** @type {HTMLCanvasElement} _canvas */
        _canvas,
        /** @type {number} */
        _scale = 1,
        /** @type {CanvasRenderingContext2D|OffscreenCanvasRenderingContext2D} */
        _ctx,
        /** @type {number} */
        _outline_fix = 0.5,
        /** @type {number} */
        _timeScale = 1,
        /** @type {number} */
        _lastFrameTime,
        /** @type {number} duration of a frame at 60 FPS (default) */
        _deltaTime = 1 / 60,
        /** @type {number} */
        _accumulated = 0,
        /** @type {number|null} */
        _rafid,
        /** @type {string} */
        _fontFamily = 'sans-serif',
        /** @type {number} */
        _fontSize = 20,
        /** @type {number} */
        _rngSeed = Date.now(),
        /** @type {string[]} */
        _colors = defaultPalette,
        /** @type {number[]} */
        _defaultSound = [0.5, 0, 1750, , , 0.3, 1, , , , 600, 0.1],
        /**
         * default game events
         *
         * @type {Object<string,Set<Function>>}
         */
        _events = {
            init: null,
            update: null,
            draw: null,
            resized: null,
            tap: null,
            untap: null,
            tapping: null,
            tapped: null,
        }

    /** @type {Omit<LitecanvasInstance,'PI'|'sin'|'cos'|'atan2'|'hypot'|'tan'|'abs'|'ceil'|'floor'|'trunc'|'min'|'max'|'pow'|'sqrt'|'sign'|'exp'|'iskeydown'|'iskeypressed'>} */
    const instance = {
        /** @type {HTMLCanvasElement} */
        CANVAS: null,

        /** @type {number} */
        W: 0,

        /** @type {number} */
        H: 0,

        /** @type {number} */
        T: 0,

        /** @type {number} */
        CX: 0,

        /** @type {number} */
        CY: 0,

        /** @type {number} */
        MX: -1,

        /** @type {number} */
        MY: -1,

        /** MATH API */
        /**
         * Twice the value of the mathematical constant PI (π).
         * Approximately 6.28318
         *
         * Note: TWO_PI radians equals 360°, PI radians equals 180°,
         * HALF_PI radians equals 90°, and HALF_PI/2 radians equals 45°.
         *
         * @type {number}
         */
        TWO_PI,

        /**
         * Half the value of the mathematical constant PI (π).
         * Approximately 1.57079
         *
         * @type {number}
         */
        HALF_PI: TWO_PI / 4,

        /**
         * Calculates a linear (interpolation) value over t%.
         *
         * @param {number} start
         * @param {number} end
         * @param {number} t The progress in percentage, where 0 = 0% and 1 = 100%.
         * @returns {number} The unterpolated value
         * @tutorial https://gamedev.net/tutorials/programming/general-and-gameplay-programming/a-brief-introduction-to-lerp-r4954/
         */
        lerp: (start, end, t) => {
            DEV: assert(isNumber(start), 'lerp: 1st param must be a number')
            DEV: assert(isNumber(end), 'lerp: 2nd param must be a number')
            DEV: assert(isNumber(t), 'lerp: 3rd param must be a number')

            return t * (end - start) + start
        },

        /**
         * Convert degrees to radians
         *
         * @param {number} degs
         * @returns {number} the value in radians
         */
        deg2rad: (degs) => {
            DEV: assert(isNumber(degs), 'deg2rad: 1st param must be a number')

            return (math.PI / 180) * degs
        },

        /**
         * Convert radians to degrees
         *
         * @param {number} rads
         * @returns {number} the value in degrees
         */
        rad2deg: (rads) => {
            DEV: assert(isNumber(rads), 'rad2deg: 1st param must be a number')

            return (180 / math.PI) * rads
        },

        /**
         * Returns the rounded value of an number to optional precision (number of digits after the decimal point).
         *
         * Note: precision is optional but must be >= 0
         *
         * @param {number} n number to round.
         * @param {number} [precision] number of decimal digits to round to, default is 0.
         * @returns {number} rounded number.
         */
        round: (n, precision = 0) => {
            DEV: assert(isNumber(n), 'round: 1st param must be a number')
            DEV: assert(
                null == precision || (isNumber(precision) && precision >= 0),
                'round: 2nd param must be a positive number or zero'
            )
            if (!precision) {
                return math.round(n)
            }
            const multiplier = 10 ** precision
            return math.round(n * multiplier) / multiplier
        },

        /**
         * Constrains a number between `min` and `max`.
         *
         * @param {number} value
         * @param {number} min
         * @param {number} max
         * @returns {number}
         */
        clamp: (value, min, max) => {
            DEV: assert(isNumber(value), 'clamp: 1st param must be a number')
            DEV: assert(isNumber(min), 'clamp: 2nd param must be a number')
            DEV: assert(isNumber(max), 'clamp: 3rd param must be a number')
            DEV: assert(max > min, 'clamp: the 2nd param must be less than the 3rd param')

            if (value < min) return min
            if (value > max) return max
            return value
        },

        /**
         * Wraps a number between `min` (inclusive) and `max` (exclusive).
         *
         * @param {number} value
         * @param {number} min
         * @param {number} max
         * @returns {number}
         */
        wrap: (value, min, max) => {
            DEV: assert(isNumber(value), 'wrap: 1st param must be a number')
            DEV: assert(isNumber(min), 'wrap: 2nd param must be a number')
            DEV: assert(isNumber(max), 'wrap: 3rd param must be a number')
            DEV: assert(max > min, 'wrap: the 2nd param must be less than the 3rd param')

            return value - (max - min) * math.floor((value - min) / (max - min))
        },

        /**
         * Re-maps a number from one range to another.
         *
         * @param {number} value  the value to be remapped.
         * @param {number} start1 lower bound of the value's current range.
         * @param {number} stop1  upper bound of the value's current range.
         * @param {number} start2 lower bound of the value's target range.
         * @param {number} stop2  upper bound of the value's target range.
         * @param {boolean} [withinBounds=false] constrain the value to the newly mapped range
         * @returns {number} the remapped number
         */
        map(value, start1, stop1, start2, stop2, withinBounds) {
            DEV: assert(isNumber(value), 'map: 1st param must be a number')
            DEV: assert(isNumber(start1), 'map: 2nd param must be a number')
            DEV: assert(isNumber(stop1), 'map: 3rd param must be a number')
            DEV: assert(isNumber(start2), 'map: 4th param must be a number')
            DEV: assert(isNumber(stop2), 'map: 5th param must be a number')
            DEV: assert(max !== min, 'map: the 3rd param must be different than the 2nd param')

            // prettier-ignore
            const result = ((value - start1) / (stop1 - start1)) * (stop2 - start2) + start2
            return withinBounds ? instance.clamp(result, start2, stop2) : result
        },

        /**
         * Maps a number from one range to a value between 0 and 1.
         * Identical to `map(value, min, max, 0, 1)`.
         * Note: Numbers outside the range are not clamped to 0 and 1.
         *
         * @param {number} value
         * @param {number} start
         * @param {number} stop
         * @returns {number} the normalized number.
         */
        norm: (value, start, stop) => {
            DEV: assert(isNumber(value), 'norm: 1st param must be a number')
            DEV: assert(isNumber(start), 'norm: 2nd param must be a number')
            DEV: assert(isNumber(stop), 'norm: 3rd param must be a number')

            return instance.map(value, start, stop, 0, 1)
        },

        /**
         * Interpolate between 2 values using a periodic function.
         *
         * @param {number} from - the lower bound
         * @param {number} to - the higher bound
         * @param {number} t - value passed to the periodic function
         * @param {(n: number) => number} [fn] - the periodic function (which default to `Math.sin`)
         */
        wave: (from, to, t, fn = Math.sin) => {
            DEV: assert(isNumber(from), 'wave: 1st param must be a number')
            DEV: assert(isNumber(to), 'wave: 2nd param must be a number')
            DEV: assert(isNumber(t), 'wave: 3rd param must be a number')
            DEV: assert(
                'function' === typeof fn,
                'wave: 4rd param must be a function (n: number) => number'
            )
            return from + ((fn(t) + 1) / 2) * (to - from)
        },

        /** RNG API */
        /**
         * Generates a pseudorandom float between min (inclusive) and max (exclusive)
         * using the Linear Congruential Generator (LCG) algorithm.
         *
         * @param {number} [min=0.0]
         * @param {number} [max=1.0]
         * @returns {number} the random number
         */
        rand: (min = 0.0, max = 1.0) => {
            DEV: assert(isNumber(min), 'rand: 1st param must be a number')
            DEV: assert(isNumber(max), 'rand: 2nd param must be a number')
            DEV: assert(max > min, 'rand: the 1st param must be less than the 2nd param')

            const a = 1664525
            const c = 1013904223
            const m = 4294967296

            _rngSeed = (a * _rngSeed + c) % m

            return (_rngSeed / m) * (max - min) + min
        },

        /**
         * Generates a pseudorandom integer between min (inclusive) and max (inclusive)
         *
         * @param {number} [min=0]
         * @param {number} [max=1]
         * @returns {number} the random number
         */
        randi: (min = 0, max = 1) => {
            DEV: assert(isNumber(min), 'randi: 1st param must be a number')
            DEV: assert(isNumber(max), 'randi: 2nd param must be a number')
            DEV: assert(max > min, 'randi: the 1st param must be less than the 2nd param')

            return math.floor(instance.rand(min, max + 1))
        },

        /**
         * Initializes the random number generator with an explicit seed value.
         *
         * Note: The seed should be a integer number greater than or equal to zero.
         *
         * @param {number} value
         */
        rseed(value) {
            DEV: assert(
                null == value || (isNumber(value) && value >= 0),
                'rseed: 1st param must be a positive number or zero'
            )

            _rngSeed = ~~value
        },

        /** BASIC GRAPHICS API */
        /**
         * Clear the game screen with an optional color
         *
         * @param {number} [color] The background color (index) or null/undefined (for transparent)
         */
        cls(color) {
            DEV: assert(
                null == color || (isNumber(color) && color >= 0),
                'cls: 1st param must be a positive number or zero or undefined'
            )

            if (null == color) {
                _ctx.clearRect(0, 0, _ctx.canvas.width, _ctx.canvas.height)
            } else {
                instance.rectfill(0, 0, _ctx.canvas.width, _ctx.canvas.height, color)
            }
        },

        /**
         * Draw a rectangle outline
         *
         * @param {number} x
         * @param {number} y
         * @param {number} width
         * @param {number} height
         * @param {number} [color=0] the color index
         * @param {number|number[]} [radii] A number or list specifying the radii used to draw a rounded-borders rectangle
         *
         * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/roundRect
         */
        rect(x, y, width, height, color, radii) {
            DEV: assert(isNumber(x), 'rect: 1st param must be a number')
            DEV: assert(isNumber(y), 'rect: 2nd param must be a number')
            DEV: assert(isNumber(width) && width > 0, 'rect: 3rd param must be a positive number')
            DEV: assert(
                isNumber(height) && height >= 0,
                'rect: 4th param must be a positive number or zero'
            )
            DEV: assert(
                null == color || (isNumber(color) && color >= 0),
                'rect: 5th param must be a positive number or zero'
            )
            DEV: assert(
                null == radii || isNumber(radii) || (Array.isArray(radii) && radii.length >= 1),
                'rect: 6th param must be a number or array of numbers'
            )

            _ctx.beginPath()
            _ctx[radii ? 'roundRect' : 'rect'](
                ~~x - _outline_fix,
                ~~y - _outline_fix,
                ~~width + _outline_fix * 2,
                ~~height + _outline_fix * 2,
                radii
            )
            instance.stroke(color)
        },

        /**
         * Draw a color-filled rectangle
         *
         * @param {number} x
         * @param {number} y
         * @param {number} width
         * @param {number} height
         * @param {number} [color=0] the color index
         * @param {number|number[]} [radii] A number or list specifying the radii used to draw a rounded-borders rectangle
         */
        rectfill(x, y, width, height, color, radii) {
            DEV: assert(isNumber(x), 'rectfill: 1st param must be a number')
            DEV: assert(isNumber(y), 'rectfill: 2nd param must be a number')
            DEV: assert(
                isNumber(width) && width >= 0,
                'rectfill: 3rd param must be a positive number or zero'
            )
            DEV: assert(
                isNumber(height) && height >= 0,
                'rectfill: 4th param must be a positive number or zero'
            )
            DEV: assert(
                null == color || (isNumber(color) && color >= 0),
                'rectfill: 5th param must be a positive number or zero'
            )
            DEV: assert(
                null == radii || isNumber(radii) || (Array.isArray(radii) && radii.length >= 1),
                'rectfill: 6th param must be a number or array of at least 2 numbers'
            )

            _ctx.beginPath()
            _ctx[radii ? 'roundRect' : 'rect'](~~x, ~~y, ~~width, ~~height, radii)
            instance.fill(color)
        },

        /**
         * Draw a circle outline
         *
         * @param {number} x
         * @param {number} y
         * @param {number} radius
         * @param {number} [color=0] the color index
         */
        circ(x, y, radius, color) {
            DEV: assert(isNumber(x), 'circ: 1st param must be a number')
            DEV: assert(isNumber(y), 'circ: 2nd param must be a number')
            DEV: assert(
                isNumber(radius) && radius >= 0,
                'circ: 3rd param must be a positive number or zero'
            )
            DEV: assert(
                null == color || (isNumber(color) && color >= 0),
                'circ: 4th param must be a positive number or zero'
            )

            _ctx.beginPath()
            _ctx.arc(~~x, ~~y, ~~radius, 0, TWO_PI)
            instance.stroke(color)
        },

        /**
         * Draw a color-filled circle
         *
         * @param {number} x
         * @param {number} y
         * @param {number} radius
         * @param {number} [color=0] the color index
         */
        circfill(x, y, radius, color) {
            DEV: assert(isNumber(x), 'circfill: 1st param must be a number')
            DEV: assert(isNumber(y), 'circfill: 2nd param must be a number')
            DEV: assert(
                isNumber(radius) && radius >= 0,
                'circfill: 3rd param must be a positive number or zero'
            )
            DEV: assert(
                null == color || (isNumber(color) && color >= 0),
                'circfill: 4th param must be a positive number or zero'
            )

            _ctx.beginPath()
            _ctx.arc(~~x, ~~y, ~~radius, 0, TWO_PI)
            instance.fill(color)
        },

        /**
         * Draw a line
         *
         * @param {number} x1
         * @param {number} y1
         * @param {number} x2
         * @param {number} y2
         * @param {number} [color=0] the color index
         */
        line(x1, y1, x2, y2, color) {
            DEV: assert(isNumber(x1), 'line: 1st param must be a number')
            DEV: assert(isNumber(y1), 'line: 2nd param must be a number')
            DEV: assert(isNumber(x2), 'line: 3rd param must be a positive number or zero')
            DEV: assert(isNumber(y2), 'line: 4th param must be a positive number or zero')
            DEV: assert(
                null == color || (isNumber(color) && color >= 0),
                'line: 5th param must be a positive number or zero'
            )

            _ctx.beginPath()

            let xfix = _outline_fix !== 0 && ~~x1 === ~~x2 ? 0.5 : 0
            let yfix = _outline_fix !== 0 && ~~y1 === ~~y2 ? 0.5 : 0

            _ctx.moveTo(~~x1 + xfix, ~~y1 + yfix)
            _ctx.lineTo(~~x2 + xfix, ~~y2 + yfix)

            instance.stroke(color)
        },

        /**
         * Sets the thickness of lines
         *
         * @param {number} value
         * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineWidth
         */
        linewidth(value) {
            DEV: assert(
                isNumber(value) && ~~value > 0,
                'linewidth: 1st param must be a positive number'
            )

            _ctx.lineWidth = ~~value
            _outline_fix = 0 === ~~value % 2 ? 0 : 0.5
        },

        /**
         * Sets the line dash pattern used when drawing lines
         *
         * @param {number[]} segments the line dash pattern
         * @param {number} [offset=0] the line dash offset, or "phase".
         * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setLineDash
         * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineDashOffset
         */
        linedash(segments, offset = 0) {
            DEV: assert(
                Array.isArray(segments) && segments.length > 0,
                'linedash: 1st param must be an array of numbers'
            )
            DEV: assert(isNumber(offset), 'linedash: 2nd param must be a number')

            _ctx.setLineDash(segments)
            _ctx.lineDashOffset = offset
        },

        /** TEXT RENDERING API */
        /**
         * Draw text
         *
         * @param {number} x
         * @param {number} y
         * @param {string} message the text message
         * @param {number} [color=3] the color index
         * @param {string} [fontStyle] can be "normal" (default), "italic" and/or "bold".
         */
        text(x, y, message, color = 3, fontStyle = 'normal') {
            DEV: assert(isNumber(x), 'text: 1st param must be a number')
            DEV: assert(isNumber(y), 'text: 2nd param must be a number')
            DEV: assert(
                null == color || (isNumber(color) && color >= 0),
                'text: 4th param must be a positive number or zero'
            )
            DEV: assert('string' === typeof fontStyle, 'text: 5th param must be a string')

            _ctx.font = `${fontStyle} ${_fontSize}px ${_fontFamily}`
            _ctx.fillStyle = _colors[~~color % _colors.length]
            _ctx.fillText(message, ~~x, ~~y)
        },

        /**
         * Set the font family
         *
         * @param {string} family
         */
        textfont(family) {
            DEV: assert('string' === typeof family, 'textfont: 1st param must be a string')

            _fontFamily = family
        },

        /**
         * Set the font size
         *
         * @param {number} size
         */
        textsize(size) {
            DEV: assert(isNumber(size), 'textsize: 1st param must be a number')

            _fontSize = size
        },

        /**
         * Sets the alignment used when drawing texts
         *
         * @param {CanvasTextAlign} align the horizontal alignment. Possible values: "left", "right", "center", "start" or "end"
         * @param {CanvasTextBaseline} baseline the vertical alignment. Possible values: "top", "bottom", "middle", "hanging" or "ideographic"
         * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/textBaseline
         * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/textAlign
         */
        textalign(align, baseline) {
            DEV: assert(
                null == align || ['left', 'right', 'center', 'start', 'end'].includes(align),
                'textalign: 1st param must be null or one of the following strings: center, left, right, start or end.'
            )
            DEV: assert(
                null == baseline ||
                    ['top', 'bottom', 'middle', 'hanging', 'alphabetic', 'ideographic'].includes(
                        baseline
                    ),
                'textalign: 2nd param must be null or one of the following strings: middle, top, bottom, hanging, alphabetic or ideographic.'
            )

            if (align) _ctx.textAlign = align
            if (baseline) _ctx.textBaseline = baseline
        },

        /** IMAGE GRAPHICS API */
        /**
         * Draw an image
         *
         * @param {number} x
         * @param {number} y
         * @param {OffscreenCanvas|HTMLImageElement|HTMLCanvasElement} source
         */
        image(x, y, source) {
            DEV: assert(isNumber(x), 'image: 1st param must be a number')
            DEV: assert(isNumber(y), 'image: 2nd param must be a number')

            _ctx.drawImage(source, ~~x, ~~y)
        },

        /**
         * Draw in an OffscreenCanvas and returns its image.
         *
         * @param {number} width
         * @param {number} height
         * @param {string[]|drawCallback} drawing
         * @param {object} [options]
         * @param {number} [options.scale=1]
         * @param {OffscreenCanvas} [options.canvas]
         * @returns {ImageBitmap}
         * @see https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas
         */
        paint(width, height, drawing, options = {}) {
            DEV: assert(isNumber(width), 'paint: 1st param must be a number')
            DEV: assert(isNumber(height), 'paint: 2nd param must be a number')
            DEV: assert(
                'function' === typeof drawing || Array.isArray(drawing),
                'paint: 3rd param must be a function or array'
            )
            DEV: assert(
                (options && !options.scale) || isNumber(options.scale),
                'paint: 4th param (options.scale) must be a number'
            )

            const /** @type {OffscreenCanvas} */
                canvas = options.canvas || new OffscreenCanvas(1, 1),
                scale = options.scale || 1,
                contextOriginal = _ctx

            canvas.width = width * scale
            canvas.height = height * scale
            _ctx = canvas.getContext('2d')

            _ctx.scale(scale, scale)

            // draw pixel art if `draw` is a array
            // @ts-ignore
            if (drawing.push) {
                let x = 0,
                    y = 0

                _ctx.imageSmoothingEnabled = false

                // @ts-ignore
                for (const str of drawing) {
                    for (const color of str) {
                        if (' ' !== color && '.' !== color) {
                            // support for 16-color palette using hex (from 0 to f)
                            instance.rectfill(x, y, 1, 1, parseInt(color, 16))
                        }
                        x++
                    }
                    y++
                    x = 0
                }
            } else {
                // @ts-ignore
                drawing(_ctx)
            }

            _ctx = contextOriginal // restore the context

            return canvas.transferToImageBitmap()
        },

        /** ADVANCED GRAPHICS API */
        /**
         * Get or set the canvas context 2D
         *
         * @param {CanvasRenderingContext2D|OffscreenCanvasRenderingContext2D} [context]
         * @returns {CanvasRenderingContext2D|OffscreenCanvasRenderingContext2D}
         * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
         */
        ctx(context) {
            if (context) {
                _ctx = context
            }
            return _ctx
        },

        /**
         * saves the current drawing style settings and transformations
         *
         * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/save
         */
        push: () => _ctx.save(),

        /**
         * restores the drawing style settings and transformations
         *
         * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/restore
         */
        pop: () => _ctx.restore(),

        /**
         * Adds a translation to the transformation matrix.
         *
         * @param {number} x
         * @param {number} y
         */
        translate: (x, y) => {
            DEV: assert(isNumber(x), 'translate: 1st param must be a number')
            DEV: assert(isNumber(y), 'translate: 2nd param must be a number')

            return _ctx.translate(~~x, ~~y)
        },

        /**
         * Adds a scaling transformation to the canvas units horizontally and/or vertically.
         *
         * @param {number} x
         * @param {number} [y]
         */
        scale: (x, y) => {
            DEV: assert(isNumber(x), 'scale: 1st param must be a number')
            DEV: assert(null == y || isNumber(y), 'scale: 2nd param must be a number')

            return _ctx.scale(x, y || x)
        },

        /**
         * Adds a rotation to the transformation matrix.
         *
         * @param {number} radians
         */
        rotate: (radians) => {
            DEV: assert(isNumber(radians), 'rotate: 1st param must be a number')

            return _ctx.rotate(radians)
        },

        /**
         * Sets the alpha (opacity) value to apply when drawing new shapes and images
         *
         * @param {number} value float from 0 to 1 (e.g: 0.5 = 50% transparent)
         * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalAlpha
         */
        alpha(value) {
            DEV: assert(isNumber(value), 'alpha: 1st param must be a number')

            _ctx.globalAlpha = instance.clamp(value, 0, 1)
        },

        /**
         * Returns a newly instantiated Path2D object, optionally with another
         * path as an argument (creates a copy), or optionally with a string
         * consisting of SVG path data.
         *
         * @param {Path2D|string} [arg]
         * @returns Path2D
         * @see https://developer.mozilla.org/en-US/docs/Web/API/Path2D/Path2D
         */
        path: (arg) => {
            DEV: assert(
                null == arg || 'string' === typeof arg || arg instanceof Path2D,
                'path: 1st param must be a string or a Path2D instance'
            )

            return new Path2D(arg)
        },

        /**
         * Fills the current or given path with a given color.
         *
         * @param {number} [color=0]
         * @param {Path2D} [path]
         */
        fill(color, path) {
            DEV: assert(
                null == color || (isNumber(color) && color >= 0),
                'fill: 1st param must be a positive number or zero'
            )
            DEV: assert(
                null == path || path instanceof Path2D,
                'fill: 2nd param must be a Path2D instance'
            )

            _ctx.fillStyle = _colors[~~color % _colors.length]
            if (path) {
                _ctx.fill(path)
            } else {
                _ctx.fill()
            }
        },

        /**
         * Outlines the current or given path with a given color.
         *
         * @param {number} [color=0]
         * @param {Path2D} [path]
         */
        stroke(color, path) {
            DEV: assert(
                null == color || (isNumber(color) && color >= 0),
                'stroke: 1st param must be a positive number or zero'
            )
            DEV: assert(
                null == path || path instanceof Path2D,
                'stroke: 2nd param must be a Path2D instance'
            )

            _ctx.strokeStyle = _colors[~~color % _colors.length]
            if (path) {
                _ctx.stroke(path)
            } else {
                _ctx.stroke()
            }
        },

        /**
         * Turn given path into a clipping region.
         *
         * Note: always call `push()` before and `pop()` after.
         *
         * @param {Path2D} path
         * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clip
         */
        clip(path) {
            DEV: assert(path instanceof Path2D, 'clip: 1st param must be a Path2D instance')

            _ctx.clip(path)
        },

        /** SOUND API */
        /**
         * Play a sound effects using ZzFX library.
         * If the first argument is omitted, plays an default sound.
         *
         * @param {number[]} [zzfxParams] a ZzFX array of params
         * @param {number} [pitchSlide] a value to increment/decrement the pitch
         * @param {number} [volumeFactor] the volume factor
         * @returns {number[] | boolean} The sound that was played or `false`
         *
         * @see https://github.com/KilledByAPixel/ZzFX
         */
        sfx(zzfxParams, pitchSlide = 0, volumeFactor = 1) {
            DEV: assert(
                null == zzfxParams || Array.isArray(zzfxParams),
                'sfx: 1st param must be an array'
            )
            DEV: assert(isNumber(pitchSlide), 'sfx: 2nd param must be a number')
            DEV: assert(isNumber(volumeFactor), 'sfx: 3rd param must be a number')

            if (
                root.zzfxV <= 0 ||
                (navigator.userActivation && !navigator.userActivation.hasBeenActive)
            ) {
                return false
            }

            zzfxParams = zzfxParams || _defaultSound

            // if has other arguments, copy the sound to not change the original
            if (pitchSlide !== 0 || volumeFactor !== 1) {
                zzfxParams = zzfxParams.slice()
                zzfxParams[0] = volumeFactor * (zzfxParams[0] || 1)
                zzfxParams[10] = ~~zzfxParams[10] + pitchSlide
            }

            zzfx.apply(0, zzfxParams)

            return zzfxParams
        },

        /**
         * Set the ZzFX's global volume factor.
         * Note: use 0 to mute all sound effects.
         *
         * @param {number} value
         */
        volume(value) {
            DEV: assert(isNumber(value), 'volume: 1st param must be a number')

            root.zzfxV = value
        },

        /** PLUGINS API */
        /**
         * Prepares a plugin to be loaded
         *
         * @param {pluginCallback} callback
         */
        use(callback, config = {}) {
            DEV: assert('function' === typeof callback, 'use: 1st param must be a function')
            DEV: assert('object' === typeof config, 'use: 2nd param must be an object')

            if (_initialized) {
                // load the plugin now
                loadPlugin(callback, config)
            } else {
                // schedule to load the plugin right before the "init" event
                _plugins.push([callback, config])
            }
        },

        /**
         * Add a game event listener
         *
         * @param {string} eventName the event type name
         * @param {Function} callback the function that is called when the event occurs
         * @returns {Function} a function to remove the listener
         */
        listen(eventName, callback) {
            DEV: assert('string' === typeof eventName, 'listen: 1st param must be a string')
            DEV: assert('function' === typeof callback, 'listen: 2nd param must be a function')

            eventName = eventName.toLowerCase()

            _events[eventName] = _events[eventName] || new Set()
            _events[eventName].add(callback)

            // return a function to remove this event listener
            return () => _events[eventName].delete(callback)
        },

        /**
         * Call all listeners attached to a game event
         *
         * @param {string} eventName The event type name
         * @param {*} [arg1] any data to be passed over the listeners
         * @param {*} [arg2] any data to be passed over the listeners
         * @param {*} [arg3] any data to be passed over the listeners
         * @param {*} [arg4] any data to be passed over the listeners
         */
        emit(eventName, arg1, arg2, arg3, arg4) {
            DEV: assert('string' === typeof eventName, 'emit: 1st param must be a string')
            if (_initialized) {
                eventName = eventName.toLowerCase()

                triggerEvent('before:' + eventName, arg1, arg2, arg3, arg4)
                triggerEvent(eventName, arg1, arg2, arg3, arg4)
                triggerEvent('after:' + eventName, arg1, arg2, arg3, arg4)
            }
        },

        /**
         * Set or reset the color palette
         *
         * @param {string[]} [colors]
         */
        pal(colors = defaultPalette) {
            DEV: assert(
                Array.isArray(colors) && colors.length > 0,
                'pal: 1st param must be a array of strings'
            )
            _colors = colors
        },

        /**
         * Define or update a instance property.
         *
         * @param {string} key
         * @param {*} value
         */
        def(key, value) {
            DEV: assert('string' === typeof key, 'def: 1st param must be a string')
            DEV: if (null == value) {
                console.warn(`def: key "${key}" was defined as ${value} but now is null`)
            }

            instance[key] = value
            if (settings.global) {
                root[key] = value
            }
        },

        /**
         * The scale of the game's delta time (dt).
         * Values higher than 1 increase the speed of time, while values smaller than 1 decrease it.
         * A value of 0 freezes time and is effectively equivalent to pausing.
         *
         * @param {number} value
         */
        timescale(value) {
            DEV: assert(
                isNumber(value) && value >= 0,
                'timescale: 1st param must be a positive number or zero'
            )

            _timeScale = value
        },

        /**
         * Set the target FPS (frames per second).
         *
         * @param {number} value
         */
        framerate(value) {
            DEV: assert(
                isNumber(value) && value >= 1,
                'framerate: 1st param must be a positive number'
            )

            _deltaTime = 1 / ~~value
        },

        /**
         * Returns information about that engine instance.
         *
         * @param {number} n
         * @returns {any}
         */
        stat(n) {
            DEV: assert(isNumber(n) && n >= 0, 'stat: 1st param must be a positive number')

            const list = [
                // 0
                settings,
                // 1
                _initialized,
                // 2
                _rafid,
                // 3
                _scale,
                // 4
                _events,
                // 5
                _colors,
                // 6
                _defaultSound,
                // 7
                _timeScale,
                // 8
                root.zzfxV || 1,
                // 9
                _rngSeed,
                // 10
                _fontSize,
                //  11
                _fontFamily,
            ]

            const data = { index: n, value: list[n] }

            // plugins can modify or create stat values
            instance.emit('stat', data)

            return data.value
        },

        /**
         * Stops the litecanvas instance and remove all event listeners.
         */
        quit() {
            // stop the game loop (update & draw)
            cancelAnimationFrame(_rafid)
            _rafid = 0

            // emit "quit" event to manual clean ups
            instance.emit('quit')

            // clear all browser event listeners
            for (const removeListener of _browserEventListeners) {
                removeListener()
            }

            // clear all engine event listeners
            _events = {}

            // maybe clear global context
            if (settings.global) {
                for (const key in instance) {
                    delete root[key]
                }
                delete root.ENGINE
            }
        },
    }

    // prettier-ignore
    for (const k of 'PI,sin,cos,atan2,hypot,tan,abs,ceil,floor,trunc,min,max,pow,sqrt,sign,exp'.split(',')) {
        // import native Math functions
        instance[k] = math[k]
    }

    function init() {
        // setup default event listeners
        const source = settings.loop ? settings.loop : root
        for (const event in _events) {
            if (source[event]) instance.listen(event, source[event])
        }

        // load plugins
        for (const [callback, config] of _plugins) {
            loadPlugin(callback, config)
        }

        // listen window resize event when "autoscale" is enabled
        if (settings.autoscale) {
            // @ts-ignore
            on(root, 'resize', resizeCanvas)
        }

        // default mouse/touch handlers
        if (settings.tapEvents) {
            const _getXY =
                    /**
                     * @param {number} pageX
                     * @param {number} pageY
                     */
                    (pageX, pageY) => [
                        (pageX - _canvas.offsetLeft) / _scale,
                        (pageY - _canvas.offsetTop) / _scale,
                    ],
                _taps = new Map(),
                _registerTap =
                    /**
                     * @param {number} id
                     * @param {number} [x]
                     * @param {number} [y]
                     */
                    (id, x, y) => {
                        const tap = {
                            x,
                            y,
                            startX: x,
                            startY: y,
                            // timestamp
                            ts: performance.now(),
                        }
                        _taps.set(id, tap)
                        return tap
                    },
                _updateTap =
                    /**
                     * @param {number} id
                     * @param {number} x
                     * @param {number} y
                     */
                    (id, x, y) => {
                        const tap = _taps.get(id) || _registerTap(id)
                        tap.x = x
                        tap.y = y
                    },
                _checkTapped =
                    /**
                     * @param {{ts: number}} tap
                     */
                    (tap) => tap && performance.now() - tap.ts <= 300,
                preventDefault = (ev) => ev.preventDefault()

            let _pressingMouse = false

            on(
                _canvas,
                'mousedown',
                /**
                 * @param {MouseEvent} ev
                 */
                (ev) => {
                    if (ev.button === 0) {
                        preventDefault(ev)
                        const [x, y] = _getXY(ev.pageX, ev.pageY)
                        instance.emit('tap', x, y, 0)
                        _registerTap(0, x, y)
                        _pressingMouse = true
                    }
                }
            )

            on(
                _canvas,
                'mouseup',
                /**
                 * @param {MouseEvent} ev
                 */
                (ev) => {
                    if (ev.button === 0) {
                        preventDefault(ev)
                        const tap = _taps.get(0)
                        const [x, y] = _getXY(ev.pageX, ev.pageY)
                        if (_checkTapped(tap)) {
                            instance.emit('tapped', tap.startX, tap.startY, 0)
                        }
                        instance.emit('untap', x, y, 0)
                        _taps.delete(0)
                        _pressingMouse = false
                    }
                }
            )

            on(
                _canvas,
                'mousemove',
                /**
                 * @param {MouseEvent} ev
                 */
                (ev) => {
                    preventDefault(ev)

                    const [x, y] = _getXY(ev.pageX, ev.pageY)
                    instance.def('MX', x)
                    instance.def('MY', y)

                    if (!_pressingMouse) return

                    instance.emit('tapping', x, y, 0)
                    _updateTap(0, x, y)
                }
            )

            on(
                _canvas,
                'touchstart',
                /**
                 * @param {TouchEvent} ev
                 */
                (ev) => {
                    preventDefault(ev)
                    /** @type {TouchList} touches */
                    const touches = ev.changedTouches
                    for (const touch of touches) {
                        const [x, y] = _getXY(touch.pageX, touch.pageY)
                        instance.emit('tap', x, y, touch.identifier + 1)
                        _registerTap(touch.identifier + 1, x, y)
                    }
                }
            )

            on(
                _canvas,
                'touchmove',
                /**
                 * @param {TouchEvent} ev
                 */
                (ev) => {
                    preventDefault(ev)
                    const touches = ev.changedTouches
                    for (const touch of touches) {
                        const [x, y] = _getXY(touch.pageX, touch.pageY)
                        instance.emit('tapping', x, y, touch.identifier + 1)
                        _updateTap(touch.identifier + 1, x, y)
                    }
                }
            )

            /**
             * @param {TouchEvent} ev
             */
            const _touchEndHandler = (ev) => {
                preventDefault(ev)
                const existing = []

                if (ev.targetTouches.length > 0) {
                    for (const touch of ev.targetTouches) {
                        existing.push(touch.identifier + 1)
                    }
                }

                for (const [id, tap] of _taps) {
                    if (existing.includes(id)) continue
                    if (_checkTapped(tap)) {
                        instance.emit('tapped', tap.startX, tap.startY, id)
                    }
                    instance.emit('untap', tap.x, tap.y, id)
                    _taps.delete(id)
                }
            }

            on(_canvas, 'touchend', _touchEndHandler)
            on(_canvas, 'touchcancel', _touchEndHandler)

            // @ts-ignore
            on(root, 'blur', () => {
                _pressingMouse = false
                for (const [id, tap] of _taps) {
                    instance.emit('untap', tap.x, tap.y, id)
                    _taps.delete(id)
                }
            })
        }

        if (settings.keyboardEvents) {
            /** @type {Set<string>} */
            const _keysDown = new Set()

            /** @type {Set<string>} */
            const _keysPress = new Set()

            /**
             * @param {Set<string>} keySet
             * @param {string} [key]
             * @returns {boolean}
             */
            const keyCheck = (keySet, key = '') => {
                key = key.toLowerCase()
                return !key ? keySet.size > 0 : keySet.has('space' === key ? ' ' : key)
            }

            // @ts-ignore
            on(root, 'keydown', (/** @type {KeyboardEvent} */ event) => {
                const key = event.key.toLowerCase()
                if (!_keysDown.has(key)) {
                    _keysDown.add(key)
                    _keysPress.add(key)
                }
            })

            // @ts-ignore
            on(root, 'keyup', (/** @type {KeyboardEvent} */ event) => {
                _keysDown.delete(event.key.toLowerCase())
            })

            // @ts-ignore
            on(root, 'blur', () => _keysDown.clear())
            instance.listen('after:update', () => _keysPress.clear())

            instance.def(
                'iskeydown',
                /**
                 * Checks if a which key is pressed (down) on the keyboard.
                 * Note: use `iskeydown()` to check for any key.
                 *
                 * @param {string} [key]
                 * @returns {boolean}
                 */
                (key) => {
                    DEV: assert(
                        null == key || 'string' === typeof key,
                        'iskeydown: 1st param must be a string or undefined'
                    )
                    return keyCheck(_keysDown, key)
                }
            )

            instance.def(
                'iskeypressed',
                /**
                 * Checks if a which key just got pressed on the keyboard.
                 * Note: use `iskeypressed()` to check for any key.
                 *
                 * @param {string} [key]
                 * @returns {boolean}
                 */
                (key) => {
                    DEV: assert(
                        null == key || 'string' === typeof key,
                        'iskeypressed: 1st param must be a string or undefined'
                    )
                    return keyCheck(_keysPress, key)
                }
            )
        }

        _initialized = true

        // start the game loop
        instance.emit('init', instance)

        _lastFrameTime = performance.now()
        _rafid = raf(drawFrame)
    }

    /**
     * @param {DOMHighResTimeStamp} now
     */
    function drawFrame(now) {
        let updated = 0,
            frameTime = (now - _lastFrameTime) / 1000

        _lastFrameTime = now

        if (settings.animate) {
            if (frameTime > 0.3) {
                console.warn('skipping too long frame')
            } else {
                _accumulated += frameTime

                while (_accumulated >= _deltaTime) {
                    updated++
                    instance.emit('update', _deltaTime * _timeScale, updated)
                    instance.def('T', instance.T + _deltaTime * _timeScale)
                    _accumulated -= _deltaTime
                }
            }

            // request the next frame
            // check if the last ID exists, because
            // quit() delete it (sets to zero)
            if (_rafid) _rafid = raf(drawFrame)
        } else {
            // when the canvas is not animated
            // we force one frame when redraws are triggered
            updated = 1
        }

        if (updated) {
            // always set default values for
            // _ctx.textAlign and _ctx.textBaseline before draw
            instance.textalign('start', 'top')
            instance.emit('draw')
        }
    }

    function setupCanvas() {
        if (settings.canvas) {
            DEV: assert(
                'string' === typeof settings.canvas,
                'Litecanvas\' option "canvas" should be a string (a selector)'
            )
            _canvas = document.querySelector(settings.canvas)
        }

        _canvas = _canvas || document.createElement('canvas')

        DEV: assert(_canvas && _canvas.tagName === 'CANVAS', 'Invalid canvas element')

        instance.def('CANVAS', _canvas)
        _ctx = _canvas.getContext('2d')

        on(_canvas, 'click', () => root.focus())

        // @ts-ignore
        _canvas.style = ''

        resizeCanvas()

        if (!_canvas.parentNode) {
            document.body.appendChild(_canvas)
        }
    }

    function resizeCanvas() {
        DEV: assert(
            null == settings.width || (isNumber(settings.width) && settings.width > 0),
            'Litecanvas\' option "width" should be a positive number when defined'
        )
        DEV: assert(
            null == settings.height || (isNumber(settings.height) && settings.height > 0),
            'Litecanvas\' option "height" should be a positive number when defined'
        )
        DEV: assert(
            null == settings.height || (settings.width > 0 && settings.height > 0),
            'Litecanvas\' option "width" is required when the option "height" is defined'
        )

        const width = settings.width || root.innerWidth,
            height = settings.height || settings.width || root.innerHeight

        instance.def('W', (_canvas.width = width))
        instance.def('H', (_canvas.height = height))

        instance.def('CX', instance.W / 2)
        instance.def('CY', instance.H / 2)

        if (settings.autoscale) {
            if (!_canvas.style.display) {
                _canvas.style.display = 'block'
                _canvas.style.margin = 'auto'
            }

            _scale = math.min(root.innerWidth / instance.W, root.innerHeight / instance.H)
            _scale = (settings.pixelart ? ~~_scale : _scale) || 1

            _canvas.style.width = instance.W * _scale + 'px'
            _canvas.style.height = instance.H * _scale + 'px'
        }

        // restore canvas image rendering properties
        if (!settings.antialias || settings.pixelart) {
            _ctx.imageSmoothingEnabled = false
            _canvas.style.imageRendering = 'pixelated'
        }

        // trigger "resized" event
        instance.emit('resized', _scale)

        instance.cls(0)

        // force redraw
        if (!settings.animate) {
            raf(drawFrame)
        }
    }

    /**
     * @param {string} eventName
     * @param {*} arg1
     * @param {*} arg2
     * @param {*} arg3
     * @param {*} arg4
     */
    function triggerEvent(eventName, arg1, arg2, arg3, arg4) {
        if (!_events[eventName]) return
        // @ts-ignore
        for (const callback of _events[eventName]) {
            callback(arg1, arg2, arg3, arg4)
        }
    }

    /**
     * @param {pluginCallback} callback
     * @param {*} config
     */
    function loadPlugin(callback, config) {
        // @ts-ignore
        const pluginData = callback(instance, config)

        DEV: assert(
            null == pluginData || 'object' === typeof pluginData,
            'Litecanvas plugins should return an object or nothing'
        )

        for (const key in pluginData) {
            instance.def(key, pluginData[key])
        }
    }

    if (settings.global) {
        if (root.ENGINE) {
            throw new Error('two global litecanvas detected')
        }
        Object.assign(root, instance)
        root.ENGINE = instance
    }

    setupCanvas()

    if ('loading' === document.readyState) {
        // @ts-ignore
        on(root, 'DOMContentLoaded', () => raf(init))
    } else {
        raf(init)
    }

    // @ts-ignore
    return instance
}
