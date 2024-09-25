![icon2](https://github.com/user-attachments/assets/28b92806-cb70-41c7-be72-12e658eb7819)

# litecanvas

[![Discord Server](https://img.shields.io/badge/Discord-7289DA?style=for-the-badge&logo=discord&logoColor=white)](https://discord.com/invite/r2c3rGsvH3)

Litecanvas is a lightweight HTML5 canvas engine suitable for small games, animations and creative programming for people who enjoy coding.

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

-   [Pong](https://litecanvas.js.org?c=eJy1Vmtu20YQ%2Fs9TTH%2BRjCia1MOO3diBotJxgNQqJLW2WhQFQ66kRWmSIFexm8S5Qk6Qfz1Ez9ML9Aqd2V2%2BHNvNn1rwivPYeX4zVMIFi8L0bVha7w3Av2sei%2B0RDAeeI%2Bkt45utOILRU2Tc2oaxtwfTXSmyK%2Fj53ekllNkujUtYZwWILS9hE14x0skLJgRnRZ9v0qxgRpSlpYAXsx%2FPpwEcwy8OOOCzIX253pCOATIcGBDHgcORpwXVx0WJu6%2F093%2F99mEfi%2BVkviQXnjt2AM2MPU9dG%2BExbHsZH3jaszy0I2%2F0mPkXk9evf5udni6m8yA4Jz%2B%2BO%2FRlOmN04LkeeSU%2FeBxIb5LqH7qHeO7TSR%2FP9f3qaSDvyXMkT58yNBImIA%2FjC3TiV%2F1A%2BozocU1eEuk14hXSo6GmY1YKUiA9xXkTJknrcdU8Lvg71jJNrEm6SYhXWeOF9FZTq4Yqc8ZiJAdVKGWERWvuJnzNSiSHihTsRpBDrSvCQsjr6zApmWGsd2kkeJYCT7mwbHjfxI5K0%2BB8GcwvmyRq3gr6cBa8enm2hD0YdTyhzsWr75ZnKPAHxm3LhwjznMXWjQN%2FVJ74GqxvdFQVrxuoKHasYa9vLIk7u2YheHZFKsnbTis%2BfrRuMErZ2D0Y2J1QdnkcCmbF4v5AlFFAcAousDNlVDCWPq81dZGPseptZRpKyN6y4rkhVZF1hSROLKM44oS1wZSwIrckYFTMCtR2fTXOUlMAgbO5j2SoDaqY6pCk0WcUjzbvSRHDNjfynirHiepQrar6pWpl1BZVx3sNZk90y9uNqqDi73sdHkHloGFVqFTfffA7Le3Ouq2bWdVB9UpahTwrOTWwBdPesZqXJ3o0nkAsWohV4lVXrCYFK%2FsG12rUHgjtU%2FGVT4TLnVprx%2B3KqBJ%2B%2BKCDelbL2sVScR5Dv0m%2FCaAG%2Bm3TNJXCg8bkWnjUVJ1QtGXR7yqfKEsSXtIUXHOxbQOTXKK0YJFQOTp6d9UBtJ8UdGkTyvMCd7B9T4CtZNWq6tEe%2FYqoZQGU1FYwkW%2B17iDHRXhd760oKS3PfnSx0JYKE3zTWGbEUsEK0wHzilMJTLujVWKSVrXUuiJLL0an2oZoYzn5AZYz9VZEm0P7bi8V9E9oQptwqNRrniTWl8WkN1BtR2bHi0jqPtSaanc8kMF9NZAVohJsw3TD082dGlg%2Bvrjp3%2Fz785%2F%2F%2FPUJTLdgOQuFysZ2YHS%2FXZbGj1it9k1l3TJNnCaJDtvFvBcUlYU%2FQjz7biX%2F705iVAP8YWG%2BnHwfwOynYG52evCFOdwnnvt0%2FF9We6qKi%2BlsHhxRsl%2BVMiL9Xz8ms6Q%3D)
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
