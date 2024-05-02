litecanvas({
  fps: 30,
})

let _bg

function log(...args) {
  console.log(...args)
}

function update() {
  if (TAPPED) log('TAPPED', TAPX, TAPY)
  else if (TAPPING) log('TAPPING', TAPX, TAPY)
}

function draw() {
  cls(0)
  textalign('center', 'middle')
  print(WIDTH / 2, HEIGHT / 2, 'Open your browser console and tap', 3)
}
