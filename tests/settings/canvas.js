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
    const c = local.CANVAS
    t.is(c.tagName, 'CANVAS')
    local.quit()
})

test('returns the custom canvas', (t) => {
    const c = document.createElement('canvas')

    c.id = 'my-custom-canvas'

    window.document.body.appendChild(c)

    const expected = c

    const local = litecanvas({
        animate: false,
        canvas: '#' + c.id,
        global: false,
    })

    const current = local.CANVAS

    t.is(expected, current)

    local.quit()
})
