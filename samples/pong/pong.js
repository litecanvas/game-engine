litecanvas({
    width: 320,
    height: 480,
})

function init() {
    padW = 120
    padH = 15
    padX = 100
    padY = 430
    destX = padX
    ballX = CENTERX
    ballY = CENTERY - HEIGHT / 4
    ballSize = 15
    ballAngle = 0
    dirX = 1
    dirY = 1
    speed = 200
    score = 0
    lifes = 3
    textSize = WIDTH / 12
    started = false
}

function tapped(x, y) {
    if (!started) {
        started = true
        return
    }
    destX = ~~(x - padW / 2)
}

function update(dt) {
    if (!started) return // title screen?
    if (lifes === 0) return // game over?

    // move the paddle
    padX = lerp(padX, destX, 0.05)

    // don't let the paddle leave the screen
    if (padX < 0) padX = 0
    else if (padX + padW > WIDTH) padX = WIDTH - padW

    if (ballY + ballSize > HEIGHT) {
        ballX = 160
        ballY = 70
        lifes = lifes - 1
        sfx(3)
    }

    // update ball position
    ballX += dirX * speed * dt
    ballY += dirY * speed * dt

    // bounce ball on screen
    if (ballX + ballSize > WIDTH || ballX < ballSize) {
        dirX *= -1
        sfx(1)
    }
    if (ballY < ballSize) {
        dirY = 1
        sfx(1)
    }

    // check ball collision with paddle
    if (colrect(ballX, ballY, ballSize, ballSize, padX, padY, padW, 1)) {
        dirY = -1
        score += 10
        sfx(1)
    }
}

function draw() {
    cls(0)
    if (!started) {
        textalign('center', 'middle')
        textsize(textSize)
        text(CENTERX, CENTERY, 'TAP TO START', 3)
    } else if (lifes > 0) {
        rectfill(padX, padY, padW, padH, 3)
        circfill(ballX, ballY, ballSize, 5)

        textsize(textSize)

        textalign('start', 'hanging')
        text(10, 10, '❤️ '.repeat(lifes), 4)

        textalign('end', 'hanging')
        text(WIDTH - 10, 10, ('' + score).padStart(6, 0), 3)
    } else {
        textalign('center', 'middle')
        textsize(textSize)
        text(CENTERX, CENTERY - 25, 'GAME OVER', 3)
        textsize(textSize * 0.85)
        text(CENTERX, CENTERY + 10, 'SCORE:' + ('' + score).padStart(6, 0), 3)
    }
}
