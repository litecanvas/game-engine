const game1 = litecanvas({
  global: false,
  autoscale: false,
  width: 256,
  loop: null,
})

game1.listen('draw', () => {
  game1.cls(game1.TAPPING ? 3 : 5)
})

const game2 = litecanvas({
  global: false,
  autoscale: false,
  width: 128,
  loop: {
    draw() {
      game2.cls(game2.TAPPING ? 3 : 4)
    },
  },
})
