import './types.d.ts'

/**
 * The litecanvas constructor
 */
export default function litecanvas(settings?: LitecanvasOptions): LitecanvasInstance

declare global {
    function litecanvas(settings?: LitecanvasOptions): LitecanvasInstance

    /** The game screen width */
    var W: number
    /** The game screen height */
    var H: number
    /** the amount of time (in seconds) since the game started */
    var T: number
    /** The current mouse's horizontal (X) position or -1 (if the mouse was not used or detected) */
    var MX: number
    /** The current mouse's vertical (Y) position or -1 (if the mouse was not used or detected) */
    var MY: number

    /** MATH API */
    /**
     * The value of the mathematical constant PI (π).
     * Approximately 3.14159
     */
    var PI: number
    /**
     * Twice the value of the mathematical constant PI (π).
     * Approximately 6.28318
     *
     * Note: TWO_PI radians equals 360°, PI radians equals 180°,
     * HALF_PI radians equals 90°, and HALF_PI/2 radians equals 45°.
     */
    var TWO_PI: number
    /**
     * Half the value of the mathematical constant PI (π).
     * Approximately 1.57079
     */
    var HALF_PI: number
    /**
     * Calculates a linear (interpolation) value over t%.
     *
     * @param start
     * @param end
     * @param t The progress in percentage, where 0 = 0% and 1 = 100%.
     * @returns The unterpolated value
     * @tutorial https://gamedev.net/tutorials/programming/general-and-gameplay-programming/a-brief-introduction-to-lerp-r4954/
     */
    function lerp(start: number, end: number, t: number): number
    /**
     * Convert degrees to radians
     *
     * @param degs
     * @returns the value in radians
     */
    function deg2rad(degs: number): number
    /**
     * Convert radians to degrees
     *
     * @param rads
     * @returns the value in degrees
     */
    function rad2deg(rads: number): number
    /**
     * Returns the rounded value of an number to optional precision (number of digits after the decimal point).
     *
     * @param n number to round.
     * @param [precision] number of decimal digits to round to, default is 0.
     * @returns the rounded number.
     */
    function round(n: number, precision?: number): number
    /**
     * Constrains a number between `min` and `max`.
     *
     * @param value
     * @param min
     * @param max
     * @returns
     */
    function clamp(value: number, min: number, max: number): number
    /**
     * Wraps a number between `min` (inclusive) and `max` (exclusive).
     *
     * @param value
     * @param min
     * @param max
     * @returns the wrapped number
     */
    function wrap(value: number, min: number, max: number): number
    /**
     * Re-maps a number from one range to another.
     *
     * @param value  the value to be remapped.
     * @param start1 lower bound of the value's current range.
     * @param stop1  upper bound of the value's current range.
     * @param start2 lower bound of the value's target range.
     * @param stop2  upper bound of the value's target range.
     * @param [withinBounds=false] constrain the value to the newly mapped range
     * @returns the remapped number
     */
    function map(
        value: number,
        start1: number,
        stop1: number,
        start2: number,
        stop2: number,
        withinBounds?: boolean
    ): number
    /**
     * Maps a number from one range to a value between 0 and 1.
     * Identical to `map(value, min, max, 0, 1)`.
     * Note: Numbers outside the range are not clamped to 0 and 1.
     *
     * @param value
     * @param start
     * @param stop
     * @returns the normalized number.
     */
    function norm(value: number, start: number, stop: number): number
    /**
     * Interpolate between 2 values using a periodic function.
     *
     * @param from - the lower bound
     * @param to - the higher bound
     * @param t - the value passed to the periodic function
     * @param fn= - the periodic function (which default to `Math.sin`)
     */
    function wave(from: number, to: number, t: number, fn?: (n: number) => number): number
    /**
     * Returns the sine of a number in radians
     */
    function sin(n: number): number
    /**
     * Returns the cosine of a number in radians
     */
    function cos(n: number): number
    /**
     * Returns the angle in the plane (in radians) between the positive x-axis and the ray from (0, 0) to the point (x, y)
     */
    function atan2(y: number, x: number): number
    /**
     * Returns the square root of the sum of squares of its arguments.
     */
    function hypot(...ns: number[]): number
    /**
     * Returns the tangent of a number in radians.
     */
    function tan(n: number): number
    /**
     * Returns the absolute value of a number.
     */
    function abs(n: number): number
    /**
     * Always rounds up and returns the smallest integer greater than or equal to a given number.
     */
    function ceil(n: number): number
    /**
     * Returns the value of a number rounded to the nearest integer.
     */
    function round(n: number): number
    /**
     * Always rounds down and returns the largest integer less than or equal to a given number.
     */
    function floor(n: number): number
    /**
     * Returns the integer part of a number by removing any fractional digits.
     */
    function trunc(n: number): number
    /**
     * Returns the smallest of the numbers given as input parameters, or `Infinity` if there are no parameters.
     */
    function min(...ns: number[]): number
    /**
     * Returns the largest of the numbers given as input parameters, or `-Infinity` if there are no parameters.
     */
    function max(...ns: number[]): number
    /**
     * Returns the value of a base raised to a power.
     */
    function pow(base: number, exponent: number): number
    /**
     * Returns the square root of a number.
     */
    function sqrt(n: number): number
    /**
     * Returns 1 or -1, indicating the sign of the number passed as argument.
     * If the input is 0 or -0, it will be returned as-is.
     */
    function sign(n: number): number
    /**
     * Returns the Euler's number raised to the power of a number.
     */
    function exp(exponent: number): number

    /** RNG API */
    /**
     * Generates a pseudorandom float between min (inclusive) and max (exclusive)
     *
     * @param [min=0.0]
     * @param [max=1.0]
     * @returns the random number
     */
    function rand(min?: number, max?: number): number
    /**
     * Generates a pseudorandom integer between min (inclusive) and max (inclusive)
     *
     * @param [min=0]
     * @param [max=1]
     * @returns the random number
     */
    function randi(min?: number, max?: number): number
    /**
     * Initializes the random number generator with an explicit seed value.
     *
     * Note: The seed should be a integer number greater than or equal to zero.
     *
     * @param value
     */
    function rseed(value: number): void

    /** BASIC GRAPHICS API */
    /**
     * Clear the game screen with an optional color
     *
     * @param color The background color index or `null`
     */
    function cls(color: number | null): void

    /**
     * Draw a rectangle outline
     *
     * @param x
     * @param y
     * @param width
     * @param height
     * @param [color=0] the color index
     * @param [radii] A number or list specifying the radii used to draw a rounded-borders rectangle
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/roundRect
     */
    function rect(
        x: number,
        y: number,
        width: number,
        height: number,
        color?: number,
        radii?: number | number[]
    ): void
    /**
     * Draw a color-filled rectangle
     *
     * @param x
     * @param y
     * @param width
     * @param height
     * @param [color=0] the color index
     * @param [radii] A number or list specifying the radii used to draw a rounded-borders rectangle
     */
    function rectfill(
        x: number,
        y: number,
        width: number,
        height: number,
        color?: number,
        radii?: number | number[]
    ): void
    /**
     * Draw a circle outline
     *
     * @param x
     * @param y
     * @param radius
     * @param [color=0] the color index
     */
    function circ(x: number, y: number, radius: number, color?: number): void
    /**
     * Draw a color-filled circle
     *
     * @param x
     * @param y
     * @param radius
     * @param [color=0] the color index
     */
    function circfill(x: number, y: number, radius: number, color?: number): void
    /**
     * Draw a ellipse outline
     *
     * @param x
     * @param y
     * @param radiusX
     * @param radiusY
     * @param [color=0] the color index
     */
    function oval(x: number, y: number, radiusX: number, radiusY: number, color?: number): void
    /**
     * Draw a color-filled ellipse
     *
     * @param x
     * @param y
     * @param radiusX
     * @param radiusY
     * @param [color=0] the color index
     */
    function ovalfill(x: number, y: number, radiusX: number, radiusY: number, color?: number): void
    /**
     * Draw a line
     *
     * @param x1
     * @param y1
     * @param x2
     * @param y2
     * @param [color=0] the color index
     */
    function line(x1: number, y1: number, x2: number, y2: number, color?: number): void
    /**
     * Sets the thickness of lines
     *
     * @param value
     * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineWidth
     */
    function linewidth(value: number): void
    /**
     * Sets the line dash pattern used when drawing lines
     *
     * @param segments the line dash pattern
     * @param [offset=0] the line dash offset, or "phase".
     * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setLineDash
     * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineDashOffset
     */
    function linedash(segments: number[], offset?: number): void

    /** TEXT RENDERING API */
    /**
     * Draw text
     *
     * @param x
     * @param y
     * @param message the text message
     * @param [color=3] the color index
     * @param [fontStyle="normal"] can be "normal" (default), "italic" and/or "bold"
     */
    function text(x: number, y: number, message: string, color?: number, fontStyle?: string): void
    /**
     * Set the font family
     *
     * @param fontFamily
     */
    function textfont(fontFamily: string): void
    /**
     * Set the font size
     *
     * @param size
     */
    function textsize(size: number): void
    /**
     * Sets the alignment used when drawing texts
     *
     * @param align the horizontal alignment. Possible values: "left", "right", "center", "start" or "end"
     * @param baseline the vertical alignment. Possible values: "top", "bottom", "middle", "hanging" or "ideographic"
     * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/textBaseline
     * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/textAlign
     */
    function textalign(align: CanvasTextAlign, baseline: CanvasTextBaseline): void

    /** IMAGE GRAPHICS API */
    /**
     * Draw an image
     *
     * @param x
     * @param y
     * @param source
     */
    function image(
        x: number,
        y: number,
        source: OffscreenCanvas | HTMLImageElement | HTMLCanvasElement
    ): void
    /**
     * Draw in an OffscreenCanvas and returns its image.
     *
     * @param width
     * @param height
     * @param drawing
     * @param [options]
     * @see https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas
     */
    function paint(
        width: number,
        height: number,
        drawing: string[] | drawCallback,
        options?: {
            scale?: number
            canvas?: OffscreenCanvas
        }
    ): ImageBitmap

    /** ADVANCED GRAPHICS API */
    /**
     * Get or set the canvas context 2D
     *
     * @param [context] an new canvas context
     * @returns the current canvas context
     * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
     */
    function ctx(
        context?: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D
    ): CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D
    /**
     * saves the current drawing style settings and transformations
     * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/save
     */
    function push(): void
    /**
     * restores the drawing style settings and transformations
     * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/restore
     */
    function pop(): void
    /**
     * Adds a translation transformation to the current matrix
     *
     * @param x
     * @param y
     */
    function translate(x: number, y: number): void
    /**
     * Adds a scaling transformation to the canvas units horizontally and/or vertically.
     *
     * @param x
     * @param [y]
     */
    function scale(x: number, y?: number): void
    /**
     * Adds a rotation to the transformation matrix
     *
     * @param radians
     */
    function rotate(radians: number): void
    /**
     * Sets the alpha (transparency) value to apply when drawing new shapes and images
     *
     * @param value float from 0 to 1 (e.g: 0.5 = 50% transparent)
     * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalAlpha
     */
    function alpha(value: number): void
    /**
     * Fills the current path with a given color.
     *
     * @param color
     */
    function fill(color: number): void
    /**
     * Outlines the current path with a given color.
     *
     * @param color
     */
    function stroke(color: number): void
    /**
     * Turns a path (in the callback) into the current clipping region.
     *
     * @param callback
     * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clip
     */
    function clip(callback: clipCallback): void

    /** SOUND API */
    /**
     * Play a sound effects using ZzFX library.
     * If the first argument is omitted, plays an default sound.
     *
     * @param [zzfxParams] a ZzFX array of params
     * @param [pitchSlide=0] a value to increment/decrement the pitch
     * @param [volumeFactor=1] the volume factor
     * @returns The sound that was played or `false`
     *
     * @see https://github.com/KilledByAPixel/ZzFX
     */
    function sfx(
        zzfxParams?: number[],
        pitchSlide?: number,
        volumeFactor?: number
    ): number[] | boolean
    /**
     * Set the ZzFX's global volume factor.
     * Note: use 0 to mute all sound effects.
     *
     * @param value
     */
    function volume(value: number): void

    /** UTILS API */
    /**
     * Checks if a which key is pressed on the keyboard.
     * Note: use `iskeydown()` to check for any key pressed.
     *
     * @param key
     * @returns `true` if the which key is down
     */
    function iskeydown(key: string): boolean
    /**
     * Checks if a which key just got pressed on the keyboard.
     * Note: use `iskeypressed()` to check for any key.
     *
     * @param [key]
     * @returns `true` if the which key was pressed
     */
    function iskeypressed(key: string): boolean

    /** PLUGINS API */
    /**
     * Returns the canvas
     */
    function canvas(): HTMLCanvasElement
    /**
     * Prepares a plugin to be loaded
     *
     * @param callback
     */
    function use(callback: pluginCallback): void
    /**
     * Add a game loop event listener
     *
     * @param event The game event type
     * @param callback the function that is called when the event occurs
     * @returns a function to remove the listener
     */
    function listen(event: string, callback: Function): Function
    /**
     * Call all listeners attached to a game event
     *
     * @param event The game event type
     * @param [arg1] any data to be passed over the listeners
     * @param [arg2] any data to be passed over the listeners
     * @param [arg3] any data to be passed over the listeners
     * @param [arg4] any data to be passed over the listeners
     */
    function emit(event: string, arg1?: any, arg2?: any, arg3?: any, arg4?: any): void
    /**
     * Set or reset the color palette
     *
     * @param [colors]
     */
    function pal(colors?: string[]): void
    /**
     * Define or update a instance property
     *
     * @param key
     * @param value
     */
    function def(key: string, value: any): void
    /**
     * The scale of the game's delta time (dt).
     * Values higher than 1 increase the speed of time, while values smaller than 1 decrease it.
     * A value of 0 freezes time and is effectively equivalent to pausing.
     *
     * @param value
     */
    function timescale(value: number): void
    /**
     * Set the target FPS (frames per second).
     *
     * @param fps
     */
    function framerate(fps: number): void
    /**
     * Returns information about that engine instance.
     *
     * - n = 0: the settings passed to that instance
     * - n = 1: returns true if the "init" event has already been emitted
     * - n = 2: the current delta time (dt)
     * - n = 3: the current canvas element scale (not the context 2D scale)
     * - n = 4: the attached event callbacks
     * - n = 5: the current color palette
     * - n = 6: the default sound used by `sfx()`
     * - n = 7: the current time scale
     * - n = 8: the current volume used by ZzFX
     * - n = 9: the current RNG state
     * - n = 10: the current font size
     * - n = 11: the current font family
     * - n = *any other value*: probably returns undefined
     *
     * @param n
     */
    function stat(n: number): any
    /**
     * Shutdown the litecanvas instance and remove all event listeners.
     */
    function quit(): void
    /**
     * Pauses the engine loop (update & draw).
     */
    function pause(): void
    /**
     * Resumes (if paused) the engine loop.
     */
    function resume(): void
    /**
     * Returns `true` if the engine loop is paused.
     */
    function paused(): boolean
}
