const loop1 = {
  draw: function () {
    game1.cls(game1.TAPPING ? 3 : 5)
  },
}

const loop2 = {
  draw: function () {
    game2.cls(game2.TAPPING ? 3 : 4)
  },
}

const game1 = litecanvas({
  global: false,
  autoscale: false,
  width: 256,
  loop: loop1,
})

const game2 = litecanvas({
  global: false,
  autoscale: false,
  width: 128,
  loop: loop2,
})
