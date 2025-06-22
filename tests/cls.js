import test from 'ava'
import { setupDOM } from '@litecanvas/jsdom-extras'
import litecanvas from '../src/index.js'
import { defaultPalette } from '../src/palette.js'

test.before(() => {
    setupDOM()
})

test('clear screen with color', (t) => {
    const local = litecanvas({
        animate: false,
        global: false,
    })

    const colors = defaultPalette

    const colorIndex = 5
    const colorValue = colors[colorIndex]

    local.cls(colorIndex)

    const expected = [
        'beginPath()',
        `rect(0,0,${local.W},${local.H},undefined)`,
        `set fillStyle ${colorValue}`,
        'fill()',
    ]
    const actual = local.ctx()._calls.slice(-expected.length)

    t.deepEqual(actual, expected)
})

test('clear screen without 1st argument', (t) => {
    const local = litecanvas({
        animate: false,
        global: false,
    })

    local.cls()

    const expected = [`clearRect(0,0,${local.W},${local.H})`]

    t.deepEqual(local.ctx()._calls.slice(-expected.length), expected)
})
