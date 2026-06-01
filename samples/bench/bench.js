let url = new URL(location),
    state = {
        count: +url.searchParams.get('amount') || 1000,
        width: 1024,
        height: 480,
        size: 12,
        // animate: true,
    }

litecanvas({
    width: state.width,
    height: state.height,
    canvas: '#c',
    // autoscale: false,
})

use(pluginFrameRateMeter)

function init() {
    state.sprite = paint(
        state.size,
        state.size,
        () =>
            spr(
                0,
                0,
                `
                ..00....00..
                .0220..0220.
                .0230..0230.
                .0230..0230.
                .0230..0230.
                .0230000230.
                .0222222220.
                .0220220220.
                .0220220220.
                .0222232220.
                .0222222220.
                ..00000000..
            `
            ),
        {
            scale: 4,
        }
    )
    state.size = state.sprite.width

    // Particle creation
    state.entites = new Array(state.count)
    const dir = [1, -1]
    for (let i = 0; i < state.count; i++) {
        const x = rand() * state.width - state.size
        const y = rand() * state.height - state.size
        const [dx, dy] = [rand(1, 5) * dir[randi(0, 1)], rand(1, 5) * dir[randi(0, 1)]]
        state.entites[i] = { x, y, dx, dy, s: rand(0.75, 1.5), r: rand(0, TAU) }
    }

    const link = document.querySelector(`[href="?amount=${state.count}"]`)
    if (link) {
        link.style.fontWeight = 'bold'
    }
}

function update() {
    for (let i = 0; i < state.count; i++) {
        const e = state.entites[i]

        e.x -= e.dx
        e.y -= e.dy

        if (e.x < 0) {
            e.x = 0
            e.dx *= -1
        } else if (e.y < 0) {
            e.y = 0
            e.dy *= -1
        }

        if (e.x + state.size > state.width) {
            e.x = state.width - state.size
            e.dx *= -1
        } else if (e.y + state.size > state.height) {
            e.y = state.height - state.size
            e.dy *= -1
        }

        e.r = state.animate ? e.r + 0.2 : 0
    }
}

function draw() {
    cls(3)

    let half = state.size / 2

    for (let i = 0; i < state.count; i++) {
        const e = state.entites[i]
        const rotation = state.animate ? e.r : 0
        const scale = state.animate ? e.s + sin(T * 5) * 0.5 : 1
        push(e.x, e.y, rotation, scale)
        image(-half, -half, state.sprite)
        pop()
    }
}
