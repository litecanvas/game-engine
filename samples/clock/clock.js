// Based on https://processing.org/examples/clock.html
litecanvas()

let cx, cy, secondsRadius, minutesRadius, hoursRadius, clockDiameter

function resized() {
    radius = min(WIDTH, HEIGHT) / 2
    secondsRadius = radius * 0.72
    minutesRadius = radius * 0.65
    hoursRadius = radius * 0.48
    clockDiameter = radius * 1.8
    cx = CENTERX
    cy = CENTERY
}

function init() {
    resized()
}

function draw() {
    cls(0)

    linewidth(4)
    circfill(cx, cy, clockDiameter / 2, 7)

    const date = new Date()
    const seconds = date.getSeconds()
    const minutes = date.getMinutes()
    const hour = date.getHours()

    const s = map(seconds, 0, 60, 0, TWO_PI) - HALF_PI
    const m = map(minutes + norm(seconds, 0, 60), 0, 60, 0, TWO_PI) - HALF_PI
    const h = map(hour + norm(minutes, 0, 60), 0, 24, 0, TWO_PI * 2) - HALF_PI

    // Draw the hands of the clock
    linewidth(1)
    line(cx, cy, cx + cos(s) * secondsRadius, cy + sin(s) * secondsRadius, 4)
    linewidth(3)
    line(cx, cy, cx + cos(m) * minutesRadius, cy + sin(m) * minutesRadius, 3)
    linewidth(6)
    line(cx, cy, cx + cos(h) * hoursRadius, cy + sin(h) * hoursRadius, 3)

    // Draw the minute ticks
    for (let a = 0; a < 360; a += 6) {
        let angle = deg2rad(a)
        let x = cx + cos(angle) * secondsRadius * 1.1
        let y = cy + sin(angle) * secondsRadius * 1.1
        circfill(x, y, a % 30 ? 2 : 6, 3)
    }
}
