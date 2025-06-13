import test from 'ava'
import './_mocks/browser.js'
import litecanvas from '../src/index.js'

let g = litecanvas({
    animate: false,
})

test('PI', (t) => {
    t.is(g.PI, Math.PI)
})

test('TWO_PI', (t) => {
    t.is(g.TWO_PI, Math.PI * 2)
})

test('HALF_PI', (t) => {
    t.is(g.HALF_PI, Math.PI / 2)
})

test('lerp', (t) => {
    t.plan(4)

    t.is(g.lerp(10, 20, 0), 10)
    t.is(g.lerp(10, 20, 0.5), 15)
    t.is(g.lerp(10, 20, 1), 20)
    t.is(g.lerp(10, 20, 2), 30)
})

test('deg2rad', (t) => {
    t.plan(2)

    t.is(g.deg2rad(180), g.PI)
    t.is(g.deg2rad(360), g.TWO_PI)
})

test('rad2deg', (t) => {
    t.plan(2)

    t.is(g.rad2deg(g.PI), 180)
    t.is(g.rad2deg(g.HALF_PI), 90)
})

test('clamp', (t) => {
    t.plan(3)

    t.is(g.clamp(-10, 0, 100), 0)
    t.is(g.clamp(50, 0, 100), 50)
    t.is(g.clamp(999999, 0, 100), 100)
})

test('wrap', (t) => {
    t.plan(3)

    t.is(g.wrap(5, 0, 10), 5)
    t.is(g.wrap(-1, 0, 10), 9)
    t.is(g.wrap(11, 0, 10), 1)
})

test('map', (t) => {
    t.plan(2)

    // without contrains (default behavior)
    t.is(g.map(150, 0, 100, 0, 1), 1.5)
    // with contrains
    t.is(g.map(150, 0, 100, 0, 1, true), 1)
})

test('norm', (t) => {
    t.plan(2)

    // without contrains
    t.is(g.norm(50, 0, 100), 0.5)
    // with contrains
    t.is(g.norm(150, 0, 100), 1.5)
})

test('round', (t) => {
    const n = 9.87654321

    t.plan(3)

    // without precision
    t.is(g.round(n), 10)

    // with precision
    t.is(g.round(n, 2), 9.88)
    t.is(g.round(n, 5), 9.87654)
})
