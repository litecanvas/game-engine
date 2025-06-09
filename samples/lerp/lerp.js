litecanvas({
    width: 300,
    autoscale: false,
})

function init() {
    duration = 3 // change this
    startX = 100
    startY = 100
    endX = W - 100
    endY = H - 100
    x = 0
    y = 0
    t = 0
    nt = 0
}

function update(dt) {
    // compute the duration
    t += dt
    if (t > duration) t = 0

    // remaps t to range 0.0...1.0
    nt = norm(t, 0, duration)

    // interpolate the position XY
    x = lerp(startX, endX, nt)
    y = lerp(startY, endY, nt)
}

function draw() {
    cls(0)
    linewidth(4)

    // draw the start and the end
    circ(startX, startY, 30, 5)
    circ(endX, endY, 30, 5)

    // draw the animated object
    circfill(x, y, 20, 5)

    // draw a progress bar based on t
    rectfill(0, 0, W * nt, 4, 5)
}
