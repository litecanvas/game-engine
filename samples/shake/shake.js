litecanvas()

const ball = {
  x: 0,
  y: 0,
  radius: 50,
  color: 4,
}

const shake = {
  duration: 0,
  amplitudeX: 4,
  amplitudeY: 5,
  speed: 100,
  x: 0,
  y: 0,

  update(dt) {
    if (this.duration <= 0) return

    this.duration -= dt

    if (shake.duration > 0) {
      this.x = this.amplitudeX * Math.cos(ELAPSED * this.speed)
      this.y = this.amplitudeY * Math.sin(ELAPSED * this.speed)
    } else {
      this.x = this.y = 0
    }
  },
}

let ELAPSED = 0

function init() {
  textalign('center')
}

function update(dt) {
  ELAPSED += dt

  ball.x = CENTERX
  ball.y = CENTERY - ball.radius

  if (TAPPING) {
    shake.duration = 0.2
  }

  shake.update(dt)
}

function draw() {
  cls(0)

  rectfill(30, 30, 30, 30, 5) // this don't shakes

  push()
  translate(shake.x, shake.y)
  circfill(ball.x, ball.y, ball.radius, ball.color)
  text(ball.x, ball.y + ball.radius + 40, 'TAP TO SHAKE')
  pop()
}
