# litecanvas

Lightweight HTML5 canvas engine suitable for small games and animations for people who enjoy coding: there is no fancy interface, no visual helpers, no gui tools... just coding.

:warning: **This project is still under development. All feedback is appreciated!** :warning:

### Features

-   **Tiny**: only `~4KB` (minified + gzipped).
-   **Simple API**: just few functions to draw shapes and some utilities to other things like sounds and math.
-   **Offline-first**: You can install the [playground](https://litecanvas.js.org/) as webapp and use anywhere at any time.
-   **Predefined colors**: just use a number (from 0 to 7) to choose a color in our 8-color palette.
-   **Predefined sounds**: packed with 8 sounds created in [ZzFX](https://killedbyapixel.github.io/ZzFX/).

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
npm install @litecanvas/litecanvas
```

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

-   [Pong](https://litecanvas.js.org?c=eJyVVe9S2kAQ%2F85TbD8lKZHQgNTSYoepKHZacZRR%2BRiTC1wNCZM7xKnaV%2BgT9Fsfos%2FTF%2BgrdPfuEoLVzvgB2L3d%2B%2B2f%2B%2B2ScMnCIL0OhH1bA1jxSM660PKbLmozxqcz2YX2TrN279Rq8TINJc9S4CmXtgN0YxFE59CDV35TK0NStrV8QXLTGCaotFukRExIMpEHqpdBkpD6YXA0HpwUJ5PyZAJbMBwcHgzH4EHbmE%2F5V1ZEIr2fThM6UPg8V5G1ODGiWDAWoeyrhESY5YV%2FwmMmUG6hLNmNNNiqIiGDXKp7cZAIVsMjz4MkCyIIIFwKmc0hzlJJMHi4j6JtnfLkSoQ5Y6nlgjWTciG6nkduojFFRMnDRpjNPeGJ0tO7bnvznY8XX%2BKz47jjX%2FD911ejLf5m8ukoCVaNVRbHPqLZORMO9HZV7wF4bE4o7%2FhhcAd98N3uKy%2B3XESBZHYk9evR%2FU%2Bj%2Ft7h0YEDOZPLPH1rjl%2BY0h0Tat2Jcf%2F4eLCnDvUVCmNumV72sLMFIDVsGswZZNcsf286OAvSCB%2BMp4ulFOYu4apEdMCCJt%2B%2BkeUCWaC45oGv6jJAc0QFOWNkREQDpcj3ArNQIAWioWTC8oXycLXZhWajuV0FjbLUkugnK8ioBiaUbm811Dsq18ATbRhyZW2t68x34fxwbzwsHZVmyqoZNE39%2Bprju4b7RQ3FtLzqNEudKP5aqwWX9e%2BWYj6%2BXXxTfRl4Dy3obvZRE0PBwSITnNhSDme9p4fqpZmilxDJck61cbJp1KCXGfLOgCL5NvpmkKuV6obc3Zmo70pbSQmVRA%2B21mWZd6t279F7xRrYuKWzDGcsvNJJhlmScEGDsuJytskptOUslDpxVxfvlqGqkuYW7Tz1fa6%2Bh86DbIoi1Caq06Ys02vq9KqDG%2BXByqzcEJmYa59nzC9tiCDh09S2QpZKltNumnMqUC0K7WGbLewWyxedcPpgPILTcf9kjJdaLvi6f2uaa3Lt0hTcmsUQypgnif14LxBFxwx5Hiq%2Fp7racWplcgJP7GJDOw%2BrUvVSUbiUF9WS8M8M6GP9%2FvHzz6%2FvYCHrVMIutCtuSoJyKvGPyzVHfinZFl1WT%2BY0sJBTiml3cIM4hUtL%2FVb685z2P1HhP6%2BC%2BfnbCHDQ%2FzyA0dngxCo7%2Bg8M%2Bm7%2FD6quoVRRXSjrM4DEwr8WGke1)
-   [Bouncing ball](https://litecanvas.js.org?c=eJxtUj1vgzAQ3fkVNxpCAklbqRWlQ9WqZI%2FU2TImsuQCAkOLkvz3GvsKDs3gwff8Pu7OUijOaNnTlvieJ7mCumqFElUJKfSckW0ch%2Fr4Buu5rJhQQ2Jux4b206WhuehaTbp%2F9LyiK5nREKVQxIeTBxMXdT%2F3b4cs2IXZ%2B%2F4jO0Q7P9FvUBGfxAhq6OJodnVOFSe5srp%2FeTc%2FsEonF30LIFcuPlzhg8WdYFYAI8x8h%2BHAMz2K4LXS2ThURQE8P%2FJWV0UBZE62wum8gGkbzmcn9hrBZ4htR1eRghTW2%2BRGNd48PZiyM4AUmKRfteMc4mJC64xeviZelil1fzDlxMkv8wwmz3%2FrcWWWgg7GwN1a3tBv%2FAlMtiQ2%2B2aiYYWQ0g08a4YY%2FW7xAca%2FoRsbrFrDVdeUcBor2vIXzlHggw%3D%3D)
-   [Scroller](https://litecanvas.js.org?c=eJxVkFFLwzAUhd%2F7K64PsjSJNZ0WBroHYQMFHwQHe45ttgayVJpbLcr%2BuzfrurmHJOSec757E2fRlNp%2F6cDSJNl0vkTbeLDeIrAUfhOAnQlBbw3MYbI2rmx2BrABdwpeTcjUk7x%2BWayek%2F0%2FTPdZaTTAKhxQSK7l69Pb%2B3JBt2B%2FzBi7PXbJnPFbrEmtSSrUAX0zh7xQwKHCC3zV6u9xytIZ3TJFjwDYNC0wZxAsMdQDHY9wyaeaEEMQIDoxjoaCqSznNj2VaaFpSRrjofsI2DIrIT%2B7ysY1B5Pu2Z0kFi%2BuZ4OMpsf4Tha3c4lFay9hqlJhedS4ymYSajFVIljPiHGf8loeJ5BDjwjY0xf8AaGafqQ%3D)
-   [3D Projection](https://litecanvas.js.org?c=eJyNVU2P2jAQvfMrpodqnWI%2By6kt7WW3hVulrtTuRjk4JCyG4CDHFJYV%2F73jj5CYDUslROx579njGc844yqdMfGXFSRoteZbMVM8F8AFVySAlxZAxkW644lakGGA04IfUhjD7%2Bnt%2FQS%2BwuRu%2BmNyD9%2FKQQ9G8MmhOEbBRubL1K46hhANAOGAQh9%2FEbVTHA%2F8qbaYaaRXyLlQRaXuaB8o1D8RhV4Pwj2FZwqHyPKaaHWkAehcQ2oEf7GLwGt7pxGIqliliT6sNjDxlOlw91vHWna2m4SplCTKZsiS2sjq9gctNMxzCSRLFXAt%2FYyfLy6I3SwVT2qBpnbbigFmuSgU4jrChjVcMyX5nnS7XasKeRQYql5T5opZD5G23mbEGNCtP8Q4ElC9luVf5D6cuI5yhf%2FYzHeul1Eb3lbK6tqdaU5sPJU%2BcSVG%2BOjFOZFs56pglhWkH5gUYUSIvaLff%2F6iMAp0yDfbYkE0riQTRabTUxbBkFbFYUqoKT2j85QIdIpwCoRDGwYBvIcRrZwNfBpSECU1bmBNlwQUeAPhaIptg%2BeoR6EUMQoxdfeoag3EXREWhX39KxnaMPAM8TkjPjE%2B%2Bju6FOoNXfRNntksz%2FQlZahxF7nCZL4z2DkQO1HcIIqdKC4BRPgciN3o3XhsGQGoBX4B%2ByDcSZlLcjPFjpnxBGylpMWNuQR2VZkWZfk2Zdp46mUbBfYuhrZxnVRLq1qiyhwDh5XKVmOxXZv2YC0n5coqV3o%2Fq1zVlWB0bR1KHoWrCD5gfFZRuIwc4ei%2B1jW043ooaZXYUR9XpmorheZ42av6gWQJx2qw%2Bzr2xRdglhcngWmnojatE33El%2FVdK23y5%2BEtf86W8Xe58E6d%2B%2Bg784Ynj%2F%2FvyaU4XA%2FCq4e07onX592r6TsT7rEuw2f9d4i0%2BB%2FEGGLo)
-   [Clip](https://litecanvas.js.org?c=eJyNUMFKw0AQvecr5rhrF9nUlh7UQ6GxKYgEWlAJOaTJxg6ETchuNVX67042MdSDIOyy7z123sy8Eq3KUv2eGsY9rzjqzGKlATVaxuHLA2jhHnwpCZ0ILeYeoX3VKkMsTogUVQOsVBaQFHlLzx3MZQcmk95iKLiuj%2BbA4ibVOTIp4Hmz2oVcwCiEwWYd7kZlJmDBE04GZ%2B98MdyxzlOrWG57dyyA7ZZRtHla%2F7TrZibpxZFTT16dD4DBT0VKujfMoGbB4zLaBivO4Yqmhonb9bJb3qQfQxRZaZjs5nGLcKdgnWGTsVbASThvPny84X9k02dRKv1mD79CalRmCyxL5n7EmMQyETASn8h03t9RnLp8%2Btp%2F1Pl8SKGuareAVa3toqfzEG0FzDgt%2Fw2DoJGU)

## Inspirations

-   [floppy](https://github.com/lpagg/floppy): a micro game engine for beginners.
-   [PICO-8](https://www.lexaloffle.com/pico-8.php): fantasy console for making, sharing and playing tiny games.
-   [js13kGames](https://js13kgames.com/): a JavaScript coding competition with size limit set to 13 kilobytes.
-   [raylib](https://www.raylib.com/): a simple and easy-to-use gamedev library.
