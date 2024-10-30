litecanvas()

class GMap {
    size;  // number
    length;// number
    grid;  // number[]

    constructor() {
        this.size = 64; // tile size
        this.length = 8; // grid size
        this.grid = [
            1, 1, 1, 1, 1, 1, 1, 1,
            1, 0, 1, 0, 0, 0, 0, 1,
            1, 0, 1, 0, 0, 0, 0, 1,
            1, 0, 1, 0, 0, 0, 0, 1,
            1, 0, 0, 0, 0, 0, 0, 1,
            1, 0, 0, 0, 0, 2, 0, 1,
            1, 0, 0, 0, 0, 0, 0, 1,
            1, 1, 1, 1, 1, 1, 1, 1,
        ];
    }

    at(x, y) {
        return x >= 0 && y >= 0 ? this.grid[y * this.length + x] : -1;
    }
}

function init() {
    const map = new GMap();
    let offsetX = 0, offsetY = 0;

    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map.length; x++) {
            let color = null;

            if (map.at(x, y) == 1) {
                color = 3;
            }
            else if (map.at(x, y) == 2) {
                color = 6;
            }
            else {
                color = 0;
            }

            offsetX = x * map.size;
            offsetY = y * map.size;

            rectfill(offsetX + 1, offsetY + 1, map.size - 1, map.size - 1, color);
        }
    }
}