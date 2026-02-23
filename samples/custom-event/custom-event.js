litecanvas({
    width: 600,
    height: 800,
})

function init() {
    player = {
        x: 0,
        y: H / 2,
        size: 64,
        color: 3,
    }
    finishLineX = W * 0.7
    victory = false
    time = 0

    // run a callback every time that event is triggered
    // the `listen()` returns a function to unlisten your event
    const unlistenThisEvent = listen('player-moved', (x, y) => {
        console.log(`player moved to (${x}, ${y})`)
        if (x > finishLineX) {
            victory = true
            time = T
            player.color = 2
            // run until collision happens
            unlistenThisEvent()
        }
    })

    // you can also attach callbacks before an event
    listen('before:player-moved', (x, y) => {
        // do something
    })

    // or after
    listen('after:player-moved', (x, y) => {
        // do something
    })

    canvas().style.border = '1px solid #fff'
}

function draw() {
    cls(0)
    rectfill(player.x, player.y, player.size, player.size, player.color)
    linewidth(4)
    linedash([8])
    line(finishLineX, 0, finishLineX, H, 2)

    if (!victory) {
        text(10, 10, 'Tap to move and', 1)
        text(10, 40, 'try to cross the finish line', 1)
    } else {
        text(10, 10, 'Yeah! You won!!!')
        text(10, 40, 'Your time: ' + round(time, 2), 1)
    }
}

function tapped(x, y) {
    if (!victory) {
        // move the player
        player.x = x
        player.y = y
        // triggers a event and pass some data
        emit('player-moved', x, y)
    }
}
