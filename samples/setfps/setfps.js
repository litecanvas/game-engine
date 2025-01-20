litecanvas({
    width: 256,
    autoscale: false,
    canvas: '#game canvas',
})

function init() {
    const url = new URL(location)
    setfps(url.searchParams.get('fps') || 60)
    if (Stats) {
        let stats = new Stats()
        document.querySelector('#game').prepend(stats.dom)
        listen('before:update', () => stats.begin())
        listen('after:draw', () => stats.end())
        stats.dom.style.position = 'static'
    }
}

function update() {}

function draw() {
    cls(0)
    circfill(CENTERX, CENTERY, wrap(ELAPSED * 50, 0, 128), 2)
}
