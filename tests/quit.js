import test from 'ava'
import { setupDOM } from './_mocks/dom.js'
import litecanvas from '../src/index.js'

test.before(() => {
    setupDOM()
})

test('deletes all exposed methods and props', (t) => {
    const engine = litecanvas({
        animate: false,
    })

    engine.quit()

    t.plan(2)
    t.is(globalThis.circfill, undefined)
    t.is(globalThis.ENGINE, undefined)
})

test('deletes exposed methods and props only when is global', (t) => {
    litecanvas({
        global: true,
        animate: false,
    })

    const notglobal = litecanvas({
        global: false,
        animate: false,
    })

    notglobal.quit()

    t.plan(2)
    t.not(globalThis.circfill, undefined)
    t.not(globalThis.ENGINE, undefined)
})

test('remove all engine event listeners', async (t) => {
    let value = 0
    const expected = 1

    await new Promise((resolve) => {
        const instance = litecanvas({
            global: false,
        })

        instance.listen('update', () => {
            value++
            instance.quit()
            resolve()
        })
    })

    t.is(value, expected)
})
