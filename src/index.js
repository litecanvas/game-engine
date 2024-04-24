import { zzfx } from './zzfx'
import { colors } from './colors'
import { sounds } from './sounds'

/*! litecanvas v0.18.0 by Luiz Bills | https://github.com/litecanvas/game-engine */
export default function litecanvas(settings = {}) {
    // helpers
    const root = window,
        body = document.body,
        math = Math,
        on = (elem, evt, callback) => elem.addEventListener(evt, callback),
        off = (elem, evt, callback) => elem.removeEventListener(evt, callback),
        time = () => performance.now(),
        _TWO_PI = math.PI * 2,
        _EMPTY_ARRAY = [],
        _UNDEFINED = undefined,
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
        }

    // setup the settings default values
    settings = Object.assign(defaults, settings)

    // game engine instance
    const instance = {
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
        },
    } // instance properties

    let _fps = settings.fps,
        /** @var {string|HTMLCanvasElement} _canvas */
        _canvas = settings.canvas || document.createElement('canvas'),
        _antialias = settings.antialias,
        _pixelart = settings.pixelart,
        _fullscreen = settings.fullscreen,
        _autoscale = settings.autoscale,
        _tappingInterval = settings.tappingInterval,
        _loop = settings.loop,
        _plugins = settings.plugins,
        _tappingHandler,
        _hasMouse = matchMedia('(pointer:fine)').matches,
        _tapStart = 0,
        _tapTime = 0,
        _scale = 1,
        _offset = { top: 0, left: 0 },
        _currentWidth,
        _currentHeight,
        /** @var {CanvasRenderingContext2D} _ctx */
        _ctx,
        _styles = {},
        // game loop variables
        _now,
        _lastFrame = 0,
        _dt,
        _step = 1 / _fps,
        _delta = 1000 / _fps,
        _accumulator = 0,
        _rafid,
        _draws = { count: 0, time: 0 },
        _font = 'sans-serif',
        // object with helpers to be used by plugins
        _helpers = {
            settings,
            set: _setvar,
            colors,
            sounds,
        }

    function _init() {
        _setupCanvas()
        _resize()

        if (settings.tapEvents) {
            if (_hasMouse) {
                _tappingHandler = (ev) => {
                    _now = time()
                    if (_now - _tapTime > _tappingInterval) {
                        _tapTime = _now
                        _updateTapping(true, ev.pageX, ev.pageY)
                    }
                }

                on(instance.CANVAS, 'mousedown', function (ev) {
                    ev.preventDefault()

                    on(body, 'mousemove', _tappingHandler)
                    _updateTapping(true, ev.pageX, ev.pageY)
                    _tapTime = _tapStart = time()
                })

                on(instance.CANVAS, 'mouseup', function (ev) {
                    ev.preventDefault()

                    off(body, 'mousemove', _tappingHandler)
                    _updateTapping(false)

                    if (time() - _tapStart <= 150) {
                        _updateTapped(true, ev.pageX, ev.pageY)
                    }
                })
            } else {
                // touch events will be enabled only if the device not has mouse
                let _touchX = 0
                let _touchY = 0

                _tappingHandler = (ev) => {
                    _now = time()
                    if (_now - _tapTime > _tappingInterval) {
                        const touch = ev.touches[0]
                        _updateTapping(true, touch.pageX, touch.pageY)
                        _tapTime = _now
                    }
                }

                on(instance.CANVAS, 'touchstart', function (ev) {
                    ev.preventDefault()

                    const touch = ev.touches[0]
                    _touchX = touch.pageX
                    _touchY = touch.pageY
                    on(body, 'touchmove', _tappingHandler)
                    _updateTapping(true, touch.pageX, touch.pageY)
                    _tapTime = _tapStart = time()
                })

                on(instance.CANVAS, 'touchend', function (ev) {
                    ev.preventDefault()

                    off(body, 'touchmove', _tappingHandler)
                    _updateTapping(false)

                    if (time() - _tapStart <= 150) {
                        _updateTapped(true, _touchX, _touchY)
                    }
                })
            }
        }

        on(root, 'focus', () => {
            if (_rafid === 0) {
                _lastFrame = time()
                _rafid = requestAnimationFrame(_frame)
            }
        })

        on(root, 'blur', () => {
            if (_rafid) {
                cancelAnimationFrame(_rafid)
                _rafid = 0
            }
            off(body, _hasMouse ? 'mousemove' : 'touchmove', _tappingHandler)
            _updateTapping(false)
        })

        if (_autoscale || _fullscreen) {
            on(root, 'resize', _resize)
        }

        if (_loop) {
            if (_loop.init) instance.loop.init.push(_loop.init)
            if (_loop.update) instance.loop.update.push(_loop.update)
            if (_loop.draw) instance.loop.draw.push(_loop.draw)
        } else {
            if (root.init) instance.loop.init.push(root.init)
            if (root.update) instance.loop.update.push(root.update)
            if (root.draw) instance.loop.draw.push(root.draw)
        }

        _loadPlugins()

        _callAll(instance.loop.init)

        // set canvas background color
        if (_NULL != settings.background) {
            // prettier-ignore
            instance.CANVAS.style.backgroundColor = colors[settings.background % colors.length]
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
        if (_dt > 1000) {
            _accumulator = _delta
        }

        while (_accumulator >= _delta) {
            // update
            _callAll(instance.loop.update, _step)
            _setvar('ELAPSED', instance.ELAPSED + _step)
            _accumulator -= _delta
            ticks++
            _resetTap()
        }

        if (ticks > 0) {
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

        if (instance.WIDTH > 0) {
            // disable fullscreen if a width is specified
            _fullscreen = false
        }

        _canvas.width = instance.WIDTH
        _canvas.height = instance.HEIGHT || instance.WIDTH
        _canvas.ctx = _ctx = _canvas.getContext('2d')

        _setvar('CENTERX', instance.WIDTH / 2)
        _setvar('CENTERY', instance.HEIGHT / 2)

        if (!_canvas.parentNode) body.appendChild(_canvas)

        if (_pixelart) {
            _antialias = false
        }

        _ctx.imageSmoothingEnabled = _antialias

        // canvas CSS tweaks
        const style = _canvas.style

        if (!_antialias) {
            style.imageRendering = 'pixelated'
        }

        style.display = 'block'

        if (_fullscreen) {
            style.position = 'absolute'
            style.inset = 0
        } else if (_autoscale) {
            style.margin = 'auto'
        }

        _offset.top = _canvas.offsetTop
        _offset.left = _canvas.offsetLeft
    }

    function _resize() {
        if (!_autoscale && !_fullscreen) return

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

        _setvar('CENTERX', instance.WIDTH / 2)
        _setvar('CENTERY', instance.HEIGHT / 2)

        _offset.top = _canvas.offsetTop
        _offset.left = _canvas.offsetLeft

        instance.textalign(
            _styles.textAlign || _UNDEFINED,
            _styles.textBaseline || _UNDEFINED,
        )
        instance.linestyle(
            _styles.lineWidth || _UNDEFINED,
            _styles.lineJoin || _UNDEFINED,
            _styles.lineDash || _UNDEFINED,
        )
    }

    function _makeGlobals() {
        if (window.__litecanvas) {
            throw new Error('Cannot instantiate litecanvas globally twice')
        }
        for (const key in instance) {
            if (instance.hasOwnProperty(key)) {
                root[key] = instance[key]
            }
        }
        window.__litecanvas = true
    }

    function _resetTap() {
        _setvar('TAPPED', false)
    }

    function _updateTapped(tapped, x, y) {
        _setvar('TAPPED', tapped)
        _setvar('TAPX', (x - _offset.left) / _scale)
        _setvar('TAPY', (y - _offset.top) / _scale)
    }

    function _updateTapping(tapped, x, y) {
        _setvar('TAPPING', tapped)
        _setvar('TAPX', (x - _offset.left) / _scale)
        _setvar('TAPY', (y - _offset.top) / _scale)
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

    /** MATH API */
    for (const k of [
        'sin',
        'cos',
        'abs',
        'ceil',
        'round',
        'floor',
        'min',
        'max',
        'pow',
        'sqrt',
        'sign',
        'atan2',
        'hypot',
        'PI',
    ]) {
        // import some native Math functions
        instance[k] = math[k]
    }

    /**
     * Calculates a linear (interpolation) value over t%.
     *
     * @param {number} start
     * @param {number} end
     * @param {number} t The progress in percentage.
     * @returns {number} The unterpolated value between `a` and `b`
     * @tutorial https://gamedev.net/tutorials/programming/general-and-gameplay-programming/a-brief-introduction-to-lerp-r4954/
     */
    instance.lerp = (start, end, t) => start + t * (end - start)

    /**
     * Convert degrees to radians
     *
     * @param {number} degs
     * @returns {number} the value in radians
     */
    instance.deg2rad = (degs) => (instance.PI / 180) * degs

    /**
     * Convert radians to degrees
     *
     * @param {number} rads
     * @returns {number} the value in degrees
     */
    instance.rad2deg = (rads) => (180 / instance.PI) * rads

    /**
     * Force a value within the boundaries by clamping it to the range min, max.
     *
     * @param {number} value
     * @param {number} min
     * @param {number} max
     * @returns {number}
     */
    instance.clamp = function (value, min, max) {
        return math.min(math.max(value, min), max)
    }

    /** RNG API */
    /**
     * Generates a pseudorandom float between min (inclusive) and max (exclusive)
     *
     * @param {number} min
     * @param {number} max
     * @returns {number} the random number
     */
    instance.rand = (min = 0, max = 1) => math.random() * (max - min) + min

    /**
     * Generates a pseudorandom integer between min (inclusive) and max (inclusive)
     *
     * @param {number} min
     * @param {number} max
     * @returns {number} the random number
     */
    instance.randi = (min = 0, max = 1) =>
        instance.floor(instance.rand() * (max - min + 1) + min)

    /**
     * Randomly returns `true` or `false`
     *
     * @param {number} p chance from 0 to 1 (0 = 0% and 1 = 100%)
     * @returns {boolean}
     */
    instance.chance = (p = 0.5) => instance.rand() < p

    /**
     * Choose a random item from a Array
     *
     * @param {Array<T>} arr
     * @returns {T}
     */
    instance.choose = (arr) => arr[instance.randi(0, arr.length - 1)]

    /** BASIC GRAPHICS API */
    /**
     * Clear the game screen
     *
     * @param {number|null} color The background color (from 0 to 7) or null
     * @alias instance.cls
     */
    instance.clear = instance.cls = (color) => {
        if (_NULL == color) {
            _ctx.clearRect(0, 0, instance.WIDTH, instance.HEIGHT)
        } else {
            instance.rectfill(0, 0, instance.WIDTH, instance.HEIGHT, color)
        }
    }

    /**
     * Draw a rectangle outline
     *
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @param {number} color the color index (generally from 0 to 7)
     */
    instance.rect = (x, y, width, height, color = 0) => {
        _ctx.strokeStyle = colors[~~color % colors.length]
        _ctx.strokeRect(~~x, ~~y, ~~width, ~~height)
    }

    /**
     * Draw a color-filled rectangle
     *
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @param {number} color the color index (generally from 0 to 7)
     */
    instance.rectfill = (x, y, width, height, color = 0) => {
        _ctx.fillStyle = colors[~~color % colors.length]
        _ctx.fillRect(~~x, ~~y, ~~width, ~~height)
    }

    /**
     * Draw a circle outline
     *
     * @param {number} x
     * @param {number} y
     * @param {number} radius
     * @param {number} color the color index (generally from 0 to 7)
     */
    instance.circ = (x, y, radius, color = 0) => {
        _ctx.strokeStyle = colors[~~color % colors.length]
        _ctx.beginPath()
        _ctx.arc(~~x, ~~y, ~~radius, 0, _TWO_PI)
        _ctx.closePath()
        _ctx.stroke()
    }

    /**
     * Draw a color-filled circle
     *
     * @param {number} x
     * @param {number} y
     * @param {number} radius
     * @param {number} color the color index (generally from 0 to 7)
     */
    instance.circfill = (x, y, radius, color = 0) => {
        _ctx.fillStyle = colors[~~color % colors.length]
        _ctx.beginPath()
        _ctx.arc(~~x, ~~y, ~~radius, 0, _TWO_PI)
        _ctx.closePath()
        _ctx.fill()
    }

    /**
     * Draw a line
     *
     * @param {number} x1
     * @param {number} y1
     * @param {number} x2
     * @param {number} y2
     * @param {number} color the color index (generally from 0 to 7)
     */
    instance.line = (x1, y1, x2, y2, color = 0) => {
        _ctx.strokeStyle = colors[~~color % colors.length]
        _ctx.beginPath()
        _ctx.moveTo(~~x1, ~~y1)
        _ctx.lineTo(~~x2, ~~y2)
        _ctx.stroke()
    }

    /**
     * Helper to modify the lineWidth, lineJoin and lineDash properties of canvas context
     *
     * @param {number} width
     * @param {number} join
     * @param {array|number} dash
     */
    instance.linestyle = (width = 1, join = 'miter', dash = _NULL) => {
        _ctx.lineWidth = _styles.lineWidth = width
        _ctx.lineJoin = _styles.lineJoin = join
        _styles.lineDash = dash
            ? Array.isArray(dash)
                ? dash
                : [dash]
            : _EMPTY_ARRAY
        _ctx.setLineDash(_styles.lineDash)
    }

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
    instance.text = instance.print = (
        x,
        y,
        text,
        color = 0,
        size = 20,
        font = _NULL,
    ) => {
        _ctx.font = ~~size + 'px ' + (font || _font)
        _ctx.fillStyle = colors[~~color % colors.length]
        _ctx.fillText(text, ~~x, ~~y)
    }

    /**
     * Set a default font family
     *
     * @param {string} fontFamily
     */
    instance.textfont = (fontFamily) => {
        _font = fontFamily
    }

    /**
     * Sets the alignment used when drawing texts
     *
     * @param {string} align the horizontal alignment. Accepts: "left", "right", "center", "start" or "end"
     * @param {string} baseline the vertical alignment. Accepts: "top", "middle", "bottom", "hanging" or "ideographic"
     * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/textBaseline
     * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/textAlign
     */
    instance.textalign = (align = 'start', baseline = 'top') => {
        _ctx.textAlign = _styles.textAlign = align
        _ctx.textBaseline = _styles.textBaseline = baseline
    }

    /** IMAGE GRAPHICS API */
    /**
     * Draw an image
     *
     * @param {number} x
     * @param {number} y
     * @param {OffscreenCanvas|Image} image
     */
    instance.image = (x, y, image) => {
        _ctx.drawImage(image, ~~x, ~~y)
    }

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
     */
    instance.paint = (width, height, draw) => {
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
    }

    /** ADVANCED GRAPHICS API */
    /**
     * Get the canvas context
     *
     * @returns {CanvasRenderingContext2D}
     */
    instance.ctx = () => _ctx

    /**
     * Adds a translation transformation to the current matrix
     *
     * @param {number} x
     * @param {number} y
     */
    instance.translate = (x = 0, y = 0) => _ctx.translate(x, y)

    /**
     * Adds a scaling transformation to the canvas units horizontally and/or vertically.
     *
     * @param {number} x
     * @param {number} y
     */
    instance.scale = (x = 1, y = 1) => _ctx.scale(x, y)

    /**
     * Adds a rotation to the transformation matrix
     *
     * @param {number} radians
     */
    instance.rotate = (radians = 0) => _ctx.rotate(radians)

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
    instance.transform = (a, b, c, d, e, f, resetFirst = true) =>
        _ctx[resetFirst ? 'setTransform' : 'transform'](a, b, c, d, e, f)

    /**
     * Sets the alpha (transparency) value to apply when drawing new shapes and images
     *
     * @param {number} alpha float from 0 to 1 (e.g: 0.5 = 50% transparent)
     * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalAlpha
     */
    instance.alpha = (alpha = 1) => {
        _ctx.globalAlpha = alpha
    }

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
    instance.cliprect = (x, y, width, height) => {
        _ctx.beginPath()
        _ctx.rect(x, y, width, height)
        _ctx.clip()
    }

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
    instance.clipcirc = (x, y, radius) => {
        _ctx.beginPath()
        _ctx.arc(x, y, radius, 0, _TWO_PI)
        _ctx.clip()
    }

    /**
     * Sets the type of compositing operation to apply when drawing new shapes
     *
     * @param {string} mode
     * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation
     */
    instance.blendmode = (mode = 'source-over') => {
        _ctx.globalCompositeOperation = mode
    }

    /**
     * saves the current drawing style settings and transformations
     * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/save
     */
    instance.push = () => _ctx.save()

    /**
     * restores the drawing style settings and transformations
     * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/restore
     */
    instance.pop = () => _ctx.restore()

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
    instance.sfx = (sound = 0, volume = 1, pitch = 0, randomness = 0) => {
        if (
            navigator.userActivation &&
            !navigator.userActivation.hasBeenActive
        ) {
            return
        }

        let z = Array.isArray(sound) ? sound : sounds[~~sound % sounds.length]
        if (volume !== 1 || pitch || randomness) {
            z = [...z] // clone the sound to not modify the original
            z[0] = (Number(volume) || 1) * (z[0] || 1)
            z[1] = randomness > 0 ? randomness : 0
            z[10] = ~~z[10] + ~~pitch
        }
        return zzfx(...z)
    }

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
    instance.colrect = (x1, y1, w1, h1, x2, y2, w2, h2) =>
        x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2

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
    instance.colcirc = (x1, y1, r1, x2, y2, r2) =>
        (x2 - x1) ** 2 + (y2 - y1) ** 2 <= (r1 + r2) ** 2

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
    instance.plugin = (callback) => {
        const pluginData = callback(instance, _helpers)
        if ('object' === typeof pluginData) {
            for (const key in pluginData) {
                _setvar(key, pluginData[key])
            }
        }
    }

    // Export to global (window)
    if (settings.global) {
        _makeGlobals()
    }

    if ('loading' === document.readyState) {
        on(root, 'DOMContentLoaded', _init)
    } else {
        _init()
    }

    return instance
}

window.litecanvas = litecanvas
