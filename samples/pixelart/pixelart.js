litecanvas({
    width: 64,
    height: 64,
    autoscale: 4, // auto scale by until 4x
})

const smile = `
    ..1111..
    .100001.
    10100101
    10000001
    10100101
    10111101
    .100001.
    ..1111..`

let blinkFrames = 0

function update(dt) {
    // blink every 3 seconds
    if (T % 3 < dt) {
        blinkFrames = 60
    }
}

function draw() {
    cls(0)
    push()
    scale(2)

    palc() // reset the palette
    if (blinkFrames > 0) {
        palc(0, 2) // replace the black with white
        blinkFrames--
    }

    spr(0, 0, smile)
    pop()
}
