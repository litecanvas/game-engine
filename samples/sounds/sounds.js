litecanvas({
  width: 320,
  autoscale: false,
  canvas: '#game',
})

const buttons = document.querySelector('#buttons')
const pitch = document.querySelector('#pitch-range')
const volume = document.querySelector('#volume-range')

let arg = null,
  sounds = 4

volume.onchange = (ev) => {
  document.querySelector('#volume-value').textContent = ev.target.value
}

pitch.onchange = (ev) => {
  document.querySelector('#pitch-value').textContent = ev.target.value
}

for (let i = 0; i < sounds; i++) {
  const button = document.createElement('button')
  button.onclick = () => {
    sfx(i, volume.value, pitch.value) // for i = 0 ~ 7 use the default sounds
    arg = i
  }
  button.textContent = '#' + i
  buttons.appendChild(button)
}

{
  const button = document.createElement('button')
  button.onclick = () => {
    // prettier-ignore
    const s = [2.69, , 114, , 0.23, 0, , 0.32, , , , , , , , , 0.33, 0.74, , 0.01]
    sfx(s, volume.value, pitch.value)
    arg = 'custom'
  }
  button.textContent = '#' + sounds + '*'
  buttons.appendChild(button)
}

function init() {
  textalign('center', 'middle')
}

function update() {
  // do nothing
}

function draw() {
  cls('custom' === arg ? 4 : arg)
  if (arg !== null) {
    circfill(CENTERX, CENTERY, 75, 3)
    textsize(20)
    text(CENTERX, CENTERY, `sfx(${arg});`, 0)
  }
}
