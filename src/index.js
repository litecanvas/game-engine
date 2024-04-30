/*! litecanvas v0.21.1 | https://github.com/litecanvas/game-engine */
import { zzfx } from './zzfx'
import { colors } from './colors'
import { sounds } from './sounds'

export default function litecanvas(settings = {}) {
    // helpers
    const root = globalThis,
        body = document.body,
        math = Math,
        on = (elem, evt, callback) => elem.addEventListener(evt, callback),
        off = (elem, evt, callback) => elem.removeEventListener(evt, callback),
        time = () => performance.now(),
        _TWO_PI = math.PI * 2,
        _EMPTY_ARRAY = [],
        _NULL = null,
        defaults = {
            fps: 60,
            fullscreen: true,
            width: _NULL,
            height: _NULL,
            autoscale: true,
            pixelart: false,
            antialias: true,
            background: _NULL,
            canvas: _NULL,
            global: true,
            tappingInterval: true,
            tapEvents: true,
            loop: _NULL,
            plugins: [],
        },
        instance = {}

    // setup the settings default values
    settings = Object.assign(defaults, settings)

    let /** @type {string|HTMLCanvasElement} _canvas */
        _canvas = settings.canvas || document.createElement('canvas'),
        _antialias = settings.antialias,
        _pixelart = settings.pixelart,
        _fullscreen = settings.fullscreen,
        _autoscale = settings.autoscale,
        _tappingInterval = settings.tappingInterval,
        _loop = settings.loop,
        _plugins = settings.plugins,
        _bg = settings.background,
        _hasMouse = matchMedia('(pointer:fine)').matches,
        _tappingHandler,
        _scale = 1,
        _offsetTop = 0,
        _offsetLeft = 0,
        _currentWidth,
        _currentHeight,
        /** @type {CanvasRenderingContext2D} _ctx */
        _ctx,
        // game loop variables
        _now,
        _lastFrame,
        _dt,
        _step = 1 / settings.fps,
        _delta = 1000 / settings.fps,
        _accumulator = 0,
        _rafid,
        _draws = { count: 0, time: 0 },
        _font = 'sans-serif',
        _preset = {},
        // object with helpers to be used by plugins
        _helpers = {
            settings: Object.assign({}, settings),
            set: _setvar,
            colors,
            sounds,
        }

    Object.assign(instance, {
        WIDTH: settings.width,
        HEIGHT: settings.height || settings.width,
        CANVAS: _NULL,
        TAPPED: false,
        TAPPING: false,
        TAPX: 0,
        TAPY: 0,
        ELAPSED: 0,
        FPS: 0,
        CENTERX: 0,
        CENTERY: 0,
        loop: {
            init: [],
            update: [],
            draw: [],
            resized: [],
        },

        /**
         * Calculates a linear (interpolation) value over t%.
         *
         * @param {number} start
         * @param {number} end
         * @param {number} t The progress in percentage.
         * @returns {number} The unterpolated value between `a` and `b`
         * @tutorial https://gamedev.net/tutorials/programming/general-and-gameplay-programming/a-brief-introduction-to-lerp-r4954/
         */
        lerp: (start, end, t) => start + t * (end - start),

        /**
         * Convert degrees to radians
         *
         * @param {number} degs
         * @returns {number} the value in radians
         */
        deg2rad: (degs) => (instance.PI / 180) * degs,

        /**
         * Convert radians to degrees
         *
         * @param {number} rads
         * @returns {number} the value in degrees
         */
        rad2deg: (rads) => (180 / instance.PI) * rads,

        /**
         * Force a value within the boundaries by clamping it to the range min, max.
         *
         * @param {number} value
         * @param {number} min
         * @param {number} max
         * @returns {number}
         */
        clamp: function (value, min, max) {
            return math.min(math.max(value, min), max)
        },

        /** RNG API */
        /**
         * Generates a pseudorandom float between min (inclusive) and max (exclusive)
         *
         * @param {number} min
         * @param {number} max
         * @returns {number} the random number
         */
        rand: (min = 0, max = 1) => math.random() * (max - min) + min,

        /**
         * Generates a pseudorandom integer between min (inclusive) and max (inclusive)
         *
         * @param {number} min
         * @param {number} max
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
        chance: (p = 0.5) => instance.rand() < p,

        /**
         * Choose a random item from a Array
         *
         * @param {Array<T>} arr
         * @returns {T}
         */
        choose: (arr) => arr[instance.randi(0, arr.length - 1)],

        /**
         * Returns the fractional part of a number
         *
         * @param {number} n The number
         * @returns {number}
         */
        fract: (n) => n % 1,

        /** BASIC GRAPHICS API */
        /**
         * Clear the game screen
         *
         * @param {number|null} color The background color (from 0 to 7) or null
         * @alias instance.cls
         */
        clear: (color) => {
            if (_NULL == color) {
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
         * @param {number} color the color index (generally from 0 to 7)
         */
        rect: (x, y, width, height, color = 0) => {
            _ctx.strokeStyle = colors[~~color % colors.length]
            _ctx.strokeRect(~~x, ~~y, ~~width, ~~height)
        },

        /**
         * Draw a color-filled rectangle
         *
         * @param {number} x
         * @param {number} y
         * @param {number} width
         * @param {number} height
         * @param {number} color the color index (generally from 0 to 7)
         */
        rectfill: (x, y, width, height, color = 0) => {
            _ctx.fillStyle = colors[~~color % colors.length]
            _ctx.fillRect(~~x, ~~y, ~~width, ~~height)
        },

        /**
         * Draw a circle outline
         *
         * @param {number} x
         * @param {number} y
         * @param {number} radius
         * @param {number} color the color index (generally from 0 to 7)
         */
        circ: (x, y, radius, color = 0) => {
            _ctx.strokeStyle = colors[~~color % colors.length]
            _ctx.beginPath()
            _ctx.arc(~~x, ~~y, ~~radius, 0, _TWO_PI)
            _ctx.closePath()
            _ctx.stroke()
        },

        /**
         * Draw a color-filled circle
         *
         * @param {number} x
         * @param {number} y
         * @param {number} radius
         * @param {number} color the color index (generally from 0 to 7)
         */
        circfill: (x, y, radius, color = 0) => {
            _ctx.fillStyle = colors[~~color % colors.length]
            _ctx.beginPath()
            _ctx.arc(~~x, ~~y, ~~radius, 0, _TWO_PI)
            _ctx.closePath()
            _ctx.fill()
        },

        /**
         * Draw a line
         *
         * @param {number} x1
         * @param {number} y1
         * @param {number} x2
         * @param {number} y2
         * @param {number} color the color index (generally from 0 to 7)
         */
        line: (x1, y1, x2, y2, color = 0) => {
            _ctx.strokeStyle = colors[~~color % colors.length]
            _ctx.beginPath()
            _ctx.moveTo(~~x1, ~~y1)
            _ctx.lineTo(~~x2, ~~y2)
            _ctx.stroke()
        },

        /**
         * Sets the thickness of lines
         *
         * @param {number} value
         * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineWidth
         */
        linewidth: (value) => {
            _ctx.lineWidth = value
        },

        /**
         * Sets the line dash pattern used when drawing lines
         *
         * @param {number|number[]} value
         * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setLineDash
         */
        linedash: (value) => {
            value = value ? value : _EMPTY_ARRAY
            _ctx.setLineDash(Array.isArray(value) ? value : [value])
        },

        /**
         * Determines the shape used to draw the end points of lines
         * Possible values are: "butt", "round" or "square"
         *
         * @param {string} value
         * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineCap
         */
        linecap: (value) => {
            _ctx.lineCap = value
        },

        /**
         * Determines the shape used to join two line segments where they meet
         * Possible values are: "round", "bevel", and "miter"
         *
         * @param {string} value
         * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineJoin
         */
        linejoin: (value) => {
            _ctx.lineJoin = value
        },

        /** TEXT RENDERING API */
        /**
         * Draw text
         *
         * @alias instance.print
         * @param {number} x
         * @param {number} y
         * @param {string} text the text message
         * @param {number} color the color index (generally from 0 to 7)
         * @param {number} size the font size
         * @param {string} font the font family
         */
        text: (x, y, text, color = 0, size = 20, font = _NULL) => {
            _ctx.font = ~~size + 'px ' + (font || _font)
            _ctx.fillStyle = colors[~~color % colors.length]
            _ctx.fillText(text, ~~x, ~~y)
        },

        /**
         * Set a default font family
         *
         * @param {string} fontFamily
         */
        textfont: (fontFamily) => {
            _font = fontFamily
        },

        /**
         * Sets the alignment used when drawing texts
         *
         * @param {string} align the horizontal alignment. Possible values: "left", "right", "center", "start" or "end"
         * @param {string} baseline the vertical alignment. Possible values: "top", "bottom", "middle", "hanging" or "ideographic"
         * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/textBaseline
         * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/textAlign
         */
        textalign: (align, baseline) => {
            _ctx.textAlign = _preset.textalign =
                align || _preset.textalign || 'start'
            _ctx.textBaseline = _preset.textbaseline =
                baseline || _preset.textbaseline || 'top'
        },

        /** IMAGE GRAPHICS API */
        /**
         * Draw an image
         *
         * @param {number} x
         * @param {number} y
         * @param {OffscreenCanvas|HTMLImageElement|HTMLCanvasElement} image
         */
        image: (x, y, image) => {
            _ctx.drawImage(image, ~~x, ~~y)
        },

        /**
         * @callback drawCallback
         * @param {OffscreenCanvas} canvas
         */
        /**
         * Creates a offscreen canvas to draw on it
         *
         * @param {number} width
         * @param {number} height
         * @param {string[]|drawCallback} draw
         * @returns {OffscreenCanvas}
         * @see https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas
         */
        paint: (width, height, draw) => {
            const offscreenCanvas = new OffscreenCanvas(width, height),
                ctxOriginal = _ctx

            offscreenCanvas.width = width
            offscreenCanvas.height = height
            offscreenCanvas.ctx = _ctx = offscreenCanvas.getContext('2d')

            if (Array.isArray(draw)) {
                const imageData = _ctx.createImageData(width, height),
                    pixels = imageData.data

                let x = 0,
                    y = 0

                for (const str of draw) {
                    for (const color of str.split('')) {
                        let pixelIndex = y * (width * 4) + x * 4
                        if (' ' !== color && '.' !== color) {
                            // support max 16-color palettes
                            // prettier-ignore
                            const n = colors.length > 8 ? ~~parseInt(color, 16) : ~~color
                            const c = colors[n % colors.length]

                            pixels[pixelIndex] = parseInt(c.slice(1, 3), 16) // red
                            pixels[pixelIndex + 1] = parseInt(c.slice(3, 5), 16) // green
                            pixels[pixelIndex + 2] = parseInt(c.slice(5, 7), 16) // blue
                            pixels[pixelIndex + 3] = 255 // alpha 100%
                        }
                        x++
                    }
                    y++
                    x = 0
                }
                _ctx.putImageData(imageData, 0, 0)
            } else {
                draw(offscreenCanvas)
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
         * Adds a translation transformation to the current matrix
         *
         * @param {number} x
         * @param {number} y
         */
        translate: (x = 0, y = 0) => _ctx.translate(x, y),

        /**
         * Adds a scaling transformation to the canvas units horizontally and/or vertically.
         *
         * @param {number} x
         * @param {number} y
         */
        scale: (x = 1, y = 1) => _ctx.scale(x, y),

        /**
         * Adds a rotation to the transformation matrix
         *
         * @param {number} radians
         */
        rotate: (radians = 0) => _ctx.rotate(radians),

        /**
         * Adds a transformation that skews to the transformation matrix
         *
         * @param {number} a
         * @param {number} b
         * @param {number} c
         * @param {number} d
         * @param {number} e
         * @param {number} f
         * @param {boolean} resetFirst `false` to use _ctx.transform(); by default use _ctx.setTransform()
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
        alpha: (alpha = 1) => {
            _ctx.globalAlpha = alpha
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
        cliprect: (x, y, width, height) => {
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
        clipcirc: (x, y, radius) => {
            _ctx.beginPath()
            _ctx.arc(x, y, radius, 0, _TWO_PI)
            _ctx.clip()
        },

        /**
         * Sets the type of compositing operation to apply when drawing new shapes
         *
         * @param {string} mode
         * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation
         */
        blendmode: (mode = 'source-over') => {
            _ctx.globalCompositeOperation = mode
        },
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

        /** SOUND API */
        /**
         * Play a defined sound or a ZzFX array of params
         *
         * @param {number|Array} sound the sound index (from 0 to 7) or a ZzFX array of params
         * @param {number} volume
         * @param {number} pitch
         * @param {number} randomness
         * @returns {AudioBufferSourceNode}
         * @see https://github.com/KilledByAPixel/ZzFX
         */
        sfx: (sound = 0, volume = 1, pitch = 0, randomness = 0) => {
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
         * @callback pluginCallback
         * @param {object} instance - The litecanvas instance
         * @param {object} helpers
         * @returns {object|null}
         */
        /**
         * @param {pluginCallback} callback
         */
        plugin: (callback) => {
            const pluginData = callback(instance, _helpers)
            if ('object' === typeof pluginData) {
                for (const key in pluginData) {
                    _setvar(key, pluginData[key])
                }
            }
        },
    })

    // alias methods
    Object.assign(instance, {
        cls: instance.clear,
        print: instance.text,
    })

    /** MATH API */
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
        'PI',
    ]) {
        // import some native Math functions
        instance[k] = math[k]
    }

    function _init() {
        _setupCanvas()

        if (settings.tapEvents) {
            const _tappedLimit = 200
            const _getXY = (event) =>
                _hasMouse
                    ? [event.pageX, event.pageY]
                    : [event.touches[0].pageX, event.touches[0].pageY]
            const _events = {
                tapstart: _hasMouse ? 'mousedown' : 'touchstart',
                tapend: _hasMouse ? 'mouseup' : 'touchend',
                tapmove: _hasMouse ? 'mousemove' : 'touchmove',
            }
            let _tapStartX, _tapStartY, _last, _start

            _tappingHandler = (ev) => {
                _now = time()
                if (_now - _last > _tappingInterval) {
                    const [x, y] = _getXY(ev)
                    _updateTapping(true, x, y)
                    _last = _now
                }
            }

            on(instance.CANVAS, _events.tapstart, function (ev) {
                ev.preventDefault()

                on(body, _events.tapmove, _tappingHandler)
                const [x, y] = ([_tapStartX, _tapStartY] = _getXY(ev))
                _updateTapping(true, x, y)

                _last = _start = time()
            })

            on(instance.CANVAS, _events.tapend, function (ev) {
                ev.preventDefault()

                off(body, _events.tapmove, _tappingHandler)
                _updateTapping(false)

                if (time() - _start <= _tappedLimit) {
                    _updateTapped(true, _tapStartX, _tapStartY)
                }
            })
        }

        on(root, 'focus', () => {
            if (!_rafid) {
                _lastFrame = time()
                _rafid = requestAnimationFrame(_frame)
            }
        })

        on(root, 'blur', () => {
            if (_rafid) {
                cancelAnimationFrame(_rafid)
                _rafid = 0
            }
            if (settings.tapEvents) {
                off(
                    body,
                    _hasMouse ? 'mousemove' : 'touchmove',
                    _tappingHandler,
                )
                _updateTapping(false)
            }
        })

        const source = _loop ? _loop : root
        if (source) {
            if (source.init) instance.loop.init.push(source.init)
            if (source.update) instance.loop.update.push(source.update)
            if (source.draw) instance.loop.draw.push(source.draw)
            if (source.resized) instance.loop.resized.push(source.resized)
        }

        _loadPlugins()

        if (_autoscale || _fullscreen) {
            on(root, 'resize', _resize)
        }
        _resize()

        _callAll(instance.loop.init)

        // set canvas background color
        if (_NULL != _bg) {
            // prettier-ignore
            instance.CANVAS.style.backgroundColor = colors[_bg % colors.length]
        }

        _lastFrame = time()
        _rafid = requestAnimationFrame(_frame)
    }

    function _frame() {
        let ticks = 0

        _now = time()
        _dt = _now - _lastFrame
        _lastFrame = _now
        _accumulator += _dt

        // prevent long updates after lost focus
        if (_dt > 1000) _accumulator = _delta

        while (_accumulator >= _delta) {
            // update
            _callAll(instance.loop.update, _step)
            _setvar('ELAPSED', instance.ELAPSED + _step)
            _accumulator -= _delta
            ticks++
            _resetTap()
        }

        if (ticks) {
            // draw
            _callAll(instance.loop.draw)

            _draws.count++
            _draws.time += ticks * _step
            if (_draws.time >= 1) {
                _setvar('FPS', _draws.count)
                _draws.time -= 1
                _draws.count = 0
            }
        }

        _rafid = requestAnimationFrame(_frame)
    }

    function _loadPlugins() {
        for (let i = 0; i < _plugins.length; ++i) {
            instance.plugin(_plugins[i])
        }
    }

    function _setupCanvas() {
        _canvas =
            'string' === typeof _canvas
                ? document.querySelector(_canvas)
                : _canvas
        _setvar('CANVAS', _canvas)

        // disable fullscreen if a width is specified
        if (instance.WIDTH > 0) _fullscreen = false

        _canvas.width = instance.WIDTH
        _canvas.height = instance.HEIGHT || instance.WIDTH
        _ctx = _canvas.getContext('2d')

        if (!_canvas.parentNode) body.appendChild(_canvas)

        _ctx.imageSmoothingEnabled = _antialias = !_pixelart

        // canvas CSS tweaks
        if (!_antialias) {
            _canvas.style.imageRendering = 'pixelated'
        }
        _canvas.style.display = 'block'
        if (_fullscreen) {
            _canvas.style.position = 'absolute'
            _canvas.style.inset = 0
        } else if (_autoscale) {
            _canvas.style.margin = 'auto'
        }
    }

    function _resize() {
        if (_autoscale || _fullscreen) {
            _currentWidth = innerWidth
            _currentHeight = innerHeight

            if (_fullscreen) {
                _canvas.width = _currentWidth
                _canvas.height = _currentHeight
                _setvar('WIDTH', _currentWidth)
                _setvar('HEIGHT', _currentHeight)
            } else if (_autoscale) {
                _scale = math.min(
                    _currentWidth / instance.WIDTH,
                    _currentHeight / instance.HEIGHT,
                )
                _scale = _pixelart ? math.floor(_scale) : _scale
                _canvas.style.width = instance.WIDTH * _scale + 'px'
                _canvas.style.height = instance.HEIGHT * _scale + 'px'
            }
        }

        _setvar('CENTERX', instance.WIDTH / 2)
        _setvar('CENTERY', instance.HEIGHT / 2)

        _offsetTop = _canvas.offsetTop
        _offsetLeft = _canvas.offsetLeft

        instance.textalign()

        _callAll(instance.loop.resized)
    }

    function _resetTap() {
        _setvar('TAPPED', false)
    }

    function _updateTapped(tapped, x, y) {
        _setvar('TAPPED', tapped)
        _setvar('TAPX', (x - _offsetLeft) / _scale)
        _setvar('TAPY', (y - _offsetTop) / _scale)
    }

    function _updateTapping(tapped, x, y) {
        _setvar('TAPPING', tapped)
        _setvar('TAPX', (x - _offsetLeft) / _scale)
        _setvar('TAPY', (y - _offsetTop) / _scale)
    }

    function _callAll(fnArray, ...args) {
        for (let i = 0; i < fnArray.length; ++i) {
            fnArray[i](...args)
        }
    }

    function _setvar(key, value) {
        instance[key] = value
        if (settings.global) {
            root[key] = value
        }
    }

    if ('loading' === document.readyState) {
        on(root, 'DOMContentLoaded', _init)
    } else {
        _init()
    }

    if (settings.global) {
        if (root.__litecanvas) {
            throw new Error('Cannot instantiate litecanvas globally twice')
        }
        Object.assign(root, instance)
        root.__litecanvas = true
    }

    return instance
}

globalThis.litecanvas = litecanvas
