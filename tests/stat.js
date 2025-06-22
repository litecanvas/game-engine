import test from 'ava'
import { setupDOM } from './_mocks/dom.js'
import litecanvas from '../src/index.js'
import { defaultPalette } from '../src/palette.js'

test.before(() => {
    setupDOM()
})

test('stat(0) returns the instance settings', (t) => {
    const expected = 'bar'

    const local = litecanvas({
        foo: expected,
        animate: false,
        global: false,
    })
    const actual = local.stat(0).foo

    t.is(actual, expected)
})

test('stat(1) returns true if the engine has been initialized', async (t) => {
    t.plan(2)

    const actual = []

    await new Promise((resolve) => {
        const local = litecanvas({
            animate: false,
            global: false,
        })

        actual.push(local.stat(1)) // not initialized

        local.listen('init', () => {
            actual.push(local.stat(1)) // initialized
            resolve()
        })
    })

    t.is(actual[0], false)
    t.is(actual[1], true)
})

test('stat(2) returns the last requestAnimationFrame ID returned', async (t) => {
    t.plan(2)

    await new Promise((resolve) => {
        const local = litecanvas({
            global: false,
        })

        {
            // should be undefined before any game loop frame
            const expected = undefined
            const actual = local.stat(2)
            t.is(actual, expected)
        }

        local.listen('update', () => {
            {
                // should be a positive number after initialized
                const actual = local.stat(2)
                t.true(actual >= 1)
            }
            local.quit()
            resolve()
        })
    })
})

test('stat(3) returns current canvas element scale factor', async (t) => {
    t.plan(2)

    {
        const expected = 2
        const scaled = litecanvas({
            global: false,
            animate: false,
            width: window.innerWidth / 2,
            height: window.innerHeight / 2,
            autoscale: true,
        })
        const actual = scaled.stat(3)

        t.is(actual, expected)
    }

    {
        const expected = 1
        const notScaled = litecanvas({
            global: false,
            animate: false,
            width: 320,
            autoscale: false,
        })
        const actual = notScaled.stat(3)

        t.is(actual, expected)
    }
})

test('stat(4) returns attached event callbacks', (t) => {
    t.plan(2)

    const local = litecanvas({
        global: false,
        animate: false,
    })

    function callback() {}
    function callback2() {}

    local.listen('init', callback)

    const events = local.stat(4)

    /** @type {Set<Function>} */
    const initCallbacks = events['init']

    t.true(initCallbacks.has(callback))
    t.false(initCallbacks.has(callback2))
})

test('stat(5) returns the current color palette', (t) => {
    t.plan(2)

    const local = litecanvas({
        global: false,
        animate: false,
    })

    {
        // test the default palette
        const expected = defaultPalette
        const actual = local.stat(5)

        t.deepEqual(actual, expected)
    }

    // change the color palette
    const customPalette = ['#000', '#FFF']
    local.pal(customPalette)

    {
        const expected = customPalette
        const actual = local.stat(5)

        t.deepEqual(actual, expected)
    }
})

test('stat(6) returns the default sound used by `sfx()`', (t) => {
    const local = litecanvas({
        global: false,
        animate: false,
    })
    const actual = local.stat(6)
    const expected = local.sfx()

    t.is(actual, expected)
})

test('stat(7) returns the current timescale', (t) => {
    const local = litecanvas({
        global: false,
        animate: false,
    })

    const expected = 2

    local.timescale(expected)

    const actual = local.stat(7)

    t.is(actual, expected)
})

test('stat(8) returns the current volume used by ZzFX', (t) => {
    const local = litecanvas({
        global: false,
        animate: false,
    })

    {
        const expected = 1 // default is 1
        const actual = local.stat(8)

        t.is(actual, expected)
    }

    {
        // test a custom volume value
        const expected = 0.555

        local.volume(expected)

        const actual = local.stat(8)

        t.is(actual, expected)
    }
})

test('stat(9) returns the current RNG state', (t) => {
    t.plan(2)

    const local = litecanvas({
        global: false,
        animate: false,
    })

    {
        const expected = 42 // custom initial value

        local.rseed(expected)

        const actual = local.stat(9)

        t.is(actual, expected)
    }

    // generate 5 random numbers
    local.randi()
    local.randi()
    local.randi()
    local.randi()
    local.randi()

    {
        const actual = local.stat(9)

        // expected state after generate 5 random numbers
        const expected = 1613448261

        t.is(actual, expected)
    }
})

test('stat(10) returns the current font size', (t) => {
    t.plan(2)

    const local = litecanvas({
        global: false,
        animate: false,
    })

    {
        const actual = local.stat(10)
        const expected = 20 // initial value (default)

        t.is(actual, expected)
    }

    {
        // change the font size
        const expected = 125

        local.textsize(expected)

        const actual = local.stat(10)

        t.is(actual, expected)
    }
})

test('stat(11) returns the current font family', (t) => {
    t.plan(2)

    const local = litecanvas({
        global: false,
        animate: false,
    })

    {
        const actual = local.stat(11)
        const expected = 'sans-serif' // initial value (default)
        t.is(actual, expected)
    }

    {
        // test a custom font family
        const expected = 'serif'

        local.textfont(expected)

        const actual = local.stat(11)

        t.is(actual, expected)
    }
})

test('stat modified via event', async (t) => {
    const expected = 'BAR'

    await new Promise((resolve) => {
        const local = litecanvas({
            foo: 'bar',
            animate: false,
            global: false,
        })

        local.listen('stat', (data) => {
            // modify only the stat(0)
            if (0 === data.index) {
                data.value.foo = expected
            }
        })

        // No event is emitted before the "init"
        // So check in "init" or later
        local.listen('init', () => {
            const actual = local.stat(0).foo
            t.is(actual, expected)
            resolve()
            local.quit()
        })
    })
})

test('stat created via event', async (t) => {
    const customIndex = 42
    const expected = 'The answer to the Ultimate Question of Life, the Universe, and Everything'

    await new Promise((resolve) => {
        const local = litecanvas({
            animate: false,
            global: false,
        })

        local.listen('stat', (data) => {
            // modify only the stat(0)
            if (customIndex === data.index) {
                data.value = expected
            }
        })

        // No event is emitted before the "init"
        // So check in "init" or later
        local.listen('init', () => {
            const actual = local.stat(customIndex)
            t.is(actual, expected)
            local.quit()
            resolve()
        })
    })
})
