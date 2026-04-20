// @ts-check
import { setupZzFX } from './zzfx.js'
import { defaultPalette } from './palette.js'
import { assert } from './dev.js'
import { version } from './version.js'

/**
 * The litecanvas constructor
 *
 * @param {LitecanvasOptions} [settings]
 * @returns {LitecanvasInstance}
 */
export default function litecanvas(settings = {}) {
    const /** @type {Window} */
        root = window,
        math = Math,
        perf = performance,
        TWO_PI = math.PI * 2,
        loggerPrefix = '[Litecanvas] ',
        raf = requestAnimationFrame,
        /** @type {Function[]} */
        _browserEventListeners = [],
        /** @type {(elem: EventTarget, evt: string, callback: (event: Event) => void) => void} */
        on = (elem, evt, callback) => {
            elem.addEventListener(evt, callback, false)
            _browserEventListeners.push(() => elem.removeEventListener(evt, callback, false))
        },
        /** @type {(str: string) => string} */
        lowerCase = (str) => str.toLowerCase(),
        /** @type {(ev: Event) => void} */
        preventDefault = (ev) => ev.preventDefault(),
        /** @type {(c: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D) => void} */
        beginPath = (c) => c.beginPath(),
        isNumber = Number.isFinite,
        zzfx = setupZzFX(root),
        /** @type {LitecanvasOptions} */
        defaults = {
            width: null,
            height: null,
            autoscale: true,
            canvas: null,
            global: true,
            loop: null,
            tapEvents: true,
            keyboardEvents: true,
        }

    // setup the settings default values
    settings = Object.assign(defaults, settings)

    let /** @type {boolean} */
        _initialized = false,
        /** @type {boolean} */
        _paused = true,
        /** @type {HTMLCanvasElement} _canvas */
        _canvas,
        /** @type {number} */
        _canvasScale = 1,
        /** @type {CanvasRenderingContext2D|OffscreenCanvasRenderingContext2D} */
        _ctx,
        /** @type {number} */
        _outline_fix = 0.5,
        /** @type {number} */
        _timeScale = 1,
        /** @type {number} */
        _lastFrameTime,
        /** @type {number} duration of a frame at 60 FPS (default) */
        _fpsInterval = 1000 / 60,
        /** @type {number} */
        _accumulated,
        /** @type {number?} */
        _rafid,
        /** @type {number} */
        _defaultTextColor = 3,
        /** @type {string} */
        _fontFamily = 'sans-serif',
        /** @type {number} */
        _fontSize = 20,
        /** @type {number} */
        _fontLineHeight = 1.2,
        /** @type {number} */
        _rngSeed = Date.now(),
        /** @type {string[]} */
        _colorPalette = defaultPalette,
        /** @type {number[]} */
        _colorPaletteState = [],
        /** @type {number[]} */
        _defaultSound = [0.5, 0, 1750, , , 0.3, 1, , , , 600, 0.1],
        /** @type {string} list of functions copied from `Math` module */
        _mathFunctions =
            'PI,sin,cos,atan2,hypot,tan,abs,ceil,floor,trunc,min,max,pow,sqrt,sign,exp',
        /**
         * @type {Object<string,Set<Function>>} game event listeners
         */
        _eventListeners = {}

    /** @type {LitecanvasInstance} */
    const instance = {
        /** @type {number} */
        W: 0,

        /** @type {number} */
        H: 0,

        /** @type {number} */
        T: 0,

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
            DEV: assert(isNumber(start), loggerPrefix + 'lerp() 1st param must be a number')
            DEV: assert(isNumber(end), loggerPrefix + 'lerp() 2nd param must be a number')
            DEV: assert(isNumber(t), loggerPrefix + 'lerp() 3rd param must be a number')

            return start + t * (end - start)
        },

        /**
         * Convert degrees to radians
         *
         * @param {number} degs
         * @returns {number} the value in radians
         */
        deg2rad: (degs) => {
            DEV: assert(isNumber(degs), 'deg2rad() 1st param must be a number')

            return (math.PI / 180) * degs
        },

        /**
         * Convert radians to degrees
         *
         * @param {number} rads
         * @returns {number} the value in degrees
         */
        rad2deg: (rads) => {
            DEV: assert(isNumber(rads), 'rad2deg() 1st param must be a number')

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
            DEV: assert(isNumber(n), loggerPrefix + 'round() 1st param must be a number')
            DEV: assert(
                isNumber(precision) && precision >= 0,
                loggerPrefix + 'round() 2nd param must be a positive number or zero'
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
            DEV: assert(isNumber(value), loggerPrefix + 'clamp() 1st param must be a number')
            DEV: assert(isNumber(min), loggerPrefix + 'clamp() 2nd param must be a number')
            DEV: assert(isNumber(max), loggerPrefix + 'clamp() 3rd param must be a number')
            DEV: assert(
                max >= min,
                loggerPrefix + 'clamp() the 2nd param must be less than the 3rd param'
            )

            if (value < min) return min
            if (value > max) return max
            return value
        },

        /**
         * Calculates the distance between a point (x1, y1) to another (x2, y2).
         *
         * @param {number} x1
         * @param {number} y1
         * @param {number} x2
         * @param {number} y2
         * @returns {number}
         */
        dist: (x1, y1, x2, y2) => {
            DEV: assert(isNumber(x1), loggerPrefix + 'dist() 1st param must be a number')
            DEV: assert(isNumber(y1), loggerPrefix + 'dist() 2nd param must be a number')
            DEV: assert(isNumber(x2), loggerPrefix + 'dist() 3rd param must be a number')
            DEV: assert(isNumber(y2), loggerPrefix + 'dist() 4th param must be a number')

            return math.hypot(x2 - x1, y2 - y1)
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
            DEV: assert(isNumber(value), loggerPrefix + 'wrap() 1st param must be a number')
            DEV: assert(isNumber(min), loggerPrefix + 'wrap() 2nd param must be a number')
            DEV: assert(isNumber(max), loggerPrefix + 'wrap() 3rd param must be a number')
            DEV: assert(
                max > min,
                loggerPrefix + 'wrap() the 2nd param must be less than the 3rd param'
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
            DEV: assert(isNumber(value), loggerPrefix + 'map() 1st param must be a number')
            DEV: assert(isNumber(start1), loggerPrefix + 'map() 2nd param must be a number')
            DEV: assert(isNumber(stop1), loggerPrefix + 'map() 3rd param must be a number')
            DEV: assert(isNumber(start2), loggerPrefix + 'map() 4th param must be a number')
            DEV: assert(isNumber(stop2), loggerPrefix + 'map() 5th param must be a number')
            DEV: assert(
                stop1 !== start1,
                loggerPrefix + 'map() the 2nd param must be different than the 3rd param'
            )

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
            DEV: assert(isNumber(value), loggerPrefix + 'norm() 1st param must be a number')
            DEV: assert(isNumber(start), loggerPrefix + 'norm() 2nd param must be a number')
            DEV: assert(isNumber(stop), loggerPrefix + 'norm() 3rd param must be a number')
            DEV: assert(
                start !== stop,
                loggerPrefix + 'norm() the 2nd param must be different than the 3rd param'
            )

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
            DEV: assert(isNumber(min), loggerPrefix + 'rand() 1st param must be a number')
            DEV: assert(isNumber(max), loggerPrefix + 'rand() 2nd param must be a number')
            DEV: assert(
                max >= min,
                loggerPrefix + 'rand() the 1st param must be less than the 2nd param'
            )

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
            DEV: assert(isNumber(min), loggerPrefix + 'randi() 1st param must be a number')
            DEV: assert(isNumber(max), loggerPrefix + 'randi() 2nd param must be a number')
            DEV: assert(
                max >= min,
                loggerPrefix + 'randi() the 1st param must be less than the 2nd param'
            )

            return ~~instance.rand(min, max + 1)
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
                isNumber(value) && value >= 0,
                loggerPrefix + 'rseed() 1st param must be a positive integer or zero'
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
                loggerPrefix + 'cls() 1st param must be a positive number or zero or undefined'
            )

            if (null == color) {
                _ctx.clearRect(0, 0, instance.W, instance.H)
            } else {
                instance.rectfill(0, 0, instance.W, instance.H, color)
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
            DEV: assert(isNumber(x), loggerPrefix + 'rect() 1st param must be a number')
            DEV: assert(isNumber(y), loggerPrefix + 'rect() 2nd param must be a number')
            DEV: assert(
                isNumber(width) && width > 0,
                loggerPrefix + 'rect() 3rd param must be a positive number'
            )
            DEV: assert(
                isNumber(height) && height >= 0,
                loggerPrefix + 'rect() 4th param must be a positive number or zero'
            )
            DEV: assert(
                null == color || (isNumber(color) && color >= 0),
                loggerPrefix + 'rect() 5th param must be a positive number or zero'
            )
            DEV: assert(
                null == radii || isNumber(radii) || (Array.isArray(radii) && radii.length >= 1),
                loggerPrefix + 'rect() 6th param must be a number or array of numbers'
            )

            beginPath(_ctx)
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
            DEV: assert(isNumber(x), loggerPrefix + 'rectfill() 1st param must be a number')
            DEV: assert(isNumber(y), loggerPrefix + 'rectfill() 2nd param must be a number')
            DEV: assert(
                isNumber(width) && width >= 0,
                loggerPrefix + 'rectfill() 3rd param must be a positive number or zero'
            )
            DEV: assert(
                isNumber(height) && height >= 0,
                loggerPrefix + 'rectfill() 4th param must be a positive number or zero'
            )
            DEV: assert(
                null == color || (isNumber(color) && color >= 0),
                loggerPrefix + 'rectfill() 5th param must be a positive number or zero'
            )
            DEV: assert(
                null == radii || isNumber(radii) || (Array.isArray(radii) && radii.length >= 1),
                loggerPrefix +
                    'rectfill() 6th param must be a number or array of at least 2 numbers'
            )

            beginPath(_ctx)
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
            DEV: assert(isNumber(x), loggerPrefix + 'circ() 1st param must be a number')
            DEV: assert(isNumber(y), loggerPrefix + 'circ() 2nd param must be a number')
            DEV: assert(
                isNumber(radius) && radius >= 0,
                loggerPrefix + 'circ() 3rd param must be a positive number or zero'
            )
            DEV: assert(
                null == color || (isNumber(color) && color >= 0),
                loggerPrefix + 'circ() 4th param must be a positive number or zero'
            )

            beginPath(_ctx)
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
            DEV: assert(isNumber(x), loggerPrefix + 'circfill() 1st param must be a number')
            DEV: assert(isNumber(y), loggerPrefix + 'circfill() 2nd param must be a number')
            DEV: assert(
                isNumber(radius) && radius >= 0,
                loggerPrefix + 'circfill() 3rd param must be a positive number or zero'
            )
            DEV: assert(
                null == color || (isNumber(color) && color >= 0),
                loggerPrefix + 'circfill() 4th param must be a positive number or zero'
            )

            beginPath(_ctx)
            _ctx.arc(~~x, ~~y, ~~radius, 0, TWO_PI)
            instance.fill(color)
        },

        /**
         * Draw a ellipse outline
         *
         * @param {number} x
         * @param {number} y
         * @param {number} radiusX
         * @param {number} radiusY
         * @param {number} [color=0] the color index
         */
        oval(x, y, radiusX, radiusY, color) {
            DEV: assert(isNumber(x), loggerPrefix + 'oval() 1st param must be a number')
            DEV: assert(isNumber(y), loggerPrefix + 'oval() 2nd param must be a number')
            DEV: assert(
                isNumber(radiusX) && radiusX >= 0,
                loggerPrefix + 'oval() 3rd param must be a positive number or zero'
            )
            DEV: assert(
                isNumber(radiusY) && radiusY >= 0,
                loggerPrefix + 'oval() 4th param must be a positive number or zero'
            )
            DEV: assert(
                null == color || (isNumber(color) && color >= 0),
                loggerPrefix + 'oval() 5th param must be a positive number or zero'
            )

            beginPath(_ctx)
            _ctx.ellipse(~~x, ~~y, ~~radiusX, ~~radiusY, 0, 0, TWO_PI)
            instance.stroke(color)
        },

        /**
         * Draw a color-filled ellipse
         *
         * @param {number} x
         * @param {number} y
         * @param {number} radiusX
         * @param {number} radiusY
         * @param {number} [color=0] the color index
         */
        ovalfill(x, y, radiusX, radiusY, color) {
            DEV: assert(isNumber(x), loggerPrefix + 'ovalfill() 1st param must be a number')
            DEV: assert(isNumber(y), loggerPrefix + 'ovalfill() 2nd param must be a number')
            DEV: assert(
                isNumber(radiusX) && radiusX >= 0,
                loggerPrefix + 'ovalfill() 3rd param must be a positive number or zero'
            )
            DEV: assert(
                isNumber(radiusY) && radiusY >= 0,
                loggerPrefix + 'ovalfill() 4th param must be a positive number or zero'
            )
            DEV: assert(
                null == color || (isNumber(color) && color >= 0),
                loggerPrefix + 'ovalfill() 5th param must be a positive number or zero'
            )

            beginPath(_ctx)
            _ctx.ellipse(~~x, ~~y, ~~radiusX, ~~radiusY, 0, 0, TWO_PI)
            instance.fill(color)
        },

        /**
         * Make a custom shape in the canvas context.
         * Then, just use `fill` or `stroke` to draw the shape.
         *
         * @param {number[]} points an array of Xs and Ys coordinates
         */
        shape(points) {
            DEV: assert(
                Array.isArray(points),
                loggerPrefix + 'shape() 1st param must be an array of numbers'
            )
            DEV: assert(
                points.length >= 6,
                loggerPrefix +
                    'shape() 1st param must be an array with at least 6 numbers (3 points)'
            )
            beginPath(_ctx)
            for (let i = 0; i < points.length; i += 2) {
                if (0 === i) {
                    _ctx.moveTo(~~points[i], ~~points[i + 1])
                } else {
                    _ctx.lineTo(~~points[i], ~~points[i + 1])
                }
            }
            _ctx.lineTo(~~points[0], ~~points[1])
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
            DEV: assert(isNumber(x1), loggerPrefix + 'line() 1st param must be a number')
            DEV: assert(isNumber(y1), loggerPrefix + 'line() 2nd param must be a number')
            DEV: assert(
                isNumber(x2),
                loggerPrefix + 'line() 3rd param must be a positive number or zero'
            )
            DEV: assert(
                isNumber(y2),
                loggerPrefix + 'line() 4th param must be a positive number or zero'
            )
            DEV: assert(
                null == color || (isNumber(color) && color >= 0),
                loggerPrefix + 'line() 5th param must be a positive number or zero'
            )

            beginPath(_ctx)

            let xfix = _outline_fix !== 0 && ~~x1 === ~~x2 ? 0.5 : 0
            let yfix = _outline_fix !== 0 && ~~y1 === ~~y2 ? 0.5 : 0

            _ctx.moveTo(~~x1 + xfix, ~~y1 + yfix)
            _ctx.lineTo(~~x2 + xfix, ~~y2 + yfix)

            instance.stroke(color)
        },

        /**
         * Sets the thickness of the lines
         *
         * @param {number} value
         * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineWidth
         */
        linewidth(value) {
            DEV: assert(
                isNumber(value) && value >= 0,
                loggerPrefix + 'linewidth() 1st param must be a positive number or zero'
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
                loggerPrefix + 'linedash() 1st param must be an array of numbers'
            )
            DEV: assert(isNumber(offset), loggerPrefix + 'linedash() 2nd param must be a number')

            _ctx.setLineDash(segments)
            _ctx.lineDashOffset = offset
        },

        /** TEXT RENDERING API */
        /**
         * Draw text. You can use `\n` to break lines.
         *
         * @param {number} x
         * @param {number} y
         * @param {string} message the text message
         * @param {number} [color] the color index
         * @param {string} [fontStyle] can be "normal" (default), "italic" and/or "bold".
         */
        text(x, y, message, color = _defaultTextColor, fontStyle = 'normal') {
            DEV: assert(isNumber(x), loggerPrefix + 'text() 1st param must be a number')
            DEV: assert(isNumber(y), loggerPrefix + 'text() 2nd param must be a number')
            DEV: assert(
                null == color || (isNumber(color) && color >= 0),
                loggerPrefix + 'text() 4th param must be a positive number or zero'
            )
            DEV: assert(
                'string' === typeof fontStyle,
                loggerPrefix + 'text() 5th param must be a string'
            )

            _ctx.font = `${fontStyle} ${_fontSize}px ${_fontFamily}`
            _ctx.fillStyle = getColor(color)

            const messages = ('' + message).split('\n')
            for (let i = 0; i < messages.length; i++) {
                _ctx.fillText(messages[i], ~~x, ~~y + _fontSize * _fontLineHeight * i)
            }
        },

        /**
         * Sets the height ratio of the text lines based on current text size.
         *
         * Default = `1.2`
         *
         * @param {number} value
         */
        textgap(value) {
            DEV: assert(isNumber(value), loggerPrefix + 'textgap() 1st param must be a number')
            _fontLineHeight = value
        },

        /**
         * Set the font family
         *
         * @param {string} family
         */
        textfont(family) {
            DEV: assert(
                'string' === typeof family,
                loggerPrefix + 'textfont() 1st param must be a string'
            )

            _fontFamily = family
        },

        /**
         * Set the font size
         *
         * @param {number} size
         */
        textsize(size) {
            DEV: assert(isNumber(size), loggerPrefix + 'textsize() 1st param must be a number')

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
                loggerPrefix +
                    'textalign() 1st param must be null or one of the following strings: center, left, right, start or end.'
            )
            DEV: assert(
                null == baseline ||
                    ['top', 'bottom', 'middle', 'hanging', 'alphabetic', 'ideographic'].includes(
                        baseline
                    ),
                loggerPrefix +
                    'textalign() 2nd param must be null or one of the following strings: middle, top, bottom, hanging, alphabetic or ideographic.'
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
         * @param {CanvasImageSource} source
         */
        image(x, y, source) {
            DEV: assert(isNumber(x), loggerPrefix + 'image() 1st param must be a number')
            DEV: assert(isNumber(y), loggerPrefix + 'image() 2nd param must be a number')

            _ctx.drawImage(source, ~~x, ~~y)
        },

        /**
         * Draw a sprite pixel by pixel represented by a string. Each pixel must be a base 36 number (0-9 or a-z) or a dot.
         *
         * @param {number} x
         * @param {number} y
         * @param {string} pixels
         */
        spr(x, y, pixels) {
            DEV: assert(isNumber(x), loggerPrefix + 'spr() 1st param must be a number')
            DEV: assert(isNumber(y), loggerPrefix + 'spr() 2nd param must be a number')
            DEV: assert(
                'string' === typeof pixels,
                loggerPrefix + 'spr() 3rd param must be a string'
            )

            const rows = pixels.trim().split('\n')

            for (let row = 0; row < rows.length; row++) {
                const chars = rows[row].trim()
                for (let col = 0; col < chars.length; col++) {
                    const char = chars[col]
                    if (char !== '.' && char !== ' ') {
                        instance.rectfill(x + col, y + row, 1, 1, parseInt(char, 36) || 0)
                    }
                }
            }
        },

        /**
         * Draw in an OffscreenCanvas and returns its image.
         *
         * @param {number} width
         * @param {number} height
         * @param {drawCallback} callback
         * @param {object} [options]
         * @param {number} [options.scale=1]
         * @param {OffscreenCanvas} [options.canvas]
         * @returns {ImageBitmap}
         * @see https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas
         */
        paint(width, height, callback, options = {}) {
            DEV: assert(
                isNumber(width) && width >= 1,
                loggerPrefix + 'paint() 1st param must be a positive number'
            )
            DEV: assert(
                isNumber(height) && height >= 1,
                loggerPrefix + 'paint() 2nd param must be a positive number'
            )
            DEV: assert(
                'function' === typeof callback,
                loggerPrefix + 'paint() 3rd param must be a function'
            )
            DEV: assert(
                (options && null == options.scale) ||
                    (isNumber(options.scale) && options.scale > 0),
                loggerPrefix + 'paint() 4th param (options.scale) must be a positive number'
            )
            DEV: assert(
                (options && null == options.canvas) || options.canvas instanceof OffscreenCanvas,
                loggerPrefix + 'paint() 4th param (options.canvas) must be an OffscreenCanvas'
            )

            const /** @type {OffscreenCanvas} */
                canvas = options.canvas || new OffscreenCanvas(1, 1),
                scale = options.scale || 1,
                currentContext = _ctx // context backup

            canvas.width = width * scale
            canvas.height = height * scale

            _ctx = canvas.getContext('2d')
            _ctx.scale(scale, scale)
            callback(_ctx)

            _ctx = currentContext // restore the context

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
            DEV: assert(
                null == context ||
                    context instanceof CanvasRenderingContext2D ||
                    context instanceof OffscreenCanvasRenderingContext2D,
                loggerPrefix + 'ctx() 1st param must be an [Offscreen]CanvasRenderingContext2D'
            )

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
        push() {
            _ctx.save()
        },

        /**
         * restores the drawing style settings and transformations
         *
         * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/restore
         */
        pop() {
            _ctx.restore()
        },

        /**
         * Adds a translation to the transformation matrix.
         *
         * @param {number} x
         * @param {number} y
         */
        translate(x, y) {
            DEV: assert(isNumber(x), loggerPrefix + 'translate() 1st param must be a number')
            DEV: assert(isNumber(y), loggerPrefix + 'translate() 2nd param must be a number')

            _ctx.translate(~~x, ~~y)
        },

        /**
         * Adds a scaling transformation to the canvas units horizontally and/or vertically.
         *
         * @param {number} x
         * @param {number} [y]
         */
        scale(x, y = x) {
            DEV: assert(isNumber(x), loggerPrefix + 'scale() 1st param must be a number')
            DEV: assert(isNumber(y), loggerPrefix + 'scale() 2nd param must be a number')

            _ctx.scale(x, y)
        },

        /**
         * Adds a rotation to the transformation matrix.
         *
         * @param {number} radians
         */
        rotate(radians) {
            DEV: assert(isNumber(radians), loggerPrefix + 'rotate() 1st param must be a number')

            _ctx.rotate(radians)
        },

        /**
         * Sets the alpha (opacity) value to apply when drawing new shapes and images
         *
         * @param {number} value float from 0 to 1 (e.g: 0.5 = 50% transparent)
         * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalAlpha
         */
        alpha(value) {
            DEV: assert(isNumber(value), loggerPrefix + 'alpha() 1st param must be a number')

            _ctx.globalAlpha = instance.clamp(value, 0, 1)
        },

        /**
         * Fills the current path with a given color.
         *
         * @param {number} [color=0]
         */
        fill(color) {
            DEV: assert(
                null == color || (isNumber(color) && color >= 0),
                loggerPrefix + 'fill() 1st param must be a positive number or zero'
            )

            _ctx.fillStyle = getColor(color)
            _ctx.fill()
        },

        /**
         * Outlines the current path with a given color.
         *
         * @param {number} [color=0]
         */
        stroke(color) {
            DEV: assert(
                null == color || (isNumber(color) && color >= 0),
                loggerPrefix + 'stroke() 1st param must be a positive number or zero'
            )

            _ctx.strokeStyle = getColor(color)
            _ctx.stroke()
        },

        /**
         * Turns a path (in the callback) into the current clipping region.
         *
         * @param {clipCallback} callback
         * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clip
         */
        clip(callback) {
            DEV: assert(
                'function' === typeof callback,
                loggerPrefix + 'clip() 1st param must be a function (ctx) => void'
            )

            beginPath(_ctx)
            callback(_ctx)
            _ctx.clip()
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
                loggerPrefix + 'sfx() 1st param must be an array'
            )
            DEV: assert(isNumber(pitchSlide), loggerPrefix + 'sfx() 2nd param must be a number')
            DEV: assert(isNumber(volumeFactor), loggerPrefix + 'sfx() 3rd param must be a number')

            if (
                !root.zzfxV ||
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
            DEV: assert(
                isNumber(value) && value >= 0,
                loggerPrefix + 'volume() 1st param must be a positive number or zero'
            )

            root.zzfxV = value
        },

        /** PLUGINS API */
        /**
         * Returns the canvas
         *
         * @returns {HTMLCanvasElement}
         */
        canvas: () => _canvas,

        /**
         * Loads a Litecanvas plugin
         *
         * @param {pluginCallback} callback
         * @param {object} [config]
         */
        use(callback, config = {}) {
            DEV: assert(
                'function' === typeof callback,
                loggerPrefix + 'use() 1st param must be a function (instance, config) => any'
            )
            DEV: assert(
                'object' === typeof config,
                loggerPrefix + 'use() 2nd param must be an object'
            )

            loadPlugin(callback, config)
        },

        /**
         * Add a game event listener.
         *
         * @param {string} eventName the event type name
         * @param {Function} callback the function that is called when the event occurs
         */
        listen: (eventName, callback) => {
            DEV: assert(
                'string' === typeof eventName,
                loggerPrefix + 'listen() 1st param must be a string'
            )
            DEV: assert(
                'function' === typeof callback,
                loggerPrefix + 'listen() 2nd param must be a function'
            )

            eventName = lowerCase(eventName)

            _eventListeners[eventName] = _eventListeners[eventName] || new Set()
            _eventListeners[eventName].add(callback)
        },

        /**
         * Remove a game event listener.
         *
         * @param {string} eventName the event type name
         * @param {Function} callback the function that is called when the event occurs
         */
        unlisten: (eventName, callback) => {
            DEV: assert(
                'string' === typeof eventName,
                loggerPrefix + 'unlisten() 1st param must be a string'
            )
            DEV: assert(
                'function' === typeof callback,
                loggerPrefix + 'unlisten() 2nd param must be a function'
            )

            eventName = lowerCase(eventName)

            if (_eventListeners[eventName]) {
                _eventListeners[eventName].delete(callback)
            }
        },

        /**
         * Call all listeners attached to a game event.
         *
         * Note: when the `litecanvas()` "loop" option is `null` (default),
         * `emit()` will first call a global function matching the event name (if it exists).
         * E.g: `emit("boom")` calls `window.boom()`.
         *
         * @param {string} eventName The event type name
         * @param {any} [arg1] any data to be passed over the listeners
         * @param {any} [arg2] any data to be passed over the listeners
         * @param {any} [arg3] any data to be passed over the listeners
         * @param {any} [arg4] any data to be passed over the listeners
         * @returns {any} always returns the second argument
         */
        emit(eventName, arg1, arg2, arg3, arg4) {
            DEV: assert(
                'string' === typeof eventName,
                loggerPrefix + 'emit() 1st param must be a string'
            )

            if (_initialized) {
                eventName = lowerCase(eventName)

                triggerEvent('before:' + eventName, arg1, arg2, arg3, arg4)

                // if the "loop" option not exists,
                // calls a global function with the same name as the event,
                // as long as it's not a global litecanvas function (to avoid infinite loops)
                if (
                    !settings.loop &&
                    root[eventName] !== instance[eventName] &&
                    'function' === typeof root[eventName] /* if is a function */
                ) {
                    root[eventName](arg1, arg2, arg3, arg4)
                }

                triggerEvent(eventName, arg1, arg2, arg3, arg4)

                triggerEvent('after:' + eventName, arg1, arg2, arg3, arg4)
            }

            return arg1
        },

        /**
         * Set new palette colors or restore the default palette.
         *
         * @param {string[]} [colors] an array of colors
         * @param {number} [textColor] the default text color this palette
         */
        pal(colors, textColor = 3) {
            DEV: assert(
                null == colors || (Array.isArray(colors) && colors.length > 0),
                loggerPrefix + 'pal() 1st param must be a array of color strings'
            )
            DEV: assert(
                isNumber(textColor) && textColor >= 0,
                loggerPrefix + 'pal() 2nd param must be a positive number or zero'
            )

            _colorPalette = colors || defaultPalette
            _colorPaletteState = []
            _defaultTextColor = textColor

            instance.emit('pal', _colorPalette, _defaultTextColor)
        },

        /**
         * Replace the color "a" with color "b".
         *
         * If called without arguments, reset the current palette.
         *
         * Note: `palc()` don't affect drawings made with `image()`.
         *
         * @param {number?} a
         * @param {number?} b
         */
        palc(a, b) {
            DEV: assert(
                null == a || (isNumber(a) && a >= 0),
                loggerPrefix + 'palc() 1st param must be a positive number'
            )
            DEV: assert(
                isNumber(a) ? isNumber(b) && b >= 0 : null == b,
                loggerPrefix + 'palc() 2nd param must be a positive number'
            )

            if (a == null) {
                _colorPaletteState = []
            } else {
                _colorPaletteState[a] = b
            }
        },

        /**
         * Define or update a instance property.
         *
         * Note: when the `litecanvas()` option "global" is `true` (default),
         * `def()` with set/update a window property.
         *
         * E.g: `def('ONE', 1)` do `window.ONE = 1`.
         *
         * @param {string} key the property name
         * @param {any} value the property value
         */
        def(key, value) {
            DEV: assert('string' === typeof key, loggerPrefix + 'def() 1st param must be a string')
            DEV: if (null == value) {
                console.warn(
                    loggerPrefix +
                        `def() changed the key "${key}" to null (previous value was ${instance[key]})`
                )
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
                loggerPrefix + 'timescale() 1st param must be a positive number or zero'
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
                loggerPrefix + 'framerate() 1st param must be a positive number'
            )

            _fpsInterval = 1000 / ~~value
        },

        /**
         * Returns information about the engine instance.
         *
         * @param {number} index
         * @returns {any}
         */
        stat(index) {
            DEV: assert(isNumber(index), loggerPrefix + 'stat() 1st param must be a number')

            const internals = [
                // 0
                settings,

                // 1
                _initialized,

                // 2
                _fpsInterval / 1000,

                // 3
                _canvasScale,

                // 4
                _eventListeners,

                // 5
                _colorPalette,

                // 6
                _defaultSound,

                // 7
                _timeScale,

                // 8
                root.zzfxV,

                // 9
                _rngSeed,

                // 10
                _fontSize,

                // 11
                _fontFamily,

                // 12
                _colorPaletteState,

                // 13
                _fontLineHeight,
            ]

            DEV: assert(
                index >= 0 && index < internals.length,
                loggerPrefix +
                    'stat() 1st param must be a number between 0 and ' +
                    (internals.length - 1)
            )

            return internals[index]
        },

        /**
         * Pauses the engine loop (update & draw).
         */
        pause() {
            if (!_paused) {
                _paused = true
                cancelAnimationFrame(_rafid)
                instance.emit('paused')
            }
        },

        /**
         * Resumes (if paused) the engine loop.
         */
        resume() {
            DEV: assert(
                _initialized,
                loggerPrefix +
                    'resume() cannot be called before the "init" event and neither after the quit() function'
            )
            if (_initialized && _paused) {
                _paused = false
                _accumulated = _fpsInterval
                _lastFrameTime = perf.now()
                _rafid = raf(drawFrame)
                instance.emit('resumed')
            }
        },

        /**
         * Returns `true` if the engine loop is paused.
         *
         * @returns {boolean}
         */
        ispaused() {
            return _paused
        },

        /**
         * Shutdown the litecanvas instance and remove all event listeners.
         */
        quit() {
            // emit "quit" event to manual clean ups
            instance.emit('quit')

            // stop the game loop (update & draw)
            instance.pause()

            // deinitialize the engine
            _initialized = false

            // clear all engine event listeners
            _eventListeners = {}

            // clear all browser event listeners
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

            DEV: console.warn(loggerPrefix + 'quit() terminated a Litecanvas instance.')
        },
    }

    // prettier-ignore
    for (const k of _mathFunctions.split(',')) {
        // import native Math functions
        instance[k] = math[k]
    }

    function init() {
        // listen window resize event when "autoscale" is enabled
        if (settings.autoscale) {
            on(root, 'resize', resizeCanvas)
        }

        // default mouse/touch handlers
        if (settings.tapEvents) {
            const _getXY =
                    /**
                     * @param {MouseEvent | Touch} ev
                     */
                    (ev) => [
                        (ev.pageX - _canvas.offsetLeft) / _canvasScale,
                        (ev.pageY - _canvas.offsetTop) / _canvasScale,
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
                            // current x
                            x,
                            // current y
                            y,
                            // initial x
                            xi: x,
                            // initial y
                            yi: y,
                            // timestamp
                            t: perf.now(),
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
                     * @param {{t: number}} tap
                     */
                    (tap) => tap && perf.now() - tap.t <= 300

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
                        const [x, y] = _getXY(ev)
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
                        const [x, y] = _getXY(ev)
                        if (_checkTapped(tap)) {
                            instance.emit('tapped', tap.xi, tap.yi, 0)
                        }
                        instance.emit('untap', x, y, 0)
                        _taps.delete(0)
                        _pressingMouse = false
                    }
                }
            )

            on(
                root,
                'mousemove',
                /**
                 * @param {MouseEvent} ev
                 */
                (ev) => {
                    preventDefault(ev)

                    const [x, y] = _getXY(ev)
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
                        const [x, y] = _getXY(touch)
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
                        const [x, y] = _getXY(touch)
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
                        instance.emit('tapped', tap.xi, tap.yi, id)
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
            const _keysDown = new Set()

            /** @type {Set<string>} */
            const _keysPress = new Set()

            /**
             * @param {Set<string>} keySet
             * @param {string} [key]
             * @returns {boolean}
             */
            const keyCheck = (keySet, key = '') => {
                key = lowerCase(key)
                return !key ? keySet.size > 0 : keySet.has('space' === key ? ' ' : key)
            }

            /** @type {string} */
            let _lastKey = ''

            on(root, 'keydown', (/** @type {KeyboardEvent} */ event) => {
                const key = lowerCase(event.key)
                if (!_keysDown.has(key)) {
                    _keysDown.add(key)
                    _keysPress.add(key)
                    _lastKey = key === ' ' ? 'space' : key
                }
            })

            on(root, 'keyup', (/** @type {KeyboardEvent} */ event) => {
                _keysDown.delete(lowerCase(event.key))
            })

            on(root, 'blur', () => _keysDown.clear())
            instance.listen('after:update', () => _keysPress.clear())

            instance.def(
                'iskeydown',
                /**
                 * @param {string} [key]
                 * @returns {boolean}
                 */
                (key) => {
                    DEV: assert(
                        null == key || 'string' === typeof key,
                        loggerPrefix + 'iskeydown() 1st param must be a string or undefined'
                    )
                    return keyCheck(_keysDown, key)
                }
            )

            instance.def(
                'iskeypressed',
                /**
                 * @param {string} [key]
                 * @returns {boolean}
                 */
                (key) => {
                    DEV: assert(
                        null == key || 'string' === typeof key,
                        loggerPrefix + 'iskeypressed() 1st param must be a string or undefined'
                    )
                    return keyCheck(_keysPress, key)
                }
            )

            instance.def(
                'lastkey',
                /**
                 * @returns {string}
                 */
                () => _lastKey
            )
        }

        // start the engine
        _initialized = true
        instance.resume()
        instance.emit('init', instance)
    }

    function drawFrame() {
        // request the next frame
        _rafid = raf(drawFrame)

        let now = perf.now()
        let updated = 0
        let frameTime = now - _lastFrameTime

        _lastFrameTime = now
        _accumulated += frameTime < 100 ? frameTime : _fpsInterval

        while (_accumulated >= _fpsInterval) {
            updated++
            _accumulated -= _fpsInterval

            let dt = (_fpsInterval / 1000) * _timeScale

            instance.emit('update', dt, updated)
            instance.def('T', instance.T + dt)
        }

        if (updated) {
            instance.emit('draw', _ctx)
            if (updated > 1) {
                _accumulated = 0
                DEV: console.warn(
                    loggerPrefix +
                        'the last frame updated ' +
                        updated +
                        ' times. This can drop the FPS if it keeps happening.'
                )
            }
        }
    }

    function setupCanvas() {
        if ('string' === typeof settings.canvas) {
            _canvas = document.querySelector(settings.canvas)
            DEV: assert(
                null != _canvas,
                loggerPrefix + 'litecanvas() option "canvas" is an invalid CSS selector'
            )
        } else {
            _canvas = settings.canvas
        }

        _canvas = _canvas || document.createElement('canvas')

        DEV: assert(
            _canvas instanceof HTMLElement && 'CANVAS' === _canvas.tagName,
            loggerPrefix +
                'litecanvas() option "canvas" should be a canvas element or string (CSS selector of a canvas)'
        )

        _ctx = _canvas.getContext('2d')

        on(_canvas, 'click', () => focus())

        resizeCanvas()

        if (!_canvas.parentNode) {
            document.body.appendChild(_canvas)
        }

        _canvas.style.imageRendering = 'pixelated'

        // disable default browser's right click in canvas
        _canvas.oncontextmenu = () => false
    }

    function resizeCanvas() {
        DEV: assert(
            null == settings.width || (isNumber(settings.width) && settings.width > 0),
            loggerPrefix + 'litecanvas() option "width" should be a positive number when defined'
        )
        DEV: assert(
            null == settings.height || (isNumber(settings.height) && settings.height > 0),
            loggerPrefix + 'litecanvas() option "height" should be a positive number when defined'
        )
        DEV: assert(
            null == settings.height || (settings.width > 0 && settings.height > 0),
            loggerPrefix +
                'litecanvas() option "width" is required when the option "height" is defined'
        )

        const width = settings.width > 0 ? settings.width : innerWidth,
            height = settings.width > 0 ? settings.height || settings.width : innerHeight

        instance.def('W', width)
        instance.def('H', height)

        _canvas.width = width
        _canvas.height = height

        if (settings.autoscale) {
            let maxScale = +settings.autoscale
            if (!_canvas.style.display) {
                _canvas.style.display = 'block'
                _canvas.style.margin = 'auto'
            }

            _canvasScale = math.min(innerWidth / width, innerHeight / height)
            _canvasScale = maxScale > 1 && _canvasScale > maxScale ? maxScale : _canvasScale

            _canvas.style.width = width * _canvasScale + 'px'
            _canvas.style.height = height * _canvasScale + 'px'
        }

        // set canvas image rendering properties
        _ctx.imageSmoothingEnabled = false

        // set the default text align and baseline
        instance.textalign('start', 'top')

        // trigger "resized" event
        // note: not triggered before the "init" event
        instance.emit('resized', _canvasScale)
    }

    /**
     * @param {string} eventName
     * @param {any} [arg1]
     * @param {any} [arg2]
     * @param {any} [arg3]
     * @param {any} [arg4]
     */
    function triggerEvent(eventName, arg1, arg2, arg3, arg4) {
        if (_eventListeners[eventName]) {
            for (const callback of _eventListeners[eventName]) {
                callback(arg1, arg2, arg3, arg4)
            }
        }
    }

    /**
     * @param {pluginCallback} callback
     * @param {any} config
     */
    function loadPlugin(callback, config) {
        const pluginData = callback(instance, config)

        DEV: assert(
            null == pluginData || 'object' === typeof pluginData,
            loggerPrefix + 'litecanvas() plugins should return an object or nothing'
        )

        for (const key in pluginData) {
            instance.def(key, pluginData[key])
        }
    }

    /**
     * @param {number} index
     * @returns {string}
     */
    function getColor(index) {
        const i = _colorPaletteState[index] ?? index
        return _colorPalette[~~i % _colorPalette.length]
    }

    if (settings.global) {
        if (root.ENGINE) {
            throw new Error('only one global litecanvas is allowed')
        }
        Object.assign(root, instance)
        root.ENGINE = instance
    }

    DEV: console.info(loggerPrefix + `version ${version} started`)
    DEV: console.debug(loggerPrefix + `litecanvas() options =`, settings)

    // setup the canvas
    setupCanvas()

    // setup default event listeners
    if (settings.loop) {
        for (const eventName in settings.loop) {
            if (settings.loop[eventName]) instance.listen(eventName, settings.loop[eventName])
        }
    }

    // init the engine (async)
    _rafid = raf(init)

    return instance
}
