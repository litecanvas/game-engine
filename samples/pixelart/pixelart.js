litecanvas({
    width: 64,
    height: 64,
    autoscale: 4, // auto scale by until 4x
})

const art = paint(
    8, // the pixel art width
    8, // the pixelart height
    [
        // the pixelart pixels:
        // each number is a pixel color
        // note: use space or dots to make a pixel 100% transparent
        '  0000  ',
        ' 055550 ',
        '05505050',
        '05555550',
        '05500050',
        '05555550',
        '.055550.',
        '..0000..',
    ],
    {
        scale: 2, // this pixelart is twice bigger
    }
)

function draw() {
    cls(3)
    image(0, 0, art)
}
