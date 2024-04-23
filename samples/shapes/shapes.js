litecanvas()

function init() {
  size = WIDTH / 5
  angle = 0
}

function update() {
  angle += 0.01
}

function draw() {
  cls(0)

  rectfill(0, CENTERY - size, size, size, 2)

  // rotate the second rect
  push()
  translate(size + 10 + size / 2, CENTERY - size + size / 2)
  rotate(angle)
  rect(-size / 2, -size / 2, size, size, 3)
  pop()

  circfill(size * 3, CENTERY - size / 2, size / 2, 4)
  circ(size * 4, CENTERY - size / 2, size / 2, 5)
}
