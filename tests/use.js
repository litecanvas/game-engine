import test from 'ava'
import { setupDOM, onLitecanvas } from '@litecanvas/jsdom-extras'
import litecanvas from '../src/index.js'
import * as sinon from 'sinon'

test.before(() => {
    setupDOM()
    sinon.stub(console) // silent console
})

let pluginFoo = (engine, config) => {
    return {
        foo: () => config.foo || 1,
    }
}

test('plugins can be loaded before "init" event', async (t) => {
    const local = litecanvas({
        global: false,
    })

    local.use(pluginFoo)

    await onLitecanvas(local, 'init', () => {
        const expected = 1
        const actual = local.foo()
        t.is(actual, expected)
    })

    local.quit()
})

test('plugins can be loaded on "init" event', async (t) => {
    const local = litecanvas({
        global: false,
    })

    await onLitecanvas(local, 'init', () => {
        local.use(pluginFoo)

        const expected = 1
        const actual = local.foo()
        t.is(actual, expected)
    })

    local.quit()
})

test('plugins can be used for multiple engine instances', async (t) => {
    const local = litecanvas({
        global: false,
    })

    await onLitecanvas(local, 'init', () => {
        const expected = 3

        local.use(pluginFoo, {
            foo: expected,
        })

        const actual = local.foo()

        t.is(actual, expected)
    })

    local.quit()

    const local2 = litecanvas({
        global: false,
    })

    await onLitecanvas(local2, 'init', () => {
        const expected = 5

        local2.use(pluginFoo, {
            foo: expected,
        })

        const actual = local2.foo()

        t.is(actual, expected)
    })

    local2.quit()
})
