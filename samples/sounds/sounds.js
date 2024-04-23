litecanvas({
  width: 320,
  autoscale: false,
  canvas: '#game',
})

const buttons = document.querySelector('#buttons')
const pitch = document.querySelector('#pitch-range')
const volume = document.querySelector('#volume-range')

let index = null

volume.onchange = (ev) => {
  document.querySelector('#volume-value').textContent = ev.target.value
}

pitch.onchange = (ev) => {
  document.querySelector('#pitch-value').textContent = ev.target.value
}

for (let i = 0; i < 9; i++) {
  const button = document.createElement('button')
  button.onclick = () => {
    index = i
    if (8 === i) {
      index = 'custom'
      // custom zzfx sound produced in https://killedbyapixel.github.io/ZzFX/
      // prettier-ignore
      sfx([2.69,,114,,0.23,0,,0.32,,,,,,,,,0.33,0.74,,0.01])
    } else {
      sfx(i, volume.value, pitch.value) // for i = 0 ~ 7 use the default sounds
    }
  }
  button.textContent = '#' + i + (8 === i ? '*' : '')
  buttons.appendChild(button)
}

function init() {
  textalign('center', 'middle')
}

function update() {
  // do nothing
}

function draw() {
  cls(index)
  if (index !== null) {
    circfill(CENTERX, CENTERY, 75, 3)
    text(CENTERX, CENTERY, `sfx(${index});`, 0)
  }
}
