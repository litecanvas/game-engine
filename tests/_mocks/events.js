export function addEventListener(eventName, callback, options = {}) {
    this._events = this._events || []
    this._events[eventName] = this._events[eventName] || []
    this._events[eventName].push({ callback, options })
}
