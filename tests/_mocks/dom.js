import { JSDOM } from 'jsdom'

export function setupDOM() {
    const dom = new JSDOM('<!doctype><html><body></body></html>')

    dom.window.innerWidth = 800
    dom.window.innerWidth = 600

    global.document = dom.window.document
    global.window = global.globalThis = dom.window

    // fix node navigator
    if (!global.navigator) {
        global.navigator = {}
    }

    global.navigator.userActivation = {
        hasBeenActive: true,
    }

    setupOtherStuffs(window)

    return dom
}

/**
 * @param {Window} window
 */
function setupOtherStuffs(window) {
    global.AudioContext = class {
        createBuffer() {
            return {
                getChannelData() {
                    return new Map()
                },
            }
        }

        createBufferSource() {
            return {
                connect() {},
                start() {},
            }
        }
    }

    global.AudioBuffer = class {}

    global.requestAnimationFrame = (callback) => {
        return setTimeout(() => {
            callback(performance.now())
        }, 1000 / 60)
    }

    global.cancelAnimationFrame = (id) => {
        clearTimeout(id)
    }

    // fake canvas element
    createCanvasTag(window)
}

/**
 * @param {Window & globalThis} window
 * @returns {HTMLElement}
 */
function createCanvasTag(window) {
    const _createElement = global.window.document.createElement

    /**
     * @param {string} tagName
     * @param {*} options
     */
    window.document.createElement = function (tagName, options) {
        const el = _createElement.apply(window.document, arguments)
        if ('canvas' === tagName.toLowerCase()) {
            el.getContext = function (type) {
                if (!this.context) {
                    this.context = new CanvasRenderingContextMock(type, this)
                }
                return this.context
            }
            el.width = 300
            el.height = 150
        }
        return el
    }
}

class CanvasRenderingContextMock {
    width = 300
    height = 150

    canvas = null
    _type = null

    _calls = []

    constructor(type, canvas) {
        this._type = type
        this.canvas = canvas
    }

    beginPath() {
        this._calls.push('beginPath')
    }

    rect(x, y, width, height) {
        this._calls.push(`rect ${x},${y},${width},${height}`)
    }

    clearRect(x, y, width, height) {
        this._calls.push(`clearRect ${x},${y},${width},${height}`)
    }

    fill() {
        this._calls.push('fill')
    }

    /**
     * @param {string} value
     */
    set fillStyle(value) {
        this._calls.push(`set fillStyle ${value}`)
    }
}
