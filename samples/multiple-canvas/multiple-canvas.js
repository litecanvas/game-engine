const game1 = litecanvas({
    global: false,
    autoscale: false,
    width: 256,
    loop: null,
})

game1._state = { bg: 5 }

game1.listen('tapped', () => {
    game1._state.bg++
})

game1.listen('draw', () => {
    game1.cls(game1._state.bg)
})

const game2 = litecanvas({
    global: false,
    autoscale: false,
    width: 128,
    loop: {
        tapped() {
            game2._state.bg++
        },

        draw() {
            game2.cls(game2._state.bg)
        },
    },
})

game2._state = { bg: 3 }
