litecanvas()

const ball = {
  x: 0,
  y: 0,
  radius: 50,
  color: 4,
}

const shake = {
  duration: 0,
  amplitude: 5,
  speed: 100,
  x: 0,
  y: 0,
  update(dt) {
    if (this.duration === 0) return

    this.duration -= dt

    if (shake.duration > 0) {
      this.x = this.amplitude * Math.sin(ELAPSED * this.speed)
      this.y = this.amplitude * Math.sin(ELAPSED * this.speed * 0.8)
    } else {
      this.duration = this.x = this.y = 0
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

  if (TAPPED) {
    shake.duration = 0.5
  }

  shake.update(dt)
}

function draw() {
  clear(0)
  transform(shake.x, shake.y)
  circfill(ball.x, ball.y, ball.radius, ball.color)
  text(ball.x, ball.y + ball.radius + 40, 'TAP TO SHAKE', 3, 30)
}
