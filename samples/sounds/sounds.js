litecanvas({
    width: 320,
    autoscale: false,
    canvas: '#game',
})

// UI components
const buttons = document.querySelector('#buttons')
const controls = {
    form: document.querySelector('#controls'),
    volume: {
        label: document.querySelector('#volume-value'),
        range: document.querySelector('#volume-range'),
    },
    pitch: {
        range: document.querySelector('#pitch-range'),
        label: document.querySelector('#pitch-value'),
    },
}

let last = null,
    sounds = {
        default: null,
        // prettier-ignore
        custom: [2.69, , 114, , 0.23, 0, , 0.32, , , , , , , , , 0.33, 0.74, , 0.05],
    }

controls.volume.range.onchange = () => {
    const value = controls.volume.range.value
    controls.volume.label.textContent = value
    volume(value)
}

controls.pitch.range.onchange = () => {
    controls.pitch.label.textContent = controls.pitch.range.value
}

controls.form.onreset = () => {
    setTimeout(() => {
        controls.volume.range.onchange()
        controls.pitch.range.onchange()
    })
}

for (const key in sounds) {
    const button = document.createElement('button')
    button.onclick = () => {
        sfx(sounds[key], +controls.pitch.range.value)
        last = key
    }
    button.textContent = key
    buttons.appendChild(button)
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
