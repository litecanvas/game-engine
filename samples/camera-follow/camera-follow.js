litecanvas()

function init() {
    actor = { x: 0, y: CY }
}

function update(dt) {
    // animate the actor
    actor.x = wave(CX - 200, CX + 200, T)
}

function draw() {
    push()

    // setup the camera viewport to follow the actor position
    translate(CX - actor.x, CY - actor.y)

    // draw the scene objects
    background()
    circfill(actor.x, actor.y, 64, 4)

    pop()

    // draw the UI fixed on screen (ignoring the camera)
    textsize(32)
    text(10, 10, 'SCORE: 999999', 0, 'bold')
}

// draw a background
// This helps you notice the camera movement
function background(color1 = 1, color2 = 2) {
    const tileSize = 32
    const cols = (W * 2) / tileSize
    const rows = (H * 2) / tileSize

    push()
    translate(-W / 2, -H / 2)
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            let color = (x + y) % 2 === 0 ? color1 : color2
            rectfill(x * tileSize, y * tileSize, tileSize, tileSize, color)
        }
    }
    pop()
}
