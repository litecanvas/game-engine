import test from 'ava'
import './_mocks/browser.js'
import litecanvas from '../src/index.js'

let g = litecanvas({
    width: 256,
    height: 128,
})

test('produces random float numbers between MIN and MAX', (t) => {
    const times = 1000
    const min = 50
    const max = 100

    t.plan(times)
    for (let i = 0; i < times; i++) {
        const randomNumber = g.rand(min, max)
        t.true(randomNumber >= min && randomNumber <= max)
    }
})

test('produces random float numbers between 0 and 1.0', (t) => {
    const times = 1000

    t.plan(times)
    for (let i = 0; i < times; i++) {
        const randomNumber = g.rand()
        t.true(randomNumber >= 0 && randomNumber <= 1.0)
    }
})

function range(value) {
    return
}
