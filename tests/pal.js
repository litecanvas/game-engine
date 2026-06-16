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

test('change the current color palette', async (t) => {
    await onLitecanvas(local, 'draw', () => {
        const customPalette = ['#123', '#456']
        local.pal(customPalette)

        const colors = local.stat(5)

        t.is(colors[0], customPalette[0])
    })
})

test('restore the previous color palette', async (t) => {
    await onLitecanvas(local, 'draw', () => {
        const _firstPalette = ['#114', '#fee']
        local.pal(_firstPalette)

        const _secondPalette = ['#213', '#abc']
        local.pal(_secondPalette)

        const _currentPalette = local.stat(5)
        t.not(_currentPalette[0], _firstPalette[0])

        local.pal()
        const _restoredPalette = local.stat(5)

        t.is(_restoredPalette[0], _firstPalette[0])
    })
})
