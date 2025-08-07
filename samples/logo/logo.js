const url = new URL(location),
    minsize = 16,
    size = +url.searchParams.get('size') || minsize * 4

litecanvas({
    width: size,
    autoscale: false,
})

let scale = floor(size / minsize)
logo = paint(
    minsize,
    minsize,
    () => {
        spr(
            0,
            0,
            minsize,
            minsize,
            [
                '................',
                '................',
                '......4444......',
                '......4aa4......',
                '....004aa400....',
                '....02444420....',
                '..777733335555..',
                '..766731135bb5..',
                '..766731135bb5..',
                '..777733335555..',
                '....02999920....',
                '....00988900....',
                '......9889......',
                '......9999......',
                '................',
                '................',
            ].join('')
        )
    },
    {
        scale,
    }
)

// just draw once outside of the `draw()` function
image(0, 0, logo)

// we don't need the game loop here, so lets pause it.
// but we can immediately pause it, because the game loop has not started yet
// so we pause the game loop in the first "update" event
listen('before:update', pause)

// another alternative would be to leave the game with only 1 FPS
// framerate(1)
