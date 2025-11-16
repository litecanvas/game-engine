let tile = 48,
    showLabel = true,
    totalColors = 4,
    cols = totalColors,
    rows = 1

litecanvas({
    width: tile * cols,
    height: tile * rows,
    autoscale: false,
    canvas: 'canvas',
})

// draw the color palette
function draw() {
    cls()
    textsize(tile / 3)
    textalign('center', 'middle')
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            const c = i + j * cols
            const fg = [0, 1, 4].includes(c) ? 3 : 0
            rectfill(i * tile, j * tile, tile, tile, c)

            if (showLabel) {
                const label = c
                text(i * tile + tile / 2, 2 + j * tile + tile / 2, label, fg)
            }
        }
    }
    pause() // draw only once
}

function tapped() {
    showLabel = !showLabel
    draw()
}

// download button
document.querySelector('#download').onclick = () => {
    var link = document.createElement('a')
    link.download = 'litecanvas-colors.png'
    link.href = canvas().toDataURL()
    link.click()
}
