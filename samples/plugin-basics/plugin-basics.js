litecanvas({
  plugins: [pluginTest],
})

function init() {
  clamp(10, 0, 100)
}

function draw() {
  // cls(0)
  textalign('center')
  print(CENTERX, CENTERY, 'Open your browser console', 3)
  print(CENTERX, CENTERY + 50, 'FOO = ' + FOO, 3)
  print(CENTERX, CENTERY + 100, sayhello(), 3)
}

function pluginTest(engine, { settings, set, colors, sounds, on }) {
  console.log('licanvas instance:', engine)
  console.log('litecanvas settings:', settings)
  console.log('litecanvas colors:', colors)
  console.log('litecanvas ZzFX sounds:', sounds)

  // use the `on` function to register new game loop callbacks
  // function on(type: string, callback: function, [highPriority = false]: boolean): void
  const runBefore = true
  on(
    // possible types: 'update', 'draw', 'init' or 'resized'
    'draw',

    // a callback
    function () {
      cls(4)
      rectfill(0, 0, 100, 100, 5)
    },

    // if true, this callback runs before the main game loop functions
    runBefore
  )

  // another `on` example
  on('update', function (deltatime) {
    if (TAPPED) {
      console.log(
        `TAPX=${engine.TAPX} TAPY=${engine.TAPY} deltatime=${deltatime}`
      )
    }
  })

  // create or update variables
  set('FOO', 42)

  // a custom function
  function sayhello() {
    return 'Hello World'
  }

  return {
    // return your new litecanvas functions
    sayhello,

    // or overrides any existing function
    clamp() {
      console.error('`clamp` not exists anymore')
    },
  }
}
