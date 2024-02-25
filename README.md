# litecanvas

Lightweight HTML5 canvas engine suitable for small games and animations.

> **litecanvas** is a game engine to enjoy programming: there is no fancy interface, no visual helpers, no gui tools... just coding.

You can [try our online playground](https://litecanvas.github.io) or install via NPM:

```
npm install @litecanvas/litecanvas
```

### Features

-   **Tiny**: only `4KB` gzipped.
-   **Simple API**: just few functions to draw shapes and some utilities to other things like sounds and math.
-   **16-colors palette**: just use a index (from 0 to 15) to choose a color. The default palette is based on https://lospec.com/palette-list/sweetie-16.

## Getting Started

```js
litecanvas({
    // you can setup some configurations here
    // learn more in the cheatsheet
})

function init() {
    // run once before the game starts
    color = 3
    posx = CENTERX
    posy = CENTERY
}

function update() {
    // called at 60 fps by default
    // use to update your things
    if (TAPPED) {
        // example: tap to change the position
        posx = TAPX
        posy = TAPY
    }
}

function draw() {
    // use to draw your things
    clear(0) // clear the screen
    circfill(posx, posy, 50, color) // draw a circle
}
```

## Docs

Learn more in the [cheatsheet](https://litecanvas.github.io/cheatsheet.html).

## Demos

Try some demos in our playground:

-   [Pong](https://litecanvas.github.io?c=xxxxxxxxxxxxxxxxxxxxxxxx)

## Inspirations

-   [floopy](https://github.com/lpagg/floppy): a micro game engine for beginners.
-   [PICO-8](https://www.lexaloffle.com/pico-8.php): fantasy console for making, sharing and playing tiny games.
