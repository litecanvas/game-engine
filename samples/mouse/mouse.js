litecanvas()

function init() {
    hasMouse = matchMedia('(pointer:fine)').matches
}

function draw() {
    cls(0)
    if (!hasMouse) {
        return text(20, 20, "mouse don't detected", 3)
    }
    const [x, y] = mousepos()
    circfill(x, y, 32, 4)
}
