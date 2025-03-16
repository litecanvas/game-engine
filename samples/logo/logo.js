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
        '.....055550.....',
        '.....054450.....',
        '.....054450.....',
        '.00000555500000.',
        '.077773333bbbb0.',
        '.076673113baab0.',
        '.076673113baab0.',
        '.077773333bbbb0.',
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
