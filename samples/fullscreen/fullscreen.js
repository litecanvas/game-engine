litecanvas({
    autoscale: false,
})

// little hack to make the litecanvas always fullscreen
CANVAS.style = 'position:absolute; inset:0'
window.addEventListener('resize', () => {
    resize(window.innerWidth, window.innerHeight)
})

function draw() {
    cls(0)
    circfill(CENTERX, CENTERY, WIDTH / 4, 3)
}
