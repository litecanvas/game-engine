<div align="center">

![logo](https://github.com/user-attachments/assets/cbff543a-17be-44e4-b4ce-f9ff0a0581bb)

# Litecanvas

[![NPM Version](https://badgen.net/npm/v/litecanvas?scale=1.1&label=NPM&color=2f9e44&cache=3600)](https://www.npmjs.com/package/litecanvas/) &nbsp;
[![License](https://badgen.net/npm/license/litecanvas?scale=1.1)](LICENSE)

Litecanvas is a lightweight HTML5 canvas 2D engine suitable for small web games, prototypes, game jams, animations, creative coding, learning game programming and game design, etc.

[![Discord Server](https://badgen.net/static/CHAT/ON%20DISCORD/5865f2?scale=1.25&icon=discord)](https://discord.com/invite/r2c3rGsvH3) &nbsp;
[![Itch](https://badgen.net/static/FOLLOW/ON%20ITCH.IO/fa5c5c?scale=1.25)](https://bills.itch.io/litecanvas) &nbsp;
[![Playground](https://badgen.net/static/CODE/ON%20PLAYGROUND/5f3dc4?scale=1.25)](https://litecanvas.js.org/)

</div>

<!-- prettier-ignore -->
> [!WARNING]
> **This project is still in the "alpha" stage. Break changes may occur frequently. All feedback is welcome and appreciated.**

### Features

- **Tiny**: Only `~4KB` (minified + gzipped).
- **Simple API**: Just few functions to draw shapes and some utilities.
- **Predefined colors**: Just use a number (from 0 to 11) to choose a color in our 12-color palette.
- **ZzFX**: Play or create sound effects with [ZzFX](https://killedbyapixel.github.io/ZzFX/).
- **Extensible**: Use or create [plugins](https://www.npmjs.com/search?q=keywords:litecanvas) to add functionalities or change the engine.
- **Playground**: Access or install the [playground](https://litecanvas.js.org/) webapp to code and share games (even offline).

[Learn more in the cheatsheet...](https://litecanvas.js.org/about.html)

## Getting Started

You can try our [online playground](https://litecanvas.github.io) or install the [basic template](https://github.com/litecanvas/template):

```sh
# requires Node.js & NPM
npx tiged litecanvas/template my-game
cd my-game
npm install
npm run dev
```

or just use add a `<script>` tag with our CDN link:

```html
<script src="https://unpkg.com/litecanvas"></script>
```

### Show me the code!

```js
// import the package if you installed via NPM
import litecanvas from 'litecanvas'

// Start and setup the engine
// learn more: https://litecanvas.js.org/about.html#settings
litecanvas({
    loop: { init, update, draw, tapped },
})

// this function runs once at the beginning
function init() {
    bg = 0 // the color #0 (black)
    color = 3 // the color #3 (white)
    radius = W / 10 // the canvas Width/10
    posx = W / 2 // center X (or canvas Width/2)
    posy = H / 2 // center Y (or canvas Height/2)
}

// this function detect clicks/touches
function tapped(x, y) {
    // changes the circle position
    // based on the position of the tap
    posx = x
    posy = y
}

// put the game logic in this function
function update(dt) {
    // make the circle falls 200 pixels per second
    posy += 200 * dt
}

// put the game rendering in this function
function draw() {
    cls(bg) // clear the screen
    circfill(posx, posy, radius, color) // draw a circle
    text(10, 10, 'Tap anywhere') // draw a text
}
```

[Play with this code in the playground](https://litecanvas.js.org?c=eJx9U8tu2zAQvOsrBsghcitYtnMz4HvvLdD2SJFriTVNEuSqthH430tSduQEQQUI0GNmdnZ22bb4ziIwhFWIxKMHDwSyvbZUtS0MiWBxdIG2GJh93Lat0UxS2L8iLv%2FEpQt9Kzo38nLgo3lKIqxtH6sZVb9WSJdxzm%2FxCm01Nxi9EkwNVBCnBiy8J4VrU10XVa7Lg47Yj1aydhZhtBHOSoLgYrCjZNCmOtUbJsvWC0y1uh47rFCECNIZF%2FC0Qt0ZIQ%2BLApk%2B7vDyAfWC%2BjQk7xMqCKXHmGA%2F0WI9K5bGcNKKh3a9KlDv4vkG3GScJMsU8At1kn1H2CzuhEsifPtA%2BP0p4fpJLIpSxAxptDzElt0oB4pzIlOo9bnB5Z5LrjII21Oc2tBBGspGdGbcIZ2IaRhZYZh%2Fwu3Le1J9bPf82MrlZtOP05h6caQ0917LNJ735meb0ybUih9MHsWBHh3uhTEx5b%2BC12dKjz4FFUk6q%2Bb6X3fYJMQXKP7MRyCrKKSd%2BY%2BXvI1vSyRNrLt%2BUULL56BIRRmIpqSyt702ps5RNMVDc1uYZtqmws2aELdOCpHpzPV61SDfzz%2BET8fvchoo0PMjI8Oq6z8yIyTy)

https://github.com/user-attachments/assets/854ac6bd-724f-4da8-bb3c-bc04dba5d8c8

## Demos

Try some demos in the playground:

- [Pong](https://litecanvas.js.org?c=eJy1VV1y00gQftcpmidJWJYl2U5IIKFMyiEPgKk4YMLW1paQxvYUiqSSxiT8hCtwgn3bQ3AeLsAV6J7RzyjEKV42rozdPT39%2B803CROQh%2FECDsAPPMcA%2FEP5hORxI74h0Wu3z1EeDSs5ZqUgA7JTmndhkmg%2Fz9ufc%2F6Jaa5JNUlXCelqb7yQ0RrpvJXKnLEYxaBOpYyyQjub8CUrURwqUbArQQErWxEWQh5fhknJDCPhgkVh%2BiEsrc%2FS4pLHYr0Pw7oPa8ZXa7EPoweouLYNYzCAo00psgt4%2B%2Bn4DZTZJo1LWGYFiDUvYRVeMLLJCyYEZ0Wfr1LMz4iytBTwZPbqxdEUw%2F%2FlgAM%2BG9KX6w1pCVDhQEAaB%2FZGXrVRf1zccXeU%2Fc7fD7fHmJ9NTs8ohOeOHewKjLFT8tgIl6EeZbzrVZHlUgXyRne5fzJ59uyf2fHx%2FOh0On1BcXx36MtyxhjAcz2KSnFw2ZXRpNTfc%2Fdw3aGVPp7r%2B%2FWvQJ6T60iuPlVoLDdpJHiWAk%2B5sGz43AIL4y4GQYsulE8GAfThBAYw6kyeTFHpB8a15lKEec5i68qBj7VjvgTrXoWQWtcFjSg2rFUvryzZa7tRYcM2RSrF6861%2BPrVusLk5CUbQGB3UtnkcSiYFYvbE1FOAQciuMBbUkYFY%2BnjxrIC%2FAHeAN2YgAjZB1Y8NqQpqi5QRJQyyiNOmH6xE1bklry8Kmc1SLs5GmepKdBKaOdRDCuHKqcmJen0EeVTuffkFsMr1%2B73VDsOYdGYLaoeGY0nNdxeyxuHcKLPpgaDv%2BN1dASI3VZVk4L67oPfmWIX0nY1v7p0NR7pFfKs5DQzDYi9A0VX9ytmug%2Bx0HCpts%2B724qosJnvkD0inY%2BqmEqvYiJCbrS3Cqw3ZQFfvlQJPWr0eqNUjgfQb0tvgze4vm5npNLf6kwy8p2ummKiNYveq1qiLEl4SaC%2F5GKt45BC4m7BIqHqc6pno0lA%2F6WQSo%2BQXBdIM%2FYtCWrFqleiR0%2FYH2QtG6B2bQURSdzdexsX4WXDSlFSWp59J48QIYUJkqllRiwVrDAdMC84tcC0O1YlFmnV%2FNXdspD2HOI6PHs2eQlnM0X46Gto35yhgvshXcQ2DWrxkieJ9XsT6dFv%2FMiqeBFJ220jqSliS%2Ba31S47Q6Wvw3TF09WN2i0f3yT6N3%2F8%2B9%2FP79%2FAdAuWs1CoamwHRrf7ZWl8h1eiltqzZZp4eyQibBdrnlNGFr6tnn2zi%2F%2FX9DCbAN9J8%2Bnk%2BRRmr6enZqfvv7lB3vDcB%2BNt3nqqY%2FOj2el0n4r7oxIRzb8ATsCfrQ%3D%3D)
- [Bouncing Ball](https://litecanvas.js.org?c=eJxtkkFugzAQRfecYpaGOMFJW6lVQhddcQPWlm0iSy4gY0hRkrt3ADc4SRdI9nzm%2FzcMRjlo6lY7XVeQQa8E2TJG8YlpBHg3tdBuGM9Hy3t%2FtFzqrsX3X9%2BjyGinBK963pI4isquEpOZrrQjMZwDFx9QJDuap7t4v5h6hdEcq9fApWskd4pINzv9oW5%2BYJXdfPGWgHShPtzpw6wHKLOBT1%2F6g45AXtrTFL5qZFNQlyUoeVQtVnUJZCFb%2Ba%2FzCQVcLgHy2gsHYPM0dzhJBuvt%2Fp8q23y8TeVg%2BAyE4d9NkEr9UigUPifGpusjHc4FN778CWOYMJ4TxwXl3neyDXckLT%2F5TQvTEjYtVmgrSm1MiLjYUQ%2F78rDu8SfAUYbZzSrX2QrOYwUjfwF7%2FdPj)
- [Scroller](https://litecanvas.js.org?c=eJxVUM1SgzAQvvMU68FpAhFDLVpH%2BxbOcOj0ECGUzATSIYsyOn13NwXRHpJNvv1%2BkrUGdam6D%2BUZj6J66Eo0rgPTGQTG4TsCaLX36qhhB6tC29K1GtCBXYQ3KyKN1C6onpSl034jcvEonsRWPItMiiw7ROd%2F9sOpUqiBVThFePMV%2FIv7OSu1ujtiQ52G4FxeAu528CAlxFDhHNiqkY0C1pJfuVe9%2Bvx9fGk9ozZA7XpgViMYEsoXKq9wnUZYkkwqgMBEYr4lTKZZbPiC0kLdh%2FRZ7Yd3jz0zArI%2FVumsCySax762zvUM4%2FyWbnMYP1yoqEcMn2dh4wvExsTEAYpluhXQJGuZeNORx4bHjZjfIKaUIDvTAH4AEIGEgw%3D%3D)
- [3D projection](https://litecanvas.js.org?c=eJyNVcuS2jAQvPsrJofUykE8wykJySlVyRckuy4fZGwWgZEpWQSWFP%2BeGUlgizVLqgyyprul1mgkl9IUc6H%2BiJrFUbTYqbmRlQKppGEx%2FI0AanksYAa%2F4Cv8gG%2F4G8IUPmEfW4S3uloVTjSDBAMAyZjDCJ%2BUuy6%2Bj8MuRWw3pREqqUzdqPs0I4d2k3IYDiE5cHjhcEwdr4vWRjqA%2Fj2kRQgHuwm8jvc7gbTJVZHTYikg1HNJyR1Fp1byd9tcmILlxm2AI%2FWQNRiNIwwsKg2sLAxIkn7G5otP4qAs1LNZYqjXc2KAeaVqgzhl2LImG2G0PLDBYOBUiUxjS6UxdWWEc4i0za5kNoC2fjNrJOY0luPf5D5euJ5yh%2F%2FUzb%2FkCx02oqbiAvopyGGuxd4X8Lys2SimxG139ZIRt5Sq2MvcLNmEukYLVZeUc6rqCbdFbpGuVE%2Bv06vQDZMcmIQejGN4D1PeeI9DGlIQZS1u7EK3BBxkB%2BFkD84WV9Ne9VkkOGTc14QzSitmfrtFmozoOTMoMA4C2TUjuzA%2BhjP6PaEJfbZtuYl5VVLBCdT4omwwXe0tdg1kXpR1iDIvys4AInIBzE30bjZzjBjMElvA7YXvWleaPfzEy62UObiqL%2BoHWwpuVF3U56PYtdPWabDbKHC1mLhL6KJaOdUKVXYZ%2BNqo3Mmqdxt71F3kolw75Zrmc8p1WwlW16NUyjRZp%2FAB87NOk1XqCSffOmsYx%2FFQEp2xEy1XF2anFXGC3WvOtha5xEPg5vXsm7f5vKovAns1qla3TQyRUDby12KXn8e3%2FFwNE85y45tz7TE084aTp%2F93cisP95Pw6qPYdhLc2f4LGJpJDngukxf6O6Yk%2FgdWEko3)
- [Rendering Benchmark](https://litecanvas.js.org?c=eJylVVtP2zAUfs%2BvsLpJSSCkSS9QurYTQkx7AAkB0x6qariJ21q4See40Az633dsp8G9UNDmB1Kf853j71yJ0iQTKEoTwVOWoS6K02g%2BJYnwI06wIBeMyJtjx%2FTRdq0V0KdJQvj3u6tLMLm3OqDtWQhOJwN9Mu6dTdN5ItqdanHXSowmnIy6la9YqbthEFR68KdTxW8gmhLR3IcAc%2Bnk4W1ETSFqexANhWjsQbQUorUHER5rIsd7MHVNpV5w6VRV3mT2UCZyRrqVWZpRQdOkjThhWNBHUil8RTh5xBmicbcSVXqdqr6vnNxbZeGGaZz7eDYjSeys6uVaG3r1nB%2BlLOVQQftTGIb2TsgQRw9jDuzj8xI8Go1sy2JEoDlnIEnIE%2Fpxc%2BmwNMKSvOspypmABgL1s7rJE6mmQIdg5mcE82hyjTmeZv6YQIvpJNkuenlBUFWvNHuisZi0QVZrvAonhI4n4KzRKpBLoEQF0Xlx9KOFpWLiq4vGroy1Qt%2B0Rpu3IcrItpaQNw3JZpyqYGaYwjgoaFjz1r79kpvtw2nAkV%2Fb25BjvEMeBFIeBFvymvRT25CfwKnDacJZkx8fn9TDsN4cDj8mf8OPfPcUzua7kudpq3W6zdP3pXxXvNKPIR%2Foz2tTZBFmpI3qqypCzkfzJJKNhGhCheMW4G%2FXt7%2BuLu4ubvyYZjOGc0fwOQF42Wx%2BRv%2FIIpk102XXoGoVQcMJGjGC1H6DN3TV1RqcFbqs6OkzzuER7Uy1rmuAYyqHoR966CgcKPkIxsORU0FBEXyBTwcZxiA4PHTXpkH6WQCYY5hVFx2YjYqOjJg2bPJtG93D%2B4z68cJDcT6QrEuVPMoTxFGX3iCsvhRQJ%2FBQ6A68f4EOyl9lSvtUPvyMgEMONBQVKLYuuVFBswblb8vIO6PJg%2Fl%2F6vec8PyWMBKJlDv3%2FfWN%2B%2FnZqMCyMrjXJaQjqBQ4Mssh78XSG8Ha%2FKkTCvtumLLYLpgujeaMOX4qmxNa65zBSkNiQoolokmzzAnc7fbDCZ3u67%2BNbPxHg3Ezk1AGq9Rzf4GOoJP8eGHI8kKWvwJluiS4gwLT%2F8oHkNmQxQt00IXBKMVLRFhGCkf5bkf5Lkf5pqNtVofm8PfMGdpN9t0h%2B1gMO5%2FVY7g7tvcH9QMxT%2FGYyKg96dRb23Ru2aN%2FASaYns8%3D)

> _See other demos in [samples](/samples) folder_

## Inspirations

- [floppy](https://github.com/lpagg/floppy): a micro game engine for beginners.
- [PICO-8](https://www.lexaloffle.com/pico-8.php): fantasy console for making, sharing and playing tiny games.
- [js13kGames](https://js13kgames.com/): a JavaScript coding competition with size limit set to 13 kilobytes.
- [raylib](https://www.raylib.com/): a simple and easy-to-use gamedev library.
- [p5.js/Processing](https://p5js.org/): a library for creative coding.
- [Pygame Zero](https://github.com/lordmauve/pgzero): A zero-boilerplate games programming framework for Python 3.
