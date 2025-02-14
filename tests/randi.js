import test from 'ava'
import './_mocks/browser.js'
import '../dist/dist.dev.js'

let g = litecanvas({
    width: 256,
    height: 128,
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

test('produces random integer numbers between 0 and 1', (t) => {
    const times = 1000

    t.plan(times)
    for (let i = 0; i < times; i++) {
        const randomNumber = g.randi()
        t.true(randomNumber >= 0 && randomNumber <= 1.0)
    }
})

function range(value) {
    return
}
