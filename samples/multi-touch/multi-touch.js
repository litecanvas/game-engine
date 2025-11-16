litecanvas({
    width: innerWidth,
    height: innerHeight / 2,
})

let obj = {}

function tap(x, y, id) {
    obj[id] = {
        x,
        y,
        c: 1,
    }
}

function tapping(x, y, id) {
    if (abs(obj[id].x - x) <= 2 && abs(obj[id].y - y) <= 2) return

    obj[id].x = x
    obj[id].y = y
    obj[id].c += 0.1
}

function untap(x, y, id) {
    obj[id] = null
}

function draw() {
    cls(0)

    linewidth(5)

    for (let id in obj) {
        const o = obj[id]
        if (!o) continue
        circ(o.x, o.y, 64, max(1, o.c % 3))
    }

    textsize(20)
    text(10, 10, 'Try tapping the screen with multiple fingers')
}
