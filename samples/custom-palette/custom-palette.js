litecanvas({
    width: 5,
    animate: false,
})

function init() {
    // update the color palette to PICO-8 colors
    pal([
        '#000000',
        '#1D2B53',
        '#7E2553',
        '#008751',
        '#AB5236',
        '#5F574F',
        '#C2C3C7',
        '#FFF1E8',
        '#FF004D',
        '#FFA300',
        '#FFEC27',
        '#00E436',
        '#29ADFF',
        '#83769C',
        '#FF77A8',
        '#FFCCAA',
    ])

    // create a PICO-8 logo image
    pico8logo = paint(5, 5, [
        // prettier-ignore
        '..8..',
        '.97f.',
        'a777e',
        '.b7d.',
        '..c..',
    ])
}

function draw() {
    cls(0)
    image(0, 0, pico8logo)
}
