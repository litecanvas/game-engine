litecanvas()

function init() {
  margin = 60
  textalign('center', 'middle')
}

function draw() {
  cls(0)

  // draw next texts using "sans-serif" font
  textfont('sans-serif')
  text(CENTERX, CENTERY - margin, 'HELLO WORLD!', 3, 28)
  text(CENTERX, CENTERY, '¡HOLA MUNDO!', 3, 28)

  // use 'serif' font passing as argument
  text(CENTERX, CENTERY + margin, 'OLÁ MUNDO!', 3, 28, 'serif')
}
