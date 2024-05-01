# litecanvas

Lightweight HTML5 canvas engine suitable for small games and animations for people who enjoy coding: there is no fancy interface, no visual helpers, no gui tools... just coding.

:warning: **This project is still under development. All feedback is appreciated!** :warning:

You can try our [online playground](https://litecanvas.github.io) or just installing the [basic template](https://github.com/litecanvas/template):

```sh
# requires Node.js
npx tiged litecanvas/template my-game
cd my-game
npm install
npm start
```

### Features

-   **Tiny**: only `~4KB` (minified + gzipped).
-   **Simple API**: just few functions to draw shapes and some utilities to other things like sounds and math.
-   **Offline-first**: You can install the [playground](https://litecanvas.js.org/) as webapp and use anywhere at any time.
-   **Predefined colors**: just use a number (from 0 to 7) to choose a color in our 8-color palette.
-   **Predefined sounds**: packed with 8 sounds created in [ZzFX](https://killedbyapixel.github.io/ZzFX/).

## Getting Started

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

-   [Pong](https://litecanvas.js.org?c=eJylVUtS20AQ3fsUzUpSLFvCNp84GMoVDCZFMIVdYC%2BFNLInyJJLGmMqAa6QE2SXQ%2BQ8uUCukO6ZkSxTsEhlgeme6X79mdetiAvme%2FG9l5nfKgArHohZG5oN10Ztxvh0JtrQ2ncrT1alEi5jX%2FAkBh5zYVpAHgsvuIEObDdcpfRJ2VHymGRXX0xQaTVJCVgm6IosUL31oojUj72LUe8qP5kUJxOoQb93dtofgQMtfT3kX1keifRuPI3oQOLzVEZW4kSL2YKxAOWGTCjzkzS3j3jIMpSbKAv2IDS2rCgTXiqkX%2BhFGauQeeIFJ0ksTGPIo7vMTxmLDRuMmRCLrO04Id5l9Sl6Cu7X%2FWTuZE5WWDr3LWe%2B%2F2n8Jby%2BDHcbY36ydzeo8feT84vIW9VXSRg2EM1MWWZB51D2GICH%2BoTyC18Gt9AG3%2Bep9ELLReAJZgZCvRL5nw%2B6x2cXpxakTCzT%2BIM%2B3tIlWjrUuuJR9%2FKydywPlQuF0V66Zx3sYA4IjgNTb84guWfpEXUKD2ZeHODD8HixFJn2JVyZiAqY0%2BH5mW7G%2BNqSUw40ZF0aaI6oIGaMLhFRQ0mSbWEWEiRH1NSLWLqQFra6tsGtuztl0CCJDYF2ooSMqqdDqfaWQx1QuRqe6MGQE%2Bvbqsr8EG7Ojkf9wlBquqyKRlMUr665fKg5nteQT8X2rlvoROU9peacVf9rkuH4duFD%2BWXgCJrQ3uyjIoaEg0WScWJLMYTVjhqed3pa3kEginlUl5PNSwV6myDvNCiSb6NvGrlcqWrI46OOelDcFZSQSXSgti5Lv1u5e6%2F65eO%2B4aWy9GfMv1NJ%2BkkU8YwGZcXFbJNTeJcyX6jEbVW8XYQqS4pbtNvk74387VsvssmLkBunShuxSM9V6ZUHN0i9lV6tPjIxVTb%2FML%2B0IbyIT2PT8FksWEq7ac6pQLkolIWpt62dL1k0wumD0QCGo%2B7VCJ2aNjRU%2F9Y0V%2BQ6pCl4Gc3Si8IXIY8i8%2FXeIKqy83nqS7u3urxbyhW%2FRkB%2Fxu8fP%2F%2F8%2Bg4G0klmYkPLLlZ2yUFKUAwefoNsfdQoJNMgGPkqVh1zG1IbzV1cElZu0syFPIRUS3HyADuYnP5E1VSmJ5fDNuGbKBDTERR2bPxMlhr6X%2B9FgRDQOO1%2B7sHgundVfrG3fKrKRxbdhqJ%2B5VmQ8S%2B%2Fqjqk)
-   [Bouncing ball](https://litecanvas.js.org?c=eJxtUj1vgzAQ3fkVNxpCAklbqRWlQ9WqZI%2FU2TImsuQCAkOLkvz3GvsKDs3gwff8Pu7OUijOaNnTlvieJ7mCumqFElUJKfSckW0ch%2Fr4Buu5rJhQQ2Jux4b206WhuehaTbp%2F9LyiK5nREKVQxIeTBxMXdT%2F3b4cs2IXZ%2B%2F4jO0Q7P9FvUBGfxAhq6OJodnVOFSe5srp%2FeTc%2FsEonF30LIFcuPlzhg8WdYFYAI8x8h%2BHAMz2K4LXS2ThURQE8P%2FJWV0UBZE62wum8gGkbzmcn9hrBZ4htR1eRghTW2%2BRGNd48PZiyM4AUmKRfteMc4mJC64xeviZelil1fzDlxMkv8wwmz3%2FrcWWWgg7GwN1a3tBv%2FAlMtiQ2%2B2aiYYWQ0g08a4YY%2FW7xAca%2FoRsbrFrDVdeUcBor2vIXzlHggw%3D%3D)
-   [Scroller](https://litecanvas.js.org/?c=eJxVkEFLAzEQhe%2F7K8aDNJvENW0pFNSD0IKCB0Gh57ibdgNpIptZXZT%2Bdye73dYeQpJ5732TibNoSu2%2FdGR5lm1bX6INHqy3CCyH3wxgb2LUOwMPMNkYV4a9AQzgTsGrCZk6kjfPq%2Fen7PAP035WGg2wCgcUkmv98vj6tl7RLdofM8Zuj10KZ%2FwOa1JrkhaqR9%2BkE3Co8IJeNfp7fGTpjG6YohkAtqEB5gyCJYS6o%2B0eLvFUE2IIAiQnppehYKqYcpufyrTQNCSN8dh%2BRGyYlTA9u8rgQm%2FSHZtLYvHF9XKQ0XTIUr2TMFO5sDwNzVWxlFCLmRLRekaBec5reWwnB6Ds%2FydhDjT1H73WemM%3D)
-   [3D Projection](https://litecanvas.js.org?c=eJyNVU2P2jAQvfMrpodqnWI%2By6kt7WW3hVulrtTuRjk4JCyG4CDHFJYV%2F73jj5CYDUslROx579njGc844yqdMfGXFSRoteZbMVM8F8AFVySAlxZAxkW644lakGGA04IfUhjD7%2Bnt%2FQS%2BwuRu%2BmNyD9%2FKQQ9G8MmhOEbBRubL1K46hhANAOGAQh9%2FEbVTHA%2F8qbaYaaRXyLlQRaXuaB8o1D8RhV4Pwj2FZwqHyPKaaHWkAehcQ2oEf7GLwGt7pxGIqliliT6sNjDxlOlw91vHWna2m4SplCTKZsiS2sjq9gctNMxzCSRLFXAt%2FYyfLy6I3SwVT2qBpnbbigFmuSgU4jrChjVcMyX5nnS7XasKeRQYql5T5opZD5G23mbEGNCtP8Q4ElC9luVf5D6cuI5yhf%2FYzHeul1Eb3lbK6tqdaU5sPJU%2BcSVG%2BOjFOZFs56pglhWkH5gUYUSIvaLff%2F6iMAp0yDfbYkE0riQTRabTUxbBkFbFYUqoKT2j85QIdIpwCoRDGwYBvIcRrZwNfBpSECU1bmBNlwQUeAPhaIptg%2BeoR6EUMQoxdfeoag3EXREWhX39KxnaMPAM8TkjPjE%2B%2Bju6FOoNXfRNntksz%2FQlZahxF7nCZL4z2DkQO1HcIIqdKC4BRPgciN3o3XhsGQGoBX4B%2ByDcSZlLcjPFjpnxBGylpMWNuQR2VZkWZfk2Zdp46mUbBfYuhrZxnVRLq1qiyhwDh5XKVmOxXZv2YC0n5coqV3o%2Fq1zVlWB0bR1KHoWrCD5gfFZRuIwc4ei%2B1jW043ooaZXYUR9XpmorheZ42av6gWQJx2qw%2Bzr2xRdglhcngWmnojatE33El%2FVdK23y5%2BEtf86W8Xe58E6d%2B%2Bg784Ynj%2F%2FvyaU4XA%2FCq4e07onX592r6TsT7rEuw2f9d4i0%2BB%2FEGGLo)
-   [Clip](https://litecanvas.js.org?c=eJyNUMFKw0AQvecr5rhrF9nUlh7UQ6GxKYgEWlAJOaTJxg6ETchuNVX67042MdSDIOyy7z123sy8Eq3KUv2eGsY9rzjqzGKlATVaxuHLA2jhHnwpCZ0ILeYeoX3VKkMsTogUVQOsVBaQFHlLzx3MZQcmk95iKLiuj%2BbA4ibVOTIp4Hmz2oVcwCiEwWYd7kZlJmDBE04GZ%2B98MdyxzlOrWG57dyyA7ZZRtHla%2F7TrZibpxZFTT16dD4DBT0VKujfMoGbB4zLaBivO4Yqmhonb9bJb3qQfQxRZaZjs5nGLcKdgnWGTsVbASThvPny84X9k02dRKv1mD79CalRmCyxL5n7EmMQyETASn8h03t9RnLp8%2Btp%2F1Pl8SKGuareAVa3toqfzEG0FzDgt%2Fw2DoJGU)

## Inspirations

-   [floppy](https://github.com/lpagg/floppy): a micro game engine for beginners.
-   [PICO-8](https://www.lexaloffle.com/pico-8.php): fantasy console for making, sharing and playing tiny games.
-   [js13kGames](https://js13kgames.com/): a JavaScript coding competition with size limit set to 13 kilobytes.
-   [raylib](https://www.raylib.com/): a simple and easy-to-use gamedev library.
