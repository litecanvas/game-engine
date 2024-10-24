import test from 'ava'
import './_mocks/browser.js'
import litecanvas from '../src/index.js'

let testPlugin = () => {
    return {
        foo: () => 1,
    }
}

test('plugins can be loaded before "init" event', (t) => {
    return new Promise((resolve) => {
        let g = litecanvas({
            loop: { init },
            global: false,
        })

        g.use(testPlugin)

        function init() {
            resolve(g.foo())
        }
    }).then((result) => {
        t.is(result, 1)
    })
})

test('plugins can be loaded after "init" event', (t) => {
    return new Promise((resolve) => {
        let g = litecanvas({
            loop: { init },
            global: false,
        })

        function init() {
            g.use(testPlugin)

            resolve(g.foo())
        }
    }).then((result) => {
        t.is(result, 1)
    })
})
