litecanvas()

function draw() {
    cls(0)

    // -1
    if (MOUSEX === -1) {
        return text(20, 20, 'move your mouse', 3)
    }

    circfill(MOUSEX, MOUSEY, 32, 4)
}
