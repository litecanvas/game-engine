let x, y, color

litecanvas()

function init() {
    x = CENTERX
    y = CENTERY
    color = 0
}

function update() {
    if (iskeypressed('space')) {
        color = randi(0, 11)
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
    cls(color)
    text(0, 0, 'Press arrow keys to move', color + 3)
    text(0, 32, 'Hit spacebar to change the colors', color + 3)
    circfill(x, y, 64, color + 4)
}
