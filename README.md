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

-   [Pong](https://litecanvas.js.org?c=eJylVUtS20AQ3fsUzUoSli1jm08cDOUKBpMiQGEX4KWQRvYEWXJpBkwlwBVyguxyiJwnF8gV0j0zkmUCi1QWmO7p7tefeT2KuWSBn9z7wv5aAVjwUE470Go2XNSmjE%2BmsgPtnUblyalUorskkDxNgCdc2g5QxNwPr6ALG82GVgakbGr5muSGMYxRabdICZmQZCIPVG%2F8OCb1Q%2F901L%2FIT8bFyRhqMOgfHw1G4EHbmIf8C8szkd5LJjEdKHyeqcxaHBtRzBkLUW6qgkSQZrl%2FzCMmUG6hLNmDNNiqIyH9TKq4yI8Fq5B76oeHaSJta8jjWxFkjCWWC9ZUyrnoeF6ENlGfYKTkQT1IZ57wROHp3be92c7H68%2FR5Xm01bzmh9u3ZzX%2BbnxyGvuL%2BiKNoiai2RkTDnT31IwBeGROqL7oZXIHffB%2Bnko3dDcPfcnsUOpboviTs97B8emRAxmTd1ny3hyvmRYdk2rZ8ah3ft4%2FUIc6hNKYKDOzLk4wBwTPg4k%2FY5Des2yfJoUHUz8J8WJ4Mr%2BTwsQSripEJ8zp8PxMlmu8bcUpD5qqLwM0Q1SQU0ZGRDRQimRrWIUCyREN9WKWzZWHq80uNOqNzTJomCaWRD9ZQkbVN6n0eMupdqldA0%2F0YMiJpbWqK9%2BDq%2BOD0aBwVJppq2LQNMWrSy7vGY7nPeRbsbHVKHSi8rZWc87q%2FzXFcLy76KF8M7APLeiszlETQ8HBPBWc2FIsYbWrl2fdbMs6hLLYR20crxo16E2KvDOgSL6VuRnkcqd6II%2BPJutuYSsooYroQm3Zlrm38vRejcvXfSVKVxlMWXCriwzSOOaCFmXB5XSVU2jLWCB14a5u3i1SlSXNLXrb1O%2BV%2Bh04L6rJm1AvTpVexKK8hi6vvLhh5i%2FM0xogEzPt8w%2F7Sy%2BEH%2FNJYlsBSyTL6G2acWpQPRTawzavrZs%2FsuiE2wejMxiOehcjDGq50NTzW9Jck2uPtuCvbKoOSiZkOjepaJARj2P79VFhEu0X8CxQfm8NfatUOn6cgP6sX99%2F%2FP75DSxklyrMhbZbvOClACVBsYf4SXLNUbOQbItg1CU5daxtSN3YW%2FhmOLlLKxfyFEot5ckTbGJx5otV05Ueng87hG%2BjQMRHUNh08atZmu9%2FXR8lQkDrqPepD2eX%2FYvyBb4VU9UxqukOFP3ryIKbfwAqxT%2BA)
-   [Bouncing ball](https://litecanvas.js.org?c=eJxtUj1vgzAQ3fkVNxpCAklbqRWlQ9WqZI%2FU2TImsuQCAkOLkvz3GvsKDs3gwff8Pu7OUijOaNnTlvieJ7mCumqFElUJKfSckW0ch%2Fr4Buu5rJhQQ2Jux4b206WhuehaTbp%2F9LyiK5nREKVQxIeTBxMXdT%2F3b4cs2IXZ%2B%2F4jO0Q7P9FvUBGfxAhq6OJodnVOFSe5srp%2FeTc%2FsEonF30LIFcuPlzhg8WdYFYAI8x8h%2BHAMz2K4LXS2ThURQE8P%2FJWV0UBZE62wum8gGkbzmcn9hrBZ4htR1eRghTW2%2BRGNd48PZiyM4AUmKRfteMc4mJC64xeviZelil1fzDlxMkv8wwmz3%2FrcWWWgg7GwN1a3tBv%2FAlMtiQ2%2B2aiYYWQ0g08a4YY%2FW7xAca%2FoRsbrFrDVdeUcBor2vIXzlHggw%3D%3D)
-   [Scroller](https://litecanvas.js.org/?c=eJxVkEFLAzEQhe%2F7K8aDNJvENW0pFNSD0IKCB0Gh57ibdgNpIptZXZT%2Bdye73dYeQpJ5732TibNoSu2%2FdGR5lm1bX6INHqy3CCyH3wxgb2LUOwMPMNkYV4a9AQzgTsGrCZk6kjfPq%2Fen7PAP035WGg2wCgcUkmv98vj6tl7RLdofM8Zuj10KZ%2FwOa1JrkhaqR9%2BkE3Co8IJeNfp7fGTpjG6YohkAtqEB5gyCJYS6o%2B0eLvFUE2IIAiQnppehYKqYcpufyrTQNCSN8dh%2BRGyYlTA9u8rgQm%2FSHZtLYvHF9XKQ0XTIUr2TMFO5sDwNzVWxlFCLmRLRekaBec5reWwnB6Ds%2FydhDjT1H73WemM%3D)
-   [3D Projection](https://litecanvas.js.org?c=eJyNVU2P2jAQvfMrpodqnWI%2By6kt7WW3hVulrtTuRjk4JCyG4CDHFJYV%2F73jj5CYDUslROx579njGc844yqdMfGXFSRoteZbMVM8F8AFVySAlxZAxkW644lakGGA04IfUhjD7%2Bnt%2FQS%2BwuRu%2BmNyD9%2FKQQ9G8MmhOEbBRubL1K46hhANAOGAQh9%2FEbVTHA%2F8qbaYaaRXyLlQRaXuaB8o1D8RhV4Pwj2FZwqHyPKaaHWkAehcQ2oEf7GLwGt7pxGIqliliT6sNjDxlOlw91vHWna2m4SplCTKZsiS2sjq9gctNMxzCSRLFXAt%2FYyfLy6I3SwVT2qBpnbbigFmuSgU4jrChjVcMyX5nnS7XasKeRQYql5T5opZD5G23mbEGNCtP8Q4ElC9luVf5D6cuI5yhf%2FYzHeul1Eb3lbK6tqdaU5sPJU%2BcSVG%2BOjFOZFs56pglhWkH5gUYUSIvaLff%2F6iMAp0yDfbYkE0riQTRabTUxbBkFbFYUqoKT2j85QIdIpwCoRDGwYBvIcRrZwNfBpSECU1bmBNlwQUeAPhaIptg%2BeoR6EUMQoxdfeoag3EXREWhX39KxnaMPAM8TkjPjE%2B%2Bju6FOoNXfRNntksz%2FQlZahxF7nCZL4z2DkQO1HcIIqdKC4BRPgciN3o3XhsGQGoBX4B%2ByDcSZlLcjPFjpnxBGylpMWNuQR2VZkWZfk2Zdp46mUbBfYuhrZxnVRLq1qiyhwDh5XKVmOxXZv2YC0n5coqV3o%2Fq1zVlWB0bR1KHoWrCD5gfFZRuIwc4ei%2B1jW043ooaZXYUR9XpmorheZ42av6gWQJx2qw%2Bzr2xRdglhcngWmnojatE33El%2FVdK23y5%2BEtf86W8Xe58E6d%2B%2Bg784Ynj%2F%2FvyaU4XA%2FCq4e07onX592r6TsT7rEuw2f9d4i0%2BB%2FEGGLo)
-   [Clip](https://litecanvas.js.org?c=eJyNUMFKw0AQvecr5rhrF9nUlh7UQ6GxKYgEWlAJOaTJxg6ETchuNVX67042MdSDIOyy7z123sy8Eq3KUv2eGsY9rzjqzGKlATVaxuHLA2jhHnwpCZ0ILeYeoX3VKkMsTogUVQOsVBaQFHlLzx3MZQcmk95iKLiuj%2BbA4ibVOTIp4Hmz2oVcwCiEwWYd7kZlJmDBE04GZ%2B98MdyxzlOrWG57dyyA7ZZRtHla%2F7TrZibpxZFTT16dD4DBT0VKujfMoGbB4zLaBivO4Yqmhonb9bJb3qQfQxRZaZjs5nGLcKdgnWGTsVbASThvPny84X9k02dRKv1mD79CalRmCyxL5n7EmMQyETASn8h03t9RnLp8%2Btp%2F1Pl8SKGuareAVa3toqfzEG0FzDgt%2Fw2DoJGU)

## Inspirations

-   [floppy](https://github.com/lpagg/floppy): a micro game engine for beginners.
-   [PICO-8](https://www.lexaloffle.com/pico-8.php): fantasy console for making, sharing and playing tiny games.
-   [js13kGames](https://js13kgames.com/): a JavaScript coding competition with size limit set to 13 kilobytes.
-   [raylib](https://www.raylib.com/): a simple and easy-to-use gamedev library.
