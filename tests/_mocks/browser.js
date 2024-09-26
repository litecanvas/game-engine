import { Canvas } from './canvas.js'
import { addEventListener } from './events.js'

if (globalThis.window) throw 'global window object already exists'

globalThis.window = {}

globalThis.addEventListener = addEventListener

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

globalThis.requestAnimationFrame = () => {}

globalThis.cancelAnimationFrame = () => {}

globalThis.navigator = {
    userActivation: {
        hasBeenActive: true,
    },
}
