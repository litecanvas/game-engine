litecanvas({
  width: 256,
  height: 128,
  autoscale: false,
  fps: 10,
})

function init() {
  textalign('center', 'middle')
}

// draw the color palette
function draw() {
  clear()
  w = WIDTH / 4
  h = HEIGHT / 2
  for (let i = 0; i < 8; i++) {
    const fg = [0, 1, 4].includes(i) ? 3 : 0
    rectfill((i % 4) * w, Math.floor(i / 4) * h, w + 1, h + 1, i)
    text((i % 4) * w + w / 2, Math.floor(i / 4) * h + h / 2, i, fg)
  }
}
