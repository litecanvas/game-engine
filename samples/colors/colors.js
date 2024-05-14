litecanvas({
  width: 256,
  height: 128,
  autoscale: false,
  fps: 10,
})

function init() {
  size = 64
}

// draw the color palette
function draw() {
  cls()
  textsize(HEIGHT / 6)
  textalign('center', 'middle')
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 2; j++) {
      const c = i + j * 4
      const fg = 0 === c ? 3 : 0
      rectfill(i * size, j * size, size, size, c)
      text(i * size + size / 2, j * size + size / 2, c, fg)
    }
  }
}
