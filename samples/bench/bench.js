let url = new URL(location),
    state = {
        count: +url.searchParams.get('amount') || 1000,
        width: 1024,
        height: 480,
    }

litecanvas({
    width: state.width,
    height: state.height,
    canvas: '#c',
    autoscale: false,
})

use(pluginFrameRateMeter)

function init() {
    FPS_METER.display(true)

    state.sprite = paint(
        12,
        12,
        [
            '....4444....',
            '....4aa4....',
            '..004aa400..',
            '..02444420..',
            '777733335555',
            '766731135bb5',
            '766731135bb5',
            '777733335555',
            '..02999920..',
            '..00988900..',
            '....9889....',
            '....9999....',
        ],
        {
            scale: 3,
        }
    )
    state.size = state.sprite.width

    // Particle creation
    const particles = new Array(state.count)
    const dir = [1, -1]
    for (let i = 0; i < state.count; i++) {
        const x = rand() * state.width - state.size
        const y = rand() * state.height - state.size
        const [dx, dy] = [rand(1, 3) * dir[randi(0, 1)], rand(1, 3) * dir[randi(0, 1)]]
        particles[i] = { x, y, dx, dy }
    }

    state.particles = particles

    const link = document.querySelector(`[href="?amount=${state.count}"]`)
    if (link) {
        link.style.fontWeight = 'bold'
    }
}

function draw() {
    // Clear the canvas
    cls(0)

    // Particle animation
    const particles = state.particles
    for (let i = 0; i < state.count; i++) {
        const r = particles[i]

        r.x -= r.dx
        r.y -= r.dy

        if (r.x < 0) {
            r.x = 0
            r.dx *= -1
        } else if (r.y < 0) {
            r.y = 0
            r.dy *= -1
        }

        if (r.x + state.size > state.width) {
            r.x = state.width - state.size
            r.dx *= -1
        } else if (r.y + state.size > state.height) {
            r.y = state.height - state.size
            r.dy *= -1
        }

        image(r.x, r.y, state.sprite)
    }
}
