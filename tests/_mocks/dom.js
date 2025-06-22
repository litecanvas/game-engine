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
    // add AudioContext
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

    // add AudioBuffer
    global.AudioBuffer = class {}

    // add requestAnimationFrame
    global.requestAnimationFrame = (callback) => {
        return setTimeout(() => {
            callback(performance.now())
        }, 1000 / 60)
    }

    // add cancelAnimationFrame
    global.cancelAnimationFrame = (id) => {
        clearTimeout(id)
    }

    // add canvas element
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
                    this.context = createContext2d(this)
                }
                return this.context
            }
            el.width = 300
            el.height = 150
        }
        return el
    }
}

function createContext2d(canvas) {
    const ctx = {
        _calls: [],

        canvas,

        fillStyle: '#000000',
        font: '10px sans-serif',
        globalAlpha: 1,
        globalCompositeOperation: 'source-over',
        imageSmoothingEnabled: true,
        lineDashOffset: 0,
        lineWidth: 1,
        strokeStyle: '#000000',
        textAlign: 'start',
        textBaseline: 'alphabetic',
        textRendering: 'auto',
    }

    return new Proxy(ctx, {
        set(target, prop, value) {
            target._calls.push(`set ${prop} ${value}`)
            target[prop] = value
            return true
        },
        get(target, prop, receiver) {
            const value = target[prop]
            if (value === undefined || value instanceof Function) {
                return function (...args) {
                    target._calls.push(`${prop}(${formatArgs(args).join(',')})`)
                    return value ? value.apply(this === receiver ? target : this, args) : true
                }
            }
            return value
        },
    })
}

function formatArgs(args) {
    const result = []
    const literals = ['number', 'string']
    for (const arg of args) {
        const type = typeof arg
        if (literals.indexOf(type) >= 0) {
            result.push(arg)
        } else if ('boolean' === type) {
            result.push(`bool(${arg ? 'true' : 'false'})`)
        } else if ('undefined' === type) {
            result.push('undefined')
        } else if (null === arg) {
            result.push('null')
        } else {
            result.push(arg.toString())
        }
    }
    return result
}
