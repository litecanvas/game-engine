import test from 'ava'
import './_mocks/browser.js'
import litecanvas from '../src/index.js'
import { defaultPalette } from '../src/palette.js'

let g = litecanvas({
    width: 256,
    height: 128,
    animate: false,
})

test('clear screen with color', (t) => {
    const colors = defaultPalette

    const colorIndex = 5
    const colorValue = colors[colorIndex]

    g.cls(colorIndex)

    const expected = ['beginPath', `rect 0,0,${g.W},${g.H}`, `set fillStyle ${colorValue}`, 'fill']
    const actual = g.ctx()._calls.slice(-expected.length)

    t.deepEqual(actual, expected)
})

test('clear screen without 1st argument', (t) => {
    g.cls()

    const expected = [`clearRect 0,0,${g.W},${g.H}`]

    t.deepEqual(g.ctx()._calls.slice(-expected.length), expected)
})
