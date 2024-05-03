litecanvas()

function init() {
  margin = 60
  size = 28
}

function draw() {
  cls(0)

  // draw next texts using "sans-serif" font
  textfont('sans-serif')
  text(10, 100 - margin, 'HELLO WORLD!', 3, size)
  text(10, 100, '¡HOLA MUNDO!', 3, size)

  // use 'serif' font now
  textfont('serif')
  text(10, 100 + margin, 'OLÁ MUNDO!', 3, size)

  // get the text dimensions with textmetrics()
  const metrics = textmetrics('OLÁ MUNDO!', size)
  rect(10, 100 + margin, metrics.width, metrics.height, 5)
}
