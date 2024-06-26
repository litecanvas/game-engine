litecanvas({
  width: 320,
  height: 480,
  // antialias: false,
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
  textSize = 20
}

function update(dt) {
  if (lifes === 0) return // game over?

  // handle inputs
  if (TAPPING) {
    destX = ~~(TAPX - padW / 2)
  }

  // move the paddle
  if (padX !== destX) {
    padX = lerp(padX, destX, 0.05)
  }

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
    sfx(0)
  }
}

function draw() {
  cls(0)

  textfont('Silkscreen')

  if (lifes > 0) {
    rectfill(padX, padY, padW, padH, 3)
    circfill(ballX, ballY, ballSize, 6)
    textsize(textSize)
    text(20, 20, '❤️ ' + lifes, 4)
    text(WIDTH - 100, 20, ('' + score).padStart(6, 0), 3)
    // text(WIDTH - 80, HEIGHT - 20, 'FPS:' + (FPS || 0), 5)
  } else {
    textalign('center', 'middle')
    textsize(textSize + 5)
    text(CENTERX, CENTERY - 25, 'GAME OVER', 3)
    textsize(textSize)
    text(CENTERX, CENTERY + 25, 'score: ' + score, 3)
  }
}
