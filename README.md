# litecanvas

Lightweight HTML5 canvas engine suitable for small games and animations for people who enjoy coding: there is no fancy interface, no visual helpers, no gui tools... just coding.

You can try our [online playground](https://litecanvas.github.io) or just installing the [basic template](https://github.com/litecanvas/template):

```
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

-   [Pong](https://litecanvas.js.org?c=eJx1VU122zYQ3usU001JRrRE68fpUyO7fqlqeZHUL9aroyUMgiKeIZCPgKK4iXOFniC7HqLn6QV6hQ5%2BCFGNu7A8gxl8883gAyi4ZpTID0TFn3oAe57rcgbjUZaiVzK%2BKfUMJj9YdzgEIjUnghM1g4IIxdLeU9Lr0UoqDUUl9YpsYA55RXdbJvWANoxothDMeHEkuHyIkp5PHJQNKzA7KrWu1Ww4NOtqsKmqjWCk5mpAq%2B2QKjW6KMiWi8f5LRcPCjGZnO2R2E%2BTLPvxZZZ9n3NVC%2FI4V3tSRwG%2BYcKgK%2F0omCoZ01EvELuv8scBqWsm89clF3nsN2EzxU5SzSsJXHIdJ2DGUpP8DrFOR5lzlsaZOvu9sTMfWKMzGRsnZ0qbkMlA954IYdzXi7erxbt2ZR1W1nACy8X11XIFQ5j48C3%2FnbWVjH8pcTK4YPF5Yys7c%2B1NVTOWoz2yhBStmjZf8IIptMdoa%2FZRe2zs6KnT867O8cDiXLu%2BeQGx3zhHmAQapneNNErYkC2D6gNrLnpOGiWRObLjst5p5feuLm9urt9eObDDTL58MZH32LId7BBGCcafPNAWUUGXzAQR0UPZSX%2BHLCxIi%2BjnjwLQRFJms9I25RyywSlcgGBN3Y2kuJ5NE5g5t1M6r2SkMV936qNLPCGnvS6hV2YonoSZMsM7cYj2XX%2FncHf982oZEq3nm%2B95NKeG%2FuHYz70c2k5bAZ2eZcE3p%2F7Sue3xuv8nVgwogOJj9%2FxwFmPs%2Bmja7sQtHNSV4kYGQa%2F9udPZCy%2BsF5DrIF0XXB8HHeh9hYLyoKiqo7l55G6nbiCfP%2Fuqr0IsCMeSmMPJoa2pa6I7vWf3tTfjaJdjSUtGHxxJWgnBlbkBe67LY%2BVhrGFUO%2BKpaz4NpbqW05h5Buzvnf1dJv9h0zZhL2ffPB6BXubodW9k3pC9f4UoKrExOUc389xI0BUwNAsuRPw8kRTGic2jvKE27%2F9aOnN55p2I8VMA5i%2F6%2B%2Buf%2F%2Fz1B0R4drZyCpM0PCUYP7zOUWe7tSBoHl%2FK1C%2BNghVHBtQOJBkg01tNGh2f4T1N2pRxa4SC3u%2BWtUud2m3RKdL3j%2BuJ6%2BWXm9uZqRmjYYSHhWCa4gP%2FbR9P7lJ%2FCrD4%2FdvIOKL4HWFNhBu23Kil27R%2F5dPO4z5C%2BOjq8s0Cfv1t8Q63jVO39vzYvkHou2w7pBmEeTmc7BnaqKJ%2FAQBGNyg%3D)
-   [Shockwaves](https://litecanvas.js.org?c=eJyNU01r3DAQvftXTG9y6zjeNIGw1IFClmyg0EICOYQeFEnuqjWSkeRkTfB%2F7%2BjDH3QvPRh5Zt7MezMatdIJRtUrtSTPslY40C%2B%2FBXMWanj%2BGRxM98oJg44qy5peMSe1gr7j1AnCXQ7vGYBsgOy%2Bff3xsLuFsznlBqry4ioiAJgRmPJw0OzPG30VSBi8c%2FmUj94Rv0YbIEwrGySBbiZlUzk0y0VFyBpXArmhbyRiWSuoIZsNdvgfdbveHpI2TxHrxIjuyCnRSVuRc2ao4XsgKKm18pci72MBdkL7cp6l05YYqrgkVQFP97eP%2B7yA2bHf3d%2FtH%2FMJbDshONaN8esKERdVVaWw76UMTaCRe6lRy8yJmV7hcQtVgeeQTkO57G0yXrThwjxJ7g5b%2BBxcTLfabOHS%2FwcFW9ggqze9%2BmMBwzRCd5C2PCLPcTEHNAc%2FPJ%2Fwz%2FbE%2FQmwFTF8wZWbAKhPuN6oWIwL64we0r2MC0tsAj7V0YyT%2BgjcLZA1w1mdaCPwHK7zCR10rpYIoJUKaYdWnChNmywNiyGcRey5WKtKRphjPjNMnSxbnZ7fdJWNbPF9EKJzqG9Aw4c6NpdKjNlfEDIdWA%3D%3D)
-   [Simple movement](https://litecanvas.js.org?c=eJxVUL1uwyAY3HmKG3HqRk7UdEBypwztXikzAlwjIYjw58ZW5XcvwUkUtvvhjgNnySjpf%2BXA%2FxhwsZp6gf3hvU5MjhQGJZ0R6KQbTM2WijEV%2FEA4OzmbiBbX2CTQXAOzwK7JSCdpd8hQBReiQG6892ejN%2FanJ4G3hi2MdaNXZIOH9ZbAq1xcGONZSzLgmlZznbCd8NLesZ6wgaZk2g78ceADp6%2Fj9%2Bcaewq2eL3hPCyZS3GjjvJyW6KckZFXCUWjqLPO8aKrfmZzwXJ3oawvL6T8S0mo2PIPhyl18w%3D%3D)
-   [Paint Pixel Art](https://litecanvas.js.org?c=eJx1UMFOwzAMvfcr3gXRSpWWgRBVJb4EcTCpt0a0SZS4bNO0f8drB5QDjg9%2Bfu85sgcnbMl%2FUi7PBXBwnfQtHh9qBT27fS%2FfKLojD5QUS5r42tlsQJOEbGngFjsasrYvVVEoMdIHg9Acm8UIdRY2%2BCwYT1rjBZGcl7Kpofm6jGOyPWxPCS6re3auGD%2BN73zjbBhCwi6FEQYS8LzoxMUWU2bwGOU0zyIraipzJMvVVbo15k6XIK%2BtxF7UeQ8YDS3qGZknDXNDCsz1%2FaCZ%2FOXMP9zfKasf3vRGu8lbccFjih0JlxXOywZdgA%2FSO78vLitZl%2BhwE9mBKZXbSks30p5LU0Nzvmulpi8dfX6%2B)
-   [Paint Image](https://litecanvas.js.org?c=eJxVjzFPwzAQhXf%2FihsdYWjaQltVahfUlQExwHhynOSEY0fxhQqh%2FHdsp6B2OOue%2Ffm9O0tsNLovDPJHAJyp4nYP61WpomoNNS3%2FSxzZB43W7KFGG4yYCiEWC%2Bjw0wACddgYob0LDN13VnCAHsmx3DwqSCULOBwhJWkadE3WyvVKwV9ti%2BuXp818G%2F%2FtihxWj04zeQfkiKNXMkLX2BRUiukKGPsK2dwgd5F5KJc3WDXg%2BQJpa3CQZZqgH0MrU8MDulD7oZPPp5e30%2Bu7grn5ULBUs2%2Fi8rLyPg2bj8v62cv30WoSvzb6Zd8%3D)

## Inspirations

-   [floopy](https://github.com/lpagg/floppy): a micro game engine for beginners.
-   [PICO-8](https://www.lexaloffle.com/pico-8.php): fantasy console for making, sharing and playing tiny games.
-   [js13kGames](https://js13kgames.com/): a JavaScript coding competition with size limit set to 13 kilobytes.
-   [raylib](https://www.raylib.com/): a simple and easy-to-use gamedev library.
