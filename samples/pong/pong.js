litecanvas({
    width: 320,
    height: 480,
    antialias: true,
})

// The ZzFX sounds for this game
// prettier-ignore
const BOUNCE = [, , 1e3, , .03, .02, 1, 2, , , 940, .03, , , , , .2, .6, , .06];
// prettier-ignore
const START = [0.5, 0, 500, , .04, .3, 1, 2, , , 570, .02, .02, , , , .04];
// prettier-ignore
const BALL_OFFSCREEN = [1.31, , 154, 0.05, 0.3, 0.37, 1, 0.3, -9.9, -6.9, , , 0.11, , , 0.2, 0.02, 0.42, 0.16];

let padW = 120,
    padH = 15,
    padX = 100,
    padY = 430,
    destX = padX,
    ballX,
    ballY,
    ballRadius = 15,
    ballAngle = 0,
    dirX = 1,
    dirY = 1,
    speed = 200,
    score = 0,
    lifes = 3,
    textSize,
    started = false

function init() {
    ballX = CENTERX
    ballY = CENTERY - HEIGHT / 4
    textSize = WIDTH / 12

    if (Stats) {
        const stats = new Stats()
        document.body.appendChild(stats.dom)
        listen('before:update', () => stats.begin())
        listen('after:draw', () => stats.end())
    }
}

function tapped(x, y) {
    if (!started) {
        started = true
        sfx(START)
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

    // update ball position
    ballX += dirX * speed * dt
    ballY += dirY * speed * dt

    // bounce ball on screen
    if (ballX + ballRadius > WIDTH) {
        // bounce on right
        ballX = WIDTH - ballRadius
        dirX = -dirX
        sfx(BOUNCE)
    } else if (ballX - ballRadius < 0) {
        // bounce on left
        ballX = ballRadius
        dirX = -dirX
        sfx(BOUNCE)
    }

    if (ballY - ballRadius < 0) {
        // bounce on top
        ballY = ballRadius
        dirY = -dirY
        sfx(BOUNCE)
    } else if (ballY + ballRadius > HEIGHT) {
        // do not bounce on bottom and lost life
        lifes = lifes - 1
        sfx(BALL_OFFSCREEN)

        // also reset the ball
        ballX = 160
        ballY = 70
    }

    // check ball collision with paddle
    if (colrect(ballX, ballY, ballRadius, ballRadius, padX, padY, padW, 1)) {
        dirY = -1
        score += 10
        sfx(BOUNCE)
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
        circfill(ballX, ballY, ballRadius, 5)

        textsize(textSize)

        textalign('start', 'hanging')
        text(10, 10, '❤️ '.repeat(lifes), 4)

        textalign('end', 'hanging')
        text(WIDTH - 10, 10, ('' + score).padStart(6, 0), 3)

        // textalign('start', 'top')
        // text(0, HEIGHT - 32, ELAPSED.toFixed(1))
    } else {
        textalign('center', 'middle')
        textsize(textSize)
        text(CENTERX, CENTERY - 25, 'GAME OVER', 3)
        textsize(textSize * 0.85)
        text(CENTERX, CENTERY + 10, 'SCORE:' + ('' + score).padStart(6, 0), 3)
    }
}
