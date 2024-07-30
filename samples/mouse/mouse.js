litecanvas()

function init() {
    hasMouse = matchMedia('(pointer:fine)').matches
}

function draw() {
    cls(0)
    const [x, y] = mousepos()
    if (null == x) {
        return text(20, 20, 'move your mouse', 3)
    }
    circfill(x, y, 32, 4)
}
