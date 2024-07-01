const tile = 48

litecanvas({
  width: tile * 6,
  height: tile * 2,
  autoscale: false,
  fps: 10,
})

function init() {
  size = 48
}

// draw the color palette
function draw() {
  cls()
  textsize(HEIGHT / 6)
  textalign('center', 'middle')
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 2; j++) {
      const c = i + j * 6
      const fg = [0, 1, 7, 10, 11].includes(c) ? 3 : 0
      rectfill(i * size, j * size, size, size, c)
      text(i * size + size / 2, 2 + j * size + size / 2, c, fg)
    }
  }
}
