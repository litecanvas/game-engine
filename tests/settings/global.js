import test from 'ava'
import '../_mocks/browser.js'
import litecanvas from '../../src/index.js'

test('globally by default', (t) => {
    litecanvas()
    t.true(globalThis.__litecanvas)
})

test('throws error if instantiated globally more than once', (t) => {
    try {
        litecanvas()
        t.fail() // fail if not throws
    } catch (e) {
        t.deepEqual(e, 'Cannot instantiate litecanvas globally twice')
    }
})

test('settings.global = false not throws errors', (t) => {
    t.notThrows(() => {
        litecanvas({
            global: false,
        })
    })
})
