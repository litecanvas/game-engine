import { zzfx } from './zzfx'
import { colors } from './colors'
import { sounds } from './sounds'

/*! litecanvas v0.9.0 by Luiz Bills | https://github.com/litecanvas/game-engine */
export default function litecanvas(settings = {}) {
    // helpers
    const g = window,
        doc = document,
        body = doc.body,
        math = Math,
        on = (elem, evt, callback) => elem.addEventListener(evt, callback),
        off = (elem, evt, callback) => elem.removeEventListener(evt, callback),
        _TWO_PI = math.PI * 2,
        _EMPTY_ARRAY = [],
        _UNDEFINED = void 0

    // engine instance
    const ei = {
        WIDTH: settings.width ?? 0,
        HEIGHT: settings.height ?? settings.width ?? 0,
        CANVAS: doc.createElement('canvas'),
        PARENT: settings.parent ?? body,
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

    let _fps = settings.fps ?? 60,
        _bg = settings.background ?? null,
        _globalize = settings.global ?? true,
        _antialias = settings.antialias ?? true,
        _pixelart = settings.pixelart,
        _fullscreen = settings.fullscreen ?? true,
        _autoscale = settings.autoscale ?? true,
        _tappingInterval = settings.tappingInterval ?? 100,
        _loop = settings.loop,
        _plugins = settings.plugins ?? [],
        _tapEvents = settings.tapEvents ?? true,
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
        _colors = colors,
        _sounds = sounds,
        _countColors = _colors.length,
        _countSounds = _sounds.length,
        // functions to be used by plugins
        _h = {
            settings,
            set(key, value) {
                ei[key] = value
                if (_globalize) {
                    g[key] = value
                }
            },
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
        _currentWidth = ei.WIDTH
        _currentHeight = ei.HEIGHT

        if (_tapEvents) {
            if (_hasMouse) {
                _tappingHandler = (ev) => {
                    _now = performance.now()
                    if (_now - _tapTime > _tappingInterval) {
                        _tapTime = _now
                        _updateTapping(true, ev.pageX, ev.pageY)
                    }
                }

                on(ei.CANVAS, 'mousedown', function (ev) {
                    ev.preventDefault()

                    on(body, 'mousemove', _tappingHandler)
                    _updateTapping(true, ev.pageX, ev.pageY)
                    _tapTime = _tapStart = performance.now()
                })

                on(ei.CANVAS, 'mouseup', function (ev) {
                    ev.preventDefault()

                    off(body, 'mousemove', _tappingHandler)
                    _updateTapping(false)

                    if (performance.now() - _tapStart <= 150) {
                        _updateTapped(true, ev.pageX, ev.pageY)
                    }
                })
            } else {
                // touch events will be enabled only if the device not has mouse
                let _touchX = 0
                let _touchY = 0

                _tappingHandler = (ev) => {
                    _now = performance.now()
                    if (_now - _tapTime > _tappingInterval) {
                        const touch = ev.touches[0]
                        _updateTapping(true, touch.pageX, touch.pageY)
                        _tapTime = _now
                    }
                }

                on(ei.CANVAS, 'touchstart', function (ev) {
                    ev.preventDefault()

                    const touch = ev.touches[0]
                    _touchX = touch.pageX
                    _touchY = touch.pageY
                    on(body, 'touchmove', _tappingHandler)
                    _updateTapping(true, touch.pageX, touch.pageY)
                    _tapTime = _tapStart = performance.now()
                })

                on(ei.CANVAS, 'touchend', function (ev) {
                    ev.preventDefault()

                    off(body, 'touchmove', _tappingHandler)
                    _updateTapping(false)

                    if (performance.now() - _tapStart <= 150) {
                        _updateTapped(true, _touchX, _touchY)
                    }
                })
            }
        }

        on(g, 'focus', () => {
            if (_rafid === 0) {
                _lastFrame = performance.now()
                _rafid = requestAnimationFrame(_frame)
            }
        })

        on(g, 'blur', () => {
            if (_rafid) {
                cancelAnimationFrame(_rafid)
                _rafid = 0
            }
            off(body, _hasMouse ? 'mousemove' : 'touchmove', _tappingHandler)
            _updateTapping(false)
        })

        _resize()

        if (_autoscale || _fullscreen) {
            on(g, 'resize', _resize)
        }

        if (_loop) {
            if (_loop.init) ei.loop.init.push(_loop.init)
            if (_loop.update) ei.loop.update.push(_loop.update)
            if (_loop.draw) ei.loop.draw.push(_loop.draw)
        } else {
            if (g.init) ei.loop.init.push(g.init)
            if (g.update) ei.loop.update.push(g.update)
            if (g.draw) ei.loop.draw.push(g.draw)
        }

        // set canvas background color
        if (null != _bg) {
            ei.CANVAS.style.backgroundColor = _colors[_bg % _countColors]
        }

        _loadPlugins()

        _callAll(ei.loop.init)

        _lastFrame = performance.now()
        _rafid = requestAnimationFrame(_frame)
    }

    function _frame() {
        let ticks = 0

        _now = performance.now()
        _dt = _now - _lastFrame
        _lastFrame = _now
        _accumulator += _dt

        // prevent long updates after lost focus
        if (_dt > 1000) {
            _accumulator = _delta
        }

        while (_accumulator >= _delta) {
            // update
            _callAll(ei.loop.update, _step)
            _h.set('ELAPSED', ei.ELAPSED + _step)
            _accumulator -= _delta
            ticks++
            _resetTap()
        }

        if (ticks > 0) {
            // draw
            _callAll(ei.loop.draw)

            _draws.count++
            _draws.time += ticks * _step
            if (_draws.time >= 1) {
                _h.set('FPS', _draws.count)
                _draws.time -= 1
                _draws.count = 0
            }
        }

        _rafid = requestAnimationFrame(_frame)
    }

    function _loadPlugins() {
        // Sort the plugins by priority
        // Lower numbers correspond with earlier execution
        // By default, any plugins has priority = 10
        _plugins.sort((a, b) => (a.priority ?? 10) - (b.priority ?? 10))
        for (let i = 0; i < _plugins.length; ++i) ei.plugin(_plugins[i])
    }

    function _setupCanvas(canvas) {
        if (ei.WIDTH > 0 && _fullscreen) {
            _fullscreen = false
            ei.HEIGHT = ei.HEIGHT > 0 ? ei.HEIGHT : ei.WIDTH
        }

        canvas.width = ei.WIDTH
        canvas.height = ei.HEIGHT

        _h.set('CENTERX', ei.WIDTH / 2)
        _h.set('CENTERY', ei.HEIGHT / 2)

        if ('string' === typeof ei.PARENT) {
            ei.PARENT = doc.querySelector(ei.PARENT)
        }
        ei.PARENT.appendChild(canvas)

        canvas.ctx = canvas.getContext('2d')
        _ctx = canvas.ctx

        // default text style
        _ctx.textAlign = 'start'
        _ctx.textBaseline = 'top'

        canvas.style.display = 'block'

        if (_fullscreen) {
            canvas.style.position = 'absolute'
            canvas.style.top =
                canvas.style.bottom =
                canvas.style.left =
                canvas.style.right =
                    0
        } else if (_autoscale) {
            canvas.style.margin = 'auto'
        }

        if (_pixelart) {
            _antialias = false
        }

        if (!_antialias) {
            _ctx.imageSmoothingEnabled = false
            canvas.style.imageRendering = 'pixelated'
        }

        _offset.top = canvas.offsetTop
        _offset.left = canvas.offsetLeft
    }

    function _resize() {
        const canvas = ei.CANVAS

        if (!_autoscale && !_fullscreen) return

        _currentWidth = innerWidth
        _currentHeight = innerHeight

        if (_fullscreen) {
            canvas.width = _currentWidth
            canvas.height = _currentHeight
            _h.set('WIDTH', _currentWidth)
            _h.set('HEIGHT', _currentHeight)
        } else if (_autoscale) {
            _scale = math.min(
                _currentWidth / ei.WIDTH,
                _currentHeight / ei.HEIGHT
            )
            _scale = _pixelart ? math.floor(_scale) : _scale
            canvas.style.width = ei.WIDTH * _scale + 'px'
            canvas.style.height = ei.HEIGHT * _scale + 'px'
        }

        _h.set('CENTERX', ei.WIDTH / 2)
        _h.set('CENTERY', ei.HEIGHT / 2)

        _offset.top = canvas.offsetTop
        _offset.left = canvas.offsetLeft

        ei.textalign(
            _styles.textAlign || _UNDEFINED,
            _styles.textBaseline || _UNDEFINED
        )
        ei.linestyle(
            _styles.lineWidth || _UNDEFINED,
            _styles.lineJoin || _UNDEFINED,
            _styles.lineDash || _UNDEFINED
        )
    }

    function _makeGlobals() {
        for (const key in ei) {
            if (key in g) {
                console.warn(`${key} already exists in global context`)
                continue
            }
            g[key] = ei[key]
        }
    }

    function _resetTap() {
        _h.set('TAPPED', false)
    }

    function _updateTapped(tapped, x, y) {
        _h.set('TAPPED', tapped)
        _h.set('TAPX', (x - _offset.left) / _scale)
        _h.set('TAPY', (y - _offset.top) / _scale)
    }

    function _updateTapping(tapped, x, y) {
        _h.set('TAPPING', tapped)
        _h.set('TAPX', (x - _offset.left) / _scale)
        _h.set('TAPY', (y - _offset.top) / _scale)
    }

    function _callAll(fnArray, ...args) {
        for (let i = 0; i < fnArray.length; ++i) {
            fnArray[i](...args)
        }
    }

    /** MATH API */
    for (const fn of [
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
    ]) {
        // import some native Math functions
        ei[fn] = math[fn]
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
    ei.lerp = (start, end, t) => start + t * (end - start)

    /**
     * Convert degrees to radians
     *
     * @param {number} degs
     * @returns {number} the value in radians
     */
    ei.deg2rad = (degs) => (math.PI / 180) * degs

    /**
     * Convert radians to degrees
     *
     * @param {number} rads
     * @returns {number} the value in degrees
     */
    ei.rad2deg = (rads) => (180 / math.PI) * rads

    /**
     * Force a value within the boundaries by clamping it to the range min, max.
     *
     * @param {number} value
     * @param {number} min
     * @param {number} max
     * @returns {number}
     */
    ei.clamp = function (value, min, max) {
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
    ei.rand = (min = 0, max = 1) => math.random() * (max - min) + min

    /**
     * Generates a pseudo-random integer between min (inclusive) and max (inclusive)
     *
     * @param {number} min
     * @param {number} max
     * @returns {number} the random number
     */
    ei.randi = (min = 1, max = 100) =>
        ei.floor(ei.rand() * (max - min + 1) + min)

    /**
     * Returns `true` or `false` based on random percent chance (p)
     *
     * @param {number} p
     * @returns {boolean}
     */
    ei.chance = (p = 0.5) => ei.rand() <= p

    /**
     * Choose a random item from a Array
     *
     * @param {Array<T>} arr
     * @returns {T}
     */
    ei.choose = (arr) => arr[ei.randi(0, arr.length - 1)]

    /** BASIC GRAPHICS API */
    /**
     * Clear the game screen
     *
     * @param {number|null} color The background color (from 0 to 7) or null
     */
    ei.clear = (color) => {
        if (color == null) {
            _ctx.clearRect(0, 0, ei.WIDTH, ei.HEIGHT)
        } else {
            ei.rectfill(0, 0, ei.WIDTH, ei.HEIGHT, color)
        }
    }

    ei.rect = (x, y, width, height, color = 0) => {
        _ctx.strokeStyle = _colors[~~color % _countColors]
        _ctx.strokeRect(~~x, ~~y, ~~width, ~~height)
    }

    ei.rectfill = (x, y, width, height, color = 0) => {
        _ctx.fillStyle = _colors[~~color % _countColors]
        _ctx.fillRect(~~x, ~~y, ~~width, ~~height)
    }

    ei.circ = (x, y, radius, color = 0) => {
        _ctx.strokeStyle = _colors[~~color % _countColors]
        _ctx.beginPath()
        _ctx.arc(~~x, ~~y, ~~radius, 0, _TWO_PI)
        _ctx.closePath()
        _ctx.stroke()
    }

    ei.circfill = (x, y, radius, color = 0) => {
        _ctx.fillStyle = _colors[~~color % _countColors]
        _ctx.beginPath()
        _ctx.arc(~~x, ~~y, ~~radius, 0, _TWO_PI)
        _ctx.closePath()
        _ctx.fill()
    }

    ei.oval = (x, y, rx, ry, color = 0) => {
        _ctx.strokeStyle = _colors[~~color % _countColors]
        _ctx.beginPath()
        _ctx.ellipse(~~x + ~~rx, ~~y + ~~ry, ~~rx, ~~ry, 0, 0, _TWO_PI)
        _ctx.closePath()
        _ctx.stroke()
    }

    ei.ovalfill = (x, y, rx, ry, color = 0) => {
        _ctx.fillStyle = _colors[~~color % _countColors]
        _ctx.beginPath()
        _ctx.ellipse(~~x + ~~rx, ~~y + ~~ry, ~~rx, ~~ry, 0, 0, _TWO_PI)
        _ctx.closePath()
        _ctx.fill()
    }

    ei.line = (x1, y1, x2, y2, color = 0) => {
        _ctx.strokeStyle = _colors[~~color % _countColors]
        _ctx.beginPath()
        _ctx.moveTo(~~x1, ~~y1)
        _ctx.lineTo(~~x2, ~~y2)
        _ctx.stroke()
    }

    ei.linestyle = (width = 1, join = 'miter', dash = null) => {
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
    ei.text = (x, y, text, color = 0, size = null, font = 'monospace') => {
        size = size ? size : math.max(16, ei.HEIGHT / 16)
        _ctx.font = ~~size + 'px ' + font
        _ctx.fillStyle = _colors[~~color % _countColors]
        _ctx.fillText(text, ~~x, ~~y)
    }

    ei.textalign = (align = 'start', baseline = 'top') => {
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
    ei.image = (x, y, image) => {
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
    ei.paint = (width, height, draw) => {
        const offscreenCanvas = new OffscreenCanvas(width, height),
            ctxOriginal = _ctx

        offscreenCanvas.width = width
        offscreenCanvas.height = height
        offscreenCanvas.ctx = offscreenCanvas.getContext('2d')
        _ctx = offscreenCanvas.ctx // override the context

        if ('function' === typeof draw) {
            draw(offscreenCanvas)
        } else if (Array.isArray(draw)) {
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
    ei.transform = (translateX, translateY, scale = 1, angle = 0) => {
        _ctx.setTransform(scale, 0, 0, scale, translateX, translateY)
        _ctx.rotate(angle)
    }

    /**
     * Sets the alpha (transparency) value to apply when drawing new shapes and images
     *
     *
     * @param {number} alpha from 0 to 1 (e.g: 0.5 = 50% transparent)
     * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalAlpha
     */
    ei.alpha = (alpha = 1) => {
        _ctx.globalAlpha = alpha
    }

    /**
     * Sets the type of compositing operation to apply when drawing new shapes
     *
     * @param {string} mode
     * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation
     */
    ei.blendmode = (mode = 'source-over') => {
        _ctx.globalCompositeOperation = mode
    }

    /**
     * saves the current drawing style settings and transformations
     */
    ei.push = () => _ctx.save()

    /**
     * restores the drawing style settings and transformations
     */
    ei.pop = () => _ctx.restore()

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
    ei.sfx = (sound = 0, volume = 1, pitch = 0, randomness = 0) => {
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
    ei.colrect = (x1, y1, w1, h1, x2, y2, w2, h2) =>
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
    ei.colcirc = (x1, y1, r1, x2, y2, r2) =>
        (x2 - x1) ** 2 + (y2 - y1) ** 2 <= (r1 + r2) ** 2

    /** PLUGINS API */
    ei.plugin = (fn) => {
        const pluginData = 'function' === typeof fn ? fn(ei, _h) : fn
        if ('object' === typeof pluginData) {
            for (const key in pluginData) {
                _h.set(key, pluginData[key])
            }
        }
    }

    // Export to global (window)
    if (_globalize) {
        _makeGlobals()
    }

    _setupCanvas(ei.CANVAS)

    if ('loading' === doc.readyState) {
        on(g, 'DOMContentLoaded', _init)
    } else {
        _init()
    }

    return ei
}

window.litecanvas = litecanvas
