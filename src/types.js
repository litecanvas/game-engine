/**
 * @typedef LitecanvasOptions
 * @type {object}
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
 * @param {CanvasRenderingContext2D|OffscreenCanvasRenderingContext2D} context
 * @returns {void}
 */

/**
 * @typedef LitecanvasPluginHelpers
 * @type {object}
 * @property {string[]} colors The instance color palette
 * @property {LitecanvasOptions} settings Litecanvas instance settings (read-only)
 */

/**
 * @callback pluginCallback
 * @param {LitecanvasInstance} instance The litecanvas instance
 * @param {LitecanvasPluginHelpers} helpers
 * @param {any?} [config] - option plugin configuration
 * @returns
 */
