litecanvas()

let objects = []
let counter = 0

function update(dt) {
    if (T - counter > 0.1) {
        for (let index = 0; index < 5; index++) {
            createShockwave()
        }
        counter = T
    }
    for (const obj of objects) {
        obj.update(dt)
    }
}

function draw() {
    cls(0)
    for (const obj of objects) {
        push()
        obj.draw()
        pop()
    }
}

function createShockwave() {
    const obj = Object.assign({}, shockwave)
    obj.pos(randi(0, W), randi(0, H))
    obj.speed = randi(800, 2000)
    objects.push(obj)
}

const shockwave = {
    x: 0,
    y: 0,
    radius: 0,
    borderWidth: 30,
    color: 2,
    speed: 1000,
    pos(x, y) {
        this.x = x
        this.y = y
    },
    update(dt) {
        if (this.borderWidth <= 0) {
            return this.destroy()
        }
        this.radius += this.speed * dt
        this.borderWidth -= (this.speed / 8) * dt
    },
    draw() {
        if (this.borderWidth >= 1) {
            linewidth(this.borderWidth)
            circ(this.x, this.y, this.radius, this.color)
        }
    },
    destroy() {
        objects = objects.filter((o) => o !== this)
    },
}
