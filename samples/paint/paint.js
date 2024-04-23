litecanvas()

function init() {
  entities = []
  useImage = false

  // `paint()` return a image
  // very useful to cache expensive drawing operations
  ballpainted = paint(256, 256, () => {
    const b = ball(128, 128)
    b.draw()
  })

  // create many balls
  for (let i = 0; i < 150; i++) {
    entities.push(ball(CENTERX, CENTERY))
  }
}

function update(dt) {
  if (TAPPED) {
    useImage = !useImage
  }
  for (const e of entities) {
    e.update(dt)
  }
}

function draw() {
  cls(0)

  for (const e of entities) {
    e.draw(useImage)
  }

  text(
    0,
    0,
    'FPS: ' +
      (FPS || 0) +
      ' - Tap to draw ' +
      (useImage ? 'images (cache ON)' : 'shapes (cache OFF)'),
    3,
    32
  )
}

function ball(x, y) {
  return {
    x: ~~x,
    y: ~~y,
    dx: randi(100, 1000) * (rand() >= 0.5 ? 1 : -1),
    dy: randi(100, 1000) * (rand() >= 0.5 ? 1 : -1),
    r: 128,

    update(dt) {
      this.x += this.dx * dt
      this.y += this.dy * dt

      if (this.x + this.r >= WIDTH || this.x <= this.r) {
        this.dx = -this.dx
      }

      if (this.y + this.r >= HEIGHT || this.y <= this.r) {
        this.dy = -this.dy
      }
    },

    draw(fast = false) {
      if (fast) {
        image(this.x - this.r, this.y - this.r, ballpainted)
      } else {
        for (let c = 2; c < 128; c++) {
          circfill(this.x, this.y, this.r - c, c)
        }
      }
    },
  }
}
