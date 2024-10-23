const url = new URL(location),
    minsize = 16,
    size = +url.searchParams.get('size') || minsize * 4

litecanvas({
    width: size,
    autoscale: false,
    animate: false,
})

function init() {
    let scale = floor(size / minsize)
    logo = paint(
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
        ],
        {
            scale,
        }
    )
    console.log(`Size: ${scale * minsize}x${scale * minsize}`)
}

function draw() {
    cls()
    image(0, 0, logo)
}
