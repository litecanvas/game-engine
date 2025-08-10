import test from 'ava'
import { onLitecanvas, setupDOM } from '@litecanvas/jsdom-extras'
import litecanvas from '../src/index.js'
import { defaultPalette } from '../src/palette.js'
import * as sinon from 'sinon'

/** @type {LitecanvasInstance} */
let local

/** @type {LitecanvasOptions} */
const settings = {
    global: false,
    customProp: true,
}

test.before(() => {
    setupDOM()
    sinon.stub(console) // silent console

    local = litecanvas(settings)
})

test.after(() => {
    local.quit()
})

test('stat(0) returns the instance settings', async (t) => {
    const expected = settings
    const actual = local.stat(0)

    t.is(actual.customProp, expected.customProp)
})

test('stat(1) returns true if the engine has been initialized', async (t) => {
    const actual = local.stat(1)
    const expected = false

    t.is(actual, expected)

    await onLitecanvas(local, 'init', () => {
        const actual = local.stat(1)
        const expected = true

        t.is(actual, expected)
    })
})

test('stat(2) returns the current delta time (dt) value', async (t) => {
    await onLitecanvas(local, 'init', () => {
        const fps = 30

        local.framerate(fps)

        const actual = local.stat(2)
        const expected = 1 / fps

        t.true(actual === expected)
    })
})

test('stat(3) returns current canvas element scale factor', async (t) => {
    {
        const expected = 2
        const scaled = litecanvas({
            global: false,

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

            width: 320,
            autoscale: false,
        })
        const actual = notScaled.stat(3)

        t.is(actual, expected)
    }
})

test('stat(4) returns attached event callbacks', async (t) => {
    function callback() {}
    function callback2() {}

    local.listen('init', callback)

    const events = local.stat(4)

    /** @type {Set<Function>} */
    const initCallbacks = events['init']

    t.true(initCallbacks.has(callback))
    t.false(initCallbacks.has(callback2))
})

test('stat(5) returns the current color palette', async (t) => {
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

test('stat(6) returns the default sound used by `sfx()`', async (t) => {
    const actual = local.stat(6)
    const expected = local.sfx()

    t.is(actual, expected)
})

test('stat(7) returns the current timescale', async (t) => {
    const expected = 2

    local.timescale(expected)

    const actual = local.stat(7)

    t.is(actual, expected)
})

test('stat(8) returns the current volume used by ZzFX', async (t) => {
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

test('stat(9) returns the current RNG state (current seed)', async (t) => {
    {
        const expected = 42 // custom initial value

        local.rseed(expected)

        const actual = local.stat(9)

        t.is(actual, expected)
    }
})

test('stat(10) returns the current font size', (t) => {
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

test('stat(11) returns the current font family', async (t) => {
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

test('stat(12) returns the current color palette state modified by palc()', (t) => {
    {
        const expected = [] // initial value (default)
        const actual = local.stat(12)
        t.deepEqual(actual, expected)
    }

    {
        // prettier-ignore
        const expected = [3, , , 5,]

        local.palc(0, 3)
        local.palc(3, 5)

        const actual = local.stat(12)

        t.deepEqual(actual, expected)

        local.palc() // reset
    }
})

test('stat modified via event', async (t) => {
    const expected = 'BAR'

    await onLitecanvas(local, 'init', () => {
        local.listen('stat', (data) => {
            // modify only the stat(0)
            if (0 === data.index) {
                data.value.foo = expected
            }
        })

        const actual = local.stat(0).foo
        t.is(actual, expected)
    })
})

test('number stat created via event', async (t) => {
    await onLitecanvas(local, 'init', () => {
        const customIndex = 42
        const expected = 'The answer to the Ultimate Question of Life, the Universe, and Everything'

        local.listen('stat', (data) => {
            // create a value for stat(42)
            if (customIndex === data.index) {
                data.value = expected
            }
        })

        const actual = local.stat(customIndex)
        t.is(actual, expected)
    })
})

test('string stat created via event', async (t) => {
    await onLitecanvas(local, 'init', () => {
        const customIndex = 'forty-two'
        const expected = 'The answer to the Ultimate Question of Life, the Universe, and Everything'

        local.listen('stat', (data) => {
            // create a value for stat(42)
            if (customIndex === data.index) {
                data.value = expected
            }
        })

        const actual = local.stat(customIndex)
        t.is(actual, expected)
    })
})
