import test from 'ava'
import './_mocks/browser.js'
import litecanvas from '../src/index.js'

test('produces random numbers based on initial seed', (t) => {
    t.plan(2)

    let g = litecanvas({
        width: 256,
        height: 128,
        animate: false,
    })

    // generate random numbers using randi()
    const randomNumbers = (n = 5) => {
        return Array(5)
            .fill(true)
            .map(() => g.randi(0, 100))
    }

    g.rseed(42)
    t.true(randomNumbers().join('-') === '25-8-58-22-37')

    g.rseed(42) // reset the RNG state
    t.true(randomNumbers().join('-') === '25-8-58-22-37')
})
