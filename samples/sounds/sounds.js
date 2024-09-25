litecanvas({
    width: 320,
    autoscale: false,
    canvas: '#game',
})

const buttons = document.querySelector('#buttons')
const pitch = document.querySelector('#pitch-range')
const volume = document.querySelector('#volume-range')
const controls = document.querySelector('#controls')

let last = null,
    sounds = {
        default: null,
        // prettier-ignore
        custom: [2.69, , 114, , 0.23, 0, , 0.32, , , , , , , , , 0.33, 0.74, , 0.05],
    }

volume.onchange = (ev) => {
    document.querySelector('#volume-value').textContent = ev.target.value
}

pitch.onchange = (ev) => {
    document.querySelector('#pitch-value').textContent = ev.target.value
}

controls.onreset = () =>
    setTimeout(() => {
        document.querySelector('#volume-value').textContent = volume.value
        document.querySelector('#pitch-value').textContent = pitch.value
    }, 0)

for (const key in sounds) {
    const button = document.createElement('button')
    button.onclick = () => {
        sfx(sounds[key], volume.value, pitch.value)
        last = key
    }
    button.textContent = key
    buttons.appendChild(button)
}

function update() {
    // do nothing
}

function draw() {
    cls(0)
    if (last !== null) {
        circfill(CENTERX, CENTERY, 75, 3)

        textalign('center', 'middle')
        textsize(20)
        text(
            CENTERX,
            CENTERY,
            `sfx(${'default' === last ? '' : '[ ... ]'});`,
            0
        )
    }
}
