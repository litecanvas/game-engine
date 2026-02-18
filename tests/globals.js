import test from 'ava'
import litecanvas from '../src/index.js'
import * as sinon from 'sinon'

test.before(() => {
    sinon.stub(console) // silent console
})

test('variable F should count frames', async (t) => {
    t.plan(1)

    const local = litecanvas({
        global: false,
    })
    const expected = 3

    await new Promise((resolve) => {
        let i = expected
        local.listen('draw', () => {
            i--
            if (i === 0) {
                resolve()
                local.quit()
            }
        })
    })

    t.is(local.F, expected)
})
