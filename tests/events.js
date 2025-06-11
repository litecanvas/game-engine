import test from 'ava'
import './_mocks/browser.js'
import litecanvas from '../src/index.js'

test('event names are case insensitive', async (t) => {
    const expected = 1

    await new Promise((resolve) => {
        let current

        const local = litecanvas({
            animate: false,
            global: false,
        })

        local.listen('myevent', (data) => {
            current = 1
        })

        local.listen('init', () => {
            local.emit('MyEvent')
            t.is(current, expected)
            local.quit()
            resolve()
        })
    })
})

test('No event is emitted before the "init" event', async (t) => {
    const expected = 1

    await new Promise((resolve) => {
        let current = 0

        const local = litecanvas({
            animate: false,
            global: false,
        })

        local.listen('never', (data) => {
            current = 1
        })

        // runs outside the "init" event
        local.emit('never')
        t.not(current, expected)
        local.quit()
        resolve()
    })
})
