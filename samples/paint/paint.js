litecanvas()

function init() {
  entities = []
  useImage = false

  // `paint()` return a image
  // very useful to cache expensive drawing operations
  BALL_IMAGE = paint(256, 256, (offcanvas, offcontext) => {
    // inside that callback all drawing functions
    // automatically will use the offcanvas context
    ball(128, 128).draw()
  })

  // create many balls
  for (let i = 0; i < 150; i++) {
    entities.push(ball(CENTERX, CENTERY))
  }
}

function update(dt) {
  // toggle between draw all circles or just draw images
  if (TAPPED) {
    useImage = !useImage
  }

  // update our objects
  for (const e of entities) {
    e.update(dt)
  }
}

function draw() {
  cls(0)

  for (const e of entities) {
    if (useImage) {
      image(e.x - e.r, e.y - e.r, BALL_IMAGE)
    } else {
      e.draw()
    }
  }

  textstyle('italic bold')
  text(
    0,
    0,
    'FPS: ' +
      (FPS || 0) +
      ' - Tap to draw ' +
      (useImage ? 'images (cache ON)' : 'shapes (cache OFF)'),
    3
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

    draw() {
      for (let c = 2; c < 128; c++) {
        circfill(this.x, this.y, this.r - c, c)
      }
    },
  }
}
