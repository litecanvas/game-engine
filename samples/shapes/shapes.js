litecanvas()

function init() {
  size = WIDTH / 6
  angle = 0
  gap = 40
}

function update() {
  angle += 0.01
}

function draw() {
  cls(0)

  rectfill(gap, CENTERY - size / 2, size, size, 2)

  // rotate the second rect
  push()
  translate(gap * 2 + size + 10 + size / 2, CENTERY - size / 2 + size / 2)
  rotate(angle)
  rect(-size / 2, -size / 2, size, size, 3)
  pop()

  circfill(size * 3, CENTERY, size / 2, 4)
  circ(gap + size * 4, CENTERY, size / 2, 5)
}
