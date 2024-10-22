const size = 32
const cols = 12 // Número de colunas

litecanvas({
    animate: false,
    width: size * cols,
    height: size * (cols - 1),
    // autoscale: false,
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
    let s = performance.now()
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
    console.log(performance.now() - s)
}
