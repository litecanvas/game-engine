type LitecanvasInstance = {
    /** The game screen width */
    WIDTH: number
    /** The game screen height */
    HEIGHT: number
    /** The game canvas HTML element */
    CANVAS: HTMLCanvasElement
    /** the amount of time (in seconds) since the game started */
    ELAPSED: number
    /** the FPS meter */
    FPS: number
    /** the center X of the game screen */
    CENTERX: number
    /** the center Y of the game screen */
    CENTERY: number
    /** The current mouse's horizontal (X) position or -1 (if the mouse was not used or detected) */
    MOUSEX: number
    /** The current mouse's vertical (Y) position or -1 (if the mouse was not used or detected) */
    MOUSEY: number
    /** the default `sfx()` sound */
    DEFAULT_SFX: number[]

    /** MATH API */
    /**
     * The value of the mathematical constant PI (π).
     * Approximately 3.14159
     */
    PI: number
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
     * @returns
     */
    wrap(value: number, min: number, max: number): number
    /**
     * Re-maps a number from one range to another.
     *
     * @param value  the value to be remapped.
     * @param min1 lower bound of the value's current range.
     * @param max1  upper bound of the value's current range.
     * @param min2 lower bound of the value's target range.
     * @param max2  upper bound of the value's target range.
     * @param [withinBounds=false] constrain the value to the newly mapped range
     * @returns the remapped number
     */
    map(
        value: number,
        min1: number,
        max1: number,
        min2: number,
        max2: number,
        withinBounds?: boolean
    ): number
    /**
     * Maps a number from one range to a value between 0 and 1.
     * Identical to `map(value, min, max, 0, 1)`.
     * Note: Numbers outside the range are not clamped to 0 and 1.
     *
     * @param value
     * @param min
     * @param max
     * @returns the normalized number.
     */
    norm(value: number, min: number, max: number): number
    /**
     * Returns the sine of a number in radians
     */
    sin(n: number): number
    /**
     * Returns the cosine of a number in radians
     */
    cos(n: number): number
    /**
     * Returns the angle in the plane (in radians) between the positive x-axis and the ray from (0, 0) to the point (x, y)
     */
    atan2(y: number, x: number): number
    /**
     * Returns the square root of the sum of squares of its arguments.
     */
    hypot(...ns: number[]): number
    /**
     * Returns the tangent of a number in radians.
     */
    tan(n: number): number
    /**
     * Returns the absolute value of a number.
     */
    abs(n: number): number
    /**
     * Always rounds up and returns the smallest integer greater than or equal to a given number.
     */
    ceil(n: number): number
    /**
     * Returns the value of a number rounded to the nearest integer.
     */
    round(n: number): number
    /**
     * Always rounds down and returns the largest integer less than or equal to a given number.
     */
    floor(n: number): number
    /**
     * Returns the integer part of a number by removing any fractional digits.
     */
    trunc(n: number): number
    /**
     * Returns the smallest of the numbers given as input parameters, or `Infinity` if there are no parameters.
     */
    min(...ns: number[]): number
    /**
     * Returns the largest of the numbers given as input parameters, or `-Infinity` if there are no parameters.
     */
    max(...ns: number[]): number
    /**
     * Returns the value of a base raised to a power.
     */
    pow(base: number, exponent: number): number
    /**
     * Returns the square root of a number.
     */
    sqrt(n: number): number
    /**
     * Returns 1 or -1, indicating the sign of the number passed as argument.
     * If the input is 0 or -0, it will be returned as-is.
     */
    sign(n: number): number
    /**
     * Returns the Euler's number raised to the power of a number.
     */
    exp(exponent: number): number

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
     * If a value is passed, initializes the random number generator with an explicit seed value.
     * Otherwise, returns the current seed state.
     *
     * @param [value]
     * @returns the seed state
     */
    seed(value?: number): number

    /** BASIC GRAPHICS API */
    /**
     * Clear the game screen
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
     * Draw text
     *
     * @param x
     * @param y
     * @param text the text message
     * @param [color=3] the color index
     */
    text(x: number, y: number, text: string, color?: number): void
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
    textsize(size: string): void
    /**
     * Sets whether a font should be styled with a normal, italic, or bold.
     *
     * @param style
     */
    textstyle(style: string): void
    /**
     * Sets the alignment used when drawing texts
     *
     * @param align the horizontal alignment. Possible values: "left", "right", "center", "start" or "end"
     * @param baseline the vertical alignment. Possible values: "top", "bottom", "middle", "hanging" or "ideographic"
     * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/textBaseline
     * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/textAlign
     */
    textalign(align: string, baseline: string): void
    /**
     * Returns a TextMetrics object that contains information about the measured text (such as its width, for example)
     *
     * @param text
     * @param [size]
     * @see https://developer.mozilla.org/en-US/docs/Web/API/TextMetrics
     */
    textmetrics(text: string, size?: number): TextMetrics

    /** IMAGE GRAPHICS API */
    /**
     * Draw an image
     *
     * @param x
     * @param y
     * @param image
     */
    image(
        x: number,
        y: number,
        image: OffscreenCanvas | HTMLImageElement | HTMLCanvasElement
    ): void
    /**
     * Creates a offscreen canvas to draw on it
     *
     * @param width
     * @param height
     * @param draw
     * @param [options]
     * @see https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas
     */
    paint(
        width: number,
        height: number,
        draw: string[] | drawCallback,
        options?: {
            scale?: number
            canvas?: HTMLCanvasElement | OffscreenCanvas
        }
    ): OffscreenCanvas

    /** ADVANCED GRAPHICS API */
    /**
     * Get or set the canvas context 2D
     *
     * @param [context] an new canvas context
     * @returns the current canvas context
     * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
     */
    ctx(context?: CanvasRenderingContext2D): CanvasRenderingContext2D
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
     * @param a
     * @param b
     * @param c
     * @param d
     * @param e
     * @param f
     * @param [resetFirst=true] `false` to use _ctx.transform(); by default use _ctx.setTransform()
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setTransform
     * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/transform
     */
    transform(
        a: number,
        b: number,
        c: number,
        d: number,
        e: number,
        f: number,
        resetFirst?: boolean
    ): void
    /**
     * Sets the alpha (transparency) value to apply when drawing new shapes and images
     *
     * @param alpha float from 0 to 1 (e.g: 0.5 = 50% transparent)
     * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalAlpha
     */
    alpha(alpha: number): void
    /**
     * Returns a newly instantiated Path2D object, optionally with another
     * path as an argument (creates a copy), or optionally with a string
     * consisting of SVG path data.
     *
     * @param [arg]
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Path2D/Path2D
     */
    path(arg?: Path2D | string): Path2D
    /**
     * Fills the current or given path with a given color.
     *
     * @param color
     * @param [path]
     */
    fill(color: number, path?: Path2D): void
    /**
     * Outlines the current or given path with a given color.
     *
     * @param color
     * @param [path]
     */
    stroke(color: number, path?: Path2D): void
    /**
     * Turn given path into a clipping region.
     *
     * @param path
     * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clip
     */
    clip(path: Path2D): void

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
    sfx(
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
    volume(value: number): void

    /** UTILS API */
    /**
     * Checks if a key is currently pressed in your keyboard.
     * Notes:
     * - to check the space key use `iskeydown(" ")`.
     * - you can check if any key is pressed using `iskeydown("any")`.
     *
     * @param key
     * @returns `true` if the which key is down
     */
    iskeydown(key: string): boolean
    /**
     * Check a collision between two rectangles
     *
     * @param x1 first rectangle position X
     * @param y1 first rectangle position Y
     * @param w1 first rectangle width
     * @param h1 first rectangle height
     * @param x2 second rectangle position X
     * @param y2 second rectangle position Y
     * @param w2 second rectangle width
     * @param h2 second rectangle height
     */
    colrect(
        x1: number,
        y1: number,
        w1: number,
        h1: number,
        x2: number,
        y2: number,
        w2: number,
        h2: number
    ): boolean
    /**
     * Check a collision between two circles
     *
     * @param x1 first circle position X
     * @param y1 first circle position Y
     * @param r1 first circle position radius
     * @param x2 second circle position X
     * @param y2 second circle position Y
     * @param r2 second circle position radius
     */
    colcirc(
        x1: number,
        y1: number,
        r1: number,
        x2: number,
        y2: number,
        r2: number
    ): boolean

    /** PLUGINS API */
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
    listen(event: string, callback: Function): Function | null
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
     * Get the color value
     *
     * @param index The color number
     * @returns the color value
     */
    getcolor(index: number): string
    /**
     * Create or update a instance variable
     *
     * @param key
     * @param value
     */
    setvar(key: string, value: any): void
    /**
     * Resizes the game canvas and emit the "resized" event
     *
     * @param width
     * @param height
     */
    resize(width: number, height: number): void
    /**
     * The scale of the game's delta time (dt).
     * Values higher than 1 increase the speed of time, while values smaller than 1 decrease it.
     * A value of 0 freezes time and is effectively equivalent to pausing.
     *
     * @param value
     */
    timescale(value: number): void
    /**
     * Set the target FPS at runtime.
     *
     * @param fps
     */
    setfps(fps: number): void
}

type LitecanvasOptions = {
    /**
     * target FPS
     */
    fps?: number
    /**
     * Makes the canvas fills the entire page. By default is `true`.
     */
    fullscreen?: boolean
    /**
     * The game screen width. If specified, disables fullscreen.
     */
    width?: number
    /**
     * The game screen height.
     */
    height?: number
    /**
     * Determines whether the game loop should be paused when the "blur" event happens.
     * Default: `true`
     */
    pauseOnBlur?: boolean
    /**
     * If `true` (default) scales the canvas to fill the screen, but preserving the aspect ratio.
     * Only works if a game screen width was specified.
     */
    autoscale?: boolean
    /**
     * If `true`, the pixel art images won't look blurry.
     */
    pixelart?: boolean
    /**
     * If `false` (default), disable the canvas antialias.
     */
    antialias?: boolean
    /**
     * Used to specify the selector of a custom canvas element
     */
    canvas?: string
    /**
     * If `true` (default), all methods and properties of the engine will be exposed to the global scope (window).
     */
    global?: boolean
    /**
     * Specify your game loop callbacks.
     * By default use that global functions (if they exist):
     * - `window.init(): void`
     * - `window.update(dt: number): void`
     * - `window.draw(): void`
     * - `window.resized(): void`
     * - `window.tap(tapX: number, tapY: number, tapId: number): void`
     * - `window.untap(tapX: number, tapY: number, tapId: number): void`
     * - `window.tapped(tapX: number, tapY: number, tapId: number): void`
     * - `window.tapping(tapX: number, tapY: number, tapId: number): void`
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
    /**
     * default: `true`
     *
     * if `false` stops the code in `update()` and `draw()` from running repeatedly. By default, tries to run these functions 60 times per second.
     */
    animate?: boolean
}

type LitecanvasGameLoop = {
    init?: () => void
    update?: (dt: number) => void
    draw?: () => void
    resized?: () => void
    tap?: (tapX: number, tapY: number, tapId: number) => void
    untap?: (tapX: number, tapY: number, tapId: number) => void
    tapped?: (tapX: number, tapY: number, tapId: number) => void
    tapping?: (tapX: number, tapY: number, tapId: number) => void
}

type drawCallback = (
    offcanvas: OffscreenCanvas,
    context: CanvasRenderingContext2D
) => void

type LitecanvasPluginHelpers = {
    /**
     * The instance color palette (writable)
     */
    colors: string[]
    /**
     * An instance settings/options (read-only)
     */
    settings: LitecanvasOptions
}

type pluginCallback = (
    instance: LitecanvasInstance,
    helpers: LitecanvasPluginHelpers
) => any
