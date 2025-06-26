import test from 'ava'
import { setupDOM } from '@litecanvas/jsdom-extras'
import litecanvas from '../../src/index.js'

test.before(() => {
    setupDOM()
})

test('custom canvas (html element)', async (t) => {
    const customCanvas = document.createElement('canvas')

    window.document.body.appendChild(customCanvas)

    const local = litecanvas({
        animate: false,
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
        animate: false,
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
