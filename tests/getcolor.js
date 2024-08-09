import test from 'ava'
import './_mocks/browser.js'
import litecanvas from '../src/index.js'
import { colors } from '../src/palette.js'

let g = litecanvas()

test('getcolor() should returns the hexadecimal code of each color', (t) => {
    t.plan(colors.length)

    for (const index of colors.keys()) {
        t.deepEqual(g.getcolor(index), colors[index])
    }
})
