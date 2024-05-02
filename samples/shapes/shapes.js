litecanvas()

function init() {
  size = WIDTH / 6
  angle = 0
  gap = 40
  lineDashPattern = [30, 15]
  lineDashOffset = 0
}

function update(dt) {
  angle += 0.01
  lineDashOffset += 100 * dt
  if (lineDashOffset > 50) lineDashOffset = 0
}

function draw() {
  cls(0)
  linewidth(5)

  rectfill(gap, CENTERY - size / 2, size, size, 2)

  // rotate the second rect
  push()
  translate(gap * 2 + size + 10 + size / 2, CENTERY - size / 2 + size / 2)
  rotate(angle)
  linedash(lineDashPattern, -lineDashOffset)
  rect(-size / 2, -size / 2, size, size, 1)
  pop()

  circfill(size * 3, CENTERY, size / 2, 4)
  circ(gap + size * 4, CENTERY, size / 2, 5)
}
