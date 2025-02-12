litecanvas({
    width: 256,
    // autoscale: false,
})

function init() {
    lw = 1
}

function tapped() {
    lw += 1
}

function draw() {
    cls(0)

    linewidth(lw)

    // dynamic line
    line(
        CENTERX,
        CENTERY,
        CENTERX + (cos(ELAPSED) * WIDTH) / 2,
        CENTERY + (sin(ELAPSED) * HEIGHT) / 2,
        5
    )

    // static lines
    line(0, 0, 0, HEIGHT, 4)
    line(0, 0, WIDTH, 0, 4)
    line(WIDTH - 1, 0, WIDTH - 1, HEIGHT, 4)
    line(0, HEIGHT - 1, WIDTH, HEIGHT - 1, 4)
    line(0, 0, WIDTH, HEIGHT, 4)
    line(WIDTH, 0, 0, HEIGHT, 4)
}
