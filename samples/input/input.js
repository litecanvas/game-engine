litecanvas()

let _bg, x, y

function update() {
  if (TAPPED || TAPPING) {
    x = TAPX
    y = TAPY
    console.log(TAPPED ? 'TAPPED' : 'TAPPING', x, y)
  }
}

function draw() {
  cls(0)
  if (x) {
    circ(x, y, 24, 4)
  }
  textalign('center', 'middle')
  print(WIDTH / 2, HEIGHT / 2, 'Just tap anywehere', 3)
}
