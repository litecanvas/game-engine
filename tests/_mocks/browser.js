import { Canvas } from './canvas.js'
import { addEventListener, removeEventListener } from './events.js'

if (globalThis.window) throw 'global window object already exists'

globalThis.window = {}

globalThis.addEventListener = addEventListener
globalThis.removeEventListener = removeEventListener

globalThis.innerWidth = 1980
globalThis.innerHeight = 1080

globalThis.document = {
    readyState: null,
    _selectorsMock: {},

    createElement(tagName) {
        switch (tagName) {
            case 'canvas':
                return new Canvas()
            default:
                throw 'Unexpected tagName: ' + tagName
        }
    },

    querySelector(selector) {
        return this._selectorsMock[selector] || null
    },

    body: {
        children: [],

        appendChild(node) {
            this.children.push(node)
        },
    },
}

globalThis.AudioContext = class {
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

globalThis.AudioBuffer = class {}

let frames = 0
globalThis.requestAnimationFrame = (callback) => {
    let maxFrames = globalThis.maxFrames || 5
    if (frames >= maxFrames) return
    setTimeout(() => {
        callback(performance.now())
        frames++
    }, 1000 / 60)
}

globalThis.cancelAnimationFrame = () => {}

globalThis.navigator.userActivation = {
    hasBeenActive: true,
}
