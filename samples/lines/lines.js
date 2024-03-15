if (window.TouchEmulator) TouchEmulator() // easy way to test touches in desktop

const darkMode =
  window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches

litecanvas({
  fullscreen: true,
  antialias: false,
  background: darkMode ? 0 : 3,
  tappingInterval: 0, // default is 100
})

const lineColor = darkMode ? 3 : 0

function init() {
  fromX = CENTERX
  fromY = CENTERY
  points = []
}

function update() {
  dirty = false
  if (TAPPING) {
    if (TAPX !== fromX || TAPY !== fromY) {
      points.push([TAPX, TAPY])
    }
  }
}

function draw() {
  if (points.length === 0) return
  for (let i = 0; i < points.length; i++) {
    const to = points[i]
    line(fromX, fromY, to[0], to[1], lineColor)
    fromX = to[0]
    fromY = to[1]
  }
  points.length = 0
}
