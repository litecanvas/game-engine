/**
 * @typedef LitecanvasOptions
 * @type {object}
 * @property {number} [fps=60]
 * @property {boolean} [fullscreen=true]
 * @property {number} [width]
 * @property {number} [height]
 * @property {boolean} [pauseOnBlur=true]
 * @property {boolean} [autoscale=true]
 * @property {boolean} [pixelart=false]
 * @property {boolean} [antialias=false]
 * @property {string} [canvas]
 * @property {boolean} [global=true]
 * @property {boolean} [tapEvents=true]
 * @property {boolean} [keyboardEvents=true]
 * @property {boolean} [animate=true]
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
 * @property {(tapX: number, tapY: number, tapId: number) => void} [tap]
 * @property {(tapX: number, tapY: number, tapId: number) => void} [untap]
 * @property {(tapX: number, tapY: number, tapId: number) => void} [tapping]
 * @property {(tapX: number, tapY: number, tapId: number) => void} [tapped]
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
 * @property {string[]} colors The instance color palette
 * @property {LitecanvasOptions} settings An copy of this instance settings
 */

/**
 * @callback pluginCallback
 * @param {LitecanvasInstance} instance The litecanvas instance
 * @param {LitecanvasPluginHelpers} helpers
 * @returns
 */
