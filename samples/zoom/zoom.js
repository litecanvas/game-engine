litecanvas({
    width: 256,
    pixelart: true,
})

// coin sprite
const coin = paint(
    8,
    8,
    [
        '..0000..',
        '.055550.',
        '05555550',
        '05555b50',
        '05555b50',
        '055bb550',
        '.055550.',
        '..0000..',
    ],
    {
        scale: 1,
    }
)

function init() {
    zoomLevel = 1
    zoomTo = 1
}

function tap() {
    zoomTo = 10
}

function untap() {
    zoomTo = 1
}

function update(dt) {
    zoomLevel = lerp(zoomLevel, zoomTo, 0.05)
}

function draw() {
    cls(3)

    push()

    translate(CENTERX, CENTERY)
    scale(zoomLevel)
    translate(-CENTERX, -CENTERY)
    console.log(zoomLevel)

    image(CENTERX - coin.width / 2, CENTERY - coin.height / 2, coin)

    pop()
}
