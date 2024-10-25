const url = new URL(window.location)
const zoomed = 1 === +url.searchParams.get('zoom')

const size = 12
const cols = 12

litecanvas({
    animate: false,
    width: size * cols,
    height: size * (cols - 1),
    autoscale: zoomed,
})

function init() {
    combinations = []
    for (let y = 0; y < cols; y++) {
        for (let x = 0; x < cols; x++) {
            if (y === x) continue
            combinations.push([y, x])
        }
    }
}

function draw() {
    for (let i = 0; i < combinations.length; i++) {
        const x = (i % cols) * size
        const y = floor(i / cols) * size
        const colors = combinations[i]

        for (let dy = 0; dy < size; dy++) {
            for (let dx = 0; dx < size; dx++) {
                const c = (dx + dy) % 2 === 0 ? 0 : 1
                rectfill(x + dx, y + dy, 1, 1, colors[c])
            }
        }
    }
}

function tapped() {
    url.searchParams.set('zoom', zoomed ? 0 : 1)
    window.location = url.href
}
