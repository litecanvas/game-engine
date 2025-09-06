import test from 'ava'
import litecanvas from '../src/index.js'
import * as sinon from 'sinon'

/** @type {LitecanvasInstance} */
let local

const N = 1000
const MIN = 50
const MAX = 100

test.before(() => {
    sinon.stub(console) // silent console

    local = litecanvas({})
})

test.after(() => {
    local.quit()
})

test('produces random integer numbers between MIN and MAX', async (t) => {
    for (let i = 0; i < N; i++) {
        const randomNumber = local.randi(MIN, MAX)
        t.true(randomNumber >= MIN && randomNumber <= MAX)
    }
})

test('by default, produces 0 or 1', async (t) => {
    for (let i = 0; i < N; i++) {
        const randomNumber = local.randi()
        t.true(randomNumber === 0 || randomNumber === 1)
    }
})
