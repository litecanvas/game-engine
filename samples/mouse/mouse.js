litecanvas({
    width: 600,
})

function draw() {
    cls(1)

    // -1
    if (MX === -1) {
        return text(20, 20, 'move your mouse', 2)
    }

    circfill(MX, MY, 32, 0)
}
