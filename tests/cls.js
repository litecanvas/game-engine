import test from 'ava'
import { setupDOM, onLitecanvas } from '@litecanvas/jsdom-extras'
import litecanvas from '../src/index.js'
import { defaultPalette as colors } from '../src/palette.js'

/** @type {LitecanvasInstance} */
let local

test.before(() => {
    setupDOM()

    local = litecanvas({
        global: false,
    })
})

test.after(() => {
    local.quit()
})

test('clear screen with color', async (t) => {
    await onLitecanvas(local, 'draw', () => {
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
})

test('clear screen without 1st argument', async (t) => {
    await onLitecanvas(local, 'draw', () => {
        local.cls()

        const expected = [`clearRect(0,0,${local.W},${local.H})`]
        const actual = local.ctx()._calls.slice(-expected.length)

        t.deepEqual(actual, expected)
    })
})
