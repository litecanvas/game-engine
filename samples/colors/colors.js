let tile = 56,
    showLabel = true

litecanvas({
    width: tile * 8,
    height: tile * 2,
    autoscale: false,
    animate: false,
})

// draw the color palette
function draw() {
    cls()
    textsize(16)
    textalign('center', 'middle')
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 2; j++) {
            const c = i + j * 8
            const fg = [3, 15, 11].includes(c) ? 0 : 3
            rectfill(i * tile, j * tile, tile, tile, c)

            if (showLabel) {
                const label = c
                text(i * tile + tile / 2, 2 + j * tile + tile / 2, label, fg)
            }
        }
    }
}

function tapped() {
    showLabel = !showLabel
    draw()
}
