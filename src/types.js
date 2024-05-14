/**
 * @typedef LitecanvasOptions
 * @type {object}
 * @property {number} [fps=60] - target FPS
 * @property {boolean} [fullscreen=true]
 * @property {number} [width]
 * @property {number} [height]
 * @property {boolean} [autoscale=true]
 * @property {boolean} [pixelart=false]
 * @property {number} [background]
 * @property {boolean} [antialias=true]
 * @property {string} [canvas]
 * @property {boolean} [global=true]
 * @property {number} [tappingInterval=100]
 * @property {boolean} [tapEvents=true]
 * @property {LitecanvasGameLoop} [loop]
 */

/**
 * @typedef LitecanvasInstance
 * @type {object}
 */

/**
 * @typedef LitecanvasGameLoop
 * @type {object}
 * @property {() => void} [init]
 * @property {(dt: number) => void} [update]
 * @property {() => void} [draw]
 * @property {() => void} [resized]
 */

/**
 * @typedef LitecanvasGameLoopListeners
 * @type {object}
 * @property {Function[]} init
 * @property {Function[]} update
 * @property {Function[]} draw
 * @property {Function[]} resized
 */

/**
 * @callback drawCallback
 * @param {OffscreenCanvas} offcanvas
 * @param {CanvasRenderingContext2D} context
 * @returns {void}
 */

/**
 * @typedef LitecanvasPluginHelpers
 * @type {object}
 * @property {string[]} colors - the instance color palette
 * @property {number[][]} sounds - the instance ZzFX sounds
 * @property {LitecanvasOptions} settings - an copy of this instance settings
 */

/**
 * @callback pluginCallback
 * @param {LitecanvasInstance} instance - The litecanvas instance
 * @param {LitecanvasPluginHelpers} helpers
 * @returns
 */
