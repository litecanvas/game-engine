import { addEventListener, removeEventListener } from './events.js'

export class Canvas {
    width = 300
    height = 150
    context = null
    _calls = []
    _style = {}

    addEventListener = addEventListener
    removeEventListener = removeEventListener

    getContext(type) {
        this._calls.push(`getContext ${type}`)
        if (!this.context) {
            this.context = new CanvasRenderingContextMock(type)
        }
        return this.context
    }

    get style() {
        return this._style
    }

    set style(value) {
        if (!value) {
            this._style = {}
        } else {
            this._style = value
        }
    }
}

class CanvasRenderingContextMock {
    _type = null

    _calls = []

    constructor(type) {
        this._type = type
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
