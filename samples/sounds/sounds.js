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

for (let i = 0; i < 8; i++) {
  const button = document.createElement('button')
  button.onclick = () => {
    index = i
    sfx(i, volume.value, pitch.value)
  }
  button.textContent = '#' + i
  buttons.appendChild(button)
}

function init() {
  textalign('center', 'middle')
}

function update() {
  // do nothing
}

function draw() {
  clear(index)
  if (index !== null) {
    circfill(CENTERX, CENTERY, 75, 3)
    text(CENTERX, CENTERY, `sfx(${index});`, 0)
  }
}
