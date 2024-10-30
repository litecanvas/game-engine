litecanvas()


const GREY = 2;
const RED = 4;
const GOLD = 5;
const WHITE = 3;
const BLUE = 6;

const ONE_AND_HALF_PI = 3 * Math.PI / 2;

const MIDPOINT = 600;

const map = {
    size: null,     // number
    length: null,   // number
    grid: null,     // number[]

    init: function () {
        this.size = 64; // tile size
        this.length = 8; // grid size
        this.grid = [
            1, 1, 1, 1, 1, 1, 1, 1,
            1, 0, 1, 0, 0, 0, 0, 1,
            1, 0, 1, 0, 0, 0, 0, 1,
            1, 0, 1, 0, 0, 0, 0, 1,
            1, 0, 0, 0, 0, 0, 0, 1,
            1, 0, 0, 0, 0, 1, 0, 1,
            1, 0, 0, 0, 0, 0, 0, 1,
            1, 1, 1, 1, 1, 1, 1, 1,
        ];
    },

    at: function (x, y) {
        return x >= 0 && y >= 0 ? this.grid[y * this.length + x] : -1;
    },
};

const player = {
    heading: null,  // number
    position: {
        x: null,    // number
        y: null,    // number
    },
    velocity: {
        x: null,    // number
        y: null,    // number
    },
    acceleration: {
        x: null,    // number
        y: null,    // number
    },

    init: function () {
        this.heading = Math.PI / 2; // player angle
        this.position = { x: 100, y: 100 };
        this.velocity = { x: 0, y: 0 };
        this.acceleration = { x: 0, y: 0 };
    }
};

function rayLength(ax, ay, bx, by) {
    return (Math.sqrt((bx - ax) * (bx - ax) + (by - ay) * (by - ay)));
}

function rayNormalize(angle) {
    let normalizedAngle = angle % TWO_PI;

    if (normalizedAngle < 0) {
        normalizedAngle += TWO_PI;
    }

    return normalizedAngle;
}

function init() {
    map.init();
    player.init();
}

function draw() {
    rectfill(0, 0, WIDTH, HEIGHT, WHITE);

    {
        // map
        let offsetX = 0, offsetY = 0;
        for (let y = 0; y < map.length; y++) {
            for (let x = 0; x < map.length; x++) {
                let color = null;

                if (map.at(x, y) == 1) {
                    color = GOLD;
                }
                else if (map.at(x, y) == 2) {
                    color = BLUE;
                }
                else {
                    color = GREY;
                }

                offsetX = x * map.size;
                offsetY = y * map.size;

                rectfill(offsetX + 1, offsetY + 1, map.size - 1, map.size - 1, color);
            }
        }
    }

    // rays
    {
        let mx = 0, my = 0, mp = 0;
        let rayX = 0, rayY = 0, offsetX = 0, offsetY = 0;
        let distH = 100_000_000, hx = player.position.x, hy = player.position.y;

        let rayAngle = player.heading - (Math.PI / 180) * 30;

        for (let r = 0; r < 60; r++) {
            // check horizontal lines

            let depthOfFieldX = 0;
            const atan = -1 / Math.tan(rayAngle);

            // looking down
            if (rayAngle > Math.PI) {
                rayY = ((player.position.y >> 6) << 6) - 0.0001;
                rayX = (player.position.y - rayY) * atan + player.position.x;
                offsetY = - 64;
                offsetX = - offsetY * atan;
            }
            // looking up
            if (rayAngle < Math.PI) {
                rayY = ((player.position.y >> 6) << 6) + 64;
                rayX = (player.position.y - rayY) * atan + player.position.x;
                offsetY = + 64;
                offsetX = - offsetY * atan;
            }
            // looking sideways
            if (rayAngle === 0 || rayAngle === Math.PI) {
                rayX = player.position.x;
                rayY = player.position.y;
                depthOfFieldX = 8
            }

            while (depthOfFieldX < 8) {
                mx = rayX >> 6;
                my = rayY >> 6;
                mp = my * map.length + mx;

                // hit wall
                if (mp > 0 && mp < map.length * map.length && map.grid[mp] === 1) {
                    hx = rayX;
                    hy = rayY;
                    distH = rayLength(player.position.x, player.position.y, hx, hy);

                    depthOfFieldX = 8;
                }
                else {
                    rayX += offsetX;
                    rayY += offsetY;
                    depthOfFieldX += 1;
                }
            }

            // check vertical lines

            let distV = 100_000_000, vx = player.position.x, vy = player.position.y;
            let depthOfFieldV = 0;
            const ntan = - Math.tan(rayAngle);

            // looking left
            if (rayAngle > HALF_PI && rayAngle < ONE_AND_HALF_PI) {
                rayX = ((player.position.x >> 6) << 6) - 0.0001;
                rayY = (player.position.x - rayX) * ntan + player.position.y;
                offsetX = - 64;
                offsetY = - offsetX * ntan;
            }
            // looking right
            if (rayAngle < HALF_PI || rayAngle > ONE_AND_HALF_PI) {
                rayX = ((player.position.x >> 6) << 6) + 64;
                rayY = (player.position.x - rayX) * ntan + player.position.y;
                offsetX = + 64;
                offsetY = - offsetX * ntan;
            }
            // looking up or down
            if (rayAngle === 0 || rayAngle === Math.PI) {
                rayX = player.position.x;
                rayY = player.position.y;
                depthOfFieldV = 8
            }

            while (depthOfFieldV < 8) {
                mx = rayX >> 6;
                my = rayY >> 6;
                mp = my * map.length + mx;

                // hit wall
                if (mp > 0 && mp < map.length * map.length && map.grid[mp] === 1) {
                    vx = rayX;
                    vy = rayY;
                    distV = rayLength(player.position.x, player.position.y, vx, vy);

                    depthOfFieldV = 8;
                }
                else {
                    rayX += offsetX;
                    rayY += offsetY;
                    depthOfFieldV += 1;
                }
            }

            let transparency = null;

            if (distV < distH) {
                rayX = vx;
                rayY = vy;

                transparency = 1;
            }
            if (distH < distV) {
                rayX = hx;
                rayY = hy;

                transparency = 0.5;
            }

            // draw ray

            linewidth(2);
            line(player.position.x, player.position.y, rayX, rayY, RED);

            // ray wall

            const fishAngle = rayNormalize(player.heading - rayAngle);
            const dist = Math.min(distH, distV) * Math.cos(fishAngle);

            let lineHeight = (map.size * 512) / dist;
            if (lineHeight > 512) {
                lineHeight = 512;
            }

            let lineOffset = 256 - lineHeight / 2;

            let wallColor = GOLD;

            alpha(transparency);
            linewidth(8);
            line(MIDPOINT + r * 8, 0, MIDPOINT + r * 8, lineHeight + lineOffset, wallColor);

            rayAngle = rayNormalize(rayAngle + (Math.PI / 180));
            alpha(1);
        }
    }

    // player body
    {
        rectfill(player.position.x, player.position.y, 8, 8, GOLD);
    }

    // interaction
    {
        if (iskeydown('a') || iskeydown('ArrowLeft')) {
            player.heading -= 0.05;
            player.velocity.x = Math.cos(player.heading) * 5;
            player.velocity.y = Math.sin(player.heading) * 5;
          } else if (iskeydown('d') || iskeydown('ArrowRight')) {
            player.heading += 0.05;
            player.velocity.x = Math.cos(player.heading) * 5;
            player.velocity.y = Math.sin(player.heading) * 5;
          } else if (iskeydown('w') || iskeydown('ArrowUp')) {
            player.position.x += player.velocity.x;
            player.position.y += player.velocity.y;
          } else if (iskeydown('s') || iskeydown('ArrowDown')) {
            player.position.x -= player.velocity.x;
            player.position.y -= player.velocity.y;
          }
    }
}