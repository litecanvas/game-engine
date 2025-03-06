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
        PI = Math.PI,
        TWO_PI = PI * 2,
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
        isFinite = Number.isFinite,
        /** @type {LitecanvasOptions} */
        defaults = {
            fullscreen: true,
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
        _canvas = settings.canvas || document.createElement('canvas'),
        /** @type {boolean} */
        _fullscreen = settings.fullscreen,
        /** @type {boolean} */
        _autoscale = settings.autoscale,
        /** @type {boolean} */
        _animated = settings.animate,
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
        /** @type {number} */
        _deltaTime,
        /** @type {number} */
        _accumulated = 0,
        /** @type {number} */
        _rafid,
        /** @type {string} */
        _fontFamily = 'sans-serif',
        /** @type {number} */
        _fontSize = 32,
        /** @type {number} */
        _rng_seed = Date.now(),
        /** @type {boolean} */
        _global = settings.global,
        /**
         * default game events
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
        WIDTH: settings.width,

        /** @type {number} */
        HEIGHT: settings.height || settings.width,

        /** @type {HTMLCanvasElement} */
        CANVAS: null,

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
        DEFAULT_SFX: [0.5, , 1675, , 0.06, 0.2, 1, 1.8, , , 637, 0.06],

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
        HALF_PI: PI / 2,

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
            DEV: assert(isFinite(start), 'lerp: 1st param must be a number')
            DEV: assert(isFinite(end), 'lerp: 2nd param must be a number')
            DEV: assert(isFinite(t), 'lerp: 3rd param must be a number')

            return t * (end - start) + start
        },

        /**
         * Convert degrees to radians
         *
         * @param {number} degs
         * @returns {number} the value in radians
         */
        deg2rad: (degs) => {
            DEV: assert(isFinite(degs), 'deg2rad: 1st param must be a number')

            return (PI / 180) * degs
        },

        /**
         * Convert radians to degrees
         *
         * @param {number} rads
         * @returns {number} the value in degrees
         */
        rad2deg: (rads) => {
            DEV: assert(isFinite(rads), 'rad2deg: 1st param must be a number')

            return (180 / PI) * rads
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
            DEV: assert(isFinite(value), 'clamp: 1st param must be a number')
            DEV: assert(isFinite(min), 'clamp: 2nd param must be a number')
            DEV: assert(isFinite(max), 'clamp: 3rd param must be a number')
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
            DEV: assert(isFinite(value), 'wrap: 1st param must be a number')
            DEV: assert(isFinite(min), 'wrap: 2nd param must be a number')
            DEV: assert(isFinite(max), 'wrap: 3rd param must be a number')
            DEV: assert(
                max > min,
                'randi: the 2nd param must be less than the 3rd param'
            )
            DEV: assert(
                max !== min,
                'randi: the 2nd param must be not equal to the 3rd param'
            )

            return value - (max - min) * Math.floor((value - min) / (max - min))
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
            DEV: assert(isFinite(value), 'map: 1st param must be a number')
            DEV: assert(isFinite(start1), 'map: 2nd param must be a number')
            DEV: assert(isFinite(stop1), 'map: 3rd param must be a number')
            DEV: assert(isFinite(start2), 'map: 4th param must be a number')
            DEV: assert(isFinite(stop2), 'map: 5th param must be a number')

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
            DEV: assert(isFinite(value), 'norm: 1st param must be a number')
            DEV: assert(isFinite(start), 'norm: 2nd param must be a number')
            DEV: assert(isFinite(stop), 'norm: 3rd param must be a number')

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
            DEV: assert(isFinite(min), 'rand: 1st param must be a number')
            DEV: assert(isFinite(max), 'rand: 2nd param must be a number')
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
            DEV: assert(isFinite(min), 'randi: 1st param must be a number')
            DEV: assert(isFinite(max), 'randi: 2nd param must be a number')
            DEV: assert(
                max > min,
                'randi: the 1st param must be less than the 2nd param'
            )

            return Math.floor(instance.rand(min, max + 1))
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
                null == value || (isFinite(value) && value >= 0),
                'seed: 1st param must be a positive number or zero'
            )

            return null == value ? _rng_seed : (_rng_seed = ~~value)
        },

        /** BASIC GRAPHICS API */
        /**
         * Clear the game screen with an optional color
         *
         * @param {number?} color The background color (index) or null (for transparent)
         */
        cls(color) {
            DEV: assert(
                null == color || (isFinite(color) && color >= 0),
                'cls: 1st param must be a positive number or zero or null'
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
        rect(x, y, width, height, color, radii = null) {
            DEV: assert(isFinite(x), 'rect: 1st param must be a number')
            DEV: assert(isFinite(y), 'rect: 2nd param must be a number')
            DEV: assert(
                isFinite(width) && width > 0,
                'rect: 3rd param must be a positive number'
            )
            DEV: assert(
                isFinite(height) && height >= 0,
                'rect: 4th param must be a positive number or zero'
            )
            DEV: assert(
                null == color || (isFinite(color) && color >= 0),
                'rect: 5th param must be a positive number or zero'
            )
            DEV: assert(
                null == radii ||
                    isFinite(radii) ||
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
        rectfill(x, y, width, height, color, radii = null) {
            DEV: assert(isFinite(x), 'rectfill: 1st param must be a number')
            DEV: assert(isFinite(y), 'rectfill: 2nd param must be a number')
            DEV: assert(
                isFinite(width) && width >= 0,
                'rectfill: 3rd param must be a positive number or zero'
            )
            DEV: assert(
                isFinite(height) && height >= 0,
                'rectfill: 4th param must be a positive number or zero'
            )
            DEV: assert(
                null == color || (isFinite(color) && color >= 0),
                'rectfill: 5th param must be a positive number or zero'
            )
            DEV: assert(
                null == radii ||
                    isFinite(radii) ||
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
            DEV: assert(isFinite(x), 'circ: 1st param must be a number')
            DEV: assert(isFinite(y), 'circ: 2nd param must be a number')
            DEV: assert(
                isFinite(radius) && radius >= 0,
                'circ: 3rd param must be a positive number or zero'
            )
            DEV: assert(
                null == color || (isFinite(color) && color >= 0),
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
            DEV: assert(isFinite(x), 'circfill: 1st param must be a number')
            DEV: assert(isFinite(y), 'circfill: 2nd param must be a number')
            DEV: assert(
                isFinite(radius) && radius >= 0,
                'circfill: 3rd param must be a positive number or zero'
            )
            DEV: assert(
                null == color || (isFinite(color) && color >= 0),
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
            DEV: assert(isFinite(x1), 'line: 1st param must be a number')
            DEV: assert(isFinite(y1), 'line: 2nd param must be a number')
            DEV: assert(
                isFinite(x2),
                'line: 3rd param must be a positive number or zero'
            )
            DEV: assert(
                isFinite(y2),
                'line: 4th param must be a positive number or zero'
            )
            DEV: assert(
                null == color || (isFinite(color) && color >= 0),
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
                isFinite(value) && ~~value > 0,
                'linewidth: 1st param must be a positive number'
            )

            _ctx.lineWidth = ~~value
            _outline_fix = ~~value % 2 === 0 ? 0 : 0.5
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
                isFinite(offset),
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
            DEV: assert(isFinite(x), 'text: 1st param must be a number')
            DEV: assert(isFinite(y), 'text: 2nd param must be a number')
            // DEV: assert(
            //     'string' === typeof message,
            //     'text: 3rd param must be a string'
            // )
            DEV: assert(
                null == color || (isFinite(color) && color >= 0),
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
            DEV: assert(isFinite(size), 'textsize: 1st param must be a number')

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
            DEV: assert(isFinite(x), 'image: 1st param must be a number')
            DEV: assert(isFinite(y), 'image: 2nd param must be a number')

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
            DEV: assert(isFinite(width), 'paint: 1st param must be a number')
            DEV: assert(isFinite(height), 'paint: 2nd param must be a number')
            DEV: assert(
                'function' === typeof drawing || Array.isArray(drawing),
                'paint: 3rd param must be a function or array'
            )
            DEV: assert(
                (options && !options.scale) || isFinite(options.scale),
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
            DEV: assert(isFinite(x), 'translate: 1st param must be a number')
            DEV: assert(isFinite(y), 'translate: 2nd param must be a number')

            return _ctx.translate(~~x, ~~y)
        },

        /**
         * Adds a scaling transformation to the canvas units horizontally and/or vertically.
         *
         * @param {number} x
         * @param {number} [y]
         */
        scale: (x, y) => {
            DEV: assert(isFinite(x), 'scale: 1st param must be a number')
            DEV: assert(
                y == null || isFinite(y),
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
            DEV: assert(isFinite(radians), 'rotate: 1st param must be a number')

            return _ctx.rotate(radians)
        },

        /**
         * Sets the alpha (opacity) value to apply when drawing new shapes and images
         *
         * @param {number} value float from 0 to 1 (e.g: 0.5 = 50% transparent)
         * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalAlpha
         */
        alpha(value) {
            DEV: assert(isFinite(value), 'alpha: 1st param must be a number')

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
                null == color || (isFinite(color) && color >= 0),
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
                null == color || (isFinite(color) && color >= 0),
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
            DEV: assert(isFinite(pitchSlide), 'sfx: 2nd param must be a number')
            DEV: assert(
                isFinite(volumeFactor),
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
            DEV: assert(isFinite(value), 'volume: 1st param must be a number')

            root.zzfxV = value
        },

        /** UTILS API */
        /**
         * Check a collision between two rectangles
         *
         * @param {number} x1 first rectangle position X
         * @param {number} y1 first rectangle position Y
         * @param {number} w1 first rectangle width
         * @param {number} h1 first rectangle height
         * @param {number} x2 second rectangle position X
         * @param {number} y2 second rectangle position Y
         * @param {number} w2 second rectangle width
         * @param {number} h2 second rectangle height
         * @returns {boolean}
         */
        colrect: (x1, y1, w1, h1, x2, y2, w2, h2) => {
            DEV: assert(isFinite(x1), 'colrect: 1st param must be a number')
            DEV: assert(isFinite(y1), 'colrect: 2nd param must be a number')
            DEV: assert(isFinite(w1), 'colrect: 3rd param must be a number')
            DEV: assert(isFinite(h1), 'colrect: 4th param must be a number')
            DEV: assert(isFinite(x2), 'colrect: 5th param must be a number')
            DEV: assert(isFinite(y2), 'colrect: 6th param must be a number')
            DEV: assert(isFinite(w2), 'colrect: 7th param must be a number')
            DEV: assert(isFinite(h2), 'colrect: 8th param must be a number')

            return x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2
        },

        /**
         * Check a collision between two circles
         *
         * @param {number} x1 first circle position X
         * @param {number} y1 first circle position Y
         * @param {number} r1 first circle position radius
         * @param {number} x2 second circle position X
         * @param {number} y2 second circle position Y
         * @param {number} r2 second circle position radius
         * @returns {boolean}
         */
        colcirc: (x1, y1, r1, x2, y2, r2) => {
            DEV: assert(isFinite(x1), 'colcirc: 1st param must be a number')
            DEV: assert(isFinite(y1), 'colcirc: 2nd param must be a number')
            DEV: assert(isFinite(r1), 'colcirc: 3rd param must be a number')
            DEV: assert(isFinite(x2), 'colcirc: 4th param must be a number')
            DEV: assert(isFinite(y2), 'colcirc: 5th param must be a number')
            DEV: assert(isFinite(r2), 'colcirc: 6th param must be a number')

            return (
                (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1) <=
                (r1 + r2) * (r1 + r2)
            )
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

            triggerEvent('before:' + eventName, arg1, arg2, arg3, arg4)
            triggerEvent(eventName, arg1, arg2, arg3, arg4)
            triggerEvent('after:' + eventName, arg1, arg2, arg3, arg4)
        },

        /**
         * Get a color by index
         *
         * @param {number} [index=0] The color number
         * @returns {string} the color code
         */
        getcolor: (index) => {
            DEV: assert(
                null == index || (isFinite(index) && index >= 0),
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
            if (value == null) {
                console.warn(`setvar: key "${key}" was defined as ${value}`)
            }

            instance[key] = value
            if (_global) {
                root[key] = value
            }
        },

        /**
         * Resizes the game canvas and emit the "resized" event
         *
         * @param {number} width
         * @param {number} height
         */
        resize(width, height) {
            DEV: assert(isFinite(width), 'resize: 1st param must be a number')
            DEV: assert(isFinite(height), 'resize: 2nd param must be a number')

            instance.setvar('WIDTH', (_canvas.width = width))
            instance.setvar('HEIGHT', (_canvas.height = height))
            pageResized()
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
                isFinite(value),
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
                isFinite(value) && value >= 1,
                'setfps: 1st param must be a positive number'
            )

            _deltaTime = 1 / ~~value
        },

        /**
         * Stops the litecanvas instance and remove all event listeners.
         */
        quit() {
            instance.emit('quit')
            for (const removeListener of _browserEventListeners) {
                removeListener()
            }
            cancelAnimationFrame(_rafid)
            _events = false
            if (_global) {
                for (const key in instance) {
                    delete root[key]
                }
                delete root.__litecanvas
            }
        },
    }

    // prettier-ignore
    for (const k of 'PI,sin,cos,atan2,hypot,tan,abs,ceil,round,floor,trunc,min,max,pow,sqrt,sign,exp'.split(',')) {
        // import native Math functions
        instance[k] = Math[k]
    }

    function init() {
        _initialized = true

        // add listeners for default events
        const source = settings.loop ? settings.loop : root
        for (const event in _events) {
            if (source[event]) instance.listen(event, source[event])
        }

        // load plugins
        for (const [callback, config] of _plugins) {
            loadPlugin(callback, config)
        }

        // listen window resize event
        if (_fullscreen || _autoscale) {
            on(root, 'resize', pageResized)
        }

        pageResized()

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
                    tap && performance.now() - tap.ts <= 200,
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
            /** @type {Set<string>} */
            const _keys = new Set()

            /**
             * Checks if a key is currently pressed in your keyboard.
             * Notes:
             * - to check the space key use `iskeydown(" ")`.
             * - you can check if any key is pressed using `iskeydown("any")`.
             *
             * @param {string} key
             * @returns {boolean}
             */
            const iskeydown = (key) => {
                DEV: assert(
                    'string' === typeof key,
                    'iskeydown: 1st param must be a string'
                )

                return 'any' === key
                    ? _keys.size > 0
                    : _keys.has(key.toLowerCase())
            }

            instance.setvar('iskeydown', iskeydown)

            on(root, 'keydown', (/** @type {KeyboardEvent} */ event) => {
                _keys.add(event.key.toLowerCase())
            })

            on(root, 'keyup', (/** @type {KeyboardEvent} */ event) => {
                _keys.delete(event.key.toLowerCase())
            })

            on(root, 'blur', () => _keys.clear())
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

        instance.setfps(60)

        // start the game loop
        instance.emit('init', instance)

        _lastFrameTime = performance.now()
        _rafid = raf(drawFrame)
    }

    /**
     * @param {DOMHighResTimeStamp} now
     */
    function drawFrame(now) {
        if (_animated) {
            _rafid = raf(drawFrame)
        }

        let updated = 0,
            frameTime = (now - _lastFrameTime) / 1000

        _lastFrameTime = now

        if (frameTime > _deltaTime * 30)
            return console.log('skipping too long frame')

        _accumulated += frameTime

        if (!_animated) {
            _accumulated = _deltaTime
        }

        for (; _accumulated >= _deltaTime; _accumulated -= _deltaTime) {
            instance.emit('update', _deltaTime * _timeScale)
            instance.setvar(
                'ELAPSED',
                instance.ELAPSED + _deltaTime * _timeScale
            )
            updated++
        }

        if (updated) {
            instance.textalign('start', 'top') // default values for textAlign & textBaseline
            instance.emit('draw')
        }
    }

    function setupCanvas() {
        /** @type {HTMLCanvasElement} */
        _canvas =
            'string' === typeof _canvas
                ? document.querySelector(_canvas)
                : _canvas

        DEV: assert(
            _canvas && _canvas.tagName === 'CANVAS',
            'Invalid canvas element'
        )
        DEV: assert(
            null === instance.WIDTH || instance.WIDTH > 0,
            'Litecanvas\' "width" option should be null or a positive number'
        )
        DEV: assert(
            null === instance.HEIGHT || instance.HEIGHT > 0,
            'Litecanvas\' "width" option should be null or a positive number'
        )

        instance.setvar('CANVAS', _canvas)
        _ctx = _canvas.getContext('2d')

        on(_canvas, 'click', () => root.focus())

        // disable fullscreen if a width is specified
        if (instance.WIDTH > 0) {
            _fullscreen = false
        }

        _canvas.style = ''
        _canvas.width = instance.WIDTH
        _canvas.height = instance.HEIGHT || instance.WIDTH

        if (!_canvas.parentNode) document.body.appendChild(_canvas)
    }

    function pageResized() {
        const pageWidth = root.innerWidth,
            pageHeight = root.innerHeight,
            styles = _canvas.style

        styles.display = 'block'

        if (_fullscreen) {
            styles.position = 'absolute'
            styles.inset = 0
            instance.setvar('WIDTH', (_canvas.width = pageWidth))
            instance.setvar('HEIGHT', (_canvas.height = pageHeight))
        } else if (_autoscale) {
            styles.margin = 'auto'
            _scale = Math.min(
                pageWidth / instance.WIDTH,
                pageHeight / instance.HEIGHT
            )
            _scale = (settings.pixelart ? ~~_scale : _scale) || 1
            styles.width = instance.WIDTH * _scale + 'px'
            styles.height = instance.HEIGHT * _scale + 'px'
        }

        instance.setvar('CENTERX', instance.WIDTH / 2)
        instance.setvar('CENTERY', instance.HEIGHT / 2)

        // restore canvas image rendering properties
        if (!settings.antialias || settings.pixelart) {
            _ctx.imageSmoothingEnabled = false
            styles.imageRendering = 'pixelated'
        }

        instance.emit('resized', _scale)

        if (!_animated) {
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

    if (_global) {
        if (root.__litecanvas) {
            throw 'global litecanvas already instantiated'
        }
        Object.assign(root, instance)
        root.__litecanvas = instance
    }

    setupCanvas()

    if ('loading' === document.readyState) {
        on(root, 'DOMContentLoaded', () => raf(init))
    } else {
        raf(init)
    }

    return instance
}
