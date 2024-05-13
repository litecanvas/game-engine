litecanvas({
  tappingInterval: 0,
})

function init() {
  x = 100
  y = 75

  boxes = []
  for (let i = 0; i < 500; i++) {
    boxes.push([randi(0, WIDTH), randi(0, HEIGHT), randi(4, 7)])
  }
}

function update(dt) {
  if (TAPPING) {
    x = TAPX
    y = TAPY
  }
  size = abs(sin(ELAPSED)) * 50 + 100
}

function draw() {
  cls(0)
  push()
  clipcirc(x, y, size)
  cls(3)
  for (let i = 0; i < boxes.length; i++) {
    rectfill(boxes[i][0], boxes[i][1], 25, 25, boxes[i][2])
    stroke(0)
  }
  pop()
  text(0, 0, FPS, 4)
}
