litecanvas()

let speed, y

function init() {
    speed = H / 4
    y = H
}

// tap to pause or resume
function tapped() {
    paused() ? resume() : pause()
}

function update(dt) {
    y = wrap(y - speed * dt, 0, H) // move the line
}

function draw() {
    cls(0)
    text(10, 10, 'Tap to pause/resume')
    line(0, y, W, y, 2) // draw the line
}
