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
    line(W / 2, H / 2, W / 2 + (cos(T) * W) / 2, H / 2 + (sin(T) * H) / 2, 2)

    // static lines
    line(0, 0, 0, H, 1)
    line(0, 0, W, 0, 1)
    line(W - 1, 0, W - 1, H, 1)
    line(0, H - 1, W, H - 1, 1)
    line(0, 0, W, H, 1)
    line(W, 0, 0, H, 1)
}
