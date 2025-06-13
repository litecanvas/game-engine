import test from 'ava'
import './_mocks/browser.js'
import litecanvas from '../src/index.js'

let g = litecanvas({
    animate: false,
})

test('changes the global variable `zzfxV`', (t) => {
    const expected = 10
    g.volume(expected)

    t.is(globalThis.zzfxV, expected)
})
