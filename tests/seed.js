import test from 'ava'
import './_mocks/browser.js'
import '../dist/dist.dev.js'

let g = litecanvas({
    width: 256,
    height: 128,
})

// generate 5 random numbers using litecanvas#randi()
const randomNumbers = () => {
    return Array(5)
        .fill(true)
        .map(() => g.randi(0, 100))
}

test('returns the current seed state', (t) => {
    g.seed(42)
    randomNumbers()
    t.true(g.seed() === 1613448261)
})

test('produces random numbers based on initial seed', (t) => {
    t.plan(2)

    g.seed(42)
    t.true(randomNumbers().join('-') === '25-8-58-22-37')

    g.seed(42) // reset the RNG state
    t.true(randomNumbers().join('-') === '25-8-58-22-37')
})
