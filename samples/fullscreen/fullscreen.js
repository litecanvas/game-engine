litecanvas({
    // width: 640,
    // autoscale: false,
})

let fullscreen

function resized() {
    // the canvas resets the text align
    // and baseline when the canvas resizes
    textalign('start', 'top')
}

function update() {
    if (iskeypressed('f')) {
        fullscreen = !document.fullscreenElement
        if (fullscreen) {
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
