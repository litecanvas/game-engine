litecanvas()

const GREY = 2
const RED = 4
const GOLD = 5
const WHITE = 3
const BLUE = 6

const CELL = 64

function checkWin(row, col) {
    return (
        map[row].every((cell) => cell === player) || // Check row
        map.every((r) => r[col] === player) || // Check column
        (map[0][0] === player &&
            map[1][1] === player &&
            map[2][2] === player) || // Check diagonal
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
    line(0, CELL, CELL * 3, CELL, RED)
    line(0, CELL * 2, CELL * 3, CELL * 2, RED)

    line(CELL, 0, CELL, CELL * 3, RED)
    line(CELL * 2, 0, CELL * 2, CELL * 3, RED)

    // draw pieces
    textalign('center', 'middle')

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
        text(W / 2, CELL * 3, `Game Over! ${player} wins!`, WHITE)
        text(W / 2, CELL * 3 + CELL, 'Refresh to restart.', WHITE)
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
