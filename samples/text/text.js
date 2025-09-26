litecanvas({
    width: innerWidth,
    height: innerWidth * 0.4,
})

function init() {
    textsize(40) // default is 32
}

function draw() {
    console.log('drawing...')
    cls(0)

    // dynamic dimensions
    const size = max(20, W / 20)
    const padding = size * 0.5

    textsize(size)

    // draw next texts using "serif" font
    textfont('serif')
    text(padding, padding, 'HELLO, WORLD!\n¡HOLA, MUNDO!\nOLÁ, MUNDO!\n世界您好!', 3, 'bold')

    pause()
}

function resized() {
    emit('draw')
}
