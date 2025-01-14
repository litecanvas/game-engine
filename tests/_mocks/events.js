export const _listeners = []

/**
 * @param {string} eventName
 * @param {Function} callback
 * @param {boolean|object} options
 */
export function addEventListener(eventName, callback, options = false) {
    _listeners.push([this, eventName, callback, options])
}

/**
 * @param {string} eventName
 * @param {Function} callback
 * @param {boolean|object} options
 */
export function removeEventListener(eventName, callback, options = false) {
    for (let i = 0; i < _listeners.length; i++) {
        const args = _listeners[i]

        if (args[0] !== this) continue
        if (args[1] !== eventName) continue
        if (args[2] !== callback) continue
        if (args[3] !== options) continue

        _listeners.splice(i, 1)
    }
}
