import { zzfx } from './zzfx.js'
import { colors } from './palette.js'
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
        /** @type {(elem:HTMLElement, evt:string, callback:(event:Event)=>void)=>void} */
        on = (elem, evt, callback) => elem.addEventListener(evt, callback),
        /** @type {LitecanvasOptions} */
        defaults = {
            fps: 60,
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
        /** @type {function[]} */
        _plugins = [],
        /** @type {HTMLCanvasElement|string} _canvas */
        _canvas = settings.canvas || document.createElement('canvas'),
        /** @type {boolean} */
        _fullscreen = settings.fullscreen,
        /** @type {boolean} */
        _autoscale = settings.autoscale,
        /** @type {boolean} */
        _animate = settings.animate,
        /** @type {number} */
        _scale = 1,
        /** @type {CanvasRenderingContext2D} */
        _ctx,
        /** @type {number} */
        _timeScale = 1,
        /** @type {number} */
        _lastFrame,
        /** @type {number} */
        _step,
        /** @type {number} */
        _stepMs,
        /** @type {number} */
        _accumulated = 0,
        /** @type {number} */
        _focused = true,
        /** @type {number} */
        _drawCount = 0,
        /** @type {number} */
        _drawTime = 0,
        /** @type {string} */
        _fontFamily = 'sans-serif',
        /** @type {string} */
        _fontStyle = '',
        /** @type {number} */
        _fontSize = 32,
        /** @type {number} */
        _rng_seed = Date.now(),
        /**
         * default game events
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
        WIDTH: settings.width,

        /** @type {number} */
        HEIGHT: settings.height || settings.width,

        /** @type {HTMLCanvasElement} */
        CANVAS: null,

        /** @type {number} */
        ELAPSED: 0,

        /** @type {number} */
        FPS: settings.fps,

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
         * The value of the mathematical constant PI (π).
         * Approximately 3.14159
         *
         * @type {number}
         */
        PI,

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
        HALF_PI: PI * 0.5,

        /**
         * Calculates a linear (interpolation) value over t%.
         *
         * @param {number} start
         * @param {number} end
         * @param {number} t The progress in percentage, where 0 = 0% and 1 = 100%.
         * @returns {number} The unterpolated value
         * @tutorial https://gamedev.net/tutorials/programming/general-and-gameplay-programming/a-brief-introduction-to-lerp-r4954/
         */
        lerp: (start, end, t) => start + t * (end - start),

        /**
         * Convert degrees to radians
         *
         * @param {number} degs
         * @returns {number} the value in radians
         */
        deg2rad: (degs) => (PI / 180) * degs,

        /**
         * Convert radians to degrees
         *
         * @param {number} rads
         * @returns {number} the value in degrees
         */
        rad2deg: (rads) => (180 / PI) * rads,

        /**
         * Constrains a number between `min` and `max`.
         *
         * @param {number} value
         * @param {number} min
         * @param {number} max
         * @returns {number}
         */
        clamp: (value, min, max) => {
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
        wrap: (value, min, max) =>
            value - (max - min) * Math.floor((value - min) / (max - min)),

        /**
         * Re-maps a number from one range to another.
         *
         * @param {number} value  the value to be remapped.
         * @param {number} min1 lower bound of the value's current range.
         * @param {number} max1  upper bound of the value's current range.
         * @param {number} min2 lower bound of the value's target range.
         * @param {number} max2  upper bound of the value's target range.
         * @param {boolean} [withinBounds=false] constrain the value to the newly mapped range
         * @returns {number} the remapped number
         */
        map(value, min1, max1, min2, max2, withinBounds = false) {
            // prettier-ignore
            const result = ((value - min1) / (max1 - min1)) * (max2 - min2) + min2
            return !withinBounds ? result : instance.clamp(result, min2, max2)
        },

        /**
         * Maps a number from one range to a value between 0 and 1.
         * Identical to `map(value, min, max, 0, 1)`.
         * Note: Numbers outside the range are not clamped to 0 and 1.
         *
         * @param {number} value
         * @param {number} min
         * @param {number} min
         * @returns {number} the normalized number.
         */
        norm: (value, min, max) => instance.map(value, min, max, 0, 1),

        /** RNG API */
        /**
         * Generates a pseudorandom float between min (inclusive) and max (exclusive)
         * using the  Linear Congruential Generator (LCG) algorithm.
         *
         * @param {number} [min=0.0]
         * @param {number} [max=1.0]
         * @returns {number} the random number
         */
        rand: (min = 0.0, max = 1.0) => {
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
        randi: (min = 0, max = 1) =>
            instance.floor(instance.rand(min, max + 1)),

        /**
         * If a value is passed, initializes the random number generator with an explicit seed value.
         * Otherwise, returns the current seed state.
         *
         * @param {number} value
         * @returns {number} the seed state
         */
        seed: (value) => {
            return null == value ? _rng_seed : (_rng_seed = ~~value)
        },

        /** BASIC GRAPHICS API */
        /**
         * Clear the game screen
         *
         * @param {number|null} color The background color (from 0 to 7) or null (for transparent)
         */
        cls(color) {
            if (null == color) {
                _ctx.clearRect(0, 0, instance.WIDTH, instance.HEIGHT)
            } else {
                instance.rectfill(0, 0, instance.WIDTH, instance.HEIGHT, color)
            }
        },

        /**
         * Draw a rectangle outline
         *
         * @param {number} x
         * @param {number} y
         * @param {number} width
         * @param {number} height
         * @param {number} [color=0] the color index (generally from 0 to 7)
         * @param {number|number[]} [radii] A number or list specifying the radii used to draw a rounded-borders rectangle
         */
        rect(x, y, width, height, color = 0, radii = null) {
            _ctx.beginPath()
            _ctx[radii ? 'roundRect' : 'rect'](~~x, ~~y, width, height, radii)
            instance.stroke(color)
        },

        /**
         * Draw a color-filled rectangle
         *
         * @param {number} x
         * @param {number} y
         * @param {number} width
         * @param {number} height
         * @param {number} [color=0] the color index (generally from 0 to 7)
         * @param {number|number[]} [radii] A number or list specifying the radii used to draw a rounded-borders rectangle
         */
        rectfill(x, y, width, height, color = 0, radii = null) {
            _ctx.beginPath()
            _ctx[radii ? 'roundRect' : 'rect'](~~x, ~~y, width, height, radii)
            instance.fill(color)
        },

        /**
         * Draw a circle outline
         *
         * @param {number} x
         * @param {number} y
         * @param {number} radius
         * @param {number} [color=0] the color index (generally from 0 to 7)
         */
        circ(x, y, radius, color) {
            _ctx.beginPath()
            _ctx.arc(~~x, ~~y, radius, 0, TWO_PI)
            instance.stroke(color)
        },

        /**
         * Draw a color-filled circle
         *
         * @param {number} x
         * @param {number} y
         * @param {number} radius
         * @param {number} [color=0] the color index (generally from 0 to 7)
         */
        circfill(x, y, radius, color) {
            _ctx.beginPath()
            _ctx.arc(~~x, ~~y, radius, 0, TWO_PI)
            instance.fill(color)
        },

        /**
         * Draw a line
         *
         * @param {number} x1
         * @param {number} y1
         * @param {number} x2
         * @param {number} y2
         * @param {number} [color=0] the color index (generally from 0 to 7)
         */
        line(x1, y1, x2, y2, color) {
            _ctx.beginPath()
            _ctx.moveTo(~~x1, ~~y1)
            _ctx.lineTo(~~x2, ~~y2)
            instance.stroke(color)
        },

        /**
         * Sets the thickness of lines
         *
         * @param {number} value
         * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineWidth
         */
        linewidth(value) {
            _ctx.lineWidth = value
        },

        /**
         * Sets the line dash pattern used when drawing lines
         *
         * @param {number|number[]} segments the line dash pattern
         * @param {number} [offset=0] the line dash offset, or "phase".
         * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setLineDash
         * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineDashOffset
         */
        linedash(segments, offset = 0) {
            _ctx.setLineDash(Array.isArray(segments) ? segments : [segments])
            _ctx.lineDashOffset = offset
        },

        /** TEXT RENDERING API */
        /**
         * Draw text
         *
         * @param {number} x
         * @param {number} y
         * @param {string} text the text message
         * @param {number} [color=3] the color index (generally from 0 to 7)
         */
        text(x, y, text, color = 3) {
            _ctx.font = `${_fontStyle} ${_fontSize}px ${_fontFamily}`
            _ctx.fillStyle = instance.getcolor(color)
            _ctx.fillText(text, ~~x, ~~y)
        },

        /**
         * Set the font family
         *
         * @param {string} fontFamily
         */
        textfont(fontFamily) {
            _fontFamily = fontFamily
        },

        /**
         * Set the font size
         *
         * @param {string} size
         */
        textsize(size) {
            _fontSize = size
        },

        /**
         * Sets whether a font should be styled with a "normal", "italic", or "bold".
         *
         * @param {string} style
         */
        textstyle(style) {
            _fontStyle = style || ''
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
            if (align) _ctx.textAlign = align
            if (baseline) _ctx.textBaseline = baseline
        },

        /**
         * Returns a TextMetrics object that contains information about the measured text (such as its width, for example)
         *
         * @param {string} text
         * @param {number} [size]
         * @returns {TextMetrics}
         * @see https://developer.mozilla.org/en-US/docs/Web/API/TextMetrics
         */
        textmetrics(text, size = _fontSize) {
            // prettier-ignore
            _ctx.font = `${_fontStyle} ${size}px ${_fontFamily}`
            const metrics = _ctx.measureText(text)
            metrics.height =
                metrics.actualBoundingBoxAscent +
                metrics.actualBoundingBoxDescent
            return metrics
        },

        /** IMAGE GRAPHICS API */
        /**
         * Draw an image
         *
         * @param {number} x
         * @param {number} y
         * @param {OffscreenCanvas|HTMLImageElement|HTMLCanvasElement} image
         */
        image(x, y, image) {
            _ctx.drawImage(image, ~~x, ~~y)
        },

        /**
         * Creates a offscreen canvas to draw on it
         *
         * @param {number} width
         * @param {number} height
         * @param {string[]|drawCallback} draw
         * @param {{scale?:number}} [options]
         * @returns {OffscreenCanvas}
         * @see https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas
         */
        paint(width, height, draw, options = {}) {
            const canvas = options.canvas || new OffscreenCanvas(1, 1),
                scale = options.scale || 1,
                contextOriginal = _ctx

            canvas.width = width * scale
            canvas.height = height * scale
            _ctx = canvas.getContext('2d')

            _ctx.scale(scale, scale)

            // is pixelart?
            if (Array.isArray(draw)) {
                let x = 0,
                    y = 0

                _ctx.imageSmoothingEnabled = false

                for (const str of draw) {
                    for (const color of str) {
                        if (' ' !== color && '.' !== color) {
                            // support for 16-color palettes using hex (from 0 to f)
                            instance.rectfill(x, y, 1, 1, parseInt(color, 16))
                        }
                        x++
                    }
                    y++
                    x = 0
                }
            } else {
                draw(_ctx)
            }

            _ctx = contextOriginal // restore the context

            return canvas
        },

        /** ADVANCED GRAPHICS API */
        /**
         * Get or set the canvas context 2D
         *
         * @param {CanvasRenderingContext2D} [context]
         * @returns {CanvasRenderingContext2D}
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
        translate: (x, y) => _ctx.translate(~~x, ~~y),

        /**
         * Adds a scaling transformation to the canvas units horizontally and/or vertically.
         *
         * @param {number} x
         * @param {number} [y]
         */
        scale: (x, y) => _ctx.scale(x, y || x),

        /**
         * Adds a rotation to the transformation matrix.
         *
         * @param {number} radians
         */
        rotate: (radians) => _ctx.rotate(radians),

        /**
         * @param {number} a
         * @param {number} b
         * @param {number} c
         * @param {number} d
         * @param {number} e
         * @param {number} f
         * @param {boolean} [resetFirst=true] `false` to use _ctx.transform(); by default use _ctx.setTransform()
         *
         * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setTransform
         * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/transform
         */
        transform: (a, b, c, d, e, f, resetFirst = true) =>
            _ctx[resetFirst ? 'setTransform' : 'transform'](a, b, c, d, e, f),

        /**
         * Sets the alpha (opacity) value to apply when drawing new shapes and images
         *
         * @param {number} alpha float from 0 to 1 (e.g: 0.5 = 50% transparent)
         * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalAlpha
         */
        alpha(value) {
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
        path: (arg) => new Path2D(arg),

        /**
         * Fills the current or given path with a given color.
         *
         * @param {number} [color=0]
         * @param {Path2D} [path]
         */
        fill(color, path) {
            // _ctx.closePath()
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
            // _ctx.closePath()
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
            _ctx.clip(path)
        },

        /** SOUND API */
        /**
         * Play a sound effects using ZzFX library.
         * If the first argument is omitted, plays an default sound.
         *
         * @param {number|number[]} [zzfxParams] a ZzFX array of params
         * @param {number} [pitchSlide] a value to increment/decrement the pitch
         * @param {number} [volumeFactor] the volume factor
         * @returns {number[] | boolean} The sound that was played or `false`
         *
         * @see https://github.com/KilledByAPixel/ZzFX
         */
        sfx(zzfxParams, pitchSlide = 0, volumeFactor = 1) {
            if (
                root.zzfxV <= 0 ||
                (navigator.userActivation &&
                    !navigator.userActivation.hasBeenActive)
            ) {
                return false
            }

            zzfxParams = zzfxParams || instance.DEFAULT_SFX

            // if has other arguments, copy the sound to not change the original
            if (pitchSlide > 0 || volumeFactor !== 1) {
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
            root.zzfxV = +value
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
        colrect: (x1, y1, w1, h1, x2, y2, w2, h2) =>
            x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2,

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
        colcirc: (x1, y1, r1, x2, y2, r2) =>
            (x2 - x1) ** 2 + (y2 - y1) ** 2 <= (r1 + r2) ** 2,

        /** PLUGINS API */
        /**
         * Prepares a plugin to be loaded
         *
         * @param {pluginCallback} callback
         */
        use(callback, config = {}) {
            callback.__conf = config
            _initialized ? loadPlugin(callback) : _plugins.push(callback)
        },

        /**
         * Add a game event listener
         *
         * @param {string} eventName the event type name
         * @param {function} callback the function that is called when the event occurs
         * @returns {function} a function to remove the listener
         */
        listen(eventName, callback) {
            _events[eventName] = _events[eventName] || []
            _events[eventName].push(callback)

            // return a function to remove this event listener
            return () => {
                _events[eventName] = _events[eventName].filter(
                    (x) => callback !== x
                )
            }
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
        getcolor: (index) => colors[~~index % colors.length],

        /**
         * Create or update a instance variable
         *
         * @param {string} key
         * @param {*} value
         */
        setvar(key, value) {
            instance[key] = value
            if (settings.global) {
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
            instance.setvar('WIDTH', (_canvas.width = width))
            instance.setvar('HEIGHT', (_canvas.height = height || width))
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
            _timeScale = value
        },

        /**
         * Set the target FPS at runtime.
         *
         * @param {number} fps
         */
        setfps(fps) {
            _step = 1 / fps
            _stepMs = _step * 1000
            _accumulated = 0
        },
    }

    /** Copy some functions from native `Math` object */
    for (const k of [
        'sin',
        'cos',
        'atan2',
        'hypot',
        'tan',
        'abs',
        'ceil',
        'round',
        'floor',
        'trunc',
        'min',
        'max',
        'pow',
        'sqrt',
        'sign',
        'exp',
    ]) {
        // import some native Math functions
        instance[k] = Math[k]
    }

    function init() {
        _initialized = true
        setupCanvas()

        // add listeners for default events
        const source = settings.loop ? settings.loop : root
        for (const event of Object.keys(_events)) {
            if (source[event]) instance.listen(event, source[event])
        }

        // load plugins
        for (const plugin of _plugins) {
            loadPlugin(plugin)
        }

        // listen window resize event
        on(root, 'resize', pageResized)
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
                _checkTapped = (tap) => tap && performance.now() - tap.ts <= 200

            let _pressingMouse = false

            on(_canvas, 'mousedown', (ev) => {
                ev.preventDefault()
                const [x, y] = _getXY(ev.pageX, ev.pageY)
                instance.emit('tap', x, y, 0)
                _registerTap(0, x, y)
                _pressingMouse = true
            })

            on(_canvas, 'mousemove', (ev) => {
                ev.preventDefault()

                const [x, y] = _getXY(ev.pageX, ev.pageY)
                instance.setvar('MOUSEX', x)
                instance.setvar('MOUSEY', y)

                if (!_pressingMouse) return

                instance.emit('tapping', x, y, 0)
                _updateTap(0, x, y)
            })

            on(_canvas, 'mouseup', (ev) => {
                ev.preventDefault()
                const tap = _taps.get(0)
                const [x, y] = _getXY(ev.pageX, ev.pageY)
                if (_checkTapped(tap)) {
                    instance.emit('tapped', tap.startX, tap.startY, 0)
                }
                instance.emit('untap', x, y, 0)
                _taps.delete(0)
                _pressingMouse = false
            })

            on(_canvas, 'touchstart', (ev) => {
                ev.preventDefault()
                /** @type {TouchList} touches */
                const touches = ev.changedTouches
                for (const touch of touches) {
                    const [x, y] = _getXY(touch.pageX, touch.pageY)
                    instance.emit('tap', x, y, touch.identifier + 1)
                    _registerTap(touch.identifier + 1, x, y)
                }
            })

            on(_canvas, 'touchmove', (ev) => {
                ev.preventDefault()
                /** @type {TouchList} touches */
                const touches = ev.changedTouches
                for (const touch of touches) {
                    const [x, y] = _getXY(touch.pageX, touch.pageY)
                    instance.emit('tapping', x, y, touch.identifier + 1)
                    _updateTap(touch.identifier + 1, x, y)
                }
            })

            const _touchEndHandler = (ev) => {
                ev.preventDefault()
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
            const iskeydown = (key) =>
                'any' === key ? _keys.size > 0 : _keys.has(key.toLowerCase())

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
                _focused = false
            })

            on(root, 'focus', () => {
                _lastFrame = performance.now()
                raf(drawFrame)
                _focused = true
            })
        }

        // start the game loop
        instance.emit('init', instance)

        setfps(settings.fps)

        _lastFrame = performance.now()
        raf(drawFrame)
    }

    /**
     * @param {number} now
     */
    function drawFrame(now) {
        let ticks = 0,
            t = now - _lastFrame

        _lastFrame = now
        _accumulated += t

        while (_accumulated > _stepMs) {
            instance.emit('update', _step * _timeScale)
            instance.setvar('ELAPSED', instance.ELAPSED + _step * _timeScale)
            _accumulated -= _stepMs
            ticks++
        }

        if (ticks || !_animate) {
            // default values for textAlign & textBaseline
            instance.textalign('start', 'top')

            instance.emit('draw')

            _drawCount++
            _drawTime += _stepMs * ticks

            if (_drawTime + _accumulated >= 1000) {
                instance.setvar('FPS', _drawCount)
                _drawCount = 0
                _drawTime -= 1000
            }
        }

        if (_focused && _animate) {
            raf(drawFrame)
        }
    }

    function setupCanvas() {
        _canvas =
            'string' === typeof _canvas
                ? document.querySelector(_canvas)
                : _canvas

        instance.setvar('CANVAS', _canvas)
        _ctx = _canvas.getContext('2d')

        // disable fullscreen if a width is specified
        if (instance.WIDTH > 0) _fullscreen = false

        _canvas.width = instance.WIDTH
        _canvas.height = instance.HEIGHT || instance.WIDTH

        if (!_canvas.parentNode) document.body.appendChild(_canvas)

        // canvas CSS tweaks
        _canvas.style.display = 'block'
        if (_fullscreen) {
            _canvas.style.position = 'absolute'
            _canvas.style.inset = 0
        } else if (_autoscale) {
            _canvas.style.margin = 'auto'
        }
    }

    function pageResized() {
        const pageWidth = root.innerWidth,
            pageHeight = root.innerHeight

        if (_fullscreen) {
            instance.setvar('WIDTH', (_canvas.width = pageWidth))
            instance.setvar('HEIGHT', (_canvas.height = pageHeight))
        } else if (_autoscale) {
            _scale = Math.min(
                pageWidth / instance.WIDTH,
                pageHeight / instance.HEIGHT
            )
            _scale = (settings.pixelart ? ~~_scale : _scale) || 1
            _canvas.style.width = instance.WIDTH * _scale + 'px'
            _canvas.style.height = instance.HEIGHT * _scale + 'px'
        }

        instance.setvar('CENTERX', instance.WIDTH / 2)
        instance.setvar('CENTERY', instance.HEIGHT / 2)

        // restore canvas image rendering properties
        if (!settings.antialias || settings.pixelart) {
            _ctx.imageSmoothingEnabled = false
            _canvas.style.imageRendering = 'pixelated'
        }

        instance.emit('resized', _scale)

        if (!_animate) {
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
    function loadPlugin(callback) {
        const pluginData = callback(instance, _helpers, callback.__conf)
        if ('object' === typeof pluginData) {
            for (const [key, value] of Object.entries(pluginData)) {
                instance.setvar(key, value)
            }
        }
    }

    if (settings.global) {
        if (root.__litecanvas) {
            throw 'global litecanvas already instantiated'
        }
        Object.assign(root, instance)
        root.__litecanvas = instance
    }

    if ('loading' === document.readyState) {
        on(root, 'DOMContentLoaded', init)
    } else {
        init()
    }

    return instance
}
