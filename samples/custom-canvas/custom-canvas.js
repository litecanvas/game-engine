litecanvas({
    canvas: '#game-canvas',
    animate: false,
})

function draw() {
    cls(0)
    text(20, 20, canvas().id, 3)
}
