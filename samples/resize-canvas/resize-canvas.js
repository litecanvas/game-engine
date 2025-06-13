litecanvas({
    width: 100,
    autoscale: false, // required
})

use(pluginResize)

function init() {
    resized()

    color = 0
    size = W
    limit = Math.min(innerHeight, innerWidth)

    alert('Tap the canvas to resize')
}

function tapped(tapx, tapy) {
    if (size + 100 < limit) {
        size += 100
        resize(size, size) // increase the canvas size
        sfx()
    } else {
        x = tapx
        y = tapy
    }
}

function update(dt) {
    color = T * 32
    radius = rand() * y
}

function draw() {
    cls(0)
    linewidth(randi(2, 12))
    circ(x, y, radius, color)
}

function resized() {
    x = CX
    y = CY
}

// here's where the magic happens!
function pluginResize(engine, config) {
    settings = engine.stat(0)

    if (settings.autoscale) {
        throw new Error('plugin Resize do not works with option "autoscale" enabled')
    }

    return {
        resize: (width, height) => {
            CANVAS.width = width
            def('W', width)
            def('CX', width / 2)

            CANVAS.height = height
            def('H', height)
            def('CY', height / 2)

            emit('resized', 1)
        },
    }
}
