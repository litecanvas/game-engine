// base on https://processing.org/examples/continuouslines.html
litecanvas()

let prevx, prevy, x, y, dirty

function init() {
    CANVAS.style.background = getcolor(0)
}

function tapping(tapx, tapy) {
    prevx = x ? x : tapx
    prevy = y ? y : tapy
    x = tapx
    y = tapy
    dirty = true
}

function untap() {
    prevx = prevy = x = y = 0
    dirty = false
}

function draw() {
    if (!dirty) return
    linewidth(10)
    ctx().lineCap = 'round'
    line(x, y, prevx, prevy, 3)
}
