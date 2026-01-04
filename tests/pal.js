import test from 'ava'
import litecanvas from '../src/index.js'
import { defaultPalette } from '../src/palette.js'
import * as sinon from 'sinon'

let /** @type {LitecanvasInstance} */
    local,
    /** @type {sinon.SinonSpiedInstance<CanvasRenderingContext2D>} */
    contextSpy

test.before(() => {
    sinon.stub(console) // silent console

    local = litecanvas({
        global: false,
    })

    contextSpy = sinon.spy(local.ctx())
})

test.after(() => {
    local.quit()
})

test('change the color palette', async (t) => {
    await onLitecanvas(local, 'draw', () => {
        const customPalette = ['#123', '#456']
        local.pal(customPalette)

        const colors = local.stat(5)

        t.is(colors[0], customPalette[0])
    })
})

test('reset the color palette', async (t) => {
    await onLitecanvas(local, 'draw', () => {
        local.pal()

        const colors = local.stat(5)

        t.is(colors[0], defaultPalette[0])
    })
})
