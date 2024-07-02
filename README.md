![image](https://github.com/litecanvas/game-engine/assets/1798830/35119449-cd75-45d2-a806-462cd323cc14)

# litecanvas

[![Discord Server](https://img.shields.io/badge/Discord-7289DA?style=for-the-badge&logo=discord&logoColor=white)](https://discord.com/invite/r2c3rGsvH3)

Lightweight HTML5 canvas engine suitable for small games and animations for people who enjoy coding: there is no fancy interface, no visual helpers, no gui tools... just coding.

:warning: **This project is still under development. All feedback is appreciated!** :warning:

### Features

-   **Tiny**: only `~4KB` (minified + gzipped).
-   **Simple API**: just few functions to draw shapes and some utilities to other things like sounds and math.
-   **Offline-first**: You can install the [playground](https://litecanvas.js.org/) as webapp and use anywhere at any time.
-   **Predefined colors**: just use a number (from 0 to 11) to choose a color in our 12-color palette.
-   **Predefined sounds**: packed with 4 sounds created in [ZzFX](https://killedbyapixel.github.io/ZzFX/).

[Learn more](https://litecanvas.js.org/about.html)

## Getting Started

You can try our [online playground](https://litecanvas.github.io) or just installing the [basic template](https://github.com/litecanvas/template):

```sh
# requires Node.js
npx tiged litecanvas/template my-game
cd my-game
npm install
npm start
```

If you prefer, you can manually install the package via NPM:

```
npm install @litecanvas/litecanvas
```

```js
import litecanvas from '@litecanvas/litecanvas'

// you can setup other configurations here
// learn more in the cheatsheet
litecanvas({
    loop: { init, update, draw },
})

// run once before the game starts
function init() {
    bg = 0
    color = 3
    posx = CENTERX
    posy = CENTERY
}

// called at 60 fps by default
// use to update your things
function update(dt) {
    // example: tap to change the circle position
    if (TAPPED) {
        posx = TAPX
        posy = TAPY
    }
}

// use to draw your things
function draw() {
    clear(bg) // clear the screen
    circfill(posx, posy, 50, color) // draw a circle
}
```

## Docs

Check out our [Cheatsheet](https://litecanvas.js.org/about.html).

## Basic Demos

Try some demos in our playground:

-   [Pong](https://litecanvas.js.org?c=eJyVVUtS20AQ3fsUzUpSLCwj20AIJuUK5pMiQIEL7KWQRvYEWXJpxpgKnyvkBNnlEDlPLpArpHtmJAsIqWIB7p7pfv2Z162ESxYG6U0g7LsawIJHcrIFLb%2FpojZhfDyRW9DebNYenFotnqeh5FkKPOXSdoA8ZkF0CV1Y85taOSClo%2BUhyU1zMUKl3SIlYkLSFVmgehUkCamf%2BseD%2FllxMipPRrAKB%2F3D%2FYMBeNA21%2Bf8Gysikd5LxwkdKHyeq8haHBlRzBiLUPZVQiLM8sI%2B4TETKLdQluxWGmxVkZBBLpVfHCSC1fDI8yDJgggCCOdCZlOIs1QSDB7uoWhb5zy5FmHOWGq5YE2knIktzyMz0RgjouRhI8ymnvBEaendtL3p5ufh1%2FjiNF73h3xv4%2Fpklb8fHR0nwaKxyOLYRzQ7Z8KB7o7qPQCPzQnlHT8P7qANvttD5eXmsyiQzI6kfj3yPzrp7R4e7zuQMznP0w%2FmeMWU7phQy04Meqen%2FV11qF0ojPEyvexiZwtAatg4mDLIblj%2B0XRwEqQRPhhPZ3MpjC%2FhqkR0wIImj490M0QWKK554Ku6DNAUUUFOGF0iooFS5FvBLBRIgWgombB8pixcfe1Cs9HsVEGjLLUk2skKMqqBCaXbWw21TeUaeKINQ64sb%2Bs68x24PNwdHJSGSjNl1Qyapn59yfEdw%2F2ihmJa1tabpU4U39BqwWX9u6qYj28X39qtaoGaBsoZZpngxI1yFOtdPULvzMy8g0iWU6kvR08vNehVhiwzoEi1J10yyNW6dPn39ybqdnlXEkAl0YXVZRFrToVrOqF%2F%2BhVD%2F8RLZxlOWHitkwyzJOGCxmLB5eQpg%2FAuZ6HUibu6eLcMVZU0k2jDqf%2BXLqw5z1IpKlBLp05LscytqXOrzmiUBwuzXUMkXa5t3jCqtAyChI9T2wpZKllOa2jKqTq1E7SFbRauW%2BxZNMJBg8EJnA96ZwN0arng68FYMloza4cIf2d2QChjniT2y0bQ9wBRdMyQ56Gye62lGKlMTuCJXSxj53lVql4qCvfvrFoSfreA%2FqzfP37%2B%2BfUdLKScStiFdsVMSVAOIH6jXHPkl5JtkbN6MqeBhZxTTHsdl4VTmLTUb6U%2Fb2n%2FKxW%2BeBXMz%2B8gwH7vSx9OLvpnVtnRFzBo2%2FkfVF1DqaK2oKzPABIL%2FwKH20H7)
-   [Bouncing ball](https://litecanvas.js.org?c=eJxtUj1vgzAQ3fkVNxpCAklbqRWlQ9WqZI%2FU2TImsuQCAkOLkvz3GvsKDs3gwff8Pu7OUijOaNnTlvieJ7mCumqFElUJKfSckW0ch%2Fr4Buu5rJhQQ2Jux4b206WhuehaTbp%2F9LyiK5nREKVQxIeTBxMXdT%2F3b4cs2IXZ%2B%2F4jO0Q7P9FvUBGfxAhq6OJodnVOFSe5srp%2FeTc%2FsEonF30LIFcuPlzhg8WdYFYAI8x8h%2BHAMz2K4LXS2ThURQE8P%2FJWV0UBZE62wum8gGkbzmcn9hrBZ4htR1eRghTW2%2BRGNd48PZiyM4AUmKRfteMc4mJC64xeviZelil1fzDlxMkv8wwmz3%2FrcWWWgg7GwN1a3tBv%2FAlMtiQ2%2B2aiYYWQ0g08a4YY%2FW7xAca%2FoRsbrFrDVdeUcBor2vIXzlHggw%3D%3D)
-   [Scroller](https://litecanvas.js.org?c=eJxVUE1PAjEQve%2BvGA%2BGdrdilw%2FFKAcTSDTxYKIJB8Kh7ha2SWnJdtCNhv%2FulAWUQz9m3pv3ZsYa1IVynyowniTLrSvQeAfGGQTG4ScBWOsQ1ErDGDozbQu%2F1oAe7KnwokOkhuDZ8%2BT9if4bZSma98VADMWNuBUjcSdyKfJ8kez%2BmWw3pUINrMTWCKlq%2BvL4%2BjadUBTMtz6KXh966FrtVlgRWhE0lHvjqzH0pYQUSjyTL2v1dZyhsFrVTNKIAEtfA7MawZCGvKfnAc71KZdlbSFAZGJsDTMmu3lq%2BClNB3VN0LE8bD8C1swIyP9Yhbc%2Bkmgt86X1vmaI6fCSwoMdX%2By5qBuMQ7N48VOKrVXDGgE9yTOTRiyV3ZGAKuvJLBgX1QY8rcShHdEatgKFd8Fbmsuv2N6W%2F%2Fclyo5W9guGqpXp)
-   [3D Projection](https://litecanvas.js.org?c=eJyNVU2P2jAQvfMrpodqnWI%2By6kt7WW3hVulrtTuRjk4JCyG4CDHFJYV%2F73jj5CYDUslROx579njGc844yqdMfGXFSRoteZbMVM8F8AFVySAlxZAxkW644lakGGA04IfUhjD7%2Bnt%2FQS%2BwuRu%2BmNyD9%2FKQQ9G8MmhOEbBRubL1K46hhANAOGAQh9%2FEbVTHA%2F8qbaYaaRXyLlQRaXuaB8o1D8RhV4Pwj2FZwqHyPKaaHWkAehcQ2oEf7GLwGt7pxGIqliliT6sNjDxlOlw91vHWna2m4SplCTKZsiS2sjq9gctNMxzCSRLFXAt%2FYyfLy6I3SwVT2qBpnbbigFmuSgU4jrChjVcMyX5nnS7XasKeRQYql5T5opZD5G23mbEGNCtP8Q4ElC9luVf5D6cuI5yhf%2FYzHeul1Eb3lbK6tqdaU5sPJU%2BcSVG%2BOjFOZFs56pglhWkH5gUYUSIvaLff%2F6iMAp0yDfbYkE0riQTRabTUxbBkFbFYUqoKT2j85QIdIpwCoRDGwYBvIcRrZwNfBpSECU1bmBNlwQUeAPhaIptg%2BeoR6EUMQoxdfeoag3EXREWhX39KxnaMPAM8TkjPjE%2B%2Bju6FOoNXfRNntksz%2FQlZahxF7nCZL4z2DkQO1HcIIqdKC4BRPgciN3o3XhsGQGoBX4B%2ByDcSZlLcjPFjpnxBGylpMWNuQR2VZkWZfk2Zdp46mUbBfYuhrZxnVRLq1qiyhwDh5XKVmOxXZv2YC0n5coqV3o%2Fq1zVlWB0bR1KHoWrCD5gfFZRuIwc4ei%2B1jW043ooaZXYUR9XpmorheZ42av6gWQJx2qw%2Bzr2xRdglhcngWmnojatE33El%2FVdK23y5%2BEtf86W8Xe58E6d%2B%2Bg784Ynj%2F%2FvyaU4XA%2FCq4e07onX592r6TsT7rEuw2f9d4i0%2BB%2FEGGLo)
-   [Clip](https://litecanvas.js.org?c=eJx1UNFKwzAUfe9X3LclLEg2VwZTHwR164sMHDgpfYhtugVDWtJsdsr%2B3Zu0FvcgJOk9h9t7zzlaOZkLcxQN%2BY4AnKhrZXaJcdIehV4Aj840isqDyZ2qDCijHKHgW1u4gwnnWJ2wmscRVu9VKxtEaYagrCwQLR0oZPgNfm4h5r4Yj7sR%2FQ9X9aHZk9QKUyjCGbwmD5sVZTAQq8dkudoMzIzBnGYUB5zxNupLeinTODr%2FUXqoC%2BEkKVy3SpVANvfrdfK8%2FN3tDSC1DeDUgbd%2B6MWoworP3nSuG8L95iCZBkbVubI5aRmcWFBD%2B8Zr%2Bk8KnWstzc7tL%2BKwMnel0pqEjlRlKc8YDGCCYBp3dyCnIQnMwdnqQ3bqvIW6qoNAJ1vnQ8Qzelq%2FLEZjfBnMKHr8AUfHi8s%3D)

_See other demos in [samples](samples) folder_

## Inspirations

-   [floppy](https://github.com/lpagg/floppy): a micro game engine for beginners.
-   [PICO-8](https://www.lexaloffle.com/pico-8.php): fantasy console for making, sharing and playing tiny games.
-   [js13kGames](https://js13kgames.com/): a JavaScript coding competition with size limit set to 13 kilobytes.
-   [raylib](https://www.raylib.com/): a simple and easy-to-use gamedev library.
-   [p5.js/Processing](https://p5js.org/): a library for creative coding.
