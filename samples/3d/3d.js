litecanvas()

function resized() {
    size = W > H ? H / 2 : W / 2
    linewidth(5)
    ctx().lineCap = 'round'
}

function init() {
    resized()

    projection = [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1],
    ]
    points = [
        [-0.5, -0.5, -0.5], // [x, y, z]
        [0.5, -0.5, -0.5],
        [0.5, 0.5, -0.5],
        [-0.5, 0.5, -0.5],
        [-0.5, -0.5, 0.5],
        [0.5, -0.5, 0.5],
        [0.5, 0.5, 0.5],
        [-0.5, 0.5, 0.5],
    ]
    projected = []
    angle = 0
}

function update(dt) {
    angle += 0.01

    for (let i = 0; i < points.length; i++) {
        const pos = point2matrix(...points[i])
        let rotated = matmul(rotationX(angle), pos)
        rotated = matmul(rotationY(angle), rotated)
        rotated = matmul(rotationZ(angle), rotated)
        const projected2D = matmul(projection, rotated)

        // scale the cube
        projected2D[0][0] *= size
        projected2D[1][0] *= size
        projected2D[2][0] *= size

        projected[i] = projected2D
    }
}

function draw() {
    cls(0)

    push()
    translate(W / 2, H / 2)
    for (let i = 0; i < 4; i++) {
        connect(i, (i + 1) % 4, projected)
        connect(i + 4, ((i + 1) % 4) + 4, projected)
        connect(i, i + 4, projected)
    }
    pop()
}

function connect(a, b, points) {
    line(points[a][0][0], points[a][1][0], points[b][0][0], points[b][1][0], 3)
}

function matmul(a, b) {
    const acols = a[0].length
    const arows = a.length
    const bcols = b[0].length
    const brows = b.length

    if (acols !== brows) throw 'Invalid matrixes'

    const res = []
    for (let i = 0; i < arows; i++) {
        res[i] = []
        for (let j = 0; j < bcols; j++) {
            let sum = 0
            for (let k = 0; k < acols; k++) {
                sum += a[i][k] * b[k][j]
            }
            res[i][j] = sum
        }
    }

    return res
}

function rotationX(radians) {
    return [
        [1, 0, 0],
        [0, cos(radians), -sin(radians), 0],
        [0, sin(radians), cos(radians), 0],
    ]
}

function rotationY(radians) {
    return [
        [cos(radians), 0, sin(radians)],
        [0, 1, 0],
        [-sin(radians), 0, cos(radians)],
    ]
}

function rotationZ(radians) {
    return [
        [cos(radians), -sin(radians), 0],
        [sin(radians), cos(radians), 0],
        [0, 0, 1],
    ]
}

function point2matrix(x, y, z) {
    return [[x], [y], [z]]
}
