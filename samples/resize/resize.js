litecanvas({
    width: 100,
    autoscale: false,
})

function init() {
    color = 0
    size = 100
    limit = Math.min(innerHeight, innerWidth)
}

function tapped(tapx, tapy) {
    x = tapx
    y = tapy
    if (size + 100 < limit) {
        increaseCanvasSize()
        sfx()
    }
}

function update(dt) {
    color = ELAPSED * 32
    radius = rand() * y
}

function draw() {
    cls(0)
    linewidth(randi(2, 12))
    circ(x, y, radius, color)
}

function resized() {
    x = CENTERX
    y = CENTERY
}

function increaseCanvasSize() {
    size += 100
    resize(size, size)
}
