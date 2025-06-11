litecanvas({
    width: 256,
    autoscale: false,
    canvas: '#game canvas',
})

function init() {
    const url = new URL(location)
    framerate(~~url.searchParams.get('fps') || 60)
    if (Stats) {
        let stats = new Stats()
        stats.dom.style.position = 'static'
        document.querySelector('#game').prepend(stats.dom)
        listen('before:update', (_, i = 1) => {
            if (i === 1) stats.begin()
        })
        listen('after:draw', () => stats.end())
    }
}

function update() {}

function draw() {
    cls(0)
    circfill(CX, CY, wrap(T * 50, 0, 128), 2)
}
