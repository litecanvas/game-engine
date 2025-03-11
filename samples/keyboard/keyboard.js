let x = 0

litecanvas()

function init() {
    x = CENTERX
    y = CENTERY
}

function update() {
    if (iskeydown('space')) {
        return
    }
    if (iskeydown('ArrowLeft')) {
        x -= 5
    }
    if (iskeydown('ArrowRight')) {
        x += 5
    }
    if (iskeydown('ArrowUp')) {
        y -= 5
    }
    if (iskeydown('ArrowDown')) {
        y += 5
    }
}

function draw() {
    cls(0)
    text(0, 0, 'Use arrows to move')
    text(0, 32, 'Hold space bar to disable movement')
    circfill(x, y, 64, 4)
}
