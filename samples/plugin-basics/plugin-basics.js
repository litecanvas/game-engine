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

function tapped(x, y) {
    sfx()
}

function update() {
    // nothing here
}

function draw() {
    cls(0)
    textalign('center', 'middle')
    text(CENTERX, CENTERY - 50, 'Open your browser console', 3)
    text(CENTERX, CENTERY, 'FOO = ' + FOO, 3)
    text(CENTERX, CENTERY + 50, sayhello('Everyone'), 3)
}

function pluginTest(engine, { settings, colors }, config) {
    // the first argument is the current litecanvas instance
    console.log('litecanvas instance:', engine)

    // the second argument is a list of helpful values
    console.log('litecanvas settings:', settings)
    console.log('litecanvas colors:', colors)

    // the third argument is the plugin configuration
    console.log('plugin config:', config)

    // use `colors` to change a color or add new ones
    // example: change the red (color #4) to purple
    colors[4] = '#be4bdb'

    // use `settings` to check something
    // `settings` is read-only, changes will not take effect
    if (settings.autoscale) {
        console.log('settings.autoscale = true')
    } else {
        console.log('settings.autoscale = false')
    }

    // the `listen()` function registers game event listeners
    // function listen(type: string, callback: Function): Function
    engine.listen(
        // the event name
        'draw',
        // the event callback
        function () {
            cls(4)
            rectfill(0, 0, 100, 100, 5)
        }
    )

    // another `listen()` example
    engine.listen('tapped', function (x, y) {
        console.log(`Tap detected in X=${x} Y=${y}`)
    })

    // the `listen()` returns a function that when called removes that listener
    // example: call this listencer once and then remove it
    let deleteListener = engine.listen('update', () => {
        console.log('JUST ONE TIME!')
        deleteListener()
    })

    // use `setvar` to create or update variables
    // example: create a variable named FOO
    engine.setvar('FOO', 42)

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
