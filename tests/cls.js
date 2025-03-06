import test from 'ava'
import './_mocks/browser.js'
import '../src/web.js'

let g = litecanvas({
    width: 256,
    height: 128,
})

test('clear screen with color', (t) => {
    const colorIndex = 5
    const colorValue = g.getcolor(colorIndex)

    g.cls(colorIndex)

    const expected = [
        'beginPath',
        `rect 0,0,${g.WIDTH},${g.HEIGHT}`,
        `set fillStyle ${colorValue}`,
        'fill',
    ]
    const actual = g.ctx()._calls.slice(-expected.length)

    t.deepEqual(actual, expected)
})

test('clear screen without 1st argument', (t) => {
    g.cls()

    const expected = [`clearRect 0,0,${g.WIDTH},${g.HEIGHT}`]

    t.deepEqual(g.ctx()._calls.slice(-expected.length), expected)
})
