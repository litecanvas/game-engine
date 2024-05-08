litecanvas({
  width: 300,
  autoscale: false,
})

function init() {
  t = 0
  destX = WIDTH - 100
  destY = HEIGHT - 100
  x = 0
  y = 0
}

function update(dt) {
  t += dt

  // the animation lasts 3 seconds
  if (t > 3) t = 0

  x = lerp(100, destX, norm(t, 0, 3))
  y = lerp(100, destY, norm(t, 0, 3))
}

function draw() {
  cls(0)
  linewidth(4)

  circ(100, 100, 30, 2)
  circ(destX, destY, 30, 2)
  circfill(x, y, 20, 2)

  rectfill(0, 0, WIDTH * norm(t, 0, 3), 4, 2)
}
