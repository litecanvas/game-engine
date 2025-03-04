/**
 * @param {any} condition
 * @param {string} message
 */
export const assert = (condition, message = 'Assertion failed') => {
    if (!condition) throw new Error(message)
}
