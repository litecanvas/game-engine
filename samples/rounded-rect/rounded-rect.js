litecanvas()

function init() {
    drawFn = [rect, rectfill]
    i = 0
}

function tapped() {
    i = wrap(i + 1, 0, 2)
}

function draw() {
    cls(0)
    // radii = number (20) = all-corners
    drawFn[i](10, 10, 100, 50, 3, 20)

    // radii = [number, number] = [top-left-and-bottom-right, top-right-and-bottom-left]
    drawFn[i](10, 100, 100, 50, 3, [10, 30])

    // radii = [number, number, number, number] = [top-left, top-right, bottom-right, bottom-left]
    drawFn[i](10, 200, 100, 50, 3, [5, 10, 15, 20])

    // radii = undefined = no rounded corners
    drawFn[i](10, 300, 100, 50, 3)
}

// learn more: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/roundRect#radii
