/**
 * How to pause your game without `timescale(0)`
 */
litecanvas({
    // pauseOnBlur: false,
})

function init() {
    speed = H / 4
    y = H
    PAUSED = false
}

// tap to pause or resume
function tapped() {
    PAUSED = !PAUSED
}

function update(dt) {
    if (PAUSED) return
    y = wrap(y - speed * dt, 0, H) // move the line
}

function draw() {
    if (PAUSED) return
    cls(0)
    text(10, 10, 'Tap to pause/resume')
    line(0, y, W, y, 5) // draw the line
}
