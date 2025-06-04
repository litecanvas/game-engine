let tile = 48,
    showLabel = true,
    totalColors = 12,
    cols = totalColors / 2,
    rows = 2

litecanvas({
    width: tile * cols,
    height: tile * rows,
    autoscale: false,
    animate: false,
})

// draw the color palette
function draw() {
    cls()
    textsize(tile / 3)
    textalign('center', 'middle')
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            const c = i + j * cols
            const fg = [0, 1, 4, 6, 8, 10].includes(c) ? 3 : 0
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
