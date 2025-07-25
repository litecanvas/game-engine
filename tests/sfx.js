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
        animate: false,
        global: false,
    })
})

// prettier-ignore
const zzfxSound = [1.2,,498,.01,.05,.17,,,,100,281,.05,,,6.4,,,.93,.04,,-1484]

test('plays a ZzFX array of params', async (t) => {
    const result = local.sfx(zzfxSound)

    t.is(result, zzfxSound)
})

test('plays a default sound if the first argument is omitted', async (t) => {
    const defaultSound = local.stat(6)
    const result = local.sfx()

    t.is(defaultSound, result)
})

test('the second argument increments the pitch', async (t) => {
    const pitchSlide = 150
    const result = local.sfx(zzfxSound, pitchSlide)

    t.is(zzfxSound[10] + pitchSlide, result[10])
})

test('the second argument changes the sound volume', async (t) => {
    const volumeFactor = 2
    const result = local.sfx(zzfxSound, 0, volumeFactor)

    t.is(zzfxSound[0] * volumeFactor, result[0])
})

test('returns false if the global volume is muted', async (t) => {
    local.volume(0) // mute

    const result = local.sfx()

    t.false(result)
})

test('only plays sounds if some interaction has been made on the page', async (t) => {
    navigator.userActivation.hasBeenActive = false

    const result = local.sfx()

    t.false(result)
})
