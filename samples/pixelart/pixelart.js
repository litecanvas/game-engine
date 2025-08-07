litecanvas({
    width: 64,
    height: 64,
    autoscale: 4, // auto scale by until 4x
})

const smile = `
    ..0000..
    .055550.
    05505050
    05555550
    05500050
    05555550
    .055550.
    ..0000..`

// https://lospec.com/palette-list/kulepu
const palKulepu = [
    '#180c10',
    '#3d4249',
    '#798890',
    '#a6cbc4',
    '#43a6c7',
    '#2d488c',
    '#8f74e8',
    '#e7aac7',
    '#f0f5dc',
    '#f0b886',
    '#d87f5c',
    '#8b3e34',
    '#f0933b',
    '#f1cc46',
    '#89ab3e',
    '#306645',
]

let blinkFrames = 0

function update(dt) {
    // blink every 2 seconds
    if (T % 1 < dt) {
        blinkFrames = 15
    }
}

function draw() {
    cls(1)
    push()
    scale(2)

    palc() // reset the palette
    if (blinkFrames > 0) {
        palc(0, 3) // replace the black with white
        blinkFrames--
    }

    spr(0, 0, 8, 8, smile)
    pop()
}
