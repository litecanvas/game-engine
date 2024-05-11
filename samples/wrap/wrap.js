litecanvas()

function init() {
  x = 0
}

function resized() {
  y = CENTERY
  speed = WIDTH / 2
}

function update(dt) {
  x = wrap(x + speed * dt, 0, WIDTH)
}

function draw() {
  cls(0)
  circfill(x, y, WIDTH / 20, 3)
}
