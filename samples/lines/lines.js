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
    line(CX, CY, CX + (cos(T) * W) / 2, CY + (sin(T) * H) / 2, 5)

    // static lines
    line(0, 0, 0, H, 4)
    line(0, 0, W, 0, 4)
    line(W - 1, 0, W - 1, H, 4)
    line(0, H - 1, W, H - 1, 4)
    line(0, 0, W, H, 4)
    line(W, 0, 0, H, 4)
}
