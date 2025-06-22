litecanvas({
    width: 256,
    autoscale: false,
    canvas: '#game canvas',
})

function init() {
    const url = new URL(location)
    framerate(~~url.searchParams.get('fps') || 60)
    use(pluginFrameRateMeter, {
        css: { position: 'static' },
    })
}

function update() {}

function draw() {
    cls(0)
    circfill(W / 2, H / 2, wrap(T * 50, 0, 128), 2)
}
