import test from 'ava'
import { setupDOM } from '@litecanvas/jsdom-extras'
import litecanvas from '../../src/index.js'
import * as sinon from 'sinon'

test.before(() => {
    setupDOM()
    sinon.stub(console) // silent console
})

test('globally by default', async (t) => {
    const local = litecanvas({
        // global: true // default
        animate: false,
    })
    t.is(globalThis.ENGINE, local)
    local.quit()
})

test('throws error if instantiated globally more than once', async (t) => {
    try {
        litecanvas({
            global: true,
            animate: false,
        })
        litecanvas({
            global: true,
            animate: false,
        })
        t.fail() // fail if not throws
    } catch (e) {
        t.is(e.message, 'only one global litecanvas is allowed')
    }
})

test('settings.global = false not throws errors', async (t) => {
    try {
        litecanvas({
            global: false,
            animate: false,
        })
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
