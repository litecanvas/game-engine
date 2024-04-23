const loop1 = {
  draw: function () {
    game1.cls(2)
  },
}

const loop2 = {
  draw: function () {
    game2.cls(4)
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
