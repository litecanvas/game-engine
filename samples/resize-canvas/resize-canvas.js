litecanvas({
    width: 100,
    autoscale: false, // please disable the autoscale
})

function init() {
    resized()

    color = 0
    size = WIDTH
    limit = Math.min(innerHeight, innerWidth)
}

function tapped(tapx, tapy) {
    console.log(size, limit)
    if (size + 100 < limit) {
        increaseCanvasSize()
        sfx()
    } else {
        x = tapx
        y = tapy
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

// here's where the magic happens!
function resize(width, height) {
    CANVAS.width = width
    setvar('WIDTH', width)
    setvar('CENTERX', width / 2)

    CANVAS.height = height
    setvar('HEIGHT', height)
    setvar('CENTERY', height / 2)

    emit('resized', 1)
}
