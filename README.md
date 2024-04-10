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

-   [Pong](https://litecanvas.js.org?c=eJx1VV1y0zAQfs8plhdsEzcxSVqYQFo6EJo%2BAB2aoeRRteVYU0X2WAqh0PYKnIA3DsF5uABXYPVjxYHykGRXu%2Fr279OGM0VTIj4RGX7tAGxYpooxDAdJjFpB2bJQYxg9NWq%2FD0QoRjgjcgw54ZLGnduo00lLIRXkpVBzsoQJZGW6XlGhemlNiaJTTrUWBpyJqyDqOMdeUdMcvYNCqUqO%2B319LnvLslxySiome2m56qdSDo5ysmL8enLO%2BJVETCrGG0zsxShJnj1JkocZkxUn1xO5IVXg4WvKNbpU15zKglIVdHxil2V23SNVRUX2smA8C90lLCZfi1SxUgATTIUR6LZUJLtArMeDxCozrexb%2BaOWE2dYoDIaaiWjUmmT9kD1knCu1ZfTt%2FPp%2B%2BZk4U8WsAez6enJbA59GDnzOftCm0haPxbYGTww%2BKw2ka24cKKsKM1QHpiEZFrWjT9nOZUoD1FW9LNy2FjRbavmdZXhwMJM2bpZDqG7OEGYCGqq1rXQTFiSFYXyE62POpYaBREZZsdEtVbS3Z0fn52dvj2xYNue3N1py0cs2TS2D4MI7bcOaIWooAqqjYjooEynH2AWBqRBdP3ntK6MR2zNMSS9ZL8NmpUiUOinWsioEhfKsqod6rku18Hr%2FlFk%2B9batZkfwsXpq%2FnMOxrNldVxaHbO3e1AD92gmxoaajw%2BSLyu5%2FnEqs3g7O%2BeGTOONv%2FcngwcwRDGu320szRwUJWS6QF7JnYnlkGPHGUeQaY8Ka1xsWu0oJclUsWBIl92%2BuaQ25XahtzcuKjPvc1TwiQxgb1tWW5u7e7de6%2Fh%2FM4tm2Va0PTKJpmWnDOpub1hqtjlFNpqmiqbeGyLj32otmS5pR%2B4%2Bb4w37Por2yaIsyz6%2Bq14NNLbHrtt5bVZOP2S4pMrLXPzps71BS0AXSaOeM8vD%2BRGIaR8UtZnRq%2F%2F5V0YP30BghxyYP%2BBL%2B%2B%2F%2Fj98xsEODsTOYZR7JcE2rd7N2hdNxJ4zuMOjN3RwEthoEFNQ6IeZnquSK3CA3yfUeMybAQf0OntsOaoFbsJuo%2Fpu7W5Z2t5fXY%2B1jFDFDTxMBDsx7i6%2F63j1j7qrx4W%2F9mWIgxS%2FIegdYAXVkyzpV20299xa20PED44OX4zhXcfpu%2Fx2jC2Z%2Fe37R%2BErvU2TRqD75fFSe5JG1n0B8wDK50%3D)
-   [Shockwaves](https://litecanvas.js.org?c=eJyNU01r3DAQvftXTG9y6zjeNIGw1IFClmyg0EICOYQeFEnuqjWSkeRkTfB%2F7%2BjDH3QvPRh5Zt7MezMatdIJRtUrtSTPslY40C%2B%2FBXMWanj%2BGRxM98oJg44qy5peMSe1gr7j1AnCXQ7vGYBsgOy%2Bff3xsLuFsznlBqry4ioiAJgRmPJw0OzPG30VSBi8c%2FmUj94Rv0YbIEwrGySBbiZlUzk0y0VFyBpXArmhbyRiWSuoIZsNdvgfdbveHpI2TxHrxIjuyCnRSVuRc2ao4XsgKKm18pci72MBdkL7cp6l05YYqrgkVQFP97eP%2B7yA2bHf3d%2FtH%2FMJbDshONaN8esKERdVVaWw76UMTaCRe6lRy8yJmV7hcQtVgeeQTkO57G0yXrThwjxJ7g5b%2BBxcTLfabOHS%2FwcFW9ggqze9%2BmMBwzRCd5C2PCLPcTEHNAc%2FPJ%2Fwz%2FbE%2FQmwFTF8wZWbAKhPuN6oWIwL64we0r2MC0tsAj7V0YyT%2BgjcLZA1w1mdaCPwHK7zCR10rpYIoJUKaYdWnChNmywNiyGcRey5WKtKRphjPjNMnSxbnZ7fdJWNbPF9EKJzqG9Aw4c6NpdKjNlfEDIdWA%3D%3D)
-   [Simple movement](https://litecanvas.js.org?c=eJxVUL1uwyAY3HmKG3HqRk7UdEBypwztXikzAlwjIYjw58ZW5XcvwUkUtvvhjgNnySjpf%2BXA%2FxhwsZp6gf3hvU5MjhQGJZ0R6KQbTM2WijEV%2FEA4OzmbiBbX2CTQXAOzwK7JSCdpd8hQBReiQG6892ejN%2FanJ4G3hi2MdaNXZIOH9ZbAq1xcGONZSzLgmlZznbCd8NLesZ6wgaZk2g78ceADp6%2Fj9%2Bcaewq2eL3hPCyZS3GjjvJyW6KckZFXCUWjqLPO8aKrfmZzwXJ3oawvL6T8S0mo2PIPhyl18w%3D%3D)
-   [Paint Pixel Art](https://litecanvas.js.org?c=eJx1UMFOwzAMvfcr3gXRSpWWgRBVJb4EcTCpt0a0SZS4bNO0f8drB5QDjg9%2Bfu85sgcnbMl%2FUi7PBXBwnfQtHh9qBT27fS%2FfKLojD5QUS5r42tlsQJOEbGngFjsasrYvVVEoMdIHg9Acm8UIdRY2%2BCwYT1rjBZGcl7Kpofm6jGOyPWxPCS6re3auGD%2BN73zjbBhCwi6FEQYS8LzoxMUWU2bwGOU0zyIraipzJMvVVbo15k6XIK%2BtxF7UeQ8YDS3qGZknDXNDCsz1%2FaCZ%2FOXMP9zfKasf3vRGu8lbccFjih0JlxXOywZdgA%2FSO78vLitZl%2BhwE9mBKZXbSks30p5LU0Nzvmulpi8dfX6%2B)
-   [Paint Image](https://litecanvas.js.org?c=eJxVjzFPwzAQhXf%2FihsdYWjaQltVahfUlQExwHhynOSEY0fxhQqh%2FHdsp6B2OOue%2Ffm9O0tsNLovDPJHAJyp4nYP61WpomoNNS3%2FSxzZB43W7KFGG4yYCiEWC%2Bjw0wACddgYob0LDN13VnCAHsmx3DwqSCULOBwhJWkadE3WyvVKwV9ti%2BuXp818G%2F%2FtihxWj04zeQfkiKNXMkLX2BRUiukKGPsK2dwgd5F5KJc3WDXg%2BQJpa3CQZZqgH0MrU8MDulD7oZPPp5e30%2Bu7grn5ULBUs2%2Fi8rLyPg2bj8v62cv30WoSvzb6Zd8%3D)

## Inspirations

-   [floppy](https://github.com/lpagg/floppy): a micro game engine for beginners.
-   [PICO-8](https://www.lexaloffle.com/pico-8.php): fantasy console for making, sharing and playing tiny games.
-   [js13kGames](https://js13kgames.com/): a JavaScript coding competition with size limit set to 13 kilobytes.
-   [raylib](https://www.raylib.com/): a simple and easy-to-use gamedev library.
