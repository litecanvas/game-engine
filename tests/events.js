import test from 'ava'
import litecanvas from '../src/index.js'
import * as sinon from 'sinon'

/** @type {LitecanvasInstance} */
let local

test.before(() => {
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

test('listen() should remove a function to remove the listener', async (t) => {
    await onLitecanvas(local, 'init', () => {
        const expected = 1
        let actual = 0

        const remove = local.listen('count', () => {
            actual++
        })

        local.emit('count')

        // unlisten the event
        remove()

        local.emit('count')

        t.is(actual, expected)
    })
})

test('unlisten() should remove the listener', async (t) => {
    await onLitecanvas(local, 'init', () => {
        const expected = 2
        let actual = 0

        const callback = () => {
            actual += 2
        }

        local.listen('count2', callback)

        local.emit('count2')

        // unlisten the event
        local.unlisten('count2', callback)

        local.emit('count2')

        t.is(actual, expected)
    })
})

test('emit() always returns the second argument passed', async (t) => {
    await onLitecanvas(local, 'init', () => {
        const expected = { foo: 1, bar: 2 }

        local.listen('foo', (data) => {
            data.foo = 2
        })

        const actual = local.emit('foo', expected)

        t.is(actual, expected)
        t.is(actual.foo, 2)
    })
})
