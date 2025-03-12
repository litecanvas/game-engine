import test from 'ava'
import './_mocks/browser.js'
import '../src/web.js'
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
    t.true(globalThis.ENGINE === undefined)
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
    t.true(globalThis.ENGINE !== undefined)

    quit()
})

test('remove all engine event listeners', async (t) => {
    let value = 0
    const expected = 1

    await new Promise((resolve) => {
        const instance = litecanvas({
            animate: false,
        })

        instance.listen('update', () => {
            value++
            quit()
            resolve(instance)
        })

        instance.listen('init', () => {
            // simulate 3 updates but only 1 should happens
            instance.emit('update')
            instance.emit('update')
            instance.emit('update')
        })
    })

    t.is(value, expected)
})
