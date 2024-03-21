litecanvas()

function init() {
  size = WIDTH / 8
}

function draw() {
  clear(0)

  rectfill(0, CENTERY - size, size, size, 2)
  rect(size + 10, CENTERY - size, size, size, 3)

  circfill(size * 3, CENTERY - size / 2, size / 2, 4)
  circ(size * 4, CENTERY - size / 2, size / 2, 5)

  ovalfill(size * 5, CENTERY - size, size / 3, size / 2, 6)
  oval(size * 6, CENTERY - size, size / 3, size / 2, 7)
}
