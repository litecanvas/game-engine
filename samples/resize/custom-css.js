litecanvas({
  width: 100,
  autoscale: false,
})

function init() {
  color = 0
  size = 100
  limit = Math.min(innerHeight, innerWidth)
}

function update(dt) {
  color = ELAPSED * 32
  radius = rand() * y
  if (TAPPED) {
    x = TAPX
    y = TAPY
    if (size + 100 < limit) {
      increaseCanvasSize()
      sfx(0)
    }
  }

  if (TAPPING) {
    x = TAPX
    y = TAPY
  }
}

function draw() {
  clear(0)
  linewidth(4)
  circ(x, y, radius, color)
}

function resized() {
  x = CENTERX
  y = CENTERY
}

function increaseCanvasSize() {
  size += 100
  resize(size)
}
