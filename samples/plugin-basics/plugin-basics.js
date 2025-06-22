litecanvas({
    width: 600,
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
    textalign('center', 'middle')
    text(W / 2, H / 2 - 50, 'Open your browser console', 3)
    text(W / 2, H / 2, 'FOO = ' + FOO, 3)
    text(W / 2, H / 2 + 50, sayhello('Everyone'), 3)
}

function pluginTest(engine, config) {
    // the first argument is the current litecanvas instance
    console.log('litecanvas instance:', engine)

    // the second argument is the plugin configuration
    console.log('plugin config:', config)

    // the `listen()` function registers game event listeners
    // function listen(type: string, callback: Function): Function
    engine.listen(
        // the event name
        'before:draw',
        // the event callback
        function () {
            engine.cls(1)
            engine.rectfill(0, 0, 100, 100, 5)
        }
    )

    // another `listen()` example
    engine.listen('tapped', function (x, y) {
        engine.sfx()
        console.log(`Tap detected in X=${x} Y=${y}`)
    })

    // the `listen()` returns a function that when called removes that listener
    // example: call this listencer once and then remove it
    let deleteListener = engine.listen('update', () => {
        console.log('JUST ONE TIME!')
        deleteListener()
    })

    // use `def()` to create or update that instance properties
    // example: create a variable named FOO
    engine.def('FOO', 42)

    // and finally...
    return {
        // you can return new litecanvas functions
        sayhello(name) {
            return 'Hello ' + name
        },

        // or override existing functions
        clamp() {
            console.error('`clamp` was overwritten')
        },
    }
}
