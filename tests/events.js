import test from 'ava'
import { setupDOM, onLitecanvas } from '@litecanvas/jsdom-extras'
import litecanvas from '../src/index.js'

/** @type {LitecanvasInstance} */
let local

test.before(() => {
    setupDOM()

    local = litecanvas({
        global: false,
    })
})

test.after(() => {
    local.quit()
})

test('event names are case insensitive', async (t) => {
    await onLitecanvas(local, 'init', () => {
        local.listen('myevent', (data) => {
            t.pass()
        })

        // "MyEvent" should trigger "myevent"
        local.emit('MyEvent')
    })
})

test('No event is emitted before the "init" event', async (t) => {
    t.plan(1)

    local.listen('my-another-event', (data) => {
        t.fail()
    })

    // triggering that event before the "init" event
    // nothing should happens
    local.emit('my-another-event')

    t.pass()
})
