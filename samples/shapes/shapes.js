litecanvas()

function init() {
    size = W / 6
    angle = 0
    gap = 40
    lineDashPattern = [30, 15]
    lineDashOffset = 0
    lineWidth = 2
}

function update(dt) {
    angle += 0.01
    lineDashOffset += 100 * dt
    if (lineDashOffset > 500) lineDashOffset = 0
}

function draw() {
    cls(0)
    linewidth(11 - sin(T * 10) * 10)

    rectfill(gap, CY - size / 2, size, size, 2)

    // rotate the second rect only
    push()
    translate(gap * 2 + size + 10 + size / 2, CY - size / 2 + size / 2)
    rotate(angle)
    linedash(lineDashPattern, -lineDashOffset)
    rect(-size / 2, -size / 2, size, size, 1)
    pop()

    circfill(size * 3, CY, size / 2, 4)
    circ(gap + size * 4, CY, size / 2, 5)
}
