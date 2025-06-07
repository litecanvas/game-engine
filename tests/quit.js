import test from 'ava'
import './_mocks/browser.js'
import '../src/web.js'
import { _listeners } from './_mocks/events.js'

test('removes all browser event listeners', (t) => {
    const expected = _listeners.length
    const engine = litecanvas({
        animate: false,
    })

    engine.quit()

    t.true(_listeners.length === expected)
})

test('deletes all exposed methods and props', (t) => {
    const engine = litecanvas({
        animate: false,
    })

    engine.quit()

    t.plan(2)
    t.true(globalThis.circfill === undefined)
    t.true(globalThis.ENGINE === undefined)
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
    t.true(globalThis.circfill !== undefined)
    t.true(globalThis.ENGINE !== undefined)

    quit()
})

test('remove all engine event listeners', async (t) => {
    let value = 0
    const expected = 1

    await new Promise((resolve) => {
        const instance = litecanvas()

        instance.listen('update', () => {
            value++
            quit()
            resolve()
        })
    })

    t.is(value, expected)
})
