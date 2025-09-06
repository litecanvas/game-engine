import { GlobalRegistrator } from '@happy-dom/global-registrator'

/**
 * @param {LitecanvasInstance} instance
 * @param {string} event
 * @param {Function} callback
 * @returns {Promise<Function>}
 */
global.onLitecanvas = function (instance, event, callback) {
    return new Promise((resolve) => {
        const removeListener = instance.listen(event, (...args) => {
            const res = callback(...args)
            if (false !== res) {
                removeListener()
                resolve()
            }
        })
    })
}

GlobalRegistrator.register()

// maybe fix node navigator
if (!global.navigator) {
    global.navigator = {}
}

// fake userActivation
global.navigator.userActivation = global.navigator.userActivation || {}
global.navigator.userActivation.hasBeenActive = true

// fake AudioContext
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

// fake AudioBuffer
global.AudioBuffer = class {}

// fake requestAnimationFrame
global.requestAnimationFrame = (callback) => {
    return setTimeout(() => {
        callback(performance.now())
    }, 1000 / 60)
}

// fake cancelAnimationFrame
global.cancelAnimationFrame = (rafId) => {
    clearTimeout(rafId)
}

// fake canvas tag
createCanvasTag(window)

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

    const fn = () => {}
    const methods =
        'getContextAttributes,drawImage,beginPath,fill,stroke,clip,isPointInPath,isPointInStroke,createLinearGradient,createRadialGradient,createConicGradient,createPattern,createImageData,getImageData,putImageData,setLineDash,getLineDash,closePath,moveTo,lineTo,quadraticCurveTo,bezierCurveTo,arcTo,rect,roundRect,arc,ellipse,clearRect,fillRect,strokeRect,save,restore,reset,isContextLost,fillText,strokeText,measureText,scale,rotate,translate,transform,getTransform,setTransform,resetTransform,drawFocusIfNeeded'

    for (const method of methods.split(',')) {
        ctx[method] = fn
    }

    return ctx
}
