import test from 'ava'
import litecanvas from '../../src/index.js'
import * as sinon from 'sinon'

test.before(() => {
    sinon.stub(console) // silent console
})

test('custom canvas (html element)', async (t) => {
    const customCanvas = document.createElement('canvas')

    window.document.body.appendChild(customCanvas)

    const local = litecanvas({
        canvas: customCanvas,
        global: false,
    })

    const expected = customCanvas

    {
        const current = local.canvas()
        t.is(expected, current)
    }

    {
        const current = local.ctx().canvas
        t.is(expected, current)
    }

    local.quit()
})

test('custom canvas (CSS selector)', async (t) => {
    const customCanvas = document.createElement('canvas')

    window.document.body.appendChild(customCanvas)

    customCanvas.id = 'custom-canvas'

    const local = litecanvas({
        canvas: `#${customCanvas.id}`, // the canvas selector
        global: false,
    })

    const expected = customCanvas

    {
        const current = local.canvas()
        t.is(expected, current)
    }

    {
        const current = local.ctx().canvas
        t.is(expected, current)
    }

    local.quit()
})
