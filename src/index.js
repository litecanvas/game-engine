import { zzfx } from './zzfx'
import { colors } from './colors'
import { sounds } from './sounds'

/*! litecanvas v0.12.0 by Luiz Bills | https://github.com/litecanvas/game-engine */
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
    settings = Object.assign({}, defaults, settings)

    // engine instance
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
        _colors = colors,
        _sounds = sounds,
        _countColors = _colors.length,
        _countSounds = _sounds.length,
        // functions to be used by plugins
        _helpers = {
            settings,
            set: _setvar,
            colors(arr) {
                if (!arr) return _colors
                _colors = arr
                _countColors = arr.length
            },
            sounds(arr) {
                if (!arr) return _sounds
                _sounds = arr
                _countSounds = arr.length
            },
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

        // set canvas background color
        if (_NULL != settings.background) {
            // prettier-ignore
            instance.CANVAS.style.backgroundColor = _colors[settings.background % _countColors]
        }

        _loadPlugins()

        _callAll(instance.loop.init)

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
        // prettier-ignore
        _canvas = 'string' === typeof _canvas ? document.querySelector(_canvas): _canvas
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

        const style = _canvas.style

        // canvas position

        style.display = 'block'

        if (_fullscreen) {
            style.position = 'absolute'
            style.inset = 0
        } else if (_autoscale) {
            style.margin = 'auto'
        }

        if (_pixelart) {
            _antialias = false
        }

        if (!_antialias) {
            _ctx.imageSmoothingEnabled = false
            style.imageRendering = 'pixelated'
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
                _currentHeight / instance.HEIGHT
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
            _styles.textBaseline || _UNDEFINED
        )
        instance.linestyle(
            _styles.lineWidth || _UNDEFINED,
            _styles.lineJoin || _UNDEFINED,
            _styles.lineDash || _UNDEFINED
        )
    }

    function _makeGlobals() {
        if (window.__litecanvas) {
            throw new Error(
                'Cannot instantiate litecanvas({ global: true}) globally twice'
            )
        }
        for (const key in instance) {
            root[key] = instance[key]
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
        'E',
    ]) {
        // import some native Math functions
        instance[k] = math[k]
    }

    /**
     * Calculates a linear (interpolation) value over t%.
     * See: https://gamedev.net/tutorials/programming/general-and-gameplay-programming/a-brief-introduction-to-lerp-r4954/
     *
     * @param {number} start
     * @param {number} end
     * @param {number} t The progress in percentage.
     * @returns {number} The unterpolated value between `a` and `b`
     */
    instance.lerp = (start, end, t) => start + t * (end - start)

    /**
     * Convert degrees to radians
     *
     * @param {number} degs
     * @returns {number} the value in radians
     */
    instance.deg2rad = (degs) => (engine.PI / 180) * degs

    /**
     * Convert radians to degrees
     *
     * @param {number} rads
     * @returns {number} the value in degrees
     */
    instance.rad2deg = (rads) => (180 / engine.PI) * rads

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
     * Generates a pseudo-random float between min (inclusive) and max (exclusive)
     *
     * @param {number} min
     * @param {number} max
     * @returns {number} the random number
     */
    instance.rand = (min = 0, max = 1) => math.random() * (max - min) + min

    /**
     * Generates a pseudo-random integer between min (inclusive) and max (inclusive)
     *
     * @param {number} min
     * @param {number} max
     * @returns {number} the random number
     */
    instance.randi = (min = 1, max = 100) =>
        instance.floor(instance.rand() * (max - min + 1) + min)

    /**
     * Returns `true` or `false` based on random percent chance (p)
     *
     * @param {number} p
     * @returns {boolean}
     */
    instance.chance = (p = 0.5) => instance.rand() <= p

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
     */
    instance.clear = instance.cls = (color) => {
        if (_NULL == color) {
            _ctx.clearRect(0, 0, instance.WIDTH, instance.HEIGHT)
        } else {
            instance.rectfill(0, 0, instance.WIDTH, instance.HEIGHT, color)
        }
    }

    instance.rect = (x, y, width, height, color = 0) => {
        _ctx.strokeStyle = _colors[~~color % _countColors]
        _ctx.strokeRect(~~x, ~~y, ~~width, ~~height)
    }

    instance.rectfill = (x, y, width, height, color = 0) => {
        _ctx.fillStyle = _colors[~~color % _countColors]
        _ctx.fillRect(~~x, ~~y, ~~width, ~~height)
    }

    instance.circ = (x, y, radius, color = 0) => {
        _ctx.strokeStyle = _colors[~~color % _countColors]
        _ctx.beginPath()
        _ctx.arc(~~x, ~~y, ~~radius, 0, _TWO_PI)
        _ctx.closePath()
        _ctx.stroke()
    }

    instance.circfill = (x, y, radius, color = 0) => {
        _ctx.fillStyle = _colors[~~color % _countColors]
        _ctx.beginPath()
        _ctx.arc(~~x, ~~y, ~~radius, 0, _TWO_PI)
        _ctx.closePath()
        _ctx.fill()
    }

    instance.oval = (x, y, rx, ry, color = 0) => {
        _ctx.strokeStyle = _colors[~~color % _countColors]
        _ctx.beginPath()
        _ctx.ellipse(~~x + ~~rx, ~~y + ~~ry, ~~rx, ~~ry, 0, 0, _TWO_PI)
        _ctx.closePath()
        _ctx.stroke()
    }

    instance.ovalfill = (x, y, rx, ry, color = 0) => {
        _ctx.fillStyle = _colors[~~color % _countColors]
        _ctx.beginPath()
        _ctx.ellipse(~~x + ~~rx, ~~y + ~~ry, ~~rx, ~~ry, 0, 0, _TWO_PI)
        _ctx.closePath()
        _ctx.fill()
    }

    instance.line = (x1, y1, x2, y2, color = 0) => {
        _ctx.strokeStyle = _colors[~~color % _countColors]
        _ctx.beginPath()
        _ctx.moveTo(~~x1, ~~y1)
        _ctx.lineTo(~~x2, ~~y2)
        _ctx.stroke()
    }

    instance.linestyle = (width = 1, join = 'miter', dash = _NULL) => {
        _ctx.lineWidth = _styles.lineWidth = width
        _ctx.lineJoin = _styles.lineJoin = join
        if (dash) {
            _styles.lineDash = Array.isArray(dash) ? dash : [dash]
            _ctx.setLineDash(_styles.lineDash)
        } else {
            _styles.lineDash = _EMPTY_ARRAY
            _ctx.setLineDash(_styles.lineDash)
        }
    }

    /** TEXT RENDERING API */
    /**
     * Render a text
     *
     * @param {number} x
     * @param {number} y
     * @param {string} text
     * @param {number} color
     * @param {number} size
     * @param {string} font
     */
    instance.print = instance.text = (
        x,
        y,
        text,
        color = 0,
        size = 20,
        font = _NULL
    ) => {
        _ctx.font = ~~size + 'px ' + (font || _font)
        _ctx.fillStyle = _colors[~~color % _countColors]
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
     * Creates a offscreen canvas to draw on it
     *
     * @param {number} width
     * @param {number} height
     * @param {string[]|drawCallback} draw
     * @returns {OffscreenCanvas}
     *
     * @callback drawCallback
     * @param {OffscreenCanvas} canvas
     */
    instance.paint = (width, height, draw) => {
        const offscreenCanvas = new OffscreenCanvas(width, height),
            ctxOriginal = _ctx

        offscreenCanvas.width = width
        offscreenCanvas.height = height
        offscreenCanvas.ctx = offscreenCanvas.getContext('2d')
        _ctx = offscreenCanvas.ctx // override the context

        if (Array.isArray(draw)) {
            const imageData = _ctx.createImageData(width, height),
                pixels = imageData.data

            let x = 0,
                y = 0

            for (const str of draw) {
                for (const color of str.split('')) {
                    let pixelIndex = y * (width * 4) + x * 4
                    if (' ' !== color) {
                        let n = ~~color

                        // support for 16-color palettes
                        if (_countColors > 8) n = ~~parseInt(color, 16)

                        const c = _colors[n % _countColors]
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
     * Update the transform matrix
     *
     * @param {number} translateX
     * @param {number} translateY
     * @param {number} scale
     * @param {number} angle in radians
     */
    instance.transform = (translateX, translateY, scale = 1, angle = 0) => {
        _ctx.setTransform(scale, 0, 0, scale, translateX, translateY)
        _ctx.rotate(angle)
    }

    /**
     * Sets the alpha (transparency) value to apply when drawing new shapes and images
     *
     * @param {number} alpha from 0 to 1 (e.g: 0.5 = 50% transparent)
     * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalAlpha
     */
    instance.alpha = (alpha = 1) => {
        _ctx.globalAlpha = alpha
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
     */
    instance.push = () => _ctx.save()

    /**
     * restores the drawing style settings and transformations
     */
    instance.pop = () => _ctx.restore()

    /** SOUND API */
    /**
     * Play a defined sound or a array of params for Zzfx
     *
     * @param {number|Array} sound
     * @param {number} volume
     * @param {number} pitch
     * @param {number} randomness
     * @returns {AudioBufferSourceNode}
     */
    instance.sfx = (sound = 0, volume = 1, pitch = 0, randomness = 0) => {
        if (
            navigator.userActivation &&
            !navigator.userActivation.hasBeenActive
        ) {
            return
        }

        let z = Array.isArray(sound) ? sound : _sounds[~~sound % _countSounds]
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
