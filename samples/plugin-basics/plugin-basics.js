litecanvas({
  width: 600,
  autoscale: false,
})

use(pluginTest)

function init() {
  clamp(10, 0, 100)
}

function update(dt) {
  if (TAPPED) sfx(0)
}

function draw() {
  // cls(0)
  textalign('center')
  print(CENTERX, CENTERY, 'Open your browser console', 3)
  print(CENTERX, CENTERY + 50, 'FOO = ' + FOO, 3)
  print(CENTERX, CENTERY + 100, sayhello(), 3)
}

function pluginTest(engine, { settings, colors, sounds }) {
  // the first argument is the current litecanvas instance
  console.log('litecanvas instance:', engine)

  // the second argument is a list of helpful values
  console.log('litecanvas settings:', settings)
  console.log('litecanvas colors:', colors)
  console.log('litecanvas ZzFX sounds:', sounds)

  // use `colors` to change a color or add new ones
  // example: change the red (color #4) to purple
  colors[4] = '#be4bdb'

  // use `sounds` to change a sound or add new ones
  // use the https://killedbyapixel.github.io/ZzFX/
  sounds[0] = [1,,377,,.09,.18,2,1.86,,.4,,.08,.14,,,,.09,.53,.04] // prettier-ignore

  // use `settings` to check something
  // `settings` is read-only, changes will not take effect
  if (settings.autoscale) {
    console.log('settings.autoscale = true')
  } else {
    console.log('settings.autoscale = false')
  }

  // use the `listen` function to register new game loop listeners
  // function listen(type: string, callback: function, [highPriority = false]: boolean): void
  const runBefore = true
  engine.listen(
    // possible types: 'update', 'draw', 'init' or 'resized'
    'draw',

    // a callback
    function () {
      cls(4)
      rectfill(0, 0, 100, 100, 5)
    },

    // if true, this callback runs before other listeners
    runBefore
  )

  // another `listen` example
  engine.listen('update', function (deltatime) {
    if (TAPPED) {
      console.log(
        `TAPX=${engine.TAPX} TAPY=${engine.TAPY} deltatime=${deltatime}`
      )
    }
  })

  // the `listen` returns a function that when called removes the listener
  // example: call this listencer once and then remove it
  let deleteListener = engine.listen('update', () => {
    console.log('JUST ONE TIME!')
    deleteListener()
  })

  // use `setvar` to create or update variables
  // example: create a variable named FOO
  engine.setvar('FOO', 42)

  // and finally...
  return {
    // you can return new litecanvas functions
    sayhello() {
      return 'Hello World'
    },

    // or override existing functions
    clamp() {
      console.error('`clamp` was overwritten')
    },
  }
}
