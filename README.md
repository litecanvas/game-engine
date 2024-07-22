![image](https://github.com/litecanvas/game-engine/assets/1798830/35119449-cd75-45d2-a806-462cd323cc14)

# litecanvas

[![Discord Server](https://img.shields.io/badge/Discord-7289DA?style=for-the-badge&logo=discord&logoColor=white)](https://discord.com/invite/r2c3rGsvH3)

Lightweight HTML5 canvas engine suitable for small games and animations for people who enjoy coding: there is no fancy interface, no visual helpers, no gui tools... just coding.

:warning: **This project is still under development. All feedback is appreciated!** :warning:

### Features

-   **Tiny**: only `~4KB` (minified + gzipped).
-   **Simple API**: just few functions to draw shapes and some utilities to other things like sounds and math.
-   **Predefined colors**: just use a number (from 0 to 11) to choose a color in our 12-color palette.
-   **Predefined sounds**: packed with 4 sounds created in [ZzFX](https://killedbyapixel.github.io/ZzFX/).
-   **Offline-first Playground**: Install the [playground](https://litecanvas.js.org/) webapp and use anywhere at any time.

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
npm install litecanvas
```

```js
import litecanvas from 'litecanvas'

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

-   [Pong](https://litecanvas.js.org?c=eJy1VV1SE0EQfs8p2qfdJQv5AZSiCFYKIlClYkFKzOO4O5tMuZlNzU6AEvEKnsA3D%2BF5vIBXsHt6drNRtHixKiTT0z1f%2F33d5MrKROhrUYZ3LYAbldrZPmz3uzFKM6mmM7sPO3tO7HRALG1RJiKX%2B5CJvJSt%2B6jVypY6sarQoLSyYQQEtBDpFQyg1%2B%2BycErCLp%2Ff0bnrFRMUdrZJSGVpSUUWKL4XeU7i0ej1eHRR3Uzqmwlswuno7OR0DB3Y8epL9VFWnkge6mlOFw5fGeeZjxN%2FLBdSpnjuu4DKpDCVfa4yWeJ5G89W3lqPfXV2PD5Fl3tkboWx7jlXg4uUFyIFAcmytMUcskJbQsPLF3gMg3mhi6kR8yCGoEPaslNdbVmb4XVoZBnB4NBVEkBl%2FoaiyNYxImch0TnYmSluIDgSGnRhOQqyDtAE23TfaNRykQorw9Rys8jBy%2FPh8dnrkwiMtEuj%2Fe0Tn2HkQ1klPB6%2BeTM6dpf1i3v%2FyldugHWs8KguUzGXUFxL89wXaiZ0iu1RerG0pX9LuC4OdliR4vNn0rzDnjtmdaAfOYcMNEdUzF%2BSEhE9lKPaE4zCgVSInoC5NAtnEbM6hu5Wd7cJmhY6wDJK20BGUXhXZWKk1E1XB5SuhycCua7U2jZHfsgEqg2ZTpxWy6Mx0dsrRh96plc5VLPRe9qtZSL0MxYr5vLvpuM59i67DbebCTIL3GNYFKUiatSD1x7wwGz4CdmA1NYzyMrJupJB3xdIMg%2BKTFurkkdu5sXpf%2FrkvR7UupoALogBbK6S6EUNrnFAD76rRnztFUeZzGTygYNMijxXJU3FjbKzdQahzsjEcuAxJx%2FXrponZhLtM%2Fd9FUMv%2Bi2UKgO3Ytq0AuvYuhxbc0RTI278Lk2QdIZtHj%2BptCtErqY6DBKprTS0buaKkvNLgyxKDD6sltvqOvRLN652Lb7F8YPxOVyOhxdjxGImrTjOXDukEbjzWyGxmcrz8M%2FS0P8Dj4DZKZM4u78VGYfy4XirLbCWrCsD5YrLZar0tJFs2OtiW%2FAv%2BPH128%2FvXyDYMnIhheXgoxh2Gq48ntTpw2h%2FK1010OQIP2EQIONd06MtTPyS4gufoi5aL%2BL%2FaBuG0d9FgJPhqxGcvx1dBHXZ%2F6zmBm7Avd1%2FobW5epdH5xejfUrrEckhqX8Bx8Nfnw%3D%3D)
-   [Bouncing ball](https://litecanvas.js.org?c=eJxtUj1vgzAQ3fkVNxpCAklbqRWlQ9WqZI%2FU2TImsuQCAkOLkvz3GvsKDs3gwff8Pu7OUijOaNnTlvieJ7mCumqFElUJKfSckW0ch%2Fr4Buu5rJhQQ2Jux4b206WhuehaTbp%2F9LyiK5nREKVQxIeTBxMXdT%2F3b4cs2IXZ%2B%2F4jO0Q7P9FvUBGfxAhq6OJodnVOFSe5srp%2FeTc%2FsEonF30LIFcuPlzhg8WdYFYAI8x8h%2BHAMz2K4LXS2ThURQE8P%2FJWV0UBZE62wum8gGkbzmcn9hrBZ4htR1eRghTW2%2BRGNd48PZiyM4AUmKRfteMc4mJC64xeviZelil1fzDlxMkv8wwmz3%2FrcWWWgg7GwN1a3tBv%2FAlMtiQ2%2B2aiYYWQ0g08a4YY%2FW7xAca%2FoRsbrFrDVdeUcBor2vIXzlHggw%3D%3D)
-   [Scroller](https://litecanvas.js.org?c=eJxVUE1PAjEQve%2BvGA%2BGdrdilw%2FFKAcTSDTxYKIJB8Kh7ha2SWnJdtCNhv%2FulAWUQz9m3pv3ZsYa1IVynyowniTLrSvQeAfGGQTG4ScBWOsQ1ErDGDozbQu%2F1oAe7KnwokOkhuDZ8%2BT9if4bZSma98VADMWNuBUjcSdyKfJ8kez%2BmWw3pUINrMTWCKlq%2BvL4%2BjadUBTMtz6KXh966FrtVlgRWhE0lHvjqzH0pYQUSjyTL2v1dZyhsFrVTNKIAEtfA7MawZCGvKfnAc71KZdlbSFAZGJsDTMmu3lq%2BClNB3VN0LE8bD8C1swIyP9Yhbc%2Bkmgt86X1vmaI6fCSwoMdX%2By5qBuMQ7N48VOKrVXDGgE9yTOTRiyV3ZGAKuvJLBgX1QY8rcShHdEatgKFd8Fbmsuv2N6W%2F%2Fclyo5W9guGqpXp)
-   [3D Projection](https://litecanvas.js.org?c=eJyNVU2P2jAQvfMrpodqnWI%2By6kt7WW3hVulrtTuRjk4JCyG4CDHFJYV%2F73jj5CYDUslROx579njGc844yqdMfGXFSRoteZbMVM8F8AFVySAlxZAxkW644lakGGA04IfUhjD7%2Bnt%2FQS%2BwuRu%2BmNyD9%2FKQQ9G8MmhOEbBRubL1K46hhANAOGAQh9%2FEbVTHA%2F8qbaYaaRXyLlQRaXuaB8o1D8RhV4Pwj2FZwqHyPKaaHWkAehcQ2oEf7GLwGt7pxGIqliliT6sNjDxlOlw91vHWna2m4SplCTKZsiS2sjq9gctNMxzCSRLFXAt%2FYyfLy6I3SwVT2qBpnbbigFmuSgU4jrChjVcMyX5nnS7XasKeRQYql5T5opZD5G23mbEGNCtP8Q4ElC9luVf5D6cuI5yhf%2FYzHeul1Eb3lbK6tqdaU5sPJU%2BcSVG%2BOjFOZFs56pglhWkH5gUYUSIvaLff%2F6iMAp0yDfbYkE0riQTRabTUxbBkFbFYUqoKT2j85QIdIpwCoRDGwYBvIcRrZwNfBpSECU1bmBNlwQUeAPhaIptg%2BeoR6EUMQoxdfeoag3EXREWhX39KxnaMPAM8TkjPjE%2B%2Bju6FOoNXfRNntksz%2FQlZahxF7nCZL4z2DkQO1HcIIqdKC4BRPgciN3o3XhsGQGoBX4B%2ByDcSZlLcjPFjpnxBGylpMWNuQR2VZkWZfk2Zdp46mUbBfYuhrZxnVRLq1qiyhwDh5XKVmOxXZv2YC0n5coqV3o%2Fq1zVlWB0bR1KHoWrCD5gfFZRuIwc4ei%2B1jW043ooaZXYUR9XpmorheZ42av6gWQJx2qw%2Bzr2xRdglhcngWmnojatE33El%2FVdK23y5%2BEtf86W8Xe58E6d%2B%2Bg784Ynj%2F%2FvyaU4XA%2FCq4e07onX592r6TsT7rEuw2f9d4i0%2BB%2FEGGLo)
-   [Clip](https://litecanvas.js.org?c=eJx1UE1LxDAUvPdXvNsmNEi2blnw4yCo215kwYJK6aG2qRssaUlTbZX9774mtbgHIR9vhuS9mamlEUWuPvKOUM%2BrelUY2SiQShpC4dsDGOAa1pxjNWK1DT2sXptBdIjSDEHVaCC1MCCR4Zd4XUHIp8L3XYv5w1nbdweS6lyVknAGT%2FFtElEGCxHdxbsoWZgNgy3NKDY44u7kl5ikBKF3%2FKO0b8vcCFIaN0pWQJKb%2FT5%2B2P3Ongwg9WzB6MDL3PSkVanzz9l0UXeET5OtZGoZ2RZSF2RgMDKrhs4Pz%2Bk%2FKTjXtVBv5nAShxaFqWRdE%2FsilVnKMwYLWCMIQrcXMrBJYA5GN%2B%2FCqZsstE1rBRoxmClEXKv7%2FePFyseTwYaixx%2BHoYO9)

_See other demos in [samples](samples) folder_

## Inspirations

-   [floppy](https://github.com/lpagg/floppy): a micro game engine for beginners.
-   [PICO-8](https://www.lexaloffle.com/pico-8.php): fantasy console for making, sharing and playing tiny games.
-   [js13kGames](https://js13kgames.com/): a JavaScript coding competition with size limit set to 13 kilobytes.
-   [raylib](https://www.raylib.com/): a simple and easy-to-use gamedev library.
-   [p5.js/Processing](https://p5js.org/): a library for creative coding.
