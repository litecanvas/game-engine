import test from 'ava'
import litecanvas from '../../src/index.js'
import * as sinon from 'sinon'

test.before(() => {
    sinon.stub(console) // silent console
})

test('default loop listeners has priority (run first that other listeners)', async (t) => {
    const local = litecanvas({
        loop: {
            init, // default init of the loop
        },
    })

    let num = 0

    function init() {
        num = 1
    }

    // custom init of the loop
    await onLitecanvas(local, 'init', () => {
        num = 2
    })

    t.is(num, 2)
    local.quit()
})
