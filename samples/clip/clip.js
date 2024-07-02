litecanvas({
  tappingInterval: 0,
})

function init() {
  x = CENTERX
  y = CENTERY

  boxes = []
  for (let i = 0; i < WIDTH / 4; i++) {
    boxes.push([randi(0, WIDTH), randi(0, HEIGHT), randi(4, 7)])
  }
}

function update(dt) {
  if (TAPPING) {
    x = TAPX
    y = TAPY
  }
  size = WIDTH / 4
}

function draw() {
  cls(0)
  push()
  clipcirc(x, y, size)
  cls(3)
  linewidth(2)
  for (let i = 0; i < boxes.length; i++) {
    rectfill(boxes[i][0], boxes[i][1], 25, 25, boxes[i][2])
    stroke(0)
  }
  pop()
  text(0, 0, FPS, 4)
}
