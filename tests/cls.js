import test from 'ava'
import { setupDOM, onLitecanvas } from '@litecanvas/jsdom-extras'
import litecanvas from '../src/index.js'
import { defaultPalette as colors } from '../src/palette.js'
import * as sinon from 'sinon'

let /** @type {LitecanvasInstance} */
    local,
    /** @type {sinon.SinonSpiedInstance<CanvasRenderingContext2D>} */
    contextSpy,
    /** @type {sinon.SinonSpiedInstance<Console>} */
    consoleSpy

test.before(() => {
    setupDOM()
    sinon.stub(console) // silent console

    local = litecanvas({
        global: false,
    })

    contextSpy = sinon.spy(local.ctx())
})

test.after(() => {
    local.quit()
})

test('clear screen with color', async (t) => {
    await onLitecanvas(local, 'draw', () => {
        const color = 5

        local.cls(color)

        t.true(contextSpy.beginPath.called)
        t.true(contextSpy.rect.calledWith(0, 0, local.W, local.H, undefined))
        t.is(contextSpy.fillStyle, colors[color])
        t.true(contextSpy.fill.called)

        sinon.resetHistory(contextSpy)
    })
})

test('clear screen without 1st argument', async (t) => {
    await onLitecanvas(local, 'draw', () => {
        local.cls()

        t.true(contextSpy.clearRect.calledWith(0, 0, local.W, local.H))
        t.false(contextSpy.beginPath.called)

        sinon.resetHistory(contextSpy)
    })
})
