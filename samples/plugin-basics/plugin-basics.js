litecanvas({
    autoscale: false,
})

use(pluginTest, {
    // plugin configuration
    foo: 'bar',
})

function init() {
    clamp(10, 0, 100)
}

function draw() {
    cls(0)
    textalign('center', 'middle')
    text(W / 2, H / 2 - 50, 'Open your browser console')
    text(W / 2, H / 2, 'FOO = ' + FOO)
    text(W / 2, H / 2 + 50, sayhello('Everyone'))
}

function pluginTest(engine, config) {
    // the first argument is the current litecanvas instance
    console.log('litecanvas instance:', engine)

    // the second argument is the plugin configuration
    console.log('plugin config:', config)

    // the `listen()` function registers game event listeners
    // function listen(eventName: string, callback: Function): void
    engine.listen('tapped', function (x, y) {
        engine.sfx()
        console.log(`Tap detected in X=${x} Y=${y}`)
    })

    engine.listen('update', updateOnce)
    function updateOnce() {
        console.log('JUST ONE TIME!')

        // the `unlisten()` removes a event listener
        // you should pass the same event name and callback
        engine.unlisten('update', updateOnce)
    }

    // use `def()` to create or update that instance properties
    // example: create the property engine.FOO and window.FOO (if litecanvas#global = true)
    engine.def('FOO', 42)

    // you can access internal variables with stat()
    // examples
    const settings = stat(0)
    const initialized = stat(1)
    const colorPalette = stat(5)

    // use resize() to change the canvas size
    resize(800, 600)

    // and finally...
    return {
        // you can return new litecanvas functions
        sayhello(name) {
            return 'Hello ' + name
        },

        // or override existing functions
        clamp(val, min, max) {
            // example: disable a built-in function
            console.error('`clamp` was disabled')
        },
    }
}
