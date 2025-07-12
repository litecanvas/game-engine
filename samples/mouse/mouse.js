litecanvas({
    width: 600,
})

function draw() {
    cls(0)

    // -1
    if (MX === -1) {
        return text(20, 20, 'move your mouse', 3)
    }

    circfill(MX, MY, 32, 4)
}
