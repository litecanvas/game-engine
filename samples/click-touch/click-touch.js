litecanvas()

function init() {
    // this function run once
    // before the game starts
    bg = 0
    color = 3
    radius = 32
    posx = CX
    posy = CY
}

// this function render the game scene
function draw() {
    cls(bg) // clear the screen
    circfill(posx, posy, radius, color) // draw a circle
}

// this function detect taps/clicks
// and changes the circle position
function tapped(x, y) {
    posx = x
    posy = y
}

// this function controls your game logic
function update(dt) {
    // make the circle falls 100 pixels per second
    posy += 100 * dt
}
