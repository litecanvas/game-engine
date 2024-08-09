import test from 'ava'
import './_mocks/browser.js'
import litecanvas from '../src/index.js'

let g = litecanvas()

test('PI', (t) => {
    t.plan(1)

    t.deepEqual(g.PI, Math.PI)
})

test('TWO_PI', (t) => {
    t.plan(1)

    t.deepEqual(g.TWO_PI, Math.PI * 2)
})

test('HALF_PI', (t) => {
    t.plan(1)

    t.deepEqual(g.HALF_PI, Math.PI / 2)
})

test('lerp', (t) => {
    t.plan(4)

    t.deepEqual(g.lerp(10, 20, 0), 10)
    t.deepEqual(g.lerp(10, 20, 0.5), 15)
    t.deepEqual(g.lerp(10, 20, 1), 20)
    t.deepEqual(g.lerp(10, 20, 2), 30)
})

test('deg2rad', (t) => {
    t.plan(2)

    t.deepEqual(g.deg2rad(180), g.PI)
    t.deepEqual(g.deg2rad(360), g.TWO_PI)
})

test('rad2deg', (t) => {
    t.plan(2)

    t.deepEqual(g.rad2deg(g.PI), 180)
    t.deepEqual(g.rad2deg(g.HALF_PI), 90)
})

test('clamp', (t) => {
    t.plan(3)

    t.deepEqual(g.clamp(-10, 0, 100), 0)
    t.deepEqual(g.clamp(50, 0, 100), 50)
    t.deepEqual(g.clamp(999999, 0, 100), 100)
})

test.todo('wrap')

test.todo('map')

test.todo('norm')
