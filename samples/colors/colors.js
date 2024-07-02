const tile = 48

litecanvas({
  width: tile * 6,
  height: tile * 2,
  autoscale: false,
})

// draw the color palette
function draw() {
  cls()
  textsize(HEIGHT / 6)
  textalign('center', 'middle')
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 2; j++) {
      const c = i + j * 6
      const fg = [0, 6, 8, 10].includes(c) ? 3 : 0
      rectfill(i * tile, j * tile, tile, tile, c)
      text(i * tile + tile / 2, 2 + j * tile + tile / 2, c, fg)
    }
  }
}
