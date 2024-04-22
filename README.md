# litecanvas

Lightweight HTML5 canvas engine suitable for small games and animations for people who enjoy coding: there is no fancy interface, no visual helpers, no gui tools... just coding.

:warning: **This project is still under development. All feedback is appreciated!** :warning:

You can try our [online playground](https://litecanvas.github.io) or just installing the [basic template](https://github.com/litecanvas/template):

```
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
-   [Paint Image](https://litecanvas.js.org?c=eJxVjzFPwzAQhXf%2FihsdYWjaQltVahfUlQExwHhynOSEY0fxhQqh%2FHdsp6B2OOue%2Ffm9O0tsNLovDPJHAJyp4nYP61WpomoNNS3%2FSxzZB43W7KFGG4yYCiEWC%2Bjw0wACddgYob0LDN13VnCAHsmx3DwqSCULOBwhJWkadE3WyvVKwV9ti%2BuXp818G%2F%2FtihxWj04zeQfkiKNXMkLX2BRUiukKGPsK2dwgd5F5KJc3WDXg%2BQJpa3CQZZqgH0MrU8MDulD7oZPPp5e30%2Bu7grn5ULBUs2%2Fi8rLyPg2bj8v62cv30WoSvzb6Zd8%3D)
-   [3D Projection](https://litecanvas.js.org?c=eJyNVUtz2jAQvvMrtodO5KLwKqe2tJekhVtnmpk28fggg5IIjMzIohAy%2FPeuHsYWsZPOMFje%2Fb7Vp33ImdB8zuRfVpCo07nfyrkWuQQhhSYRPHcACnHgMIHfs6ubKXyF6fXsx%2FQGvpWLPozhk%2FfiGgkblS%2B5CzOBGA0A8ZDCAH8Jda%2B4HoavxmJfExMhF1IXFfvSaKBQfyQU%2Bn2I9xSeKBwSh2uC1T0Njsu3PDVAGKzV8dJ%2B2ehIqlzxhTmsMTD5kJl0D3CdCckL%2FZRxMo46x1p1tpsF05wstKuQ43SR1BsMO2i4zxWQjGsQJtJnfHzxOe1lXD7oRzR1u44MMM9lodFvEm5RozXTSuxJr9dzrFgkkYWamCrXzAlG2HqbEWtAWX%2BIFRJRE8vhW7G3J6yHvIG%2Fa8Z76WUSR1cVs%2BrCM84JjacyJ67I6D4GeV4otvNTMM8KMohsxTAjxHXs95%2B%2FKGBtjHlbPBLj14rJAguwJuVMjGg1K6OopTzj85JIFEUEBSKgC8MI3sOYVmKjEIYQ9JIaNnKmNgIF0QA42tnbkLDbShKjkFLfR06oaVDiW4Ql8cD8SoQxDANDeo5IT4iP4Y6%2BhGZDn31bZzbPM9OkDDm%2BkSufynfWd%2B5IPSltIKWelJYO9Ih7IG6jd5OJQ0SgH%2FEJku%2FgWqlckYsZ3piZWICbFF5c2CZwURUvymluqrRVGlQbCa4XY3ePnVhLx1oiyx4DlxXLTWOxXfvbImCuHHNl9nPMVZ0Jltc1qRRJvErgA%2BZnlcTLxAOO%2FumkoR3jIaVT%2Bo7muIrrrZIGE1Svug8UWwicBrevR7d%2BEOZ5cSLY21XWXuvA0BPSBv5mbdJz%2B5qeszDhLi2frXONoZhXlNz9v5K2PLydhBff1bqS4J73H9FQTLzHuYyfzN8hMeR%2FryFjCQ%3D%3D)

## Inspirations

-   [floppy](https://github.com/lpagg/floppy): a micro game engine for beginners.
-   [PICO-8](https://www.lexaloffle.com/pico-8.php): fantasy console for making, sharing and playing tiny games.
-   [js13kGames](https://js13kgames.com/): a JavaScript coding competition with size limit set to 13 kilobytes.
-   [raylib](https://www.raylib.com/): a simple and easy-to-use gamedev library.
