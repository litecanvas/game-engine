litecanvas()

function init() {
    // comment this line to use a random seed
    seed(42)

    // generate 5 numbers from 0 to 100
    numbers = [
        randi(0, 100),
        randi(0, 100),
        randi(0, 100),
        randi(0, 100),
        randi(0, 100),
    ]
}

function draw() {
    cls(0)
    text(20, 20, numbers.join('-'))
}
