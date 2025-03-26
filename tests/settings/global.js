import test from 'ava'
import '../_mocks/browser.js'
import '../../src/web.js'

test('globally by default', (t) => {
    const g = litecanvas()
    t.true(globalThis.ENGINE === g)
})

test('throws error if instantiated globally more than once', (t) => {
    try {
        litecanvas()
        t.fail() // fail if not throws
    } catch (e) {
        t.is(e.message, 'two global litecanvas detected')
    }
})

test('settings.global = false not throws errors', (t) => {
    try {
        litecanvas({
            global: false,
        })
        t.pass()
    } catch (e) {
        // fail if throws
        t.fail()
    }
})
