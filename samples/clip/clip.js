litecanvas()

function init() {
    resized()

    x = W / 2
    y = H / 2
    state = 0

    boxes = []
    for (let i = 0; i < W / 4; i++) {
        boxes.push([randi(0, W), randi(0, H), 2])
    }
}

function resized() {
    size = H / 4
}

function tapping(tapx, tapy) {
    x = tapx
    y = tapy
}

function tapped() {
    state = wrap(state + 1, 0, 4)
}

function draw() {
    cls(0)
    push()
    if (state === 0) {
        clipcirc(x, y, wave(size - 20, size + 20, T * 2))
    } else if (state === 1) {
        cliprect(
            x,
            y,
            wave(size - 100, size + 100, T * 5),
            wave(size - 100, size + 100, T * 5, cos)
        )
    } else if (state === 2) {
        clipheart(x, y, size, size)
    }
    cls(1)
    linewidth(2)
    for (let i = 0; i < boxes.length; i++) {
        rectfill(boxes[i][0], boxes[i][1], 25, 25, boxes[i][2])
        stroke(0)
    }
    pop()
}

function clipcirc(x, y, radius) {
    clip((_ctx) => _ctx.arc(x, y, radius, 0, TWO_PI))
}

function cliprect(x, y, width, height) {
    clip((_ctx) => _ctx.rect(x, y, width, height))
}

function clipheart(x, y, width, height) {
    clip((_ctx) => {
        const topCurveHeight = height * 0.3

        _ctx.beginPath()

        _ctx.moveTo(x, y + topCurveHeight)
        _ctx.bezierCurveTo(x, y, x - width / 2, y, x - width / 2, y + topCurveHeight)
        _ctx.bezierCurveTo(
            x - width / 2,
            y + (height + topCurveHeight) / 2,
            x,
            y + (height + topCurveHeight) / 2,
            x,
            y + height
        )
        _ctx.bezierCurveTo(
            x,
            y + (height + topCurveHeight) / 2,
            x + width / 2,
            y + (height + topCurveHeight) / 2,
            x + width / 2,
            y + topCurveHeight
        )
        _ctx.bezierCurveTo(x + width / 2, y, x, y, x, y + topCurveHeight)
    })
}
