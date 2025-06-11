import test from 'ava'
import '../_mocks/browser.js'
import litecanvas from '../../src/index.js'

test('globally by default', (t) => {
    const g = litecanvas({
        animate: false,
    })
    t.true(globalThis.ENGINE === g)
})

test('throws error if instantiated globally more than once', (t) => {
    try {
        litecanvas({
            animate: false,
        })
        t.fail() // fail if not throws
    } catch (e) {
        t.is(e.message, 'two global litecanvas detected')
    }
})

test('settings.global = false not throws errors', (t) => {
    try {
        litecanvas({
            global: false,
            animate: false,
        })
        t.pass()
    } catch (e) {
        // fail if throws
        t.fail()
    }
})
