import test from 'ava'
import './_mocks/browser.js'
import '../src/web.js'
import { defaultPalette } from '../src/palette.js'

test('stat(0) returns the instance settings', (t) => {
    let local = litecanvas({
        foo: 'bar',
        animate: false,
        global: false,
    })
    const settings = local.stat(0)

    t.true(settings.foo === 'bar')
})

test('stat(1) returns true if the engine has been initialized', async (t) => {
    t.plan(2)

    const current = []

    await new Promise((resolve) => {
        const local = litecanvas({
            animate: false,
            global: false,
        })

        current.push(local.stat(1)) // not initialized

        local.listen('init', () => {
            current.push(local.stat(1)) // initialized
            resolve()
        })
    })

    t.true(current[0] === false)
    t.true(current[1] === true)
})

test('stat(2) returns the last requestAnimationFrame ID returned', async (t) => {
    t.plan(2)

    const current = []

    await new Promise((resolve) => {
        const local = litecanvas({
            global: false,
        })

        current.push(local.stat(2))

        local.listen('update', () => {
            current.push(local.stat(2))
            local.quit()
            resolve()
        })
    })

    t.true(current[0] === undefined)
    t.true(current[1] >= 1)
})

test('stat(3) returns current canvas element scale factor', async (t) => {
    t.plan(2)

    const scaled = litecanvas({
        global: false,
        animate: false,
        width: innerWidth / 2,
        height: innerHeight / 2,
        autoscale: true,
    })

    t.is(scaled.stat(3), 2)

    const notScaled = litecanvas({
        global: false,
        animate: false,
        width: 320,
        autoscale: false,
    })

    t.is(notScaled.stat(3), 1)
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

    const palette = local.stat(5)

    t.deepEqual(palette, defaultPalette)

    const customPalette = ['#000', '#FFF']

    local.pal(customPalette)

    t.deepEqual(local.stat(5), customPalette)
})

test('stat(6) returns the default sound used by `sfx()`', (t) => {
    const local = litecanvas({
        global: false,
        animate: false,
    })
    const current = local.stat(6)
    const expected = local.sfx()

    t.is(expected, current)
})

test('stat(7) returns the current timescale', (t) => {
    const local = litecanvas({
        global: false,
        animate: false,
    })

    local.timescale(2)

    t.is(local.stat(7), 2)
})

test('stat(8) returns the current volume used by ZzFX', (t) => {
    const local = litecanvas({
        global: false,
        animate: false,
    })

    t.is(local.stat(8), 1) // default is 1

    local.volume(0.155)

    t.is(local.stat(8), 0.155)
})

test('stat(9) returns the current RNG state', (t) => {
    const local = litecanvas({
        global: false,
        animate: false,
    })

    let expected = 42 // initial value

    local.rseed(expected)

    t.is(expected, local.stat(9))

    // generate 5 random numbers
    local.randi()
    local.randi()
    local.randi()
    local.randi()
    local.randi()

    // expected state after generate 5 random numbers
    expected = 1613448261

    t.is(expected, local.stat(9))
})
