const url = new URL(location),
  minsize = 16,
  size = +url.searchParams.get('size') || minsize * 4

litecanvas({
  width: size,
  autoscale: false,
  animate: false,
})

let scale = floor(size / minsize)
logo = paint(
  minsize,
  minsize,
  [
    '................',
    '.....000000.....',
    '.....044440.....',
    '.....04aa40.....',
    '.....04aa40.....',
    '.00000444400000.',
    '.07777333355550.',
    '.0766731135bb50.',
    '.0766731135bb50.',
    '.07777333355550.',
    '.00000999900000.',
    '.....098890.....',
    '.....098890.....',
    '.....099990.....',
    '.....000000.....',
    '................',
  ],
  {
    scale,
  }
)

// just draw once
// function draw() is not necessary with `animate=false`
image(0, 0, logo)
