import test from 'ava'
import { setupDOM } from '@litecanvas/jsdom-extras'
import litecanvas from '../../src/index.js'

test.before(() => {
    setupDOM()
})

test('custom canvas', async (t) => {
    t.plan(2)

    const customCanvas = document.createElement('canvas')

    customCanvas.id = 'my-custom-canvas'

    window.document.body.appendChild(customCanvas)

    const local = litecanvas({
        animate: false,
        canvas: '#' + customCanvas.id,
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
