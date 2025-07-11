import test from 'ava'
import { setupDOM } from '@litecanvas/jsdom-extras'
import litecanvas from '../src/index.js'
import * as sinon from 'sinon'

test.before(() => {
    setupDOM()
    sinon.stub(console) // silent console
})

test('deletes exposed methods and props only when is global', async (t) => {
    const global = litecanvas({
        global: true,
        animate: false,
    })

    const notglobal = litecanvas({
        global: false,
        animate: false,
    })

    notglobal.quit()

    t.not(globalThis.circfill, undefined)
    t.not(globalThis.ENGINE, undefined)

    global.quit()

    t.is(globalThis.circfill, undefined)
    t.is(globalThis.ENGINE, undefined)
})

test('remove all engine event listeners', async (t) => {
    t.plan(1)

    await new Promise((resolve) => {
        const local = litecanvas({
            global: false,
        })

        local.listen('draw', () => {
            t.fail()
        })

        local.listen('update', () => {
            // "update" runs before the "draw" event
            // so destroy lets destroy that engine instance
            // and the "draw" event will never happens
            local.quit()
            resolve()
        })
    })

    t.pass()
})
