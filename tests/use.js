import test from 'ava'
import './_mocks/browser.js'
import litecanvas from '../src/index.js'

let testPlugin = (engine, helpers, config) => {
    return {
        foo: () => config.foo || 1,
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

test('plugins can be used for multiple engine instances', (t) => {
    let done = 0
    let foo1, foo2
    return new Promise((resolve) => {
        let g1 = litecanvas({
            loop: {
                init() {
                    g1.use(testPlugin)
                    foo1 = g1.foo()
                    done++
                },
            },
            global: false,
        })

        let g2 = litecanvas({
            loop: {
                init() {
                    g2.use(testPlugin, {
                        foo: 5,
                    })
                    foo2 = g2.foo()
                    done++
                },
            },
            global: false,
        })

        const check = () => {
            if (2 === done) {
                resolve(true)
            } else {
                setTimeout(check)
            }
        }
        setTimeout(check, 10)
    }).then((result) => {
        t.is(foo1, 1)
        t.is(foo2, 5)
    })
})
