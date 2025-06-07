litecanvas()

function init() {
    // set a specific seed (by default is the current time)
    rseed(42)

    // get the current seed
    console.log('RNG Seed = ' + stat(9))

    // generate 5 random numbers from 0 to 100
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
