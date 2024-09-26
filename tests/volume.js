import test from 'ava'
import './_mocks/browser.js'
import litecanvas from '../src/index.js'

let g = litecanvas({
    width: 256,
    height: 128,
})

test('changes the global variable `zzfxV`', (t) => {
    g.volume(10)

    t.true(10 === globalThis.zzfxV)
})
