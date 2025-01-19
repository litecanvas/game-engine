litecanvas({
    width: 256,
    autoscale: false,
})

function init() {
    const url = new URL(location)
    setfps(url.searchParams.get('fps') || 60)
    if (Stats) {
        let stats = new Stats()
        document.body.appendChild(stats.dom)
        listen('before:update', () => stats.begin())
        listen('after:draw', () => stats.end())
        stats.dom.style.bottom = 0
        stats.dom.style.top = null
    }
}

function update() {}

function draw() {
    cls(0)
    circfill(CENTERX, CENTERY, wrap(ELAPSED * 50, 0, 128), 2)
}
