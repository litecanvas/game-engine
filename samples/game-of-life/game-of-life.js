litecanvas()

function createGrid(w, h) {
    let grid = [];

    for (let y = 0; y < h; y++) {
        grid.push([]);

        for (let x = 0; x < w; x++) {
            grid[y].push(0);
        }
    }

    return grid;
}

function nextState(currentState, converter) {
    let nextState = createGrid(
        currentState[0].length,
        currentState.length
    );

    for (let y = 0; y < currentState.length; y++) {
        for (let x = 0; x < currentState[y].length; x++) {
            nextState[y][x] = converter(
                currentState, x, y
            );
        }
    }

    return nextState;
}

function countNeighbors(state, x, y) {
    let count = 0;

    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i == 0 && j == 0) {
                continue;
            }

            let sY = (state.length + y + i) % state.length;
            let sX = (state[0].length + x + j) % state[0].length;

            if (state[sY][sX] == 1) {
                count++;
            }
        }
    }

    return count;
}

function habitability(state, x, y) {
    let neighbors = countNeighbors(state, x, y);

    if (state[y][x] == 0 && neighbors == 3) {
        return 1;
    }

    if (state[y][x] == 1 && (neighbors < 2 || neighbors > 3)) {
        return 0;
    }

    return state[y][x];
}

function init() {
    rows = 20;
    cols = 20;

    cellSize = 25;

    board = createGrid(cols, rows);

    lastUpdated = 0;
    currentTime = 0;

    mode = "edit";
}

function update(dt) {
    currentTime += dt;

    if ((currentTime - lastUpdated) > 1) {
        lastUpdated = currentTime;

        if (mode == "play") {
            board = nextState(board, (state, x, y) => {
                return habitability(state, x, y)
            });
        }
    }
}

function draw() {
    cls(3);

    for (let y = 0; y < board.length; y++) {
        for (let x = 0; x < board[y].length; x++) {
            let sx = x * cellSize;
            let sy = y * cellSize;

            let color = 0;

            rect(
                sx, sy, cellSize, cellSize, color
            );

            if (board[y][x]) {
                rectfill(
                    sx, sy, cellSize, cellSize, color
                );
            }
        }
    }

    rect(136, HEIGHT - 62, mode.length * 16 + 30, 52, 0);
    textfont("monospace");
    text(18, HEIGHT - 49, "MODE: ", 0);
    text(144, HEIGHT - 49, mode, 0);
}

function tapped(x, y) {
    if ((x > 0 && x < cellSize * (cols + 1)) && (y > 0 && y < cellSize * (rows + 1))) {
        let row = floor(y / cellSize);
        let col = floor(x / cellSize);

        board[row][col] = 1 - board[row][col];
    }

    if (10 <= x - 126 && x - 126 <= 10 + mode.length * 16 + 30 && HEIGHT - 62 <= y && y <= HEIGHT - 10) {
        mode = (mode == "play") ? "edit" : "play";
    }
}

