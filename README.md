![icon2](https://github.com/user-attachments/assets/28b92806-cb70-41c7-be72-12e658eb7819)

# litecanvas

[![Discord Server](https://img.shields.io/badge/Discord-7289DA?style=for-the-badge&logo=discord&logoColor=white)](https://discord.com/invite/r2c3rGsvH3)

Litecanvas is a lightweight HTML5 canvas engine suitable for small games, animations and creative programming for people who enjoy coding.

:warning: **This project is still under development. All feedback is appreciated!** :warning:

### Features

-   **Tiny**: Only `~4KB` (minified + gzipped).
-   **Simple API**: Just few functions to draw shapes and some utilities to other things like sounds and math.
-   **Predefined colors**: Just use a number (from 0 to 11) to choose a color in our 12-color palette.
-   **Predefined sounds**: Packed with 4 sounds created in [ZzFX](https://killedbyapixel.github.io/ZzFX/).
-   **Extensible**: Use or create [plugins](https://www.npmjs.com/search?q=keywords:litecanvas) to add functionalities or change the engine.
-   **Offline Playground**: Install the [playground](https://litecanvas.js.org/) webapp and use anywhere at any time.

[Learn more...](https://litecanvas.js.org/about.html)

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
    loop: { init, update, draw, tapped },
})

function init() {
    // this function run once
    // before the game starts
    bg = 0
    color = 3
    radius = 32
    posx = CENTERX
    posy = CENTERY
}

// this function detect taps/clicks
// and changes the circle position
function tapped(x, y) {
    posx = x
    posy = y
}

// this function controls the game logic
function update(dt) {
    // make the circle falls 100 pixels per second
    posy += 100 * dt
}

// this function render the game scene
function draw() {
    cls(bg) // clear the screen
    circfill(posx, posy, radius, color) // draw a circle
}
```

## Docs

Check out our [Cheatsheet](https://litecanvas.js.org/about.html).

## Basic Demos

Try some demos in our playground:

-   [Pong](https://litecanvas.js.org?c=eJy1VV1S20gQfvcpOk%2BSsMCywQlFYVIu4gWqdsMWuEL8OEgje2rlkWs0BpKQXGFPsG85RM6zF9grbPf0SJYJSe3LVhl7erqn%2B%2Fv6j0JZmQp9J6rwUwfgXmV2cQT7gyRGaSHVfGGP4OAw6XyOOp18rVOrSg1KKxtGQC9WIruBEfQHCQvnJAz5%2FJ7OiVfMUDjYJyGTlSUVWaB4K4qCxNPJ2%2Bnkqr6ZNTcz2IXzycXZ%2BRR6cODV1%2BqjrCORPNbzgi6cf2VcZD7O%2FLFaSZnheeAAVWlpavtC5bLC8z6erXyw3vfNxZvpOYY8JHMrjHXPc1FUsoNXvR4UpchAQLqubLmEvNSWvOHlL3gMg2Wpy7kRyyCGoEfaqldf7Vmb43VoZBXB6MRlEkDl%2FoZQ5Ns%2BImchMTjYhSnvITgVGnRpGQVZB2iCZfrcKpQVq5XMwocYPnC5KMQLzybyYdv0rFlLf2mkXRtNPls1%2B%2FIlfMB6uKr3YLAdbb3KhJVhZp%2BLxe4obVZZrFWVGin1a2%2FnazDCirRN52IpobyT5rVP%2BRIFTIAkBFkh%2FWvXay%2FwsYNZ8%2FIdWEizchYxq2NI9pJh5Iix06zUAeZR2pZnFIUPxUjboY4JpXdPHeTK0mi7nJ4T7qDGkPuJc9fx3rjTu5uWPvGtXnOoh6P%2FMmlk6uhXLNaty7%2B7rtGxnPlDuN8myIVxj2FVVoqq1Uxed8QTs%2BNHZAcy2wwhK2fbSnZ6W2LdvVMs%2FlaWvOc2L6b%2F%2BOijHje6miqDGMHuhkQ%2F8u23ydWz7%2BoZ33rFKNOFTP9gkGlZFKqiRr1XdrHdQagzMrUMPGbycROqfeJOooXmvm9i6EdPoNQM3I7p0g5ssCWMrT01mRH3fpmmRUUWHtOvl%2BM3F2%2FP6nmor5%2BOLy0LUai5DoNUaisN7ZulInJ%2Ba5BFheDDerttrkO%2FdeN62eLb6fh3mF7C9XR8NUVf3EmbHudeO6ERYACUuFwVRfh9augfgveA7JRJnd2Pkjx01J%2FBy6vmCVmXBuK6EHqu9LxFNuwnWBb8C%2F7%2B6%2Bs%2F3%2F6EYM%2FIlRSWwUcxHLRCeX9SZ897%2B1Hq6oGmQPgJgwA73hU92kPi14QvfIm6aDuJ%2F0fZEMZgiA7Oxr9N4PLd5Cpo0v59NndwAx4Of%2Baty9m7Pr28mhwRrf9ADpv6X2AjW9I%3D)
-   [Bouncing ball](https://litecanvas.js.org?c=eJxtUj1vgzAQ3fkVNxpCAklbqRWlQ9WqZI%2FU2TImsuQCAkOLkvz3GvsKDs3gwff8Pu7OUijOaNnTlvieJ7mCumqFElUJKfSckW0ch%2Fr4Buu5rJhQQ2Jux4b206WhuehaTbp%2F9LyiK5nREKVQxIeTBxMXdT%2F3b4cs2IXZ%2B%2F4jO0Q7P9FvUBGfxAhq6OJodnVOFSe5srp%2FeTc%2FsEonF30LIFcuPlzhg8WdYFYAI8x8h%2BHAMz2K4LXS2ThURQE8P%2FJWV0UBZE62wum8gGkbzmcn9hrBZ4htR1eRghTW2%2BRGNd48PZiyM4AUmKRfteMc4mJC64xeviZelil1fzDlxMkv8wwmz3%2FrcWWWgg7GwN1a3tBv%2FAlMtiQ2%2B2aiYYWQ0g08a4YY%2FW7xAca%2FoRsbrFrDVdeUcBor2vIXzlHggw%3D%3D)
-   [Scroller](https://litecanvas.js.org?c=eJxVUMFOwzAMvfcrzAEtacNIxwZDsAPSJoG0AxJIO0w7hDZdI6XN1HhQgfbvOOs22CGJ7ff8nh1rUGeq%2FlSe8SgqtnWGxtVgaoPAOPxEAJX2Xq01TKC30DZzlQZ0YE%2BNFz0itQQvXqbvzxRvlKVsORQjcSvuxFjci1SKNF1Fu38W202uUAPLsbNB6pnNn17fZlPKvPnWR8nrwwR9q%2Bs1loSWBI3k3vZqAjdSQgw5nsnnjfo6bpBZzySnoHANMKsRDAnIB3oe4VycaknSdQEEJoa5MGGyn8aGn8p0UDcEHdv99sNjw4yA9I%2BVOesCiX5kWVjnGoYYjy4pPdjx1Z6LusWwMQsXP5VYpVrWChhInpg4YLHsjwWUyUAm3tRBbcjjUhzGEZ1hENjRZ%2FwCV%2F6J0w%3D%3D)
-   [3D Projection](https://litecanvas.js.org?c=eJyNVU2P2jAQvfMrpodqnWI%2By6kt7WW3hVulrtTuRjk4JCyG4CDHFJYV%2F73jj5CYDUslROx579njGc844yqdMfGXFSRoteZbMVM8F8AFVySAlxZAxkW644lakGGA04IfUhjD7%2Bnt%2FQS%2BwuRu%2BmNyD9%2FKQQ9G8MmhOEbBRubL1K46hhANAOGAQh9%2FEbVTHA%2F8qbaYaaRXyLlQRaXuaB8o1D8RhV4Pwj2FZwqHyPKaaHWkAehcQ2oEf7GLwGt7pxGIqliliT6sNjDxlOlw91vHWna2m4SplCTKZsiS2sjq9gctNMxzCSRLFXAt%2FYyfLy6I3SwVT2qBpnbbigFmuSgU4jrChjVcMyX5nnS7XasKeRQYql5T5opZD5G23mbEGNCtP8Q4ElC9luVf5D6cuI5yhf%2FYzHeul1Eb3lbK6tqdaU5sPJU%2BcSVG%2BOjFOZFs56pglhWkH5gUYUSIvaLff%2F6iMAp0yDfbYkE0riQTRabTUxbBkFbFYUqoKT2j85QIdIpwCoRDGwYBvIcRrZwNfBpSECU1bmBNlwQUeAPhaIptg%2BeoR6EUMQoxdfeoag3EXREWhX39KxnaMPAM8TkjPjE%2B%2Bju6FOoNXfRNntksz%2FQlZahxF7nCZL4z2DkQO1HcIIqdKC4BRPgciN3o3XhsGQGoBX4B%2ByDcSZlLcjPFjpnxBGylpMWNuQR2VZkWZfk2Zdp46mUbBfYuhrZxnVRLq1qiyhwDh5XKVmOxXZv2YC0n5coqV3o%2Fq1zVlWB0bR1KHoWrCD5gfFZRuIwc4ei%2B1jW043ooaZXYUR9XpmorheZ42av6gWQJx2qw%2Bzr2xRdglhcngWmnojatE33El%2FVdK23y5%2BEtf86W8Xe58E6d%2B%2Bg784Ynj%2F%2FvyaU4XA%2FCq4e07onX592r6TsT7rEuw2f9d4i0%2BB%2FEGGLo)

_See other demos in [samples](samples) folder_

## Inspirations

-   [floppy](https://github.com/lpagg/floppy): a micro game engine for beginners.
-   [PICO-8](https://www.lexaloffle.com/pico-8.php): fantasy console for making, sharing and playing tiny games.
-   [js13kGames](https://js13kgames.com/): a JavaScript coding competition with size limit set to 13 kilobytes.
-   [raylib](https://www.raylib.com/): a simple and easy-to-use gamedev library.
-   [p5.js/Processing](https://p5js.org/): a library for creative coding.
