litecanvas()

function init() {
    x = 0
    y = H / 2
    vel = 500
    ts = 1
    timescale(ts)
}

// tap to change the time scale
function tapped() {
    ts = wrap(ts + 1, 0, 6)
    timescale(ts)
}

function update(dt) {
    x = wrap(x + vel * dt, 0, W)
}

function draw() {
    cls(0)
    circfill(x, y, W / 20, 3)
    text(10, 10, 'Time Scale = ' + ts + 'x')
    text(10, 50, 'Elapsed = ' + floor(T) + 's')
}
