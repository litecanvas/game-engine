import test from 'ava'
import litecanvas from '../../src/index.js'
import * as sinon from 'sinon'

test.before(() => {
    sinon.stub(console) // silent console
})

test('autoscale on', async (t) => {
    const local = litecanvas({
        width: innerWidth / 2,
        height: innerHeight / 2,
        autoscale: true,
        global: false,
    })

    await onLitecanvas(local, 'init', () => {
        t.is(+local.canvas().style.width.replace('px', ''), innerWidth)
        t.is(local.W, innerWidth / 2)
        local.pause()
    })

    local.quit()
})

test('autoscale off', async (t) => {
    const local = litecanvas({
        width: innerWidth / 2,
        height: innerHeight / 2,
        autoscale: false,
        global: false,
    })

    await onLitecanvas(local, 'init', () => {
        t.not(+local.canvas().style.width.replace('px', ''), innerWidth)
        t.is(local.W, innerWidth / 2)
        local.pause()
    })
    local.quit()
})
