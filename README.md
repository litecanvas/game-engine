# litecanvas

Lightweight HTML5 canvas engine suitable for small games and animations for people who enjoy coding: there is no fancy interface, no visual helpers, no gui tools... just coding.

You can try our [online playground](https://litecanvas.github.io) or just installing the [basic template](https://github.com/litecanvas/template):

```
npx degit litecanvas/template my-game
cd my-game
npm install
npm start
```

### Features

-   **Tiny**: only `4KB` gzipped.
-   **Simple API**: just few functions to draw shapes and some utilities to other things like sounds and math.
-   **Offline-first**: You can install the [playground] as webapp and use anywhere at any time.
-   **Predefined color palette**: just use a number (from 0 to 15) to choose a color.
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

-   [Pong](https://litecanvas.js.org?c=eJx9VFFT2zAMfu%2Bv0J6a0LCGhG67HoXjto7yMMZBb9BHk7iNb8HpJS5wG%2BW3T7Kc4O7YHppK1udPnyzZpTIyE%2FpBNMHvHsCjyk0xhjSJI%2FQKqVaFGcPhJ%2BsKbZQolWjGsBRlI6PeNuz1lhudGVVpUFqZIASiWYv8BiZwkMTszMgZsX1LduwCC3QOU3Jy2RgKEQLdO1GW5H6eXsynV%2B3KoltZwD7MpudnszkM4dCFr9Uv2WYi%2F1SvSlqw%2FKq2mdlcOLNZS5mjnVhBTVbVLb5US9mgnaJt5JNx3GnS23o1b9a5MDLIDdetlhC4jROkCaGWZlNrGA5hJe4lVA%2ByPukhEBcKoXNUp%2FR6Yxq3d356eXl%2BccZkr2fy8kKRWyzZHuwQkhDjW0d0j6xgCklBZHRU9qTfoQpL0jK68y9lvbaIiMMRxO%2FjkU%2BaV7pvEGc8ZnSFS9VktZTaT3VE5Tr62A8MWPQx3Jx%2Fmc86jPVcRQ7OHR68tvLYtbhV3w7FwYe486mTH9ltW8b%2F%2B7bB2NTlk98TOIEUxrsnyF20dLCuGkWt7WZwMOHZ2XPDsge56caRg4vdIJPeVTgkjhQnZefEHLNfKZ%2FH87PLetTFumGwIiaw%2F1qW65h%2Fem%2Fua6d9ZxerzAqZ%2FWSRWVWWqqGpflSm2J2mLsbSIy4%2F6pL5Fs8VXW77vbHfWfiXnrYMe%2BUG9CR0AmMW6N%2BzvBaP7m3JcAprwuzct2MaP05Qy8wsVVkGbwuJMFVogZmqMwv8V00HKQPp%2FgejOAL6WcURpFH3LHigpEVZVWi%2BiRrZQP%2Fr5fW4j1MQoEGdj0O7zvK2IPGJdSXRLnx5VzroZ1IbWfdx%2B72iBvU9XvdYRt4bmVCis9NvU%2Fj%2BY3qF29L%2F4QeMtyWOgbS11bYt%2BQNXRrNe)
-   [Shockwaves](https://litecanvas.js.org?c=eJyNU01r3DAQvftXTG9y6zjeNIGw1IFClmyg0EICOYQeFEnuqjWSkeRkTfB%2F7%2BjDH3QvPRh5Zt7MezMatdIJRtUrtSTPslY40C%2B%2FBXMWanj%2BGRxM98oJg44qy5peMSe1gr7j1AnCXQ7vGYBsgOy%2Bff3xsLuFsznlBqry4ioiAJgRmPJw0OzPG30VSBi8c%2FmUj94Rv0YbIEwrGySBbiZlUzk0y0VFyBpXArmhbyRiWSuoIZsNdvgfdbveHpI2TxHrxIjuyCnRSVuRc2ao4XsgKKm18pci72MBdkL7cp6l05YYqrgkVQFP97eP%2B7yA2bHf3d%2FtH%2FMJbDshONaN8esKERdVVaWw76UMTaCRe6lRy8yJmV7hcQtVgeeQTkO57G0yXrThwjxJ7g5b%2BBxcTLfabOHS%2FwcFW9ggqze9%2BmMBwzRCd5C2PCLPcTEHNAc%2FPJ%2Fwz%2FbE%2FQmwFTF8wZWbAKhPuN6oWIwL64we0r2MC0tsAj7V0YyT%2BgjcLZA1w1mdaCPwHK7zCR10rpYIoJUKaYdWnChNmywNiyGcRey5WKtKRphjPjNMnSxbnZ7fdJWNbPF9EKJzqG9Aw4c6NpdKjNlfEDIdWA%3D%3D)
-   [Simple movement](https://litecanvas.js.org?c=eJxVUL1uwyAY3HmKG3HqRk7UdEBypwztXikzAlwjIYjw58ZW5XcvwUkUtvvhjgNnySjpf%2BXA%2FxhwsZp6gf3hvU5MjhQGJZ0R6KQbTM2WijEV%2FEA4OzmbiBbX2CTQXAOzwK7JSCdpd8hQBReiQG6892ejN%2FanJ4G3hi2MdaNXZIOH9ZbAq1xcGONZSzLgmlZznbCd8NLesZ6wgaZk2g78ceADp6%2Fj9%2Bcaewq2eL3hPCyZS3GjjvJyW6KckZFXCUWjqLPO8aKrfmZzwXJ3oawvL6T8S0mo2PIPhyl18w%3D%3D)
-   [Paint Pixel Art](https://litecanvas.js.org?c=eJx1UE1vwjAMvfdXvMu0VKpE2C4V0q78iWkHkxoS0SZV4g4Q4r%2FPULaxw5wc%2FGy%2F548%2BCDuKn1TMuQIOoRO%2FwutLo8Bz2Hn5RmM4ck9ZseSJr5HFAjRJKo56XmFLfdHwpa4qTQy0ZxDaYzsToczKpVgEw0l9vGGkEMW0DfS%2Fz3JMziNOw4YztjkNsJCENYznY8cuDNqjRiiq7FKf8sySMK4wFQYPo5wWZSTHcJ4yOVEhVdj0FPf3QczS2ifdgaIWZo5Sq8ozYNXUaW7Itmr2jhTY6%2FtBt%2BRvzv6T%2B6vy0OFDb7SdopOQIqaxI2FT4zxv0yXEJD7EXXV5KOsyHe5FrmfKZnmdWy%2ByY2Mb6L%2FdtVbSFx2ZgLk%3D)
-   [Paint Image](https://litecanvas.js.org?c=eJxVjzFPwzAQhXf%2FihsdYWjaQltVahfUlQExwHhynOSEY0fxhQqh%2FHdsp6B2OOue%2Ffm9O0tsNLovDPJHAJyp4nYP61WpomoNNS3%2FSxzZB43W7KFGG4yYCiEWC%2Bjw0wACddgYob0LDN13VnCAHsmx3DwqSCULOBwhJWkadE3WyvVKwV9ti%2BuXp818G%2F%2FtihxWj04zeQfkiKNXMkLX2BRUiukKGPsK2dwgd5F5KJc3WDXg%2BQJpa3CQZZqgH0MrU8MDulD7oZPPp5e30%2Bu7grn5ULBUs2%2Fi8rLyPg2bj8v62cv30WoSvzb6Zd8%3D)

## Inspirations

-   [floopy](https://github.com/lpagg/floppy): a micro game engine for beginners.
-   [PICO-8](https://www.lexaloffle.com/pico-8.php): fantasy console for making, sharing and playing tiny games.
-   [js13kGames](https://js13kgames.com/): a JavaScript coding competition with size limit set to 13 kilobytes.
-   [raylib](https://www.raylib.com/): a simple and easy-to-use gamedev library.
