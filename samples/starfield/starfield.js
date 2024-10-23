/**
 * @author Devansh Tyagi - https://github.com/tyagidevansh
 */
litecanvas()

let stars = []
let numberOfStars,
    color = 3,
    speed = 4,
    maxSpeed = 25

function resized() {
    numberOfStars = (WIDTH + HEIGHT) / 2
}

function tapping(x, y, tapId) {
    speed = map(x, 0, WIDTH, 1, maxSpeed)
}

function constrainSpeed() {
    if (speed < 1) speed = 1
    if (speed > maxSpeed) speed = maxSpeed
}

function update() {
    constrainSpeed()

    if (stars.length < numberOfStars) {
        for (let i = 0; i < numberOfStars - stars.length; i += 1) {
            let angle = rand() * TWO_PI
            let radius = Math.sqrt(rand()) * (WIDTH / 2)

            let x = radius * Math.cos(angle)
            let y = radius * Math.sin(angle)
            let z = rand() * WIDTH
            let size = 0.1
            stars.push([x, y, z, size])
        }
    }

    for (let i = 0; i < stars.length; i++) {
        let z = stars[i][2]

        z -= speed
        stars[i][2] = z

        let size = map(z, 1, WIDTH, 2, 0.1)
        stars[i][3] = size

        if (z < 1) {
            let angle = rand() * TWO_PI
            let radius = Math.sqrt(rand()) * (WIDTH / 2)
            stars[i][0] = radius * Math.cos(angle)
            stars[i][1] = radius * Math.sin(angle)
            stars[i][2] = rand() * WIDTH
            stars[i][3] = 0.1
        }
    }
}

function draw() {
    cls(0)

    textsize(20)
    text(10, 10, 'Drag from left to right to increase speed', (color = 3))

    for (let i = 0; i < stars.length; i++) {
        let x = stars[i][0]
        let y = stars[i][1]
        let z = stars[i][2]
        let size = stars[i][3]

        let sx = map(x / z, -1, 1, 0, WIDTH)
        let sy = map(y / z, -1, 1, 0, HEIGHT)

        circfill(sx, sy, size, color)
    }
}
