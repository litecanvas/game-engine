import test from 'ava'
import { setupDOM } from '../_mocks/dom.js'
import litecanvas from '../../src/index.js'

test.before(() => {
    setupDOM()
})

test('returns the canvas', (t) => {
    const local = litecanvas({
        animate: false,
        global: false,
    })
    const c = local.canvas()
    t.is(c.tagName, 'CANVAS')
    local.quit()
})

test('returns the custom canvas', (t) => {
    const customCanvas = document.createElement('canvas')

    customCanvas.id = 'my-custom-canvas'

    window.document.body.appendChild(customCanvas)

    const expected = customCanvas

    const local = litecanvas({
        animate: false,
        canvas: '#' + customCanvas.id,
        global: false,
    })

    const current = local.canvas()

    t.is(expected, current)

    local.quit()
})
