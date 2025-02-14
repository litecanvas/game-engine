import test from 'ava'
import './_mocks/browser.js'
import '../dist/dist.dev.js'
import { _listeners } from './_mocks/events.js'

test('removes all browser event listeners', (t) => {
    const expected = _listeners.length
    const engine = litecanvas()

    engine.quit()

    t.true(_listeners.length === expected)
})

test('deletes all exposed methods and props', (t) => {
    const engine = litecanvas()

    engine.quit()

    t.plan(2)
    t.true(globalThis.circfill === undefined)
    t.true(globalThis.__litecanvas === undefined)
})

test('deletes exposed methods and props only when is global', (t) => {
    litecanvas({
        global: true,
    })

    const notglobal = litecanvas({
        global: false,
    })

    notglobal.quit()

    t.plan(2)
    t.true(globalThis.circfill !== undefined)
    t.true(globalThis.__litecanvas !== undefined)

    quit()
})

test('remove all engine event listeners', async (t) => {
    let value = 0
    const expected = 1

    const engine = await new Promise((resolve) => {
        const instance = litecanvas({
            animate: false,
        })
        instance.listen('update', () => {
            value += 1
            quit()
            resolve(instance)
        })
        instance.emit('update')
    })

    engine.emit('update') // force a "update" event

    t.is(value, expected)
})
