/*! litecanvas v0.32.0 | https://github.com/litecanvas/game-engine */
import './zzfx'
import { colors } from './colors'
import { sounds } from './sounds'

/**
 * The litecanvas constructor
 *
 * @param {LitecanvasOptions} [settings]
 * @returns {LitecanvasInstance}
 */
export default function litecanvas(settings = {}) {
    // helpers
    const root = window,
        body = document.body,
        math = Math,
        TWO_PI = math.PI * 2,
        /** @type {(elem:HTMLElement, evt:string, callback:Function)=>void} */
        on = (elem, evt, callback) => elem.addEventListener(evt, callback),
        /** @type {(elem:HTMLElement, evt:string, callback:Function)=>void} */
        off = (elem, evt, callback) => elem.removeEventListener(evt, callback),
        time = () => performance.now(),
        NULL = null,
        UNDEF = undefined,
        /** @type {LitecanvasOptions} */
        defaults = {
            fps: 60,
            fullscreen: true,
            width: NULL,
            height: NULL,
            autoscale: true,
            pixelart: false,
            antialias: true,
            background: NULL,
            canvas: NULL,
            global: true,
            tappingInterval: 100,
            tapEvents: true,
            loop: NULL,
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
        /** @type {number|null} */
        _bg = settings.background,
        /** @type {boolean} */
        _hasMouse = matchMedia('(pointer:fine)').matches,
        /** @type {function} */
        _tappingHandler,
        /** @type {number} */
        _scale = 1,
        /** @type {number} */
        _offsetTop = 0,
        /** @type {number} */
        _offsetLeft = 0,
        /** @type {CanvasRenderingContext2D} */
        _ctx,
        /** @type {number} */
        _lastFrame,
        /** @type {number} */
        _step = 1 / settings.fps,
        /** @type {number} */
        _stepMs = _step * 1000,
        /** @type {number} */
        _accumulated = 0,
        /** @type {number} */
        _rafid,
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
        /** @type {string} */
        _textAlign = 'start',
        /** @type {string} */
        _textBaseline = 'top',
        /**
         * The list of game loop listeners
         * @type {LitecanvasGameLoopListeners}
         */
        _loop = {
            init: [],
            update: [],
            draw: [],
            resized: [],
        },
        /**
         * Helpers to be used by plugins
         *
         * @type {LitecanvasPluginHelpers}
         */
        _helpers = {
            settings: Object.assign({}, settings),
            colors,
            sounds,
        }

    /** @type {LitecanvasInstance} */
    const instance = {
        /** @type {number} */
        WIDTH: settings.width,
        /** @type {number} */
        HEIGHT: settings.height || settings.width,
        /** @type {HTMLCanvasElement} */
        CANVAS: NULL,
        /** @type {boolean} */
        TAPPED: NULL,
        /** @type {boolean} */
        TAPPING: NULL,
        /** @type {number} */
        TAPX: NULL,
        /** @type {number} */
        TAPY: NULL,
        /** @type {number} */
        ELAPSED: 0,
        /** @type {number} */
        FPS: settings.fps,
        /** @type {number} */
        DT: _step,
        /** @type {number} */
        CENTERX: NULL,
        /** @type {number} */
        CENTERY: NULL,

        /** MATH API */
        /**
         * The value of the mathematical constant PI (π).
         * Approximately 3.14159
         *
         * @type {number}
         */
        PI: math.PI,

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
        HALF_PI: math.PI * 0.5,

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
        deg2rad: (degs) => (math.PI / 180) * degs,

        /**
         * Convert radians to degrees
         *
         * @param {number} rads
         * @returns {number} the value in degrees
         */
        rad2deg: (rads) => (180 / math.PI) * rads,

        /**
         * Constrains a number between `min` and `max`.
         *
         * @param {number} value
         * @param {number} min
         * @param {number} max
         * @returns {number}
         */
        clamp: (value, min, max) => math.min(math.max(value, min), max),

        /**
         * Wraps a number between `min` and `max`.
         *
         * @param {number} value
         * @param {number} min
         * @param {number} max
         * @returns {number}
         */
        wrap: (value, min, max) =>
            value - (max - min) * math.floor((value - min) / (max - min)),

        /**
         * Re-maps a number from one range to another.
         *
         * @param {number} value  the value to be remapped.
         * @param {number} start1 lower bound of the value's current range.
         * @param {number} stop1  upper bound of the value's current range.
         * @param {number} start2 lower bound of the value's target range.
         * @param {number} stop2  upper bound of the value's target range.
         * @param {boolean} [withinBounds=true] constrain the value to the newly mapped range
         * @returns {number} the remapped number
         */
        map(value, start1, stop1, start2, stop2, withinBounds = false) {
            // prettier-ignore
            const result = ((value - start1) / (stop1 - start1)) * (stop2 - start2) + start2
            if (!withinBounds) return result
            return start2 < stop2
                ? instance.clamp(result, start2, stop2)
                : instance.clamp(result, stop2, start2)
        },

        /**
         * Maps a number from one range to a value between 0 and 1.
         *
         * @param {number} value
         * @param {number} start
         * @param {number} stop
         * @returns {number} the normalized number.
         */
        norm: (value, start, stop) => instance.map(value, start, stop, 0, 1),

        /**
         * Calculates the positive difference/distance of two given numbers
         *
         * @param {number} a
         * @param {number} b
         * @returns {number}
         */
        diff: (a, b) => math.abs(b - a),

        /**
         * Returns the fractional part of a number
         *
         * @param {number} value The number
         * @returns {number}
         */
        fract: (value) => value % 1,

        /**
         * Interpolate between 2 values.
         * Optionally, takes a custom periodic function (default = `Math.sin`).
         *
         * @param {number} lower
         * @param {number} higher
         * @param {number} t
         * @param {function} [fn=Math.sin]
         * @returns {number}
         */
        wave: (lower, higher, t, fn = math.sin) =>
            lower + ((fn(t) + 1) / 2) * (higher - lower),

        /** RNG API */
        /**
         * Generates a pseudorandom float between min (inclusive) and max (exclusive)
         *
         * @param {number} [min=0.0]
         * @param {number} [max=1.0]
         * @returns {number} the random number
         */
        rand: (min = 0.0, max = 1.0) => math.random() * (max - min) + min,

        /**
         * Generates a pseudorandom integer between min (inclusive) and max (inclusive)
         *
         * @param {number} [min=0]
         * @param {number} [max=1]
         * @returns {number} the random number
         */
        randi: (min = 0, max = 1) =>
            instance.floor(instance.rand() * (max - min + 1) + min),

        /**
         * Randomly returns `true` or `false`
         *
         * @param {number} p chance from 0 to 1 (where 0 = 0% and 1 = 100%)
         * @returns {boolean}
         */
        chance: (p) => instance.rand() < p,

        /**
         * Choose a random item from a Array
         *
         * @param {Array.<T>} arr
         * @returns {T}
         */
        choose: (arr) => arr[instance.randi(0, arr.length - 1)],

        /** BASIC GRAPHICS API */
        /**
         * Clear the game screen
         *
         * @param {number|null} color The background color (from 0 to 7) or null
         */
        clear(color) {
            if (NULL == color) {
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
        rect(x, y, width, height, color = 0, radii = UNDEF) {
            _ctx.beginPath()
            _ctx[radii ? 'roundRect' : 'rect'](
                ~~x,
                ~~y,
                ~~width,
                ~~height,
                radii,
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
         * @param {number} [color=0] the color index (generally from 0 to 7)
         * @param {number|number[]} [radii] A number or list specifying the radii used to draw a rounded-borders rectangle
         */
        rectfill(x, y, width, height, color = 0, radii = UNDEF) {
            _ctx.beginPath()
            _ctx[radii ? 'roundRect' : 'rect'](
                ~~x,
                ~~y,
                ~~width,
                ~~height,
                radii,
            )
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
        circ(x, y, radius, color = 0) {
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
         * @param {number} [color=0] the color index (generally from 0 to 7)
         */
        circfill(x, y, radius, color = 0) {
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
         * @param {number} [color=0] the color index (generally from 0 to 7)
         */
        line(x1, y1, x2, y2, color = 0) {
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

        /**
         * Determines the shape used to draw the end points of lines
         * Possible values are: "butt", "round" or "square"
         *
         * @param {string} value
         * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineCap
         */
        linecap(value) {
            _ctx.lineCap = value
        },

        /**
         * Determines the shape used to join two line segments where they meet
         * Possible values are: "round", "bevel", and "miter"
         *
         * @param {string} value
         * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineJoin
         */
        linejoin(value) {
            _ctx.lineJoin = value
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
            _ctx.font = `${_fontStyle || ''} ${~~_fontSize}px ${_fontFamily}`
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
         * Sets whether a font should be styled with a normal, italic, or bold.
         *
         * @param {string} style
         */
        textstyle(style) {
            _fontStyle = style
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
            _ctx.textAlign = _textAlign = align
            _ctx.textBaseline = _textBaseline = baseline
        },

        /**
         * Returns a TextMetrics object that contains information about the measured text (such as its width, for example)
         *
         * @param {string} text
         * @param {number} [size]
         * @returns {TextMetrics}
         * @see https://developer.mozilla.org/en-US/docs/Web/API/TextMetrics
         */
        textmetrics(text, size) {
            // prettier-ignore
            _ctx.font = `${_fontStyle || ''} ${~~(size || _fontSize)}px ${_fontFamily}`
            metrics = _ctx.measureText(text)
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
            options.scale = math.max(1, ~~options.scale)

            const offscreenCanvas = new OffscreenCanvas(width, height),
                ctxOriginal = _ctx,
                pixelart = Array.isArray(draw),
                scale = pixelart ? math.floor(options.scale) : options.scale

            offscreenCanvas.width = width * scale
            offscreenCanvas.height = height * scale
            _ctx = offscreenCanvas.getContext('2d')

            _ctx.scale(scale, scale)

            if (pixelart) {
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
                draw(offscreenCanvas, _ctx)
            }

            _ctx = ctxOriginal // restore the context

            return offscreenCanvas
        },

        /** ADVANCED GRAPHICS API */
        /**
         * Get the canvas context
         *
         * @returns {CanvasRenderingContext2D}
         */
        ctx: () => _ctx,

        /**
         * saves the current drawing style settings and transformations
         * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/save
         */
        push: () => _ctx.save(),

        /**
         * restores the drawing style settings and transformations
         * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/restore
         */
        pop: () => _ctx.restore(),

        /**
         * Adds a translation transformation to the current matrix
         *
         * @param {number} x
         * @param {number} y
         */
        translate: (x, y) => _ctx.translate(x, y),

        /**
         * Adds a scaling transformation to the canvas units horizontally and/or vertically.
         *
         * @param {number} x
         * @param {number} [y]
         */
        scale: (x, y) => _ctx.scale(x, y || x),

        /**
         * Adds a rotation to the transformation matrix
         *
         * @param {number} radians
         */
        rotate: (radians) => _ctx.rotate(radians),

        /**
         * Adds a transformation that skews to the transformation matrix
         *
         * @param {number} a
         * @param {number} b
         * @param {number} c
         * @param {number} d
         * @param {number} e
         * @param {number} f
         * @param {boolean} [resetFirst=true] `false` to use _ctx.transform(); by default use _ctx.setTransform()
         * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setTransform
         */
        transform: (a, b, c, d, e, f, resetFirst = true) =>
            _ctx[resetFirst ? 'setTransform' : 'transform'](a, b, c, d, e, f),

        /**
         * Sets the alpha (transparency) value to apply when drawing new shapes and images
         *
         * @param {number} alpha float from 0 to 1 (e.g: 0.5 = 50% transparent)
         * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalAlpha
         */
        alpha(alpha) {
            _ctx.globalAlpha = alpha
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
         * @param {number} color
         * @param {Path2D} [path]
         */
        fill(color, path) {
            _ctx.fillStyle = instance.getcolor(color)
            _ctx.fill(path)
        },

        /**
         * Outlines the current or given path with a given color.
         *
         * @param {number} color
         * @param {Path2D} [path]
         */
        stroke(color, path) {
            _ctx.strokeStyle = instance.getcolor(color)
            path ? _ctx.stroke(path) : _ctx.stroke()
        },

        /**
         * Create a retangular clipping region.
         *
         * Note: Clip paths cannot be reverted directly. You must save your
         * canvas state using push() before calling cliprect(), and restore it
         * once you have finished drawing in the clipped area using pop().
         *
         * @param {number} x
         * @param {number} y
         * @param {number} width
         * @param {number} height
         * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clip
         */
        cliprect(x, y, width, height) {
            _ctx.beginPath()
            _ctx.rect(x, y, width, height)
            _ctx.clip()
        },

        /**
         * Create a circular clipping region.
         *
         * Note: Clip paths cannot be reverted directly. You must save your
         * canvas state using push() before calling clipcirc(), and restore it
         * once you have finished drawing in the clipped area using pop().
         *
         * @param {number} x
         * @param {number} y
         * @param {number} radius
         * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clip
         */
        clipcirc(x, y, radius) {
            _ctx.beginPath()
            _ctx.arc(x, y, radius, 0, TWO_PI)
            _ctx.clip()
        },

        /**
         * Sets the type of compositing operation to apply when drawing new shapes.
         * Default value = 'source-over'.
         *
         * @param {string} value
         * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation
         */
        blendmode(value) {
            _ctx.globalCompositeOperation = value
        },

        /**
         * Provides filter effects such as blurring and grayscaling.
         * It is similar to the CSS filter property and accepts the same values.
         *
         * @param {string} effect
         * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/filter
         */
        filter(effect) {
            _ctx.filter = effect
        },

        /** SOUND API */
        /**
         * Play a defined sound or a ZzFX array of params
         *
         * @param {number|number[]} [sound=0] the sound index (from 0 to 7) or a ZzFX array of params
         * @param {number} [volume=1]
         * @param {number} [pitch=0]
         * @param {number} [randomness=0]
         * @returns {AudioBufferSourceNode}
         * @see https://github.com/KilledByAPixel/ZzFX
         */
        sfx(sound = 0, volume = 1, pitch = 0, randomness = 0) {
            if (
                navigator.userActivation &&
                !navigator.userActivation.hasBeenActive
            ) {
                return
            }

            let z = Array.isArray(sound)
                ? sound
                : sounds[~~sound % sounds.length]
            if (volume !== 1 || pitch || randomness) {
                z = [...z] // clone the sound to not modify the original
                z[0] = (Number(volume) || 1) * (z[0] || 1)
                z[1] = randomness > 0 ? randomness : 0
                z[10] = ~~z[10] + ~~pitch
            }

            return zzfx(...z)
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
        use: (callback) => {
            _initialized ? loadPlugin(callback) : _plugins.push(callback)
        },

        /**
         * Add a game loop event listener
         *
         * @param {string} event should be "init", "update", "draw" or "resized"
         * @param {function} callback the function that is called when the event occurs
         * @param {boolean} [highPriority=false] determines whether the callback will be called before or after the others
         * @returns {function?} a function to remove the listener or `undefined` if passed a invalid event
         */
        listen(event, callback, highPriority = false) {
            if (!_loop[event]) return
            _loop[event][highPriority ? 'unshift' : 'push'](callback)
            return () => {
                _loop[event] = _loop[event].filter((f) => f !== callback)
            }
        },

        /**
         * Get the color value
         *
         * @param {number} index The color number
         * @returns {string} the color value
         */
        getcolor: (index) => colors[~~index % colors.length],

        /**
         * Create or update a instance variable
         *
         * @param {string} key
         * @param {any} value
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
            instance.setvar('WIDTH', (_canvas.width = ~~width))
            instance.setvar('HEIGHT', (_canvas.height = ~~(height || width)))
            pageResized()
        },
    }

    // alias
    instance.cls = instance.clear
    instance.print = instance.text

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
        instance[k] = math[k]
    }

    function init() {
        _initialized = true
        setupCanvas()

        if (settings.tapEvents) {
            const _tappedLimit = 200
            const _getXY = (event) => {
                    return _hasMouse
                        ? [event.pageX, event.pageY]
                        : [event.touches[0].pageX, event.touches[0].pageY]
                },
                _eventTapStart = _hasMouse ? 'mousedown' : 'touchstart',
                _eventTapEnd = _hasMouse ? 'mouseup' : 'touchend',
                _eventTapMove = _hasMouse ? 'mousemove' : 'touchmove'

            let _tapStartX, _tapStartY, _last, _start

            _tappingHandler = (ev) => {
                let now = time()
                if (now - _last > settings.tappingInterval) {
                    const [x, y] = _getXY(ev)
                    updateTapping(true, x, y)
                    _last = now
                }
            }

            on(instance.CANVAS, _eventTapStart, function (ev) {
                ev.preventDefault()
                if (!_rafid) _resume()

                on(body, _eventTapMove, _tappingHandler)
                const [x, y] = ([_tapStartX, _tapStartY] = _getXY(ev))
                updateTapping(true, x, y)
                _last = _start = time()
            })

            on(instance.CANVAS, _eventTapEnd, function (ev) {
                off(body, _eventTapMove, _tappingHandler)
                updateTapping(false)

                if (time() - _start <= _tappedLimit) {
                    updateTapped(true, _tapStartX, _tapStartY)
                }
            })
        }

        on(root, 'focus', () => {
            if (!_rafid) _resume()
        })

        function _resume() {
            _lastFrame = time()
            _rafid = requestAnimationFrame(frame)
        }

        on(root, 'blur', () => {
            cancelAnimationFrame(_rafid)
            _rafid = 0
            if (settings.tapEvents) {
                off(
                    body,
                    _hasMouse ? 'mousemove' : 'touchmove',
                    _tappingHandler,
                )
                updateTapping(false)
            }
        })

        const source = settings.loop ? settings.loop : root
        for (const event in _loop) {
            if (source[event]) instance.listen(event, source[event])
        }

        // load plugins
        for (let i = 0; i < _plugins.length; i++) {
            loadPlugin(_plugins[i])
        }

        // set canvas background color
        if (NULL != _bg) {
            // prettier-ignore
            instance.CANVAS.style.backgroundColor = instance.getcolor(_bg)
        }

        // listen window resize event
        on(root, 'resize', pageResized)
        pageResized()

        // start the game loop
        emit('init')
        _lastFrame = time()
        _rafid = requestAnimationFrame(frame)
    }

    /**
     * @param {number} now
     */
    function frame(now) {
        let ticks = 0,
            t = now - _lastFrame

        _lastFrame = now
        _accumulated += t

        while (_accumulated >= _stepMs) {
            // update
            emit('update', _step)
            instance.setvar('ELAPSED', instance.ELAPSED + _step)
            _accumulated -= _stepMs
            ticks++
            instance.setvar('TAPPED', false)
        }

        if (ticks) {
            _drawCount++
            emit('draw')
            _drawTime += _stepMs * ticks
            if (_drawTime + _accumulated >= 1000) {
                instance.setvar('FPS', _drawCount)
                _drawCount = 0
                _drawTime -= 1000
            }
        }

        if (_rafid) _rafid = requestAnimationFrame(frame)
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

        if (!_canvas.parentNode) body.appendChild(_canvas)

        if (!settings.antialias || settings.pixelart) {
            _ctx.imageSmoothingEnabled = false
            _canvas.style.imageRendering = 'pixelated'
        }

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
        if (_fullscreen) {
            _canvas.width = innerWidth
            _canvas.height = innerHeight
            instance.setvar('WIDTH', innerWidth)
            instance.setvar('HEIGHT', innerHeight)
        } else if (_autoscale) {
            _scale = math.min(
                innerWidth / instance.WIDTH,
                innerHeight / instance.HEIGHT,
            )
            _scale = settings.pixelart ? math.floor(_scale) : _scale
            _canvas.style.width = instance.WIDTH * _scale + 'px'
            _canvas.style.height = instance.HEIGHT * _scale + 'px'
        }

        instance.setvar('CENTERX', instance.WIDTH / 2)
        instance.setvar('CENTERY', instance.HEIGHT / 2)

        _offsetTop = _canvas.offsetTop
        _offsetLeft = _canvas.offsetLeft

        // fix the font align and baseline
        instance.textalign(_textAlign, _textBaseline)

        emit('resized')
    }

    /**
     * @param {boolean} tapped
     * @param {number} x
     * @param {number} y
     */
    function updateTapped(tapped, x, y) {
        instance.setvar('TAPPED', tapped)
        instance.setvar('TAPX', (x - _offsetLeft) / _scale)
        instance.setvar('TAPY', (y - _offsetTop) / _scale)
    }

    /**
     * @param {boolean} tapped
     * @param {number} x
     * @param {number} y
     */
    function updateTapping(tapped, x, y) {
        instance.setvar('TAPPING', tapped)
        instance.setvar('TAPX', (x - _offsetLeft) / _scale)
        instance.setvar('TAPY', (y - _offsetTop) / _scale)
    }

    /**
     * @param {pluginCallback} callback
     */
    function loadPlugin(callback) {
        const pluginData = callback(instance, _helpers)
        if ('object' === typeof pluginData) {
            for (const key in pluginData) {
                instance.setvar(key, pluginData[key])
            }
        }
    }

    /**
     * Call all listeners attached to a game loop
     *
     * @param {string} event The game loop event
     * @param  {...any} args Arguments passed to all functions
     */
    function emit(event, ...args) {
        if (!_loop[event]) return
        for (let i = 0; i < _loop[event].length; ++i) {
            _loop[event][i](...args)
        }
    }

    if (settings.global) {
        if (root.__litecanvas) {
            throw new Error('Cannot instantiate litecanvas globally twice')
        }
        Object.assign(root, instance)
        root.__litecanvas = true
    }

    if ('loading' === document.readyState) {
        on(root, 'DOMContentLoaded', init)
    } else {
        init()
    }

    return instance
}

window.litecanvas = litecanvas
