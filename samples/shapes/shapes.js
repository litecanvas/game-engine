litecanvas()

function init() {
    size = W / 12
    angle = 0
    gap = 40
    lineDashPattern = [30, 15]
    lineDashOffset = 0
    lineWidth = 3
    types = [
        () => rectfill(0, 0, size, size, 2),
        () => rect(0, 0, size, size, 1),
        () => circfill(0, 0, size / 2, 3),
        () => circ(0, 0, size / 2, 1),
        () => ovalfill(0, 0, size * 1.5, size / 2, 2),
        () => oval(0, 0, size * 1.5, size / 2, 1),
    ]
}

function update(dt) {
    angle += 0.01
    lineDashOffset += 100 * dt
    if (lineDashOffset > 500) lineDashOffset = 0
}

function draw() {
    cls(0)
    linewidth(11 - wave(-10, 10, T * 10))

    for (let i = 0; i < 100; i++) {
        push()
        const x = rand() * W
        const y = rand() * H * 0.9
        translate(x, y)
        types[randi(0, types.length - 1)]()
        pop()
    }

    pause()
}
