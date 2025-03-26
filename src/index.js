import { zzfx } from './zzfx.js'
import { colors } from './palette.js'
import { assert } from './dev.js'
import './types.js'

/**
 * The litecanvas constructor
 *
 * @param {LitecanvasOptions} [settings]
 * @returns {LitecanvasInstance}
 */
export default function litecanvas(settings = {}) {
    const root = globalThis,
        math = Math,
        TWO_PI = math.PI * 2,
        raf = requestAnimationFrame,
        /** @type {Function[]} */
        _browserEventListeners = [],
        /** @type {(elem:HTMLElement, evt:string, callback:(event:Event)=>void)=>void} */
        on = (elem, evt, callback) => {
            elem.addEventListener(evt, callback, false)
            _browserEventListeners.push(() =>
                elem.removeEventListener(evt, callback, false)
            )
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
            pauseOnBlur: true,
            tapEvents: true,
            keyboardEvents: true,
            animate: true,
        }

    // setup the settings default values
    settings = Object.assign(defaults, settings)

    let /** @type {boolean} */
        _initialized = false,
        /** @type {Function[]} */
        _plugins = [],
        /** @type {HTMLCanvasElement|string} _canvas */
        _canvas,
        /** @type {number} */
        _scale = 1,
        /** @type {CanvasRenderingContext2D} */
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
        /** @type {number} */
        _rafid,
        /** @type {string} */
        _fontFamily = 'sans-serif',
        /** @type {number} */
        _fontSize = 20,
        /** @type {number} */
        _rng_seed = Date.now(),
        /**
         * default game events
         * @type {Object<string,Set<Function>>}
         */
        _events = {
            init: false,
            update: false,
            draw: false,
            resized: false,
            tap: false,
            untap: false,
            tapping: false,
            tapped: false,
        },
        /**
         * Helpers to be used by plugins
         *
         * @type {LitecanvasPluginHelpers}
         */
        _helpers = {
            settings: Object.assign({}, settings),
            colors,
        }

    /** @type {LitecanvasInstance} */
    const instance = {
        /** @type {number} */
        WIDTH: 0,

        /** @type {number} */
        HEIGHT: 0,

        /** @type {HTMLCanvasElement} */
        CANVAS: false,

        /** @type {number} */
        ELAPSED: 0,

        /** @type {number} */
        CENTERX: 0,

        /** @type {number} */
        CENTERY: 0,

        /** @type {number} */
        MOUSEX: -1,

        /** @type {number} */
        MOUSEY: -1,

        /** @type {number[]} */
        DEFAULT_SFX: [0.5, 0, 1750, , , 0.3, 1, , , , 600, 0.1],

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
        HALF_PI: math.PI / 2,

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
            DEV: assert(
                max > min,
                'randi: the 2nd param must be less than the 3rd param'
            )

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
            DEV: assert(
                max > min,
                'randi: the 2nd param must be less than the 3rd param'
            )
            DEV: assert(
                max !== min,
                'randi: the 2nd param must be not equal to the 3rd param'
            )

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
            DEV: assert(
                max > min,
                'rand: the 1st param must be less than the 2nd param'
            )

            const a = 1664525
            const c = 1013904223
            const m = 4294967296

            _rng_seed = (a * _rng_seed + c) % m

            return (_rng_seed / m) * (max - min) + min
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
            DEV: assert(
                max > min,
                'randi: the 1st param must be less than the 2nd param'
            )

            return math.floor(instance.rand(min, max + 1))
        },

        /**
         * If a value is passed, initializes the random number generator with an explicit seed value.
         * Otherwise, returns the current seed state.
         *
         * @param {number} value
         * @returns {number} the seed state
         */
        seed: (value) => {
            DEV: assert(
                null == value || (isNumber(value) && value >= 0),
                'seed: 1st param must be a positive number or zero'
            )

            return null == value ? _rng_seed : (_rng_seed = ~~value)
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
                instance.rectfill(
                    0,
                    0,
                    _ctx.canvas.width,
                    _ctx.canvas.height,
                    color
                )
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
         */
        rect(x, y, width, height, color, radii) {
            DEV: assert(isNumber(x), 'rect: 1st param must be a number')
            DEV: assert(isNumber(y), 'rect: 2nd param must be a number')
            DEV: assert(
                isNumber(width) && width > 0,
                'rect: 3rd param must be a positive number'
            )
            DEV: assert(
                isNumber(height) && height >= 0,
                'rect: 4th param must be a positive number or zero'
            )
            DEV: assert(
                null == color || (isNumber(color) && color >= 0),
                'rect: 5th param must be a positive number or zero'
            )
            DEV: assert(
                null == radii ||
                    isNumber(radii) ||
                    (Array.isArray(radii) && radii.length >= 1),
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
                null == radii ||
                    isNumber(radii) ||
                    (Array.isArray(radii) && radii.length >= 1),
                'rectfill: 6th param must be a number or array of at least 2 numbers'
            )

            _ctx.beginPath()
            _ctx[radii ? 'roundRect' : 'rect'](
                ~~x,
                ~~y,
                ~~width,
                ~~height,
                radii
            )
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
            DEV: assert(
                isNumber(x2),
                'line: 3rd param must be a positive number or zero'
            )
            DEV: assert(
                isNumber(y2),
                'line: 4th param must be a positive number or zero'
            )
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
            DEV: assert(
                isNumber(offset),
                'linedash: 2nd param must be a number'
            )

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
            // DEV: assert(
            //     'string' === typeof message,
            //     'text: 3rd param must be a string'
            // )
            DEV: assert(
                null == color || (isNumber(color) && color >= 0),
                'text: 4th param must be a positive number or zero'
            )
            DEV: assert(
                'string' === typeof fontStyle,
                'text: 5th param must be a string'
            )

            _ctx.font = `${fontStyle} ${_fontSize}px ${_fontFamily}`
            _ctx.fillStyle = instance.getcolor(color)
            _ctx.fillText(message, ~~x, ~~y)
        },

        /**
         * Set the font family
         *
         * @param {string} family
         */
        textfont(family) {
            DEV: assert(
                'string' === typeof family,
                'textfont: 1st param must be a string'
            )

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
         * @param {string} align the horizontal alignment. Possible values: "left", "right", "center", "start" or "end"
         * @param {string} baseline the vertical alignment. Possible values: "top", "bottom", "middle", "hanging" or "ideographic"
         * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/textBaseline
         * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/textAlign
         */
        textalign(align, baseline) {
            DEV: assert(
                null == align ||
                    ['left', 'right', 'center', 'start', 'end'].includes(align),
                'textalign: 1st param must be a string'
            )
            DEV: assert(
                null == baseline ||
                    [
                        'top',
                        'bottom',
                        'middle',
                        'hanging',
                        'alphabetic',
                        'ideographic',
                    ].includes(baseline),
                'textalign: 2nd param must be a string'
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
         * Creates a offscreen canvas to draw on it
         *
         * @param {number} width
         * @param {number} height
         * @param {string[]|drawCallback} drawing
         * @param {object} [options]
         * @param {number} [options.scale=1]
         * @param {OffscreenCanvas | HTMLCanvasElement} [options.canvas]
         * @returns {OffscreenCanvas}
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

            const canvas = options.canvas || new OffscreenCanvas(1, 1),
                scale = options.scale || 1,
                contextOriginal = _ctx

            canvas.width = width * scale
            canvas.height = height * scale
            _ctx = canvas.getContext('2d')

            _ctx.scale(scale, scale)

            // draw pixel art if `draw` is a array
            if (drawing.push) {
                let x = 0,
                    y = 0

                _ctx.imageSmoothingEnabled = false

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
                drawing(_ctx)
            }

            _ctx = contextOriginal // restore the context

            return canvas
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
            DEV: assert(
                null == y || isNumber(y),
                'scale: 2nd param must be a number'
            )

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

            _ctx.fillStyle = instance.getcolor(color)
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

            _ctx.strokeStyle = instance.getcolor(color)
            if (path) {
                _ctx.stroke(path)
            } else {
                _ctx.stroke()
            }
        },

        /**
         * Turn given path into a clipping region.
         *
         * @param {Path2D} path
         * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clip
         */
        clip(path) {
            DEV: assert(
                path instanceof Path2D,
                'clip: 1st param must be a Path2D instance'
            )

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
            DEV: assert(
                isNumber(volumeFactor),
                'sfx: 3rd param must be a number'
            )

            if (
                root.zzfxV <= 0 ||
                (navigator.userActivation &&
                    !navigator.userActivation.hasBeenActive)
            ) {
                return false
            }

            zzfxParams = zzfxParams || instance.DEFAULT_SFX

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
            DEV: assert(
                'function' === typeof callback,
                'use: 1st param must be a function'
            )
            DEV: assert(
                'object' === typeof config,
                'use: 2nd param must be an object'
            )

            _initialized
                ? loadPlugin(callback, config)
                : _plugins.push([callback, config])
        },

        /**
         * Add a game event listener
         *
         * @param {string} eventName the event type name
         * @param {Function} callback the function that is called when the event occurs
         * @returns {Function} a function to remove the listener
         */
        listen(eventName, callback) {
            DEV: assert(
                'string' === typeof eventName,
                'listen: 1st param must be a string'
            )
            DEV: assert(
                'function' === typeof callback,
                'listen: 2nd param must be a function'
            )

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
            DEV: assert(
                'string' === typeof eventName,
                'emit: 1st param must be a string'
            )
            if (_initialized) {
                triggerEvent('before:' + eventName, arg1, arg2, arg3, arg4)
                triggerEvent(eventName, arg1, arg2, arg3, arg4)
                triggerEvent('after:' + eventName, arg1, arg2, arg3, arg4)
            }
        },

        /**
         * Get a color by index
         *
         * @param {number} [index=0] The color number
         * @returns {string} the color code
         */
        getcolor: (index) => {
            DEV: assert(
                null == index || (isNumber(index) && index >= 0),
                'getcolor: 1st param must be a number'
            )

            return colors[~~index % colors.length]
        },

        /**
         * Create or update a instance variable
         *
         * @param {string} key
         * @param {*} value
         */
        setvar(key, value) {
            DEV: assert(
                'string' === typeof key,
                'setvar: 1st param must be a string'
            )
            if (null == value) {
                console.warn(`setvar: key "${key}" was defined as ${value}`)
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
                isNumber(value),
                'timescale: 1st param must be a number'
            )

            _timeScale = value
        },

        /**
         * Set the target FPS at runtime.
         *
         * @param {number} value
         */
        setfps(value) {
            DEV: assert(
                isNumber(value) && value >= 1,
                'setfps: 1st param must be a positive number'
            )

            _deltaTime = 1 / ~~value
        },

        /**
         * Stops the litecanvas instance and remove all event listeners.
         */
        quit() {
            // stop the renderer
            cancelAnimationFrame(_rafid)

            // emit "quit" event to manual clean ups
            instance.emit('quit')

            // clear all engine events
            _events = []

            // clear all browser events
            for (const removeListener of _browserEventListeners) {
                removeListener()
            }

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
        _initialized = true

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
            on(root, 'resize', resizeCanvas)
        }

        // default mouse/touch handlers
        if (settings.tapEvents) {
            const _getXY = (pageX, pageY) => [
                    (pageX - _canvas.offsetLeft) / _scale,
                    (pageY - _canvas.offsetTop) / _scale,
                ],
                _taps = new Map(),
                _registerTap = (id, x, y) => {
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
                _updateTap = (id, x, y) => {
                    const tap = _taps.get(id) || _registerTap(id)
                    tap.x = x
                    tap.y = y
                },
                _checkTapped = (tap) =>
                    tap && performance.now() - tap.ts <= 300,
                preventDefault = (ev) => ev.preventDefault()

            let _pressingMouse = false

            on(_canvas, 'mousedown', (ev) => {
                if (ev.button === 0) {
                    preventDefault(ev)
                    const [x, y] = _getXY(ev.pageX, ev.pageY)
                    instance.emit('tap', x, y, 0)
                    _registerTap(0, x, y)
                    _pressingMouse = true
                }
            })

            on(_canvas, 'mouseup', (ev) => {
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
            })

            on(_canvas, 'mousemove', (ev) => {
                preventDefault(ev)

                const [x, y] = _getXY(ev.pageX, ev.pageY)
                instance.setvar('MOUSEX', x)
                instance.setvar('MOUSEY', y)

                if (!_pressingMouse) return

                instance.emit('tapping', x, y, 0)
                _updateTap(0, x, y)
            })

            on(_canvas, 'touchstart', (ev) => {
                preventDefault(ev)
                /** @type {TouchList} touches */
                const touches = ev.changedTouches
                for (const touch of touches) {
                    const [x, y] = _getXY(touch.pageX, touch.pageY)
                    instance.emit('tap', x, y, touch.identifier + 1)
                    _registerTap(touch.identifier + 1, x, y)
                }
            })

            on(_canvas, 'touchmove', (ev) => {
                preventDefault(ev)
                /** @type {TouchList} touches */
                const touches = ev.changedTouches
                for (const touch of touches) {
                    const [x, y] = _getXY(touch.pageX, touch.pageY)
                    instance.emit('tapping', x, y, touch.identifier + 1)
                    _updateTap(touch.identifier + 1, x, y)
                }
            })

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

            on(root, 'blur', () => {
                _pressingMouse = false
                for (const [id, tap] of _taps) {
                    instance.emit('untap', tap.x, tap.y, id)
                    _taps.delete(id)
                }
            })
        }

        if (settings.keyboardEvents) {
            const toLowerCase = (s) => s.toLowerCase()

            /** @type {Set<string>} */
            const _keysDown = new Set()

            /** @type {Set<string>} */
            const _keysPress = new Set()

            /**
             * @param {Set<string>} keysSet
             * @param {string} [key]
             * @returns {boolean}
             */
            const keyCheck = (keysSet, key) => {
                return !key
                    ? keysSet.size > 0
                    : keysSet.has(
                          'space' === toLowerCase(key) ? ' ' : toLowerCase(key)
                      )
            }

            on(root, 'keydown', (/** @type {KeyboardEvent} */ event) => {
                if (!_keysDown.has(toLowerCase(event.key))) {
                    _keysDown.add(toLowerCase(event.key))
                    _keysPress.add(toLowerCase(event.key))
                }
            })

            on(root, 'keyup', (/** @type {KeyboardEvent} */ event) => {
                _keysDown.delete(toLowerCase(event.key))
            })

            on(root, 'blur', () => _keysDown.clear())
            instance.listen('after:draw', () => _keysPress.clear())

            instance.setvar(
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

            instance.setvar(
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

        // listen browser focus/blur events and pause the update/draw loop
        if (settings.pauseOnBlur) {
            on(root, 'blur', () => {
                _rafid = cancelAnimationFrame(_rafid)
            })

            on(root, 'focus', () => {
                if (!_rafid) {
                    _rafid = raf(drawFrame)
                }
            })
        }

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
            // request the next frame
            _rafid = raf(drawFrame)

            if (frameTime > 0.3) {
                return console.warn('skipping too long frame')
            }

            _accumulated += frameTime

            while (_accumulated >= _deltaTime) {
                instance.emit('update', _deltaTime * _timeScale)
                instance.setvar(
                    'ELAPSED',
                    instance.ELAPSED + _deltaTime * _timeScale
                )
                updated++
                _accumulated -= _deltaTime
            }
        } else {
            // when the canvas is not animated
            // we for one frame when a redraw is triggered
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
        _canvas = settings.canvas || document.createElement('canvas')

        /** @type {HTMLCanvasElement} */
        _canvas =
            'string' === typeof _canvas
                ? document.querySelector(_canvas)
                : _canvas

        DEV: assert(
            _canvas && _canvas.tagName === 'CANVAS',
            'Invalid canvas element'
        )

        instance.setvar('CANVAS', _canvas)
        _ctx = _canvas.getContext('2d')

        on(_canvas, 'click', () => root.focus())

        _canvas.style = ''

        resizeCanvas()

        if (!_canvas.parentNode) document.body.appendChild(_canvas)
    }

    function resizeCanvas() {
        DEV: assert(
            null == settings.width ||
                (isNumber(settings.width) && settings.width > 0),
            'Litecanvas\' option "width" should be a positive number when defined'
        )
        DEV: assert(
            null == settings.height ||
                (isNumber(settings.height) && settings.height > 0),
            'Litecanvas\' option "height" should be a positive number when defined'
        )
        DEV: assert(
            null == settings.height ||
                (settings.width > 0 && settings.height > 0),
            'Litecanvas\' option "width" is required when the option "height" is defined'
        )

        const width = settings.width || root.innerWidth,
            height = settings.height || settings.width || root.innerHeight

        instance.setvar('WIDTH', (_canvas.width = width))
        instance.setvar('HEIGHT', (_canvas.height = height))

        instance.setvar('CENTERX', instance.WIDTH / 2)
        instance.setvar('CENTERY', instance.HEIGHT / 2)

        if (settings.autoscale) {
            if (!_canvas.style.display) {
                _canvas.style.display = 'block'
                _canvas.style.margin = 'auto'
            }

            _scale = math.min(
                root.innerWidth / instance.WIDTH,
                root.innerHeight / instance.HEIGHT
            )
            _scale = (settings.pixelart ? ~~_scale : _scale) || 1

            _canvas.style.width = instance.WIDTH * _scale + 'px'
            _canvas.style.height = instance.HEIGHT * _scale + 'px'
        }

        // restore canvas image rendering properties
        if (!settings.antialias || settings.pixelart) {
            _ctx.imageSmoothingEnabled = false
            _canvas.style.imageRendering = 'pixelated'
        }

        // trigger "resized" event
        instance.emit('resized', _scale)

        // force redraw
        if (!settings.animate) {
            raf(drawFrame)
        }
    }

    function triggerEvent(eventName, arg1, arg2, arg3, arg4) {
        if (!_events[eventName]) return
        for (const callback of _events[eventName]) {
            callback(arg1, arg2, arg3, arg4)
        }
    }

    /**
     * @param {pluginCallback} callback
     */
    function loadPlugin(callback, config) {
        const pluginData = callback(instance, _helpers, config)

        DEV: assert(
            null == pluginData || 'object' === typeof pluginData,
            'Litecanvas plugins should return an object or nothing'
        )

        for (const key in pluginData) {
            instance.setvar(key, pluginData[key])
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
        on(root, 'DOMContentLoaded', () => raf(init))
    } else {
        raf(init)
    }

    return instance
}
