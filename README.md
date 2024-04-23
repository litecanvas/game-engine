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

-   **Tiny**: only `4KB` gzipped.
-   **Simple API**: just few functions to draw shapes and some utilities to other things like sounds and math.
-   **Offline-first**: You can install the [playground](https://litecanvas.js.org/) as webapp and use anywhere at any time.
-   **Predefined colors**: just use a number (from 0 to 7) to choose a color in our 8-color palette.
-   **Predefined sounds**: packed with 8 sounds created in [ZzFX](https://killedbyapixel.github.io/ZzFX/).

## Getting Started

```js
import litecanvas from '@litecanvas/litecanvas'

litecanvas({
    // you can setup other configurations here
    // learn more in the cheatsheet
    loop: { init, update, draw },
})

function init() {
    // run once before the game starts
    bg = 0
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
    clear(bg) // clear the screen
    circfill(posx, posy, 50, color) // draw a circle
}
```

## Docs

Check out our [Cheatsheet](https://github.com/litecanvas/game-engine/wiki/Cheatsheet).

## Basic Demos

Try some demos in our playground:

-   [Pong](https://litecanvas.js.org?c=eJylVUtS20AQ3fsUzUpSLFvCNp84GMoVDCZFMIVdYC%2BFNLInyJJLGmMqAa6QE2SXQ%2BQ8uUCukO6ZkSxTsEhlgeme6X79mdetiAvme%2FG9l5nfKgArHohZG5oN10Ztxvh0JtrQ2ncrT1alEi5jX%2FAkBh5zYVpAHgsvuIEObDdcpfRJ2VHymGRXX0xQaTVJCVgm6IosUL31oojUj72LUe8qP5kUJxOoQb93dtofgQMtfT3kX1keifRuPI3oQOLzVEZW4kSL2YKxAOWGTCjzkzS3j3jIMpSbKAv2IDS2rCgTXiqkX%2BhFGauQeeIFJ0ksTGPIo7vMTxmLDRuMmRCLrO04Id5l9Sl6Cu7X%2FWTuZE5WWDr3LWe%2B%2F2n8Jby%2BDHcbY36ydzeo8feT84vIW9VXSRg2EM1MWWZB51D2GICH%2BoTyC18Gt9AG3%2Bep9ELLReAJZgZCvRL5nw%2B6x2cXpxakTCzT%2BIM%2B3tIlWjrUuuJR9%2FKydywPlQuF0V66Zx3sYA4IjgNTb84guWfpEXUKD2ZeHODD8HixFJn2JVyZiAqY0%2BH5mW7G%2BNqSUw40ZF0aaI6oIGaMLhFRQ0mSbWEWEiRH1NSLWLqQFra6tsGtuztl0CCJDYF2ooSMqqdDqfaWQx1QuRqe6MGQE%2Bvbqsr8EG7Ojkf9wlBquqyKRlMUr665fKg5nteQT8X2rlvoROU9peacVf9rkuH4duFD%2BWXgCJrQ3uyjIoaEg0WScWJLMYTVjhqed3pa3kEginlUl5PNSwV6myDvNCiSb6NvGrlcqWrI46OOelDcFZSQSXSgti5Lv1u5e6%2F65eO%2B4aWy9GfMv1NJ%2BkkU8YwGZcXFbJNTeJcyX6jEbVW8XYQqS4pbtNvk74387VsvssmLkBunShuxSM9V6ZUHN0i9lV6tPjIxVTb%2FML%2B0IbyIT2PT8FksWEq7ac6pQLkolIWpt62dL1k0wumD0QCGo%2B7VCJ2aNjRU%2F9Y0V%2BQ6pCl4Gc3Si8IXIY8i8%2FXeIKqy83nqS7u3urxbyhW%2FRkB%2Fxu8fP%2F%2F8%2Bg4G0klmYkPLLlZ2yUFKUAwefoNsfdQoJNMgGPkqVh1zG1IbzV1cElZu0syFPIRUS3HyADuYnP5E1VSmJ5fDNuGbKBDTERR2bPxMlhr6X%2B9FgRDQOO1%2B7sHgundVfrG3fKrKRxbdhqJ%2B5VmQ8S%2B%2Fqjqk)
-   [Shockwaves](https://litecanvas.js.org?c=eJyNU01r3DAQvftXTG9y6zjeNIGw1IFClmyg0EICOYQeFEnuqjWSkeRkTfB%2F7%2BjDH3QvPRh5Zt7MezMatdIJRtUrtSTPslY40C%2B%2FBXMWanj%2BGRxM98oJg44qy5peMSe1gr7j1AnCXQ7vGYBsgOy%2Bff3xsLuFsznlBqry4ioiAJgRmPJw0OzPG30VSBi8c%2FmUj94Rv0YbIEwrGySBbiZlUzk0y0VFyBpXArmhbyRiWSuoIZsNdvgfdbveHpI2TxHrxIjuyCnRSVuRc2ao4XsgKKm18pci72MBdkL7cp6l05YYqrgkVQFP97eP%2B7yA2bHf3d%2FtH%2FMJbDshONaN8esKERdVVaWw76UMTaCRe6lRy8yJmV7hcQtVgeeQTkO57G0yXrThwjxJ7g5b%2BBxcTLfabOHS%2FwcFW9ggqze9%2BmMBwzRCd5C2PCLPcTEHNAc%2FPJ%2Fwz%2FbE%2FQmwFTF8wZWbAKhPuN6oWIwL64we0r2MC0tsAj7V0YyT%2BgjcLZA1w1mdaCPwHK7zCR10rpYIoJUKaYdWnChNmywNiyGcRey5WKtKRphjPjNMnSxbnZ7fdJWNbPF9EKJzqG9Aw4c6NpdKjNlfEDIdWA%3D%3D)
-   [Scroller](https://litecanvas.js.org/?c=eJxVkEFLAzEQhe%2F7K8aDNJvENW0pFNSD0IKCB0Gh57ibdgNpIptZXZT%2Bdye73dYeQpJ5732TibNoSu2%2FdGR5lm1bX6INHqy3CCyH3wxgb2LUOwMPMNkYV4a9AQzgTsGrCZk6kjfPq%2Fen7PAP035WGg2wCgcUkmv98vj6tl7RLdofM8Zuj10KZ%2FwOa1JrkhaqR9%2BkE3Co8IJeNfp7fGTpjG6YohkAtqEB5gyCJYS6o%2B0eLvFUE2IIAiQnppehYKqYcpufyrTQNCSN8dh%2BRGyYlTA9u8rgQm%2FSHZtLYvHF9XKQ0XTIUr2TMFO5sDwNzVWxlFCLmRLRekaBec5reWwnB6Ds%2FydhDjT1H73WemM%3D)
-   [Paint Pixel Art](https://litecanvas.js.org?c=eJx1UMFOwzAMvfcr3gXRSpWWgRBVJb4EcTCpt0a0SZS4bNO0f8drB5QDjg9%2Bfu85sgcnbMl%2FUi7PBXBwnfQtHh9qBT27fS%2FfKLojD5QUS5r42tlsQJOEbGngFjsasrYvVVEoMdIHg9Acm8UIdRY2%2BCwYT1rjBZGcl7Kpofm6jGOyPWxPCS6re3auGD%2BN73zjbBhCwi6FEQYS8LzoxMUWU2bwGOU0zyIraipzJMvVVbo15k6XIK%2BtxF7UeQ8YDS3qGZknDXNDCsz1%2FaCZ%2FOXMP9zfKasf3vRGu8lbccFjih0JlxXOywZdgA%2FSO78vLitZl%2BhwE9mBKZXbSks30p5LU0Nzvmulpi8dfX6%2B)
-   [Paint Image](https://litecanvas.js.org?c=eJxVUMFOwzAMvecrfExFYWWDgSZtl2lXDogDHK00bS3SpEpcJoT679TZQNvBkV%2Fe83tOHLE16L8w6R8FcKSauw2sllU5o85S2%2FE%2FxJFDMujsBhp0yaqpUGqxgB4%2FLSBQj61VJvjE0H9nBFsYkDzr9UMJUrqA7Q4kyVA0DTmnV8sS%2FuqpuGQe16fbee65yGHN6A1T8ECeePYSI%2FStk6BKTReCcaiR7ZXkZtbcVfdXsjri8SwyzmLUlWwwjKnT0nBEn5wY7Q8vb4fX9xJOzYewMbBQ2V1wfrK%2BlZXzcf6E7BiG2XBSv8BcaDI%3D)
-   [3D Projection](https://litecanvas.js.org?c=eJyNVU1T2zAQvedXbA8d5EaEJM2pbdoLtHDrTJlpweODnAhQYmRGVsrX5L93V5JjK9jQmUws7763etoPuVBWLoT%2BKyqWDAZXG72wqtSgtLIsgecBQKWeJMzh99nx%2BSl8hdOTsx%2Bn5%2FCtXhzBDD4FL66RcGfKlfRh5pCiASCdcBjjL%2BP%2BFdeT%2BJUs7jWjCKXStmrYh6SBQ%2FuRcTg6gvSBwyOHp8zjumBtT4fj8C1PCxAH63W8tB92OrImV3JJhyWD0NcFpXuM60JpWdnHQrJZMti2qrO5Wwor2dL6CnnOEEmj8WSAhqvSACukBUWRPuPjS8jpqJD62t6gaTj0ZIBFqSuLfkq4Q01vhTXqgY1GI89KVZY4KMU0pRVeMMJuNwVzBpT1hzkhCadYHt%2BLvdhhA%2BQN%2FGU3Pkivkzg9bphNF%2B5xdmg8FZ24IaN7G%2BV5acR9mIJFUbFx4iqGGWG%2BY7%2F%2F%2FMUBa0PmTXXDyG%2BN0FVB5alnYsqbWZkmPeWZ7ZdEoyimODAFQ5gk8B5mvBGbxDCEoJe1sIk39RE4qA7A1s3eHYu7rSYJDjkPfeSFUoOy0CIiS8f0qxFkmESGfB%2BR7xAf4x1DCWnDkH1XZ7EoC2pSgZzQyI3PlPfOt%2B%2FIAynvIOWBlNcO9KgrYH6jd%2FO5RyRgb%2FAJWt7DiTGlYQdneGMWagl%2BUmR14JrARzWyqqe5q9JOaVRtJPheTP09tmOtPGuFLHcMXDYsP43V5jbcFhFz7Zlr2s8z120mON6QUqmydJ3BB8zPOktXWQBsw9NLQzvGQ8qg9m3puEbajdGEiarX3AdGLBVOg983oHs%2FCIuy2hHc7apbr21g7Ilp43Czdum5eE3PXph4l57P1r7GWMwrSi7%2FX0lfHt5OwovvaltJdM%2BHj2gsJn3AuUwf6e8pI%2FI%2Fa6ti%2Bw%3D%3D)
-   [Clip](https://litecanvas.js.org?c=eJyNUMFKw0AQvecr5rhrF9nUlh7UQ6GxKYgEWlAJOaTJxg6ETchuNVX67042MdSDIOyy7z123sy8Eq3KUv2eGsY9rzjqzGKlATVaxuHLA2jhHnwpCZ0ILeYeoX3VKkMsTogUVQOsVBaQFHlLzx3MZQcmk95iKLiuj%2BbA4ibVOTIp4Hmz2oVcwCiEwWYd7kZlJmDBE04GZ%2B98MdyxzlOrWG57dyyA7ZZRtHla%2F7TrZibpxZFTT16dD4DBT0VKujfMoGbB4zLaBivO4Yqmhonb9bJb3qQfQxRZaZjs5nGLcKdgnWGTsVbASThvPny84X9k02dRKv1mD79CalRmCyxL5n7EmMQyETASn8h03t9RnLp8%2Btp%2F1Pl8SKGuareAVa3toqfzEG0FzDgt%2Fw2DoJGU)

## Inspirations

-   [floppy](https://github.com/lpagg/floppy): a micro game engine for beginners.
-   [PICO-8](https://www.lexaloffle.com/pico-8.php): fantasy console for making, sharing and playing tiny games.
-   [js13kGames](https://js13kgames.com/): a JavaScript coding competition with size limit set to 13 kilobytes.
-   [raylib](https://www.raylib.com/): a simple and easy-to-use gamedev library.
