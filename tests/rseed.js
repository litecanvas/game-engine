import test from 'ava'
import { setupDOM } from '@litecanvas/jsdom-extras'
import litecanvas from '../src/index.js'
import * as sinon from 'sinon'

test.before(() => {
    setupDOM()
    sinon.stub(console) // silent console
})

function randomNumbers(engine, n) {
    return Array(n)
        .fill(true)
        .map(() => engine.randi(0, 100))
}

test('produces random numbers based on initial seed', async (t) => {
    const seed = 42

    let engine1 = litecanvas({
        animate: false,
        global: false,
    })

    let engine2 = litecanvas({
        animate: false,
        global: false,
    })

    {
        engine1.rseed(seed)
        const actual = randomNumbers(engine1, 5)

        engine2.rseed(seed)
        const expected = randomNumbers(engine2, 5)

        // the two engine should produce the same numbers given a same seed
        t.deepEqual(actual, expected)
    }

    {
        engine1.rseed(seed) // reset the RNG using the same seed
        const actual = randomNumbers(engine1, 5)

        engine2.rseed(seed + 999) // reset with a different seed
        const expected = randomNumbers(engine2, 5)

        // now should produce diffent numbers
        t.notDeepEqual(actual, expected)
    }

    engine1.quit()
    engine2.quit()
})
