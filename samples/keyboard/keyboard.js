let x = 0

litecanvas()

function init() {
    x = CENTERX
}

function update() {
    if (iskeydown('arrowleft')) {
        x -= 5
    }

    if (iskeydown('arrowright')) {
        x += 5
    }
}

function draw() {
    cls(0)
    circfill(x, CENTERY, 64, 4)
}
