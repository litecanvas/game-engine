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
     * @param {number} start
     * @param {number} end
     * @param {number} t The progress in percentage, where 0 = 0% and 1 = 100%.
     * @returns {number} The unterpolated value
     * @tutorial https://gamedev.net/tutorials/programming/general-and-gameplay-programming/a-brief-introduction-to-lerp-r4954/
     */
    lerp(start: number, end: number, t: number): number
    /**
     * Convert degrees to radians
     *
     * @param {number} degs
     * @returns {number} the value in radians
     */
    deg2rad(degs: number): number
    /**
     * Convert radians to degrees
     *
     * @param {number} rads
     * @returns {number} the value in degrees
     */
    rad2deg(rads: number): number
    /**
     * Constrains a number between `min` and `max`.
     *
     * @param {number} value
     * @param {number} min
     * @param {number} max
     * @returns {number}
     */
    clamp(value: number, min: number, max: number): number
    /**
     * Wraps a number between `min` (inclusive) and `max` (exclusive).
     *
     * @param {number} value
     * @param {number} min
     * @param {number} max
     * @returns {number}
     */
    wrap(value: number, min: number, max: number): number
    /**
     * Re-maps a number from one range to another.
     *
     * @param {number} value  the value to be remapped.
     * @param {number} min1 lower bound of the value's current range.
     * @param {number} max1  upper bound of the value's current range.
     * @param {number} min2 lower bound of the value's target range.
     * @param {number} max2  upper bound of the value's target range.
     * @param {boolean} [withinBounds=false] constrain the value to the newly mapped range
     * @returns {number} the remapped number
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
     * @param {number} value
     * @param {number} min
     * @param {number} max
     * @returns {number} the normalized number.
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
     * @param {number} [min=0.0]
     * @param {number} [max=1.0]
     * @returns {number} the random number
     */
    rand(min?: number, max?: number): number
    /**
     * Generates a pseudorandom integer between min (inclusive) and max (inclusive)
     *
     * @param {number} [min=0]
     * @param {number} [max=1]
     * @returns {number} the random number
     */
    randi(min?: number, max?: number): number
    /**
     * Returns the fractional part of a number
     *
     * @param {number} value The number
     * @returns {number}
     */

    /** BASIC GRAPHICS API */
    /**
     * Clear the game screen
     *
     * @param {number|null} color The background color (from 0 to 7) or null
     */
    cls(color: number | null): void
    /**
     * Draw a rectangle outline
     *
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @param {number} [color=0] the color index (generally from 0 to 7)
     * @param {number|number[]} [radii] A number or list specifying the radii used to draw a rounded-borders rectangle
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
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @param {number} [color=0] the color index (generally from 0 to 7)
     * @param {number|number[]} [radii] A number or list specifying the radii used to draw a rounded-borders rectangle
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
     * @param {number} x
     * @param {number} y
     * @param {number} radius
     * @param {number} [color=0] the color index (generally from 0 to 7)
     */
    circ(x: number, y: number, radius: number, color?: number): void
    /**
     * Draw a color-filled circle
     *
     * @param {number} x
     * @param {number} y
     * @param {number} radius
     * @param {number} [color=0] the color index (generally from 0 to 7)
     */
    circfill(x: number, y: number, radius: number, color?: number): void
    /**
     * Draw a line
     *
     * @param {number} x1
     * @param {number} y1
     * @param {number} x2
     * @param {number} y2
     * @param {number} [color=0] the color index (generally from 0 to 7)
     */
    line(x1: number, y1: number, x2: number, y2: number, color?: number): void
    /**
     * Sets the thickness of lines
     *
     * @param {number} value
     * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineWidth
     */
    linewidth(value: number): void
    /**
     * Sets the line dash pattern used when drawing lines
     *
     * @param {number|number[]} segments the line dash pattern
     * @param {number} [offset=0] the line dash offset, or "phase".
     * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setLineDash
     * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineDashOffset
     */
    linedash(segments: number | number[], offset?: number): void

    /** TEXT RENDERING API */
    /**
     * Draw text
     *
     * @param {number} x
     * @param {number} y
     * @param {string} text the text message
     * @param {number} [color=3] the color index (generally from 0 to 7)
     */
    text(x: number, y: number, text: string, color?: number): void
    /**
     * Set the font family
     *
     * @param {string} fontFamily
     */
    textfont(fontFamily: string): void
    /**
     * Set the font size
     *
     * @param {string} size
     */
    textsize(size: string): void
    /**
     * Sets whether a font should be styled with a normal, italic, or bold.
     *
     * @param {string} style
     */
    textstyle(style: string): void
    /**
     * Sets the alignment used when drawing texts
     *
     * @param {string} align the horizontal alignment. Possible values: "left", "right", "center", "start" or "end"
     * @param {string} baseline the vertical alignment. Possible values: "top", "bottom", "middle", "hanging" or "ideographic"
     * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/textBaseline
     * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/textAlign
     */
    textalign(align: string, baseline: string): void
    /**
     * Returns a TextMetrics object that contains information about the measured text (such as its width, for example)
     *
     * @param {string} text
     * @param {number} [size]
     * @returns {TextMetrics}
     * @see https://developer.mozilla.org/en-US/docs/Web/API/TextMetrics
     */
    textmetrics(text: string, size?: number): TextMetrics

    /** IMAGE GRAPHICS API */
    /**
     * Draw an image
     *
     * @param {number} x
     * @param {number} y
     * @param {OffscreenCanvas|HTMLImageElement|HTMLCanvasElement} image
     */
    image(
        x: number,
        y: number,
        image: OffscreenCanvas | HTMLImageElement | HTMLCanvasElement
    ): void
    /**
     * Creates a offscreen canvas to draw on it
     *
     * @param {number} width
     * @param {number} height
     * @param {string[]|drawCallback} draw
     * @param {{scale?:number}} [options]
     * @returns {OffscreenCanvas}
     * @see https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas
     */
    paint(
        width: number,
        height: number,
        draw: string[] | drawCallback,
        options?: {
            scale?: number
        }
    ): OffscreenCanvas

    /** ADVANCED GRAPHICS API */
    /**
     * Get or set the canvas context 2D
     * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
     */
    ctx(value?: CanvasRenderingContext2D): CanvasRenderingContext2D
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
     * @param {number} x
     * @param {number} y
     */
    translate(x: number, y: number): void
    /**
     * Adds a scaling transformation to the canvas units horizontally and/or vertically.
     *
     * @param {number} x
     * @param {number} [y]
     */
    scale(x: number, y?: number): void
    /**
     * Adds a rotation to the transformation matrix
     *
     * @param {number} radians
     */
    rotate(radians: number): void
    /**
     * Adds a transformation that skews to the transformation matrix
     *
     * @param {number} a
     * @param {number} b
     * @param {number} c
     * @param {number} d
     * @param {number} e
     * @param {number} f
     * @param {boolean} [resetFirst=true] `false` to use _ctx.transform(); by default use _ctx.setTransform()
     * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setTransform
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
     * @param {number} alpha float from 0 to 1 (e.g: 0.5 = 50% transparent)
     * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalAlpha
     */
    alpha(alpha: number): void
    /**
     * Returns a newly instantiated Path2D object, optionally with another
     * path as an argument (creates a copy), or optionally with a string
     * consisting of SVG path data.
     *
     * @param {Path2D|string} [arg]
     * @returns Path2D
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Path2D/Path2D
     */
    path(arg?: Path2D | string): Path2D
    /**
     * Fills the current or given path with a given color.
     *
     * @param {number} color
     * @param {Path2D} [path]
     */
    fill(color: number, path?: Path2D): void
    /**
     * Outlines the current or given path with a given color.
     *
     * @param {number} color
     * @param {Path2D} [path]
     */
    stroke(color: number, path?: Path2D): void
    /**
     * Create a retangular clipping region.
     *
     * Note: Clip paths cannot be reverted directly. You must save your
     * canvas state using push() before calling cliprect(), and restore it
     * once you have finished drawing in the clipped area using pop().
     *
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clip
     */
    cliprect(x: number, y: number, width: number, height: number): void
    /**
     * Create a circular clipping region.
     *
     * Note: Clip paths cannot be reverted directly. You must save your
     * canvas state using push() before calling clipcirc(), and restore it
     * once you have finished drawing in the clipped area using pop().
     *
     * @param {number} x
     * @param {number} y
     * @param {number} radius
     * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clip
     */
    clipcirc(x: number, y: number, radius: number): void
    /**
     * Sets the type of compositing operation to apply when drawing new shapes.
     * Default value = 'source-over'.
     *
     * @param {string} value
     * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation
     */
    blendmode(value: string): void

    /** SOUND API */
    /**
     * Play a sound effects using ZzFX library.
     * If the first argument is omitted, plays an default sound.
     *
     * @param {number|number[]} [sound] a ZzFX array of params
     * @param {number} [volume] the volume factor
     * @param {number} [pitch] a value to increment/decrement the pitch
     * @param {number} [randomness] an float between 0 and 1
     *
     * @see https://github.com/KilledByAPixel/ZzFX
     */
    sfx(
        sound?: number[],
        volume?: number,
        pitch?: number,
        randomness?: number
    ): void
    /**
     * Set the ZzFX's global volume factor.
     * Note: use 0 to mute all sound effects.
     *
     * @param {number} value
     */
    volume(value: number): void

    /** UTILS API */
    /**
     * Check a collision between two rectangles
     *
     * @param {number} x1 first rectangle position X
     * @param {number} y1 first rectangle position Y
     * @param {number} w1 first rectangle width
     * @param {number} h1 first rectangle height
     * @param {number} x2 second rectangle position X
     * @param {number} y2 second rectangle position Y
     * @param {number} w2 second rectangle width
     * @param {number} h2 second rectangle height
     * @returns {boolean}
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
     * @param {number} x1 first circle position X
     * @param {number} y1 first circle position Y
     * @param {number} r1 first circle position radius
     * @param {number} x2 second circle position X
     * @param {number} y2 second circle position Y
     * @param {number} r2 second circle position radius
     * @returns {boolean}
     */
    colcirc(
        x1: number,
        y1: number,
        r1: number,
        x2: number,
        y2: number,
        r2: number
    ): boolean
    /**
     * Get the mouse position
     *
     * @returns number[]
     */
    mousepos(): number[]
    /**
     * The scale of the game's delta time (dt).
     * Values higher than 1 increase the speed of time, while values smaller than 1 decrease it.
     * A value of 0 freezes time and is effectively equivalent to pausing.
     *
     * @param {number} value
     */
    timescale(value: number): void

    /** PLUGINS API */
    /**
     * Prepares a plugin to be loaded
     *
     * @param {pluginCallback} callback
     */
    use(callback: pluginCallback): void
    /**
     * Add a game loop event listener
     *
     * @param {string} event The game event type
     * @param {function} callback the function that is called when the event occurs
     * @param {boolean} [highPriority=false] determines whether the callback will be called before or after the others
     * @returns {function?} a function to remove the listener
     */
    listen(event: string, callback: Function): Function | null
    /**
     * Call all listeners attached to a game event
     *
     * @param {string} event The game event type
     * @param  {...any} args Arguments passed to all listeners
     */
    emit(event: string, ...args: any[]): void
    /**
     * Get the color value
     *
     * @param {number} index The color number
     * @returns {string} the color value
     */
    getcolor(index: number): string
    /**
     * Create or update a instance variable
     *
     * @param {string} key
     * @param {any} value
     */
    setvar(key: string, value: any): void
    /**
     * Resizes the game canvas and emit the "resized" event
     *
     * @param {number} width
     * @param {number} height
     */
    resize(width: number, height: number): void
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
     * If `false`, disable the canvas antialias.
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
     * if `false` disable the click/touch events handling.
     * Useful when you want to implement your own input handler.
     */
    tapEvents?: boolean
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
