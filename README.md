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
-   **Offline-first**: You can install the [playground] as webapp and use anywhere at any time.
-   **Predefined color palette**: just use a number (from 0 to 15) to choose a color.
-   **Predefined sounds**: 16 picked sounds created with [ZzFX](https://killedbyapixel.github.io/ZzFX/).

## Getting Started

```js
import litecanvas from '@litecanvas/litecanvas'

litecanvas({
    // you can setup other configurations here
    // learn more in the cheatsheet
    loop: { init, update, draw }
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

Check out our [Cheatsheet](https://github.com/litecanvas/engine/wiki/Cheatsheet).

## Basic Demos

Try some demos in our playground:

-   [Pong](https://litecanvas.github.io?c=eJx9VE1z2jAQvftXbE82wRSDoe3ghA7TEuDQlEmYEo6KLbCmxmZsETJtyG%2FvriS7hqE9YHa1u2%2FffkiJkDxk6TMrnN8WwEFEMh6A3%2FVc1GIuNrEcQO%2BTUlkqBUsEKwawZknBXevYCCxrx6Il3ECn6wUkT0nuK%2FGRRE8fr1Du%2BShHvJBkIHtgPbEkIe3L%2BG4xvjcHq%2BpgBS2YjmeT6QLa0NPWB%2FGLmxykjtJNQjpBi1ylVNJKS8WO8wjFLvEowiw3volY8wJFP7Akf5EG1O9iQet9GkqRpbDfRUxyJ5INoOaINTgmDCEakHO5z9MA2m3YsC2H7Jnnny10xIOYpRHSEuluLwsTuxjN57O7iQYDKBvx9kaWR6xUdbINXewqwNEgbREWZMzJipAGS3X3HfJQKCWk6XnC853ycLXZBe%2B91z9BjbLUlugoa9CoMpOrCHPO03qua6rY4HtB3dLUvIewnH1dTCsnpZmiSn893CZUYxya6ZYFlOvQ%2BaBy6AOa5Eejl2PT%2Fy2aMB0X6xfHPylQz07Fwy4rBA3UKhM0sW%2B0K1eg1%2BMKIhlYZTZtXZ1ZNexThsthYHFDTvpksOvV6Sa8vpq815WtWgJF4wZatUJMHfWWXQw0G34WpnmGMQ9%2FapphliSioH0%2BCBmfrlFl0%2BRd3QG3ylaX9ELRVVbfpfpOG2eEqkLUVWvSA%2FCXomc4HmuXLMrZwdEgIS5grpxObtuQVk8nyXko1yJJnMtkXMzW0OlCkYfK81%2BFdXzjSdff6Xsu0E%2FRdsF3oXwV6l7d0k0RQ%2FGyW19Z7Nv5w8DGfXBQoB3wGurcUDwCxzfU1EVh%2BLRuUscOeSp5bmP8VtCk7DqyeSbd8nlEr8no2xi%2B%2FxjfY4j%2FP19kQtRtVeIAiFlZbTWWP%2F4LrO4%3D)
-   [Shapes](https://litecanvas.github.io?c=eJyFVe9v2jAQ%2FZ6%2F4r5MJCVlSVrarhuaphYNPmxFHVI3VdXkBgNWgxPFpoCm%2Fu87%2FwgJJNkQEhf73b3ndxeTMEljwl%2BJcD3Hma95LFnKgXEmXQ%2F%2BOABCEklhAAHGhC%2BSIhZsRoWNJd1KkrAFdzsx5ZLmHR86z6mU6arj4X7COBVyl1A39IGvk8SH0XD8dTSF93AVeM5bhXqdzZDQkrM5uNMvk8nw1jyXcrpdE72DD7j%2BthfXRUW9IDooOcvJxhaME0py90yJytZi6apA5oSLeZqv3Jvh9%2Bnw%2FqcPJvjlA%2BrVdRVObJiMl%2BBq4kJPTASF4FrHoJnuaSyFLqw%2BzzklLyUyrCJvWI56WrFRFXv3SpJW5Nl1GZ9X4n4lvqjEl0Xloon6SBW2SZrsFilvJbyqSvsh0dJjoOpIlmbGYByP0lvb%2BVOIApySKclAproOpHJJcxBLklGBExSh%2FVderZPWX%2B1%2FQiVsUP%2FD%2BHY6wmEK1TTmCJizJHFPN7iEVYrfjf5eKkkbOBlA2LvsW3wLtl%2Bn3zetXUCMEC0ADxgUdQ45FaTcDus0tt%2FtJCkCilOeYNm%2B0u7D%2FqHppCrnH%2FjzuoxyEPZK8mMlGWK0khV5ofd0sU5IbvPsEfWY%2BZB7eNTAsyn%2FhxtpKqnBIDN1jar6x6I01tTuGxkXByqO9jVvpIiPxq9B8daHXamYzNha2JsGXZNIwbhUb9jj035t%2BnD3ezLGtQiJvhG57E3GDu7iFQSuOgtT1%2BpH%2FPlkCmPY7RYXjqnY07fXFrqWEyvFqXBdhoGp76EROtvzanm7ap5gvD3vzXEOU038GDx5zRshbuh3Sq5zbgE1D7XfxjnJskbjGOdU9dTKxHdyv7UiW2ueSsajhC12NxmKyQd2mjzFxPC%2FJILBAKHwueC9NkIqUIJQ13YNJTDll9LR3BzrL2lrgu0bsWbXjfsLhsMfyA%3D%3D)
-   [Shockwaves](https://litecanvas.github.io?c=eJyNU8tq3DAU3fsrbndyx%2FFo%2BoAwjQOFDJ1AoYEEsihdOJLcUWskI8nJmDD%2F3quHH%2B1surF1H7rnnOvjVjrBavVcW5JnWSsc6KdfgjkLFXz%2FERJM98oJgwmaZU2vmJNaQd%2Fx2gnCXQ6vGcB6DcwIzMCGgj1o9vulfhYWOrxoBdOKY5NsgOy%2Bfr67393AxTT3Gmi5iVMAGm2AeFSpuDh6zE%2FpeAUf03G1Grshgd6PgCjCZ0%2FhORNPoFmsBAykZINY0M2oeRyLYTnrC7dOC%2Bnc1C8k9rJW1IZsNri7%2F5jb9faQGHqIOCdWdEfOgc7ERcwJoYJvAaCsrZU%2FFXk9FfPu%2FTiP0mlLTK24JLSAx9ubh31ewJTY726%2F7B%2Fysdl2QnCcG%2BuXFDveUUpT2WspgwgMck81cpkw8aZneNwCLfA9pLepuextCp604cI8Su4OW3gfUky32mzhgz8HBlt0EQ0lz%2F5YwDCu0B2kLb0vjnM4YDj45fkL%2F%2Fgymi60LYDhCo01m8gI1xsVh3FhndHDX0YKhSgCVlUM46beAndzyxLhokqwsXENl%2FnYHXguTATQSoWwQyvOmEYaTBoWS7iLqLlYskpB2GM%2BIYxKZlenH3v8lI1s8f8gROdQXYOGN1UUl0acsj9yOjd7)
-   [Simple movement](https://litecanvas.js.org?c=eJxVUL1uwyAY3HmKG3HqRk7UdEBypwztXikzAlwjIYjw58ZW5XcvwUkUtvvhjgNnySjpf%2BXA%2FxhwsZp6gf3hvU5MjhQGJZ0R6KQbTM2WijEV%2FEA4OzmbiBbX2CTQXAOzwK7JSCdpd8hQBReiQG6892ejN%2FanJ4G3hi2MdaNXZIOH9ZbAq1xcGONZSzLgmlZznbCd8NLesZ6wgaZk2g78ceADp6%2Fj9%2Bcaewq2eL3hPCyZS3GjjvJyW6KckZFXCUWjqLPO8aKrfmZzwXJ3oawvL6T8S0mo2PIPhyl18w%3D%3D)

## Inspirations

-   [floopy](https://github.com/lpagg/floppy): a micro game engine for beginners.
-   [PICO-8](https://www.lexaloffle.com/pico-8.php): fantasy console for making, sharing and playing tiny games.
-   [sweetie-16](https://lospec.com/palette-list/sweetie-16): a sweet 16 colors palette.
-   [js13kGames](https://js13kgames.com/): a JavaScript coding competition with size limit set to 13 kilobytes.
