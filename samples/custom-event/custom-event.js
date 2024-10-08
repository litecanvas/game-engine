litecanvas()

let rect, player

function init() {
    rect = [CENTERX, CENTERY, 64, 64]
    player = [32, 32, 64, 64]
    color = 5
}

function draw() {
    cls(0)
    rectfill(...rect, 4)
    rectfill(...player, color)
}

function tapped(x, y) {
    player[0] = x
    player[1] = y
    emit('player-moved', player, x, y) // our custom event
}

const unlistenThisEvent = listen('player-moved', (player, x, y) => {
    if (colrect(...rect, ...player)) {
        color = 8
        console.log('collision detected')
        // run until collision happens
        unlistenThisEvent()
    } else {
        color = 5
    }
})

// before any event is emitted a another event with "before:" prefixed
listen('before:player-moved', (player, x, y) => {
    console.log('before event player-moved')
})

// and after any event is emitted a another event with "after:" prefixed
listen('after:player-moved', (player, x, y) => {
    console.log('after event player-moved')
})
