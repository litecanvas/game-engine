// also see: https://github.com/litecanvas/plugin-more-shapes

litecanvas()

function draw() {
    cls(0)
    push()
    translate(CENTERX, CENTERY)
    rotate(ELAPSED)
    drawStar(0, 0, 128, 5)
    pop()
}

function drawStar(x, y, radius, color) {
    const n = 5
    const inner = radius / 2
    const max = 2 * n + 1
    const points = []
    for (let i = 0; i < max; i++) {
        const r = i % 2 === 0 ? radius : inner
        const a = (Math.PI * i) / n
        points.push([x + r * sin(a), y + r * cos(a)])
    }
    vertices(points)
    fill(color)
}

function vertices(points) {
    _ctx.beginPath()
    for (let i = 0; i < points.length; i++) {
        if (0 === i) {
            _ctx.moveTo(points[i][0], points[i][1])
        } else {
            _ctx.lineTo(points[i][0], points[i][1])
        }
    }
    _ctx.closePath()
}
