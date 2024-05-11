// base on https://processing.org/examples/continuouslines.html
litecanvas({
  background: 0,
  tappingInterval: 0,
})

let prevx, prevy, x, y, dirty

function update(dt) {
  if (TAPPING) {
    prevx = x ? x : TAPX
    prevy = y ? y : TAPY
    x = TAPX
    y = TAPY
    dirty = true
  } else {
    prevx = prevy = x = y = 0
    dirty = false
  }
}

function draw() {
  if (!dirty) return
  linewidth(10)
  linecap('round')
  line(x, y, prevx, prevy, 3)
}
