const mapWidth = 20
const mapHeight = 18
const tileSize = 16

let snake, dx, dy, food, score, gameOver, speed

litecanvas({
    width: mapWidth * tileSize,
    height: mapHeight * tileSize,
})

function init() {
    volume(0.5)

    snake = [
        [10, 9],
        [9, 9],
    ]

    dx = 1
    dy = 0

    food = createFood()
    score = 0
    gameOver = false

    speed = 5
    setSpeed(speed)
}

function update() {
    if (gameOver) return

    if (iskeypressed('w') && dy === 0) {
        dy = -1
        dx = 0
    } else if (iskeypressed('s') && dy === 0) {
        dy = 1
        dx = 0
    } else if (iskeypressed('a') && dx === 0) {
        dx = -1
        dy = 0
    } else if (iskeypressed('d') && dx === 0) {
        dx = 1
        dy = 0
    }

    if (dx || dy) {
        const head = snake[0]
        let x = head[0] + dx
        let y = head[1] + dy

        if (x >= mapWidth) {
            x = 0
        } else if (x < 0) {
            x = mapWidth - 1
        }

        if (y >= mapHeight) {
            y = 0
        } else if (y < 0) {
            y = mapHeight - 1
        }

        if (collides(x, y)) {
            gameOver = true
            return
        }

        snake.unshift([x, y])

        if (x === food[0] && y === food[1]) {
            sfx()

            food = createFood()

            score += 10

            if (score % 50 === 0) {
                speed += 1
                setSpeed(speed)
            }
        } else {
            snake.splice(-1, 1)
        }
    }
}

function draw() {
    cls(0)

    for (let i = 0; i < snake.length; i++) {
        const pos = snake[i]
        rectfill(
            pos[0] * tileSize,
            pos[1] * tileSize,
            tileSize - 1,
            tileSize - 1,
            i > 0 ? 8 : 9
        )
    }

    rectfill(
        food[0] * tileSize,
        food[1] * tileSize,
        tileSize - 1,
        tileSize - 1,
        5
    )

    textfont('sans-serif')
    textalign('right', 'hanging')
    textsize(20)
    text(WIDTH - 5, 5, pad(score, 6), 3)

    if (gameOver) {
        textfont('monospace')
        textalign('center', 'middle')
        textsize(28)
        text(CENTERX, CENTERY, 'GAME OVER', 4, 'bold')
    }
}

function createFood() {
    let x, y

    do {
        x = randi(0, mapWidth - 1)
        y = randi(0, mapHeight - 1)
    } while (collides(x, y))

    return [x, y]
}

// helpers
function setSpeed(value) {
    MAX = 20
    MIN = 1
    value = clamp(~~value, MIN, MAX)
    setfps(value)
}

function pad(value, n) {
    return ('' + value).padStart(n, '0')
}

function collides(x, y) {
    for (let i = 0; i < snake.length; i++) {
        const pos = snake[i]
        if (x === pos[0] && y === pos[1]) {
            return true
        }
    }
    return false
}
