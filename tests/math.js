import test from 'ava'
import { setupDOM } from '@litecanvas/jsdom-extras'
import litecanvas from '../src/index.js'
import * as sinon from 'sinon'

/** @type {LitecanvasInstance} */
let local

test.before(() => {
    setupDOM()
    sinon.stub(console) // silent console

    local = litecanvas({
        global: false,
    })
})

test.after(() => {
    local.quit()
})

test('PI', async (t) => {
    t.is(local.PI, Math.PI)
})

test('TWO_PI', async (t) => {
    t.is(local.TWO_PI, Math.PI * 2)
})

test('HALF_PI', async (t) => {
    t.is(local.HALF_PI, Math.PI / 2)
})

test('lerp', async (t) => {
    t.is(local.lerp(10, 20, 0), 10)
    t.is(local.lerp(10, 20, 0.5), 15)
    t.is(local.lerp(10, 20, 1), 20)
    t.is(local.lerp(10, 20, 2), 30)
})

test('deg2rad', async (t) => {
    t.is(local.deg2rad(180), local.PI)
    t.is(local.deg2rad(360), local.TWO_PI)
})

test('rad2deg', async (t) => {
    t.is(local.rad2deg(local.PI), 180)
    t.is(local.rad2deg(local.HALF_PI), 90)
})

test('clamp', async (t) => {
    t.is(local.clamp(-10, 0, 100), 0)
    t.is(local.clamp(50, 0, 100), 50)
    t.is(local.clamp(999999, 0, 100), 100)
})

test('wrap', async (t) => {
    t.is(local.wrap(5, 0, 10), 5)
    t.is(local.wrap(-1, 0, 10), 9)
    t.is(local.wrap(11, 0, 10), 1)
})

test('map', async (t) => {
    // without contrains (default behavior)
    t.is(local.map(150, 0, 100, 0, 1), 1.5)
    // with contrains
    t.is(local.map(150, 0, 100, 0, 1, true), 1)
})

test('norm', async (t) => {
    // without contrains
    t.is(local.norm(50, 0, 100), 0.5)
    // with contrains
    t.is(local.norm(150, 0, 100), 1.5)
})

test('round', async (t) => {
    const n = 9.87654321

    // without precision
    t.is(local.round(n), 10)

    // with precision
    t.is(local.round(n, 2), 9.88)
    t.is(local.round(n, 5), 9.87654)
})

test('wave', async (t) => {
    {
        // interpolate from 0 to 100 using Math.sin (default)
        const amount = 0
        const expected = 50
        const actual = local.wave(0, 100, amount)
        t.is(actual, expected)
    }

    {
        // interpolate from 0 to 100 using a custom periodic function
        const amount = 0
        const fn = (x) => -Math.cos(x)
        const expected = 0
        const actual = local.wave(0, 100, amount, fn)
        t.is(actual, expected)
    }
})
