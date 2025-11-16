type LitecanvasInstance = {
    /** The game screen width */
    W: number
    /** The game screen height */
    H: number
    /** the amount of time (in seconds) since the game started */
    T: number
    /** The current mouse's horizontal (X) position or -1 (if the mouse was not used or detected) */
    MX: number
    /** The current mouse's vertical (Y) position or -1 (if the mouse was not used or detected) */
    MY: number

    /** MATH API */
    /**
     * The value of the mathematical constant PI (π).
     * Approximately 3.14159
     */
    PI?: number
    /**
     * Twice the value of the mathematical constant PI (π).
     * Approximately 6.28318
     *
     * Note: TWO_PI radians equals 360°, PI radians equals 180°,
     * HALF_PI radians equals 90°, and HALF_PI/2 radians equals 45°.
     */
    TWO_PI: number
    /**
     * Half the value of the mathematical constant PI (π).
     * Approximately 1.57079
     */
    HALF_PI: number
    /**
     * Calculates a linear (interpolation) value over t%.
     *
     * @param start
     * @param end
     * @param t The progress in percentage, where 0 = 0% and 1 = 100%.
     * @returns The unterpolated value
     * @tutorial https://gamedev.net/tutorials/programming/general-and-gameplay-programming/a-brief-introduction-to-lerp-r4954/
     */
    lerp(start: number, end: number, t: number): number
    /**
     * Convert degrees to radians
     *
     * @param degs
     * @returns the value in radians
     */
    deg2rad(degs: number): number
    /**
     * Convert radians to degrees
     *
     * @param rads
     * @returns the value in degrees
     */
    rad2deg(rads: number): number
    /**
     * Returns the rounded value of an number to optional precision (number of digits after the decimal point).
     *
     * @param n number to round.
     * @param [precision] number of decimal digits to round to, default is 0.
     * @returns the rounded number.
     */
    round(n: number, precision?: number): number
    /**
     * Constrains a number between `min` and `max`.
     *
     * @param value
     * @param min
     * @param max
     * @returns
     */
    clamp(value: number, min: number, max: number): number
    /**
     * Wraps a number between `min` (inclusive) and `max` (exclusive).
     *
     * @param value
     * @param min
     * @param max
     * @returns the wrapped number
     */
    wrap(value: number, min: number, max: number): number
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
    map(
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
    norm(value: number, start: number, stop: number): number
    /**
     * Interpolate between 2 values using a periodic function.
     *
     * @param from - the lower bound
     * @param to - the higher bound
     * @param t - the value passed to the periodic function
     * @param fn - the periodic function (which default to `Math.sin`)
     */
    wave(from: number, to: number, t: number, fn?: (n: number) => number): number
    /**
     * Returns the sine of a number in radians
     */
    sin?(n: number): number
    /**
     * Returns the cosine of a number in radians
     */
    cos?(n: number): number
    /**
     * Returns the angle in the plane (in radians) between the positive x-axis and the ray from (0, 0) to the point (x, y)
     */
    atan2?(y: number, x: number): number
    /**
     * Returns the square root of the sum of squares of its arguments.
     */
    hypot?(...ns: number[]): number
    /**
     * Returns the tangent of a number in radians.
     */
    tan?(n: number): number
    /**
     * Returns the absolute value of a number.
     */
    abs?(n: number): number
    /**
     * Always rounds up and returns the smallest integer greater than or equal to a given number.
     */
    ceil?(n: number): number
    /**
     * Always rounds down and returns the largest integer less than or equal to a given number.
     */
    floor?(n: number): number
    /**
     * Returns the integer part of a number by removing any fractional digits.
     */
    trunc?(n: number): number
    /**
     * Returns the smallest of the numbers given as input parameters, or `Infinity` if there are no parameters.
     */
    min?(...ns: number[]): number
    /**
     * Returns the largest of the numbers given as input parameters, or `-Infinity` if there are no parameters.
     */
    max?(...ns: number[]): number
    /**
     * Returns the value of a base raised to a power.
     */
    pow?(base: number, exponent: number): number
    /**
     * Returns the square root of a number.
     */
    sqrt?(n: number): number
    /**
     * Returns 1 or -1, indicating the sign of the number passed as argument.
     * If the input is 0 or -0, it will be returned as-is.
     */
    sign?(n: number): number
    /**
     * Returns the Euler's number raised to the power of a number.
     */
    exp?(exponent: number): number

    /** RNG API */
    /**
     * Generates a pseudorandom float between min (inclusive) and max (exclusive)
     *
     * @param [min=0.0]
     * @param [max=1.0]
     * @returns the random number
     */
    rand(min?: number, max?: number): number
    /**
     * Generates a pseudorandom integer between min (inclusive) and max (inclusive)
     *
     * @param [min=0]
     * @param [max=1]
     * @returns the random number
     */
    randi(min?: number, max?: number): number
    /**
     * Initializes the random number generator with an explicit seed value.
     *
     * Note: The seed should be a integer number greater than or equal to zero.
     *
     * @param value
     */
    rseed(value: number): void

    /** BASIC GRAPHICS API */
    /**
     * Clear the game screen with an optional color
     *
     * @param color The background color index or `null`
     */
    cls(color: number | null): void

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
    rect(
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
    rectfill(
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
    circ(x: number, y: number, radius: number, color?: number): void
    /**
     * Draw a color-filled circle
     *
     * @param x
     * @param y
     * @param radius
     * @param [color=0] the color index
     */
    circfill(x: number, y: number, radius: number, color?: number): void
    /**
     * Draw a ellipse outline
     *
     * @param x
     * @param y
     * @param radiusX
     * @param radiusY
     * @param [color=0] the color index
     */
    oval(x: number, y: number, radiusX: number, radiusY: number, color?: number): void
    /**
     * Draw a color-filled ellipse
     *
     * @param x
     * @param y
     * @param radiusX
     * @param radiusY
     * @param [color=0] the color index
     */
    ovalfill(x: number, y: number, radiusX: number, radiusY: number, color?: number): void
    /**
     * Draw a line
     *
     * @param x1
     * @param y1
     * @param x2
     * @param y2
     * @param [color=0] the color index
     */
    line(x1: number, y1: number, x2: number, y2: number, color?: number): void
    /**
     * Sets the thickness of lines
     *
     * @param value
     * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineWidth
     */
    linewidth(value: number): void
    /**
     * Sets the line dash pattern used when drawing lines
     *
     * @param segments the line dash pattern
     * @param [offset=0] the line dash offset, or "phase".
     * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setLineDash
     * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineDashOffset
     */
    linedash(segments: number[], offset?: number): void

    /** TEXT RENDERING API */
    /**
     * Draw text. You can use `\n` to break lines.
     *
     * @param x
     * @param y
     * @param message the text message
     * @param [color=3] the color index
     * @param [fontStyle="normal"] can be "normal" (default), "italic" and/or "bold"
     */
    text(x: number, y: number, message: string, color?: number, fontStyle?: string): void
    /**
     * Set the font family
     *
     * @param fontFamily
     */
    textfont(fontFamily: string): void
    /**
     * Set the font size
     *
     * @param size
     */
    textsize(size: number): void
    /**
     * Sets the alignment used when drawing texts
     *
     * @param align the horizontal alignment. Possible values: "left", "right", "center", "start" or "end"
     * @param baseline the vertical alignment. Possible values: "top", "bottom", "middle", "hanging" or "ideographic"
     * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/textBaseline
     * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/textAlign
     */
    textalign(align: CanvasTextAlign, baseline: CanvasTextBaseline): void
    /**
     * Sets the height ratio of the text lines based on current text size.
     *
     * Default = `1.2`
     *
     * @param value
     */
    textgap(value: number): void

    /** BASIC GRAPHICS API */
    /**
     * Draw an image
     *
     * @param x
     * @param y
     * @param source
     */
    image(x: number, y: number, source: CanvasImageSource): void
    /**
     * Draw a sprite pixel by pixel represented by a string. Each pixel must be a base 36 number or a dot:
     *
     * - A base 36 number (`0-9` or `a-z`) represent a pixel color (supporting color palettes with max 36 colors).
     * - A dot (`.`) represent a transparent pixel.
     * - Spaces are ignored and can be used to improve the visualization.
     *
     * @param x the position X of the first pixel
     * @param y the position Y of the first pixel
     * @param pixels
     */
    spr(x: number, y: number, pixels: string): void
    /**
     * Draw in an OffscreenCanvas and returns its image.
     *
     * @param width
     * @param height
     * @param callback
     * @param [options]
     * @see https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas
     */
    paint(
        width: number,
        height: number,
        callback: drawCallback,
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
    ctx(
        context?: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D
    ): CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D
    /**
     * saves the current drawing style settings and transformations
     * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/save
     */
    push(): void
    /**
     * restores the drawing style settings and transformations
     * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/restore
     */
    pop(): void
    /**
     * Adds a translation transformation to the current matrix
     *
     * @param x
     * @param y
     */
    translate(x: number, y: number): void
    /**
     * Adds a scaling transformation to the canvas units horizontally and/or vertically.
     *
     * @param x
     * @param [y]
     */
    scale(x: number, y?: number): void
    /**
     * Adds a rotation to the transformation matrix
     *
     * @param radians
     */
    rotate(radians: number): void
    /**
     * Sets the alpha (transparency) value to apply when drawing new shapes and images
     *
     * @param value float from 0 to 1 (e.g: 0.5 = 50% transparent)
     * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalAlpha
     */
    alpha(value: number): void
    /**
     * Fills the current path with a given color.
     *
     * @param color
     */
    fill(color: number): void
    /**
     * Outlines the current path with a given color.
     *
     * @param color
     */
    stroke(color: number): void
    /**
     * Turns a path (in the callback) into the current clipping region.
     *
     * @param callback
     * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clip
     */
    clip(callback: clipCallback): void

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
    sfx(zzfxParams?: number[], pitchSlide?: number, volumeFactor?: number): number[] | boolean
    /**
     * Set the ZzFX's global volume factor.
     * Note: use 0 to mute all sound effects.
     *
     * @param value
     */
    volume(value: number): void

    /** KEYBOARD API */
    /**
     * Checks if a which key is pressed on the keyboard.
     * Note: use `iskeydown()` to check for any key pressed.
     *
     * @param key
     * @returns `true` if the which key is down
     */
    iskeydown?(key: string): boolean
    /**
     * Checks if a which key just got pressed on the keyboard.
     * Note: use `iskeypressed()` to check for any key.
     *
     * @param [key]
     * @returns `true` if the which key was pressed
     */
    iskeypressed?(key: string): boolean
    /**
     * Returns the last pressed.
     *
     * @returns {string}
     */
    lastkey?(): string

    /** PLUGINS API */
    /**
     * Returns the canvas
     */
    canvas(): HTMLCanvasElement
    /**
     * Prepares a plugin to be loaded
     *
     * @param callback
     */
    use(callback: pluginCallback): void
    /**
     * Add a game loop event listener
     *
     * @param event The game event type
     * @param callback the function that is called when the event occurs
     * @returns a function to remove the listener
     */
    listen(event: string, callback: Function): Function
    /**
     * Call all listeners attached to a game event
     *
     * @param event The game event type
     * @param [arg1] any data to be passed over the listeners
     * @param [arg2] any data to be passed over the listeners
     * @param [arg3] any data to be passed over the listeners
     * @param [arg4] any data to be passed over the listeners
     */
    emit(event: string, arg1?: any, arg2?: any, arg3?: any, arg4?: any): void
    /**
     * Define or update a instance property
     *
     * @param key
     * @param value
     */
    def(key: string, value: any): void
    /**
     * Set new palette colors or restore the default palette.
     *
     * @param colors an array of colors
     * @param textColor the new default text color
     */
    pal(colors?: string[], textColor?: number): void
    /**
     * Replace the color "a" with color "b".
     *
     * If called without arguments, reset the current palette.
     *
     * Note: `palc()` don't affect drawings made with `image()`.
     *
     * @param a
     * @param b
     */
    palc(a?: number, b?: number): void
    /**
     * The scale of the game's delta time (dt).
     * Values higher than 1 increase the speed of time, while values smaller than 1 decrease it.
     * A value of 0 freezes time and is effectively equivalent to pausing.
     *
     * @param value
     */
    timescale(value: number): void
    /**
     * Set the target FPS (frames per second).
     *
     * @param fps
     */
    framerate(fps: number): void
    /**
     * Returns information about the engine instance.
     *
     * - n = 0: the settings passed to this instance
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
     * - n = 12: the current state of the color palette
     * - n = 13: the current font gap
     * - n = *any other value*: probably returns undefined
     *
     * @param index
     */
    stat(index: number | string): any
    /**
     * Pauses the engine loop (update & draw).
     */
    pause(): void
    /**
     * Resumes (if paused) the engine loop.
     */
    resume(): void
    /**
     * Returns `true` if the engine loop is paused.
     */
    paused(): boolean
    /**
     * Shutdown the litecanvas instance and remove all event listeners.
     */
    quit(): void
}

type LitecanvasOptions = {
    /**
     * The game screen width. If not set, the canvas will have the size of the webpage.
     */
    width?: number
    /**
     * The game screen height.
     */
    height?: number
    /**
     * Used to specify the selector of a custom canvas element
     */
    canvas?: HTMLCanvasElement | string
    /**
     * If `true` (default) scales the canvas to fill the screen, but preserving the aspect ratio.
     * Instead of `true`, you can pass a number to determine the maximum scale.
     *
     * Note: Only works if the option "width" was specified.
     */
    autoscale?: boolean | number
    /**
     * If `true` (default), all methods and properties of the engine will be exposed to the global scope (window).
     */
    global?: boolean
    /**
     * Specify your game loop callbacks.
     * By default use that global functions (if they exist):
     * - `window.init(instance: LitecanvasInstance): void`
     * - `window.update(dt: number): void`
     * - `window.draw(ctx: CanvasRenderingContext2D): void`
     * - `window.resized(scale: number): void`
     * - `window.tap(tapX: number, tapY: number, touchId: number): void`
     * - `window.untap(tapX: number, tapY: number, touchId: number): void`
     * - `window.tapped(tapX: number, tapY: number, touchId: number): void`
     * - `window.tapping(tapX: number, tapY: number, touchId: number): void`
     */
    loop?: LitecanvasGameLoop

    /**
     * default: `true`
     *
     * if `false` disable the click/touch events handling.
     *
     * Useful when you want to implement your own input handler.
     */
    tapEvents?: boolean
    /**
     * default: `true`
     *
     * if `false` disable the `iskeydown()` method.
     *
     * Useful when you want to implement your keyboard handler.
     */
    keyboardEvents?: boolean
}

type LitecanvasGameLoop = {
    init?: () => void
    update?: (dt: number) => void
    draw?: () => void
    resized?: () => void
    tap?: (tapX: number, tapY: number, touchId: number) => void
    untap?: (tapX: number, tapY: number, touchId: number) => void
    tapped?: (tapX: number, tapY: number, touchId: number) => void
    tapping?: (tapX: number, tapY: number, touchId: number) => void
}

type drawCallback = (context: OffscreenCanvasRenderingContext2D) => void

type pluginCallback = (instance: LitecanvasInstance, config?: any) => any

type clipCallback = (ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D) => void

interface Window {
    zzfxV: number
    ENGINE: LitecanvasInstance | undefined
}
