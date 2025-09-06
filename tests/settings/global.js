import test from 'ava'
import litecanvas from '../../src/index.js'
import * as sinon from 'sinon'

test.before(() => {
    sinon.stub(console) // silent console
})

test('globally by default', async (t) => {
    const local = litecanvas({
        // global: true // default
    })
    t.is(globalThis.ENGINE, local)
    local.quit()
})

test('throws error if instantiated globally more than once', async (t) => {
    let local1, local2
    try {
        local1 = litecanvas({
            global: true,
        })
        local2 = litecanvas({
            global: true,
        })
        t.fail() // fail if not throws
    } catch (e) {
        local1.quit()
        t.is(e.message, 'only one global litecanvas is allowed')
    }
})

test('settings.global = false not throws errors', async (t) => {
    try {
        const local1 = litecanvas({
            global: false,
        })
        const local2 = litecanvas({
            global: false,
        })

        local1.quit()
        local2.quit()

        t.pass()
    } catch (e) {
        // fail if throws
        t.fail()
    }
})
