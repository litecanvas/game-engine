![logo](https://github.com/user-attachments/assets/cbff543a-17be-44e4-b4ce-f9ff0a0581bb)

# Litecanvas

[![Discord Server](https://img.shields.io/badge/Discord-7289DA?style=for-the-badge&logo=discord&logoColor=white)](https://discord.com/invite/r2c3rGsvH3)

Litecanvas is a lightweight HTML5 canvas engine suitable for small web games, prototypes, game jams, animations, creative programming, learning game programming and game design, etc.

:warning: **This project is still under development. All feedback is appreciated!** :warning:

### Features

-   **Tiny**: Only `~4KB` (minified + gzipped).
-   **Simple API**: Just few functions to draw shapes and some utilities.
-   **Predefined colors**: Just use a number (from 0 to 11) to choose a color in our 12-color palette.
-   **ZzFX**: Play or create sound effects with [ZzFX](https://killedbyapixel.github.io/ZzFX/).
-   **Extensible**: Use or create [plugins](https://www.npmjs.com/search?q=keywords:litecanvas) to add functionalities or change the engine.
-   **Playground**: Access or install the [playground](https://litecanvas.js.org/) webapp to code and share games (even offline).

[Learn more in the cheatsheet...](https://litecanvas.js.org/about.html)

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
// import the engine or put the script in your HTML
// CDN: https://unpkg.com/browse/litecanvas/dist/
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

-   [Pong](https://litecanvas.js.org?c=eJy1Vlly20YQ%2FccpOl8ATBACuEiWYslFM5DlKkdMkUwkJpVKwcCQnAoEoIChpdiWr%2BAT%2BC%2BHyHlygVwh3TODTZYU%2F0QsDdELenm9DBMmIA%2FjCzgGf%2BA5BuAf0mdEj2vykkivEa%2BQHg01HbNSkALpKc6bMElaj6vmccHfsZZpYk3STUK8yhovpLeaWjVUmTMWIzmoQimjrGi9m%2FA1K5EcKlKwG0EOta4ICyFfX4dJyQwj4YJFYfo2LK33UuOax2J7BMMKhy3jm604gtFTZNzahrG3B9NdKbIr%2BPnd6SWU2S6NS1hnBYgtL2ETXjHSyQsmBGdFn29SjM%2BIsrQU8GL24%2Fk0QPe%2FOOCAz4b05XpDOgbIcGBAHAcOR54WVB8XJe6%2B0t%2F%2F9duHfSyWk%2FmSXHju2EFUYIxIyddGeAzbXsYHnvYsD%2B3IGz1m%2FsXk9evfZqeni%2Bk8CM7Jj%2B8OfZnOGB14rkdeyQ8eB9KbpPqH7iGe%2B3TSx3N9v3oayPfkOZKnTxka610aCZ6lwFMuLBveN42FfqfB%2BTKYXzYdVvNW0Iez4NXLsyXswajTBqhz8eq75RkK%2FIFx2%2FIhwjxnsXXjwB%2BVJ74G6xvdMhWv20Wi2LGGvb6xJPh2zUIEd0UqydvOnHz8aN1glHLq9mBgd0LZ5XEomBWL%2BwNRRgErJLjAsSmjgrH0ea2pJ%2BAYR6KtTJ0J2VtWPDekKrKukMS2ZRRHnLD2pCesyC05zSpmVVm7fjXOUlOglmi9j2SoDaqY6pCk0WcUjzbvSRHDGWzkPQXHiapQrarqpbAyaouq4r1moZzokrcLVbWKv%2B91eNQqBw2rWhnquw9%2Bp6Tdhrd1MSscVK2kVcizklMBW23aO1bL7IneW08gFq2OVeJVV6zWGCL7BndL1N5W2qfiK5%2FYLnew1o7byCgIP3zQQT2rZW2wVJzH0G%2FSbwKoG%2F22KZpK4UFjcmc%2FaqpOKNqy6HeVT5QlCS9pCq652LYbk1yitGCRUDk6%2BmKpA2g%2Fqdala0qeF7iI7HsCbCWr7pEeXXJfEbUEQElt1SZytXcHOS7C63pvRUlpefaji4W2VJjgurXMiKWCFaYD5hUnCEy7o1Vikla11LoiSy9Gp9qGaGM5%2BQGWM3U1oM2hfbeWqvVPaEKbcAjqNU8S60sw6edBbUdmx4tI6j5Ummp3PJDBfRhIhAiCbZhueLq5g4Hl4%2B1F%2F%2Bbfn%2F%2F8569PYLoFy1koVDa2A6P77bI0fsRqtW8q65Zp4jTJ7rBdzHtBUVl4E3v2XST%2F70piVAO8Xc2Xk%2B8DmP0UzM1ODb4wh%2FvEc5%2BO%2F8tqT6G4mM7mwREl%2B1UpY6f%2FC73Is6Q%3D)
-   [Bouncing ball](https://litecanvas.js.org?c=eJxtUstugzAQvPMVewTiBCdtpVYpPVStSu6ReraMiSy5gIyhRUn%2BvQZvg0NzsGTveGdmH0oYqKtGGlmVkEIneLimlNgTkQDsW1Vcmn64HzTr8KpZLtvG%2Fr9%2FDAIljeCs7FgTRkFQtCUfyWQpTRjB0WNBgc%2Fd2z6LNyR7331k%2B2QTbSd2%2FEIRtNDZ42zrnBkR5sbx%2Fhlf%2FcAivajYVwy58fH%2BCu8d7hlzBGhhyvcyPHhKTxJ4raw3AVVRgMgPorFRWUA4OVtgr15gLBtOJ8%2F2EsFnoK6iK0txCsv19kaUrp4exrDXgBS4Yl%2B1p0xwTMQpo1ZkE89zl7Y%2BuPjEzs%2F99KOf%2F9LDyFwKKowC%2FtRyzb5xE7hqQjrOm0vNC6mUb3jiJGj9brYAw27YwnrHpoVpdQnHIWIlfwGU6d0i)
-   [Scroller](https://litecanvas.js.org?c=eJxVUMFOwzAMvfcrzAEtacNIxwZDsAPSJoG0AxJIO0w7hDZdI6XN1HhQgfbvOOs22CGJ7ff8nh1rUGeq%2FlSe8SgqtnWGxtVgaoPAOPxEAJX2Xq01TKC30DZzlQZ0YE%2BNFz0itQQvXqbvzxRvlKVsORQjcSvuxFjci1SKNF1Fu38W202uUAPLsbNB6pnNn17fZlPKvPnWR8nrwwR9q%2Bs1loSWBI3k3vZqAjdSQgw5nsnnjfo6bpBZzySnoHANMKsRDAnIB3oe4VycaknSdQEEJoa5MGGyn8aGn8p0UDcEHdv99sNjw4yA9I%2BVOesCiX5kWVjnGoYYjy4pPdjx1Z6LusWwMQsXP5VYpVrWChhInpg4YLHsjwWUyUAm3tRBbcjjUhzGEZ1hENjRZ%2FwCV%2F6J0w%3D%3D)
-   [3D Projection](https://litecanvas.js.org?c=eJyNVU2P2jAQvfMrpodqnWI%2By6kt7WW3hVulrtTuRjk4JCyG4CDHFJYV%2F73jj5CYDUslROx579njGc844yqdMfGXFSRoteZbMVM8F8AFVySAlxZAxkW644lakGGA04IfUhjD7%2Bnt%2FQS%2BwuRu%2BmNyD9%2FKQQ9G8MmhOEbBRubL1K46hhANAOGAQh9%2FEbVTHA%2F8qbaYaaRXyLlQRaXuaB8o1D8RhV4Pwj2FZwqHyPKaaHWkAehcQ2oEf7GLwGt7pxGIqliliT6sNjDxlOlw91vHWna2m4SplCTKZsiS2sjq9gctNMxzCSRLFXAt%2FYyfLy6I3SwVT2qBpnbbigFmuSgU4jrChjVcMyX5nnS7XasKeRQYql5T5opZD5G23mbEGNCtP8Q4ElC9luVf5D6cuI5yhf%2FYzHeul1Eb3lbK6tqdaU5sPJU%2BcSVG%2BOjFOZFs56pglhWkH5gUYUSIvaLff%2F6iMAp0yDfbYkE0riQTRabTUxbBkFbFYUqoKT2j85QIdIpwCoRDGwYBvIcRrZwNfBpSECU1bmBNlwQUeAPhaIptg%2BeoR6EUMQoxdfeoag3EXREWhX39KxnaMPAM8TkjPjE%2B%2Bju6FOoNXfRNntksz%2FQlZahxF7nCZL4z2DkQO1HcIIqdKC4BRPgciN3o3XhsGQGoBX4B%2ByDcSZlLcjPFjpnxBGylpMWNuQR2VZkWZfk2Zdp46mUbBfYuhrZxnVRLq1qiyhwDh5XKVmOxXZv2YC0n5coqV3o%2Fq1zVlWB0bR1KHoWrCD5gfFZRuIwc4ei%2B1jW043ooaZXYUR9XpmorheZ42av6gWQJx2qw%2Bzr2xRdglhcngWmnojatE33El%2FVdK23y5%2BEtf86W8Xe58E6d%2B%2Bg784Ynj%2F%2FvyaU4XA%2FCq4e07onX592r6TsT7rEuw2f9d4i0%2BB%2FEGGLo)

_See other demos in [samples](samples) folder_

## Inspirations

-   [floppy](https://github.com/lpagg/floppy): a micro game engine for beginners.
-   [PICO-8](https://www.lexaloffle.com/pico-8.php): fantasy console for making, sharing and playing tiny games.
-   [js13kGames](https://js13kgames.com/): a JavaScript coding competition with size limit set to 13 kilobytes.
-   [raylib](https://www.raylib.com/): a simple and easy-to-use gamedev library.
-   [p5.js/Processing](https://p5js.org/): a library for creative coding.
