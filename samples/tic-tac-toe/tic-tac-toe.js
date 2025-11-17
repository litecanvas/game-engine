/**
 * Tic Tac Toe example by @Add00 https://github.com/Add00
 */

const GRAY = 1
const WHITE = 3
const CELL = 64

litecanvas({
    width: CELL * 3,
    autoscale: 2,
})

function checkWin(row, col) {
    return (
        map[row].every((cell) => cell === player) || // Check row
        map.every((r) => r[col] === player) || // Check column
        (map[0][0] === player && map[1][1] === player && map[2][2] === player) || // Check diagonal
        (map[0][2] === player && map[1][1] === player && map[2][0] === player) // Check anti-diagonal
    )
}

function checkDraw() {
    return map.flat().every((cell) => cell === 'X' || cell === 'O')
}

function init() {
    gameOver = false
    player = 'X'
    map = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ]
}

function draw() {
    // background
    rectfill(0, 0, W, H)

    // draw grid
    line(0, CELL, CELL * 3, CELL, GRAY)
    line(0, CELL * 2, CELL * 3, CELL * 2, GRAY)

    line(CELL, 0, CELL, CELL * 3, GRAY)
    line(CELL * 2, 0, CELL * 2, CELL * 3, GRAY)

    // draw pieces
    textalign('center', 'middle')
    textsize(30)

    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            let value = map[row][col]
            if (value === 'X' || value === 'O') {
                text(col * CELL + CELL / 2, row * CELL + CELL / 2, value, WHITE)
            }
        }
    }

    // draw end game
    if (gameOver) {
        push()
        alpha(0.9)
        cls(0)
        textsize(14)
        alpha(1)
        text(W / 2, H / 2, `Game Over! \n${player} wins! \nRefresh to restart.`)
        pop()
        pause()
    }
}

function tap(x, y, _tapId) {
    if (gameOver) {
        return
    }

    // Check if the click is within the grid bounds
    if (x >= 0 && x < CELL * 3 && y >= 0 && y < CELL * 3) {
        // Convert pixel coordinates to grid coordinates
        let row = Math.floor(y / CELL)
        let col = Math.floor(x / CELL)

        // Only allow updating if the cell is empty
        if (map[row][col] === 0) {
            map[row][col] = player

            // Check for win or draw
            if (checkWin(row, col)) {
                gameOver = true
            } else if (checkDraw()) {
                gameOver = true
                player = 'Nobody'
            } else {
                player = player === 'X' ? 'O' : 'X'
            }
        }
    }
}
