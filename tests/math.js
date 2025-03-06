import test from 'ava'
import './_mocks/browser.js'
import '../src/web.js'

let g = litecanvas()

test('PI', (t) => {
    t.plan(1)

    t.true(g.PI === Math.PI)
})

test('TWO_PI', (t) => {
    t.plan(1)

    t.true(g.TWO_PI === Math.PI * 2)
})

test('HALF_PI', (t) => {
    t.plan(1)

    t.true(g.HALF_PI === Math.PI / 2)
})

test('lerp', (t) => {
    t.plan(4)

    t.true(g.lerp(10, 20, 0) === 10)
    t.true(g.lerp(10, 20, 0.5) === 15)
    t.true(g.lerp(10, 20, 1) === 20)
    t.true(g.lerp(10, 20, 2) === 30)
})

test('deg2rad', (t) => {
    t.plan(2)

    t.true(g.deg2rad(180) === g.PI)
    t.true(g.deg2rad(360) === g.TWO_PI)
})

test('rad2deg', (t) => {
    t.plan(2)

    t.true(g.rad2deg(g.PI) === 180)
    t.true(g.rad2deg(g.HALF_PI) === 90)
})

test('clamp', (t) => {
    t.plan(3)

    t.true(g.clamp(-10, 0, 100) === 0)
    t.true(g.clamp(50, 0, 100) === 50)
    t.true(g.clamp(999999, 0, 100) === 100)
})

test('wrap', (t) => {
    t.plan(3)

    t.true(g.wrap(5, 0, 10) === 5)
    t.true(g.wrap(-1, 0, 10) === 9)
    t.true(g.wrap(11, 0, 10) === 1)
})

test('map', (t) => {
    t.plan(2)

    // without contrains (default behavior)
    t.true(g.map(150, 0, 100, 0, 1) === 1.5)
    // with contrains
    t.true(g.map(150, 0, 100, 0, 1, true) === 1)
})

test('norm', (t) => {
    t.plan(2)

    // without contrains
    t.true(g.norm(50, 0, 100) === 0.5)
    // with contrains
    t.true(g.norm(150, 0, 100) === 1.5)
})
