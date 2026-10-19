/**
 *
 * @param {number} seed an unsigned 32-bit integer
 * @param {number} t
 * @param {typeof Math.imul} i
 * @returns {() => number}
 */
export const mulberry32 = (seed) => {
    return () => {
        let t = (seed += 0x6d2b79f5)
        t = Math.imul(t ^ (t >>> 15), t | 1)
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296
    }
}
