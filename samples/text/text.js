litecanvas()

function init() {
    margin = 60
    textsize(40) // default is 32
}

function draw() {
    cls(0)

    // draw next texts using "sans-serif" font
    textfont('sans-serif')

    text(50, 100 - margin, 'HELLO, WORLD!', 3)
    text(50, 100, '¡HOLA, MUNDO!', 3)

    // use 'serif' font now
    textfont('serif')
    text(50, 100 + margin, 'OLÁ, MUNDO!', 3)

    // get the text dimensions with textmetrics()
    const metrics = textmetrics('OLÁ, MUNDO!')
    rect(50, 100 + margin, metrics.width, metrics.height, 5)
}
