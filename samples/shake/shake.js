litecanvas()

const ball = {
    x: 0,
    y: 0,
    radius: 50,
    color: 4,
}

const shake = {
    _enabled: false,
    amplitudeX: 4,
    amplitudeY: 5,
    speed: 100,
    x: 0,
    y: 0,

    update(dt) {
        if (!this._enabled) return
        this.x = this.amplitudeX * Math.cos(T * this.speed)
        this.y = this.amplitudeY * Math.sin(T * this.speed)
    },

    set enabled(value) {
        this._enabled = !!value
        if (!this._enabled) {
            this.x = this.y = 0
        }
    },
}

let T = 0

function tap() {
    shake.enabled = true
}

function untap() {
    shake.enabled = false
}

function update(dt) {
    T += dt

    ball.x = CX
    ball.y = CY - ball.radius

    shake.update(dt)
}

function draw() {
    cls(0)

    rectfill(30, 30, 30, 30, 5) // this don't shakes

    push()
    translate(shake.x, shake.y)
    circfill(ball.x, ball.y, ball.radius, ball.color)

    textalign('center')
    text(ball.x, ball.y + ball.radius + 40, 'TAP TO SHAKE')
    pop()
}
