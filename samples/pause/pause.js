/**
 * How to pause your game
 */
litecanvas({
    // pauseOnBlur: false,
})

function init() {
    speed = HEIGHT / 4
    y = HEIGHT
    PAUSED = false
}

// tap to pause or resume
function tapped() {
    PAUSED = !PAUSED
}

function update(dt) {
    if (PAUSED) return
    y = wrap(y - speed * dt, 0, HEIGHT) // move the line
}

function draw() {
    if (PAUSED) return
    cls(0)
    text(10, 10, 'Tap to pause/resume')
    line(0, y, WIDTH, y, 5) // draw the line
}
