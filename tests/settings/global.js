import test from 'ava'
import '../_mocks/browser.js'
import '../../dist/dist.dev.js'

test('globally by default', (t) => {
    const g = litecanvas()
    t.true(globalThis.__litecanvas === g)
})

test('throws error if instantiated globally more than once', (t) => {
    try {
        litecanvas()
        t.fail() // fail if not throws
    } catch (e) {
        t.deepEqual(e, 'global litecanvas already instantiated')
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
