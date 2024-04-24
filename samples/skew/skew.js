litecanvas()

function draw() {
  cls(0)
  push()
  translate(WIDTH / 2, HEIGHT / 2)
  skew(1, 0.9)
  circfill(10, 10, 300, 4)
  pop()
}

function skew(x, y) {
  // in my tests, skew in firefox don't works without that 0.00001
  transform(1, x + 0.00001, y, 1, 0, 0, false)
}
