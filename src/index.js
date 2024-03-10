import { zzfx } from './zzfx'
import { colors } from './colors'
import { sounds } from './sounds'

/*! litecanvas v0.4.0 by Luiz Bills | https://github.com/litecanvas/engine */
export default function litecanvas(opts = {}) {
    const g = window
    const body = g.document.body
    const on = (elem, evt, callback) => elem.addEventListener(evt, callback)
    const off = (elem, evt, callback) => elem.removeEventListener(evt, callback)

    // engine instance
    const ei = {
        WIDTH: opts.width ?? null,
        HEIGHT: opts.height ?? opts.width ?? null,
        CANVAS: g.document.createElement('canvas'),
        PARENT: opts.parent ?? body,
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

    let _fps = opts.fps ?? 60,
        _bg = opts.background ?? 0,
        _globalize = opts.global ?? true,
        _antialias = opts.antialias ?? true,
        _pixelart = opts.pixelart ?? false,
        _fullscreen = opts.fullscreen ?? true,
        _autoscale = opts.autoscale ?? true,
        _tappingInterval = opts.tappingInterval ?? 100,
        _loop = opts.loop ?? {},
        _plugins = opts.plugins ?? [],
        _touchSupported = 'ontouchstart' in g || g.navigator.maxTouchPoints > 0,
        _tapStart = 0,
        _tapTime = 0,
        _tappingHandler = null,
        _scale = 1,
        _offset = { top: 0, left: 0 },
        _currentWidth = null,
        _currentHeight = null,
        /** @var {CanvasRenderingContext2D} _ctx */
        _ctx = null,
        _styles = {},
        // game loop variables
        _now = null,
        _lastFrame = 0,
        _dt = 0,
        _step = 1 / _fps,
        _delta = 1000 / _fps,
        _accumulator = 0,
        _rafid = 0,
        _draws = { count: 0, time: 0 },
        // math
        _DEG_TO_RAD = Math.PI / 180,
        _RAD_TO_DEG = 180 / Math.PI,
        _TWO_PI = Math.PI * 2,
        // helpers
        _EMPTY_ARRAY = [],
        _UN = undefined,
        _colors = colors,
        _sounds = sounds,
        _h = {
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
        },
        _countColors = _colors.length,
        _countSounds = _sounds.length

    function _init() {
        off(g, 'DOMContentLoaded', _init)

        _RATIO = ei.WIDTH / ei.HEIGHT
        _currentWidth = ei.WIDTH
        _currentHeight = ei.HEIGHT

        // detect touch support
        if (_touchSupported) {
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
        } else {
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
            off(
                body,
                _touchSupported ? 'mousemove' : 'touchmove',
                _tappingHandler
            )
            _updateTapping(false)
        })

        _resize()

        if (_autoscale || _fullscreen) {
            on(g, 'resize', _resize)
        }

        if (_loop.init || g.init) ei.loop.init.push(_loop.init || g.init)
        if (_loop.update || g.update)
            ei.loop.update.push(_loop.update || g.update)
        if (_loop.draw || g.draw) ei.loop.draw.push(_loop.draw || g.draw)

        _loadPlugins()

        for (const cb of ei.loop.init) cb()

        // set canvas background color
        if (null != _bg) {
            ei.CANVAS.style.backgroundColor = _colors[_bg % _countColors]
        }

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
            for (const cb of ei.loop.update) cb(_step)
            _h.set('ELAPSED', ei.ELAPSED + _step)
            _accumulator -= _delta
            ticks++
            _resetTap()
        }

        if (ticks > 0) {
            // draw
            for (const cb of ei.loop.draw) cb()

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

        for (const fn of _plugins) {
            ei.plugin(fn)
        }
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

        _currentWidth = g.innerWidth
        _currentHeight = g.innerHeight

        if (_fullscreen) {
            canvas.width = _currentWidth
            canvas.height = _currentHeight
            _h.set('WIDTH', _currentWidth)
            _h.set('HEIGHT', _currentHeight)
        } else if (_autoscale) {
            _scale = Math.min(
                _currentWidth / ei.WIDTH,
                _currentHeight / ei.HEIGHT
            )
            _scale = _pixelart ? Math.floor(_scale) : _scale
            canvas.style.width = ei.WIDTH * _scale + 'px'
            canvas.style.height = ei.HEIGHT * _scale + 'px'
        }

        _h.set('CENTERX', ei.WIDTH / 2)
        _h.set('CENTERY', ei.HEIGHT / 2)

        _offset.top = canvas.offsetTop
        _offset.left = canvas.offsetLeft

        ei.textalign(_styles.textAlign || _UN, _styles.textBaseline || _UN)
        ei.linestyle(
            _styles.lineWidth || _UN,
            _styles.lineJoin || _UN,
            _styles.lineDash || _UN
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

    /** MATH API */
    // import some native Math functions
    for (const m of [
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
        ei[m] = g.Math[m]
    }

    /**
     * Calculates a linear (interpolation) value over t.
     *
     * @param {number} a - The first value.
     * @param {number} b - The second value.
     * @param {number} t - The percentage between a and b to return, represented as a number between 0 and 1.
     * @returns {number} The step t% of the way between a and b.
     */
    ei.lerp = (a, b, t) => a + (b - a) * t

    /**
     * Absolute distance between two numbers
     *
     * @param {Number} a
     * @param {Number} b
     * @returns Number
     */
    ei.distance = (a, b) => Math.abs(a - b)

    /**
     * Convert degrees to radians
     *
     * @param {Number} degs
     * @returns Number
     */
    ei.deg2rad = (degs) => degs * _DEG_TO_RAD

    /**
     * Convert radians to degrees
     *
     * @param {Number} rads
     * @returns Number
     */
    ei.rad2deg = (rads) => rads * _RAD_TO_DEG

    /**
     * Force a value within the boundaries by clamping it to the range min, max.
     *
     * @param {number} value
     * @param {number} min
     * @param {number} max
     * @returns {number}
     */
    ei.clamp = function (value, min, max) {
        return g.Math.min(Math.max(value, min), max)
    }

    /** RNG API */
    /**
     * Generates a pseudo-random float between min (inclusive) and max (exclusive)
     *
     * @param {number} min
     * @param {number} max
     * @returns {number}
     */
    ei.rand = (min = 0, max = 1) => g.Math.random() * (max - min) + min

    /**
     * Generates a pseudo-random integer between min (inclusive) and max (inclusive)
     *
     * @param {number} min
     * @param {number} max
     * @returns {number}
     */
    ei.randi = (min = 1, max = 100) =>
        ei.floor(g.Math.random() * (max - min + 1) + min)

    /**
     * Returns `true` or `false` based on random chance (p)
     */
    ei.chance = (p = 0.5) => ei.rand() <= p

    /**
     * Choose a random item from a Array.
     */
    ei.choose = (arr) => arr[ei.randi(0, arr.length - 1)]

    /** BASIC GRAPHICS API */
    ei.clear = (color = null) => {
        if (null == color) {
            _ctx.clearRect(0, 0, ei.WIDTH, ei.HEIGHT)
        } else {
            _ctx.fillStyle = _colors[~~color % _countColors]
            _ctx.beginPath()
            _ctx.fillRect(0, 0, ei.WIDTH, ei.HEIGHT)
        }
    }

    ei.rect = (x, y, width, height, color = 0) => {
        _ctx.strokeStyle = _colors[~~color % _countColors]
        _ctx.beginPath()
        _ctx.strokeRect(~~x, ~~y, ~~width, ~~height)
    }

    ei.rectfill = (x, y, width, height, color = 0) => {
        _ctx.fillStyle = _colors[~~color % _countColors]
        _ctx.beginPath()
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

    ei.poly = (points, color = 0) => {
        _ctx.strokeStyle = _colors[~~color % _countColors]
        _ctx.beginPath()
        const len = points.length
        for (let i = 0; i < len; i += 2) {
            0 === i
                ? _ctx.moveTo(~~points[i], ~~points[i + 1])
                : _ctx.lineTo(~~points[i], ~~points[i + 1])
        }
        // _ctx.lineTo(~~points[0], ~~points[1])
        _ctx.stroke()
    }

    ei.polyfill = (points, color = 0) => {
        _ctx.fillStyle = _colors[~~color % _countColors]
        _ctx.beginPath()
        const len = points.length
        for (let i = 0; i < len; i += 2) {
            0 === i
                ? _ctx.moveTo(~~points[i], ~~points[i + 1])
                : _ctx.lineTo(~~points[i], ~~points[i + 1])
        }
        // _ctx.lineTo(points[0], points[1])
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
        size = size ? size : Math.max(16, ei.HEIGHT / 16)
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
     * @param {string[] | drawCallback} draw
     * @returns {OffscreenCanvas}
     *
     * @callback drawCallback
     * @param {OffscreenCanvas} canvas
     */
    ei.paint = (width, height, draw) => {
        const offscreen = new OffscreenCanvas(width, height),
            ctxOriginal = _ctx

        offscreen.width = width
        offscreen.height = height
        _ctx = offscreen.getContext('2d') // override the context

        if ('function' === typeof draw) {
            draw(offscreen, _ctx)
        } else if (Array.isArray(draw)) {
            const imageData = _ctx.createImageData(width, height),
                pixels = imageData.data

            let x = (y = 0)
            for (const str of draw) {
                for (const color of str.split('')) {
                    let pixelIndex = y * (width * 4) + x * 4
                    if (' ' === color || '.' === color) {
                        pixels[pixelIndex] = 0
                        pixels[pixelIndex + 1] = 0
                        pixels[pixelIndex + 2] = 0
                        pixels[pixelIndex + 3] = 0
                    } else {
                        c = _colors[~~parseInt(color, 16)]
                        const r = parseInt(c.slice(1, 3), 16),
                            g = parseInt(c.slice(3, 5), 16),
                            b = parseInt(c.slice(5, 7), 16)

                        pixels[pixelIndex] = r
                        pixels[pixelIndex + 1] = g
                        pixels[pixelIndex + 2] = b
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

        return offscreen
    }

    /** ADVANCED GRAPHICS API */
    ei.transform = (translateX, translateY, scale = 1, angle = 0) => {
        _ctx.setTransform(scale, 0, 0, scale, translateX, translateY)
        _ctx.rotate(angle)
    }

    ei.alpha = (alpha = 1) => {
        _ctx.globalAlpha = alpha
    }

    ei.blendmode = (mode = 'source-over') => {
        _ctx.globalCompositeOperation = mode
    }

    ei.push = () => _ctx.save()

    ei.pop = () => _ctx.restore()

    /** SOUND API */
    /**
     * Play a defined sound or a array of params for Zzfx
     *
     * @param {number|Array} sound
     * @param {number} volume
     * @param {number} pitch
     * @param {number|null} randomness
     * @returns {AudioBufferSourceNode}
     */
    ei.sfx = (sound = 0, volume = 1, pitch = 0, randomness = null) => {
        if (
            navigator.userActivation &&
            !navigator.userActivation.hasBeenActive
        ) {
            return
        }

        let z = Array.isArray(sound) ? sound : _sounds[~~sound % _countSounds]
        if (volume !== 1 || pitch !== 0 || randomness != null) {
            z = [...z] // clone the sound to not modify the original
            z[0] = (Number(volume) || 1) * (z[0] || 1)
            z[1] = randomness >= 0 ? randomness : undefined
            z[10] = ~~z[10] + ~~pitch
        }
        return zzfx(...z)
    }

    /** UTILS API */
    ei.collision = (x1, y1, w1, h1, x2, y2, w2, h2) => {
        return x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2
    }

    /** PLUGINS API */
    ei.plugin = (fn) => {
        const pluginData = fn(ei, _h)
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

    if ('loading' === g.document.readyState) {
        on(g, 'DOMContentLoaded', _init)
    } else {
        _init()
    }

    return ei
}

window.litecanvas = litecanvas
