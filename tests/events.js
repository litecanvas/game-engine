import test from 'ava'
import { setupDOM, onLitecanvas } from '@litecanvas/jsdom-extras'
import litecanvas from '../src/index.js'
import * as sinon from 'sinon'

/** @type {LitecanvasInstance} */
let local

test.before(() => {
    setupDOM()
    sinon.stub(console) // silent console

    local = litecanvas({
        global: false,
    })
})

test.after(() => {
    local.quit()
})

test('event names are case insensitive', async (t) => {
    await onLitecanvas(local, 'init', () => {
        const expected = 1
        local.listen('myevent', (data) => {
            const actual = data
            t.is(actual, expected)
        })

        // "MyEvent" should trigger "myevent"
        local.emit('MyEvent', expected)
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
