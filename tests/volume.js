import test from 'ava'
import litecanvas from '../src/index.js'
import * as sinon from 'sinon'

test.before(() => {
    sinon.stub(console) // silent console
})

test('changes the global variable `zzfxV`', async (t) => {
    const local = litecanvas({
        global: false,
    })

    const expected = 10

    local.volume(expected)

    const actual = globalThis.zzfxV

    t.is(actual, expected)

    local.quit()
})
