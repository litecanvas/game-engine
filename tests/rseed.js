import test from 'ava'
import { setupDOM } from '@litecanvas/jsdom-extras'
import litecanvas from '../src/index.js'

test.before(() => {
    setupDOM()
})

test('produces random numbers based on initial seed', (t) => {
    t.plan(2)

    const seed = 42
    const expected = '25-8-58-22-37'

    let g = litecanvas({
        animate: false,
    })

    // generate random numbers using randi()
    const randomNumbers = (n = 5) => {
        return Array(5)
            .fill(true)
            .map(() => g.randi(0, 100))
    }

    g.rseed(seed)
    t.is(randomNumbers().join('-'), expected)

    g.rseed(seed) // reset the RNG state
    t.is(randomNumbers().join('-'), expected)
})
