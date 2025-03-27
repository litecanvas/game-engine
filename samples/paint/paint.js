litecanvas()

function init() {
    entities = []
    useImage = true

    // Draw in an OffscreenCanvas and returns its image.
    // very useful to cache expensive drawing operations
    BALL_IMAGE = paint(
        256, // the image width
        256, // the image height
        /**
         * Any drawing operation within that function will draw on the OffscreenCanvas
         *
         * @param {OffscreenCanvasRenderingContext2D} context
         */
        (context) => {
            ball(128, 128).draw()
        }
    )

    // create many balls
    for (let i = 0; i < 50; i++) {
        entities.push(ball(CENTERX, CENTERY))
    }

    // fps meter
    if (Stats) {
        const stats = new Stats()
        stats.dom.style = 'position: absolute; right: 0; top: 0;'
        document.body.appendChild(stats.dom)
        listen('before:update', () => stats.begin())
        listen('after:draw', () => stats.end())
    }
}

// Tap to toggle between draw all circles or just draw images
function tapped() {
    useImage = !useImage
}

function update(dt) {
    // update our objects
    for (const e of entities) {
        e.update(dt)
    }
}

function draw() {
    cls(0)

    for (const e of entities) {
        if (useImage) {
            image(e.x - e.r, e.y - e.r, BALL_IMAGE)
        } else {
            e.draw()
        }
    }

    textsize(24)
    text(
        0,
        0,
        'drawing ' +
            (useImage ? 'images (fast)' : 'shapes (slow)') +
            ' / tap to toggle',
        3,
        'italic bold'
    )
}

function ball(x, y) {
    return {
        x: ~~x,
        y: ~~y,
        dx: randi(100, 1000) * (rand() >= 0.5 ? 1 : -1),
        dy: randi(100, 1000) * (rand() >= 0.5 ? 1 : -1),
        r: 128,

        update(dt) {
            this.x += this.dx * dt
            this.y += this.dy * dt

            if (this.x + this.r >= WIDTH || this.x <= this.r) {
                this.dx = -this.dx
            }

            if (this.y + this.r >= HEIGHT || this.y <= this.r) {
                this.dy = -this.dy
            }
        },

        draw() {
            for (let c = 2; c < 128; c++) {
                circfill(this.x, this.y, this.r - c, c)
            }
        },
    }
}
