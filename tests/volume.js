import test from 'ava'
import { setupDOM } from '@litecanvas/jsdom-extras'
import litecanvas from '../src/index.js'

test.before(() => {
    setupDOM()
})

test('changes the global variable `zzfxV`', async (t) => {
    const local = litecanvas({
        animate: false,
        global: false,
    })

    const expected = 10

    local.volume(expected)

    const actual = globalThis.zzfxV

    t.is(actual, expected)
})
