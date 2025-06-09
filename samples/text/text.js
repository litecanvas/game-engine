litecanvas({
    width: innerWidth,
    height: innerWidth * 0.75,
    animate: false,
})

function init() {
    textsize(40) // default is 32
}

function draw() {
    console.log('drawing...')
    cls(0)

    // dynamic dimensions
    const size = W / 12
    const padding = size * 0.5
    const margin = size * 1.5

    textsize(size)

    // draw next texts using "sans-serif" font
    textfont('sans-serif')
    text(padding, padding, 'HELLO, WORLD!', 3)
    text(padding, padding + margin, '¡HOLA, MUNDO!', 3, 'italic')

    // use 'serif' font now
    textfont('serif')
    text(padding, padding + margin * 2, 'OLÁ, MUNDO!', 3, 'bold')
    text(padding, padding + margin * 3, '世界您好!', 3, 'bold italic')
}
