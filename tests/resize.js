import test from 'ava'
import litecanvas from '../src/index.js'
import { defaultPalette as colors } from '../src/palette.js'
import * as sinon from 'sinon'

let /** @type {LitecanvasInstance} */ local

test.before(() => {
    sinon.stub(console) // silent console

    local = litecanvas({
        global: false,
    })
})

test.after(() => {
    local.quit()
})

test('resizes the canvas with width and height', async (t) => {
    await onLitecanvas(local, 'init', () => {
        const w = 320,
            h = 160

        local.resize(w, h)

        {
            const actual = local.canvas().width
            const expected = w
            t.is(actual, expected)
        }

        {
            const actual = local.W
            const expected = w
            t.is(actual, expected)
        }

        {
            const actual = local.canvas().height
            const expected = h
            t.is(actual, expected)
        }

        {
            const actual = local.H
            const expected = h
            t.is(actual, expected)
        }
    })
})

test('resizes the canvas with width only', async (t) => {
    await onLitecanvas(local, 'init', () => {
        const w = 320

        local.resize(w)

        {
            const actual = local.W
            const expected = w
            t.is(actual, expected)
        }

        {
            const actual = local.H
            const expected = w
            t.is(actual, expected)
        }
    })
})

test('overrides the user-defined (or default) settings.autoscale', async (t) => {
    await onLitecanvas(local, 'init', () => {
        const newAutoscale = 3

        local.resize(1, 1, newAutoscale)

        const actual = local.stat(0).autoscale
        const expected = newAutoscale

        t.is(actual, expected)
    })
})

test('preserves the user-defined (or default) settings.autoscale', async (t) => {
    const expected = 3
    const e = litecanvas({
        global: false,
        autoscale: expected,
    })

    e.resize(1, 1)

    const actual = e.stat(0).autoscale

    t.is(actual, expected)

    e.quit()
})
