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
    ballSize = 15,
    ballAngle = 0,
    dirX = 1,
    dirY = 1,
    speed = 200,
    score = 0,
    lifes = 3,
    textSize,
    started = false

function init() {
    ballX = CX
    ballY = CY - H / 4
    textSize = W / 12

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
    else if (padX + padW > W) padX = W - padW

    if (ballY + ballSize > H) {
        ballX = 160
        ballY = 70
        lifes = lifes - 1
        sfx(BALL_OFFSCREEN)
    }

    // update ball position
    ballX += dirX * speed * dt
    ballY += dirY * speed * dt

    let bounced = false

    // bounce ball on screen
    if (ballX + ballSize > W || ballX < ballSize) {
        dirX *= -1
        bounced = true
    } else if (ballY < ballSize) {
        dirY = 1
        bounced = true
    }

    // check ball collision with paddle
    if (ballX > padX && ballX < padX + padW && ballY + ballSize > padY) {
        dirY = -1
        score += 10
        bounced = true
    }

    if (bounced) sfx(BOUNCE)
}

function draw() {
    cls(0)
    if (!started) {
        textalign('center', 'middle')
        textsize(textSize)
        text(CX, CY, 'TAP TO START', 3)
    } else if (lifes > 0) {
        rectfill(padX, padY, padW, padH, 3)
        circfill(ballX, ballY, ballSize, 5)

        textsize(textSize)

        textalign('start', 'hanging')
        text(10, 10, '❤️ '.repeat(lifes), 4)

        textalign('end', 'hanging')
        text(W - 10, 10, ('' + score).padStart(6, 0), 3)
    } else {
        textalign('center', 'middle')
        textsize(textSize)
        text(CX, CY - 25, 'GAME OVER', 3)
        textsize(textSize * 0.85)
        text(CX, CY + 10, 'SCORE:' + ('' + score).padStart(6, 0), 3)
    }
}
