const isDarkMode =
  window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches

litecanvas({
  fullscreen: true,
  antialias: false,
  background: isDarkMode ? 0 : 3,
  tappingInterval: 10, // default is 100
})

const lineColor = isDarkMode ? 3 : 0

function init() {
  resize()
  from = null
  points = []
}

function update() {
  dirty = false
  if (TAPPING) {
    points.push([TAPX, TAPY])
    console.log('tapping')
  } else {
    from = null
    points.length = 0
  }
}

function draw() {
  if (points.length < 2) return

  linewidth(20)
  linecap('round')

  for (let i = 1; i < points.length; i++) {
    from = from || points[i - 1]
    const to = points[i]
    line(from[0], from[1], to[0], to[1], lineColor)
    from = points[i]
  }

  points.length = 0
}
