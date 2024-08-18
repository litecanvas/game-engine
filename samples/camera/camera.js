litecanvas()

// tap to move the camera to a target point
function tapped(x, y) {
    camera.dx = x
    camera.dy = y
}

const camera = {
    // camera current position
    x: 0,
    y: 0,

    // camera target position
    dx: 0,
    dy: 0,

    update() {
        // animate the camera position using `lerp`
        camera.x = lerp(camera.x, camera.dx, 0.05)
        camera.y = lerp(camera.y, camera.dy, 0.05)
    },
}

function init() {
    objs = []
    for (let i = 0; i < 3000; i++) {
        const type = rand() > 0.5 ? 'rect' : 'circ'
        objs.push({
            type,
            stats: [
                rand() * WIDTH, // x
                rand() * HEIGHT, // y
                'rect' === type ? randi(10, 50) : randi(5, 25),
                'rect' === type ? randi(10, 50) : null,
            ],
            color: randi(4, 11),
        })
    }
}

function update(dt) {
    camera.update()

    for (let i = 0; i < objs.length; i++) {
        objs[i].stats[0] += randi(-1, 1)
        objs[i].stats[1] += randi(-1, 1)
    }
}

function draw() {
    cls(0)

    // setup the camera
    push()
    translate(-camera.x, -camera.y)

    // draw the game objects
    for (let i = 0; i < objs.length; i++) {
        const o = objs[i]
        let [x, y, w, h] = o.stats
        h = h || w

        if ('rect' === o.type) {
            rectfill(x, y, w, h, o.color)
            stroke(o.color + 1)
        } else {
            circfill(x, y, w, o.color)
            stroke(o.color + 1)
        }
    }

    pop() // reset the camera

    // draw UI elements (fixed in camera)
    text(10, 10, FPS, 3)
}
