import test from 'ava'
import './_mocks/browser.js'
import litecanvas from '../src/index.js'

let g = litecanvas({
    animate: false,
})

test('produces random integer numbers between MIN and MAX', (t) => {
    const times = 1000
    const min = 25
    const max = 100

    t.plan(times)

    for (let i = 0; i < times; i++) {
        const randomNumber = g.randi(min, max)
        t.true(randomNumber >= min && randomNumber <= max)
    }
})

test('by default, produces random integer numbers between 0 and 1', (t) => {
    const times = 1000

    t.plan(times)

    for (let i = 0; i < times; i++) {
        const randomNumber = g.randi()
        t.true(randomNumber >= 0 && randomNumber <= 1.0)
    }
})
