litecanvas()

function update() {
    if (iskeypressed('f')) {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen()
        } else if (document.fullscreenElement) {
            document.exitFullscreen()
        }
    }
}

function draw() {
    cls(0)
    text(10, 10, 'Press "F" to toggle fullscreen mode')
}
