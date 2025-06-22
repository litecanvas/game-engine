const e = litecanvas()

function init() {
    x = 0
    y = H / 2
    vel = 2000

    listen('quit', () => {
        cls()
        text(10, 10, 'Refresh the page to restart', 4)
        text(10, 40, 'Note: quit() do not remove the canvas', 4)
    })
}

function tapped() {
    quit()
}

function update(dt) {
    x = wrap(x + vel * dt, 0, W)
}

function draw() {
    cls(0)
    circfill(x, y, W / 20, 3)
    text(10, 10, 'Tap to shutdown the engine')
}
