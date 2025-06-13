import test from 'ava'
import './_mocks/browser.js'
import litecanvas from '../src/index.js'

let g = litecanvas({
    animate: false,
})

// prettier-ignore
const zzfxSound = [1.2,,498,.01,.05,.17,,,,100,281,.05,,,6.4,,,.93,.04,,-1484]

test('plays a ZzFX array of params', (t) => {
    const result = g.sfx(zzfxSound)

    t.is(result, zzfxSound)
})

test('plays a default sound if the first argument is omitted', (t) => {
    const DEFAULT_SFX = g.stat(6)
    const result = g.sfx()

    t.is(DEFAULT_SFX, result)
})

test('the second argument increments the pitch', (t) => {
    const pitchSlide = 150
    const result = g.sfx(zzfxSound, pitchSlide)

    t.is(zzfxSound[10] + pitchSlide, result[10])
})

test('the second argument changes the sound volume', (t) => {
    const volumeFactor = 2
    const result = g.sfx(zzfxSound, 0, volumeFactor)

    t.is(zzfxSound[0] * volumeFactor, result[0])
})

test('returns false if the global volume is muted', (t) => {
    g.volume(0) // mute

    const result = g.sfx()

    t.false(result)
})

test('only plays sounds if some interaction has been made on the page', (t) => {
    navigator.userActivation.hasBeenActive = false

    const result = g.sfx()

    t.true(false === result)
})
