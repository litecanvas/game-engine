litecanvas()

let rect, player

function init() {
    rect = [CENTERX, CENTERY, 64, 64]
    player = [32, 32, 64, 64]
    color = 5
}

const unlistenThisEvent = listen('player-moved', (player, x, y) => {
    unlistenThisEvent() // run once
    if (colrect(...rect, ...player)) {
        color = 8
        console.log('collision detected')
    } else {
        color = 5
    }
})

function tapped(x, y) {
    player[0] = x
    player[1] = y
    emit('player-moved', player, x, y)
}

function update() {}

function draw() {
    cls(0)
    rectfill(...rect, 4)
    rectfill(...player, color)
}
