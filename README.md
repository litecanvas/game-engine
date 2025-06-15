![logo](https://github.com/user-attachments/assets/cbff543a-17be-44e4-b4ce-f9ff0a0581bb)

# Litecanvas

[![NPM Version](https://flat.badgen.net/npm/v/litecanvas?scale=1&label=NPM)](https://www.npmjs.com/package/litecanvas/)

Litecanvas is a lightweight HTML5 canvas 2D engine suitable for small web games, prototypes, game jams, animations, creative coding, learning game programming and game design, etc.

:warning: **This project is still under development. All feedback is appreciated!** :warning:

[![Itch](https://flat.badgen.net/static/FOLLOW/ON%20ITCH.IO/fa5c5c?scale=1.25)](https://bills.itch.io/litecanvas)
[![Discord Server](https://flat.badgen.net/static/CHAT/ON%20DISCORD/5865f2?scale=1.25&icon=discord)](https://discord.com/invite/r2c3rGsvH3)
[![Playground](https://flat.badgen.net/static/CODE/ON%20PLAYGROUND/5f3dc4?scale=1.25)](https://litecanvas.js.org/)

### Features

- **Tiny**: Only `~4KB` (minified + gzipped).
- **Simple API**: Just few functions to draw shapes and some utilities.
- **Predefined colors**: Just use a number (from 0 to 11) to choose a color in our 12-color palette.
- **ZzFX**: Play or create sound effects with [ZzFX](https://killedbyapixel.github.io/ZzFX/).
- **Extensible**: Use or create [plugins](https://www.npmjs.com/search?q=keywords:litecanvas) to add functionalities or change the engine.
- **Playground**: Access or install the [playground](https://litecanvas.js.org/) webapp to code and share games (even offline).

[Learn more in the cheatsheet...](https://litecanvas.js.org/about.html)

## Getting Started

You can try our [online playground](https://litecanvas.github.io) or just installing the [basic template](https://github.com/litecanvas/template):

```sh
# requires Node.js
npx tiged litecanvas/template my-game
cd my-game
npm install
npm run dev
```

If you prefer, you can manually install via [NPM](https://www.npmjs.com/package/litecanvas):

```
npm install litecanvas
```

### Show me the code!

```js
// import the package or put a script tag in your HTML
// CDN: https://unpkg.com/litecanvas/dist/dist.dev.js
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
    radius = W / 10 // the canvas width/10
    posx = CX // center X (or canvas width/2)
    posy = CY // center Y (or canvas width/2)
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
    // make the circle falls 100 pixels per second
    posy += 200 * dt
}

// put the game rendering in this function
function draw() {
    cls(bg) // clear the screen
    circfill(posx, posy, radius, color) // draw a circle
    text(10, 10, 'Tap anywhere') // draw a text
}
```

[Play with this code in the playground](https://litecanvas.js.org?c=eJx9k91u4yAQhe%2F9FCP1ovauFZL2LlKu9hFaadtLDBNDQwDBeOOoyrsv4KR2V9FasuSfjzNnDgNj8EI8EHArISINHkghoO21xYoxMMiDhaMLuAVF5OOWMaMJBbd%2FeFx9xJULPeOdG2il6Ggekghp28dqpurPCtJlnPNb%2BARtNbUweMkJW5CBn1og7j1KuLTVpalyXVI6wn6wgrSzEAYbwVmBwKkY7DAZtKlO9cVk2bqBqVbXww7WUIQQhDMuwMMa6s5wcWgKMn3cwfM%2F1DPUJ5W8T1TgUg8xYb%2BBwWZWLI3BSUtSbLMuqHdxTOCvtwwJtIQB3qBOmt%2Fop%2BZGnzP9vqDf79KXO4FITOESCKPFITJyg1AY5yymOOuxhfMtkVxFcdtjnBrQQRjMLnRecUM6HtM2ZAU1%2FwS3L%2B9JddnouOzjfLXph2mDen7EtOO9FmljvpufbU4zUEtamDzyAy4d7rkxMSW%2FBq9HTI8%2BBRVROCvn%2Bj938JSIHyDpno%2BAVmJI0%2FIfL3kOv8ZHmFh3fVNCyyegSEUREKeksre9NqbOUbTFQ3sdlXaao7I2awK%2FdlIWEo5Ub9Yt5Pvxlft08M4nhQEflysyVl3%2BAgslJEg%3D)

https://github.com/user-attachments/assets/854ac6bd-724f-4da8-bb3c-bc04dba5d8c8

## Demos

Try some demos in the playground:

- [Pong](https://litecanvas.js.org?c=eJy1Vlly20YQ%2FccpOl8ATBACuEiWYslFM5DlKkdMkUwkJpVKwcCQnAoEoIChpdiWr%2BAT%2BC%2BHyHlygVwh3TODTZYU%2F0QsDdELenm9DBMmIA%2FjCzgGf%2BA5BuAf0mdEj2vykkivEa%2BQHg01HbNSkALpKc6bMElaj6vmccHfsZZpYk3STUK8yhovpLeaWjVUmTMWIzmoQimjrGi9m%2FA1K5EcKlKwG0EOta4ICyFfX4dJyQwj4YJFYfo2LK33UuOax2J7BMMKhy3jm604gtFTZNzahrG3B9NdKbIr%2BPnd6SWU2S6NS1hnBYgtL2ETXjHSyQsmBGdFn29SjM%2BIsrQU8GL24%2Fk0QPe%2FOOCAz4b05XpDOgbIcGBAHAcOR54WVB8XJe6%2B0t%2F%2F9duHfSyWk%2FmSXHju2EFUYIxIyddGeAzbXsYHnvYsD%2B3IGz1m%2FsXk9evfZqeni%2Bk8CM7Jj%2B8OfZnOGB14rkdeyQ8eB9KbpPqH7iGe%2B3TSx3N9v3oayPfkOZKnTxka610aCZ6lwFMuLBveN42FfqfB%2BTKYXzYdVvNW0Iez4NXLsyXswajTBqhz8eq75RkK%2FIFx2%2FIhwjxnsXXjwB%2BVJ74G6xvdMhWv20Wi2LGGvb6xJPh2zUIEd0UqydvOnHz8aN1glHLq9mBgd0LZ5XEomBWL%2BwNRRgErJLjAsSmjgrH0ea2pJ%2BAYR6KtTJ0J2VtWPDekKrKukMS2ZRRHnLD2pCesyC05zSpmVVm7fjXOUlOglmi9j2SoDaqY6pCk0WcUjzbvSRHDGWzkPQXHiapQrarqpbAyaouq4r1moZzokrcLVbWKv%2B91eNQqBw2rWhnquw9%2Bp6Tdhrd1MSscVK2kVcizklMBW23aO1bL7IneW08gFq2OVeJVV6zWGCL7BndL1N5W2qfiK5%2FYLnew1o7byCgIP3zQQT2rZW2wVJzH0G%2FSbwKoG%2F22KZpK4UFjcmc%2FaqpOKNqy6HeVT5QlCS9pCq652LYbk1yitGCRUDk6%2BmKpA2g%2Fqdala0qeF7iI7HsCbCWr7pEeXXJfEbUEQElt1SZytXcHOS7C63pvRUlpefaji4W2VJjgurXMiKWCFaYD5hUnCEy7o1Vikla11LoiSy9Gp9qGaGM5%2BQGWM3U1oM2hfbeWqvVPaEKbcAjqNU8S60sw6edBbUdmx4tI6j5Ummp3PJDBfRhIhAiCbZhueLq5g4Hl4%2B1F%2F%2Bbfn%2F%2F8569PYLoFy1koVDa2A6P77bI0fsRqtW8q65Zp4jTJ7rBdzHtBUVl4E3v2XST%2F70piVAO8Xc2Xk%2B8DmP0UzM1ODb4wh%2FvEc5%2BO%2F8tqT6G4mM7mwREl%2B1UpY6f%2FC73Is6Q%3D)
- [Bouncing Ball](https://litecanvas.js.org?c=eJxtUstugzAQvPMVewTiBCdtpVYpPVStSu6ReraMiSy5gIyhRUn%2BvQZvg0NzsGTveGdmH0oYqKtGGlmVkEIneLimlNgTkQDsW1Vcmn64HzTr8KpZLtvG%2Fr9%2FDAIljeCs7FgTRkFQtCUfyWQpTRjB0WNBgc%2Fd2z6LNyR7331k%2B2QTbSd2%2FEIRtNDZ42zrnBkR5sbx%2Fhlf%2FcAivajYVwy58fH%2BCu8d7hlzBGhhyvcyPHhKTxJ4raw3AVVRgMgPorFRWUA4OVtgr15gLBtOJ8%2F2EsFnoK6iK0txCsv19kaUrp4exrDXgBS4Yl%2B1p0xwTMQpo1ZkE89zl7Y%2BuPjEzs%2F99KOf%2F9LDyFwKKowC%2FtRyzb5xE7hqQjrOm0vNC6mUb3jiJGj9brYAw27YwnrHpoVpdQnHIWIlfwGU6d0i)
- [Scroller](https://litecanvas.js.org?c=eJxVUMFOwzAMvfcrzAEtacNIxwZDsAPSJoG0AxJIO0w7hDZdI6XN1HhQgfbvOOs22CGJ7ff8nh1rUGeq%2FlSe8SgqtnWGxtVgaoPAOPxEAJX2Xq01TKC30DZzlQZ0YE%2BNFz0itQQvXqbvzxRvlKVsORQjcSvuxFjci1SKNF1Fu38W202uUAPLsbNB6pnNn17fZlPKvPnWR8nrwwR9q%2Bs1loSWBI3k3vZqAjdSQgw5nsnnjfo6bpBZzySnoHANMKsRDAnIB3oe4VycaknSdQEEJoa5MGGyn8aGn8p0UDcEHdv99sNjw4yA9I%2BVOesCiX5kWVjnGoYYjy4pPdjx1Z6LusWwMQsXP5VYpVrWChhInpg4YLHsjwWUyUAm3tRBbcjjUhzGEZ1hENjRZ%2FwCV%2F6J0w%3D%3D)
- [3D projection](https://litecanvas.js.org?c=eJyNVUuP2jAQvudXTA%2FVOsU8y6kt7WVXhftK7W6Ug0PCYggOckxhqfjvHT9CYjYslRC2Z75vPJ5Xcq6yORN%2FWEnCIFjsxFzxQgAXXJEQ%2FgYAORfZnqdqSUYhHkt%2BzGACv2b3j1P4DtOH2c%2FpI%2FyoNn0YwxenxT0StrJYZdbqBCIUAERDCgP8xdQecT%2F0j1pijrG2UHChyprd1T5QaC4xhX4fogOFVwrH2OLaYE1Ni6J7S9MA%2BMauKt7Ku62KuI5VlurHagETL7kO9yA4NbKz26ZMZSRVNkMW1EFUbzAMULAoJJA8U8A19Ssu31wQe3kmXtQSRZ2OJQPMC1Eq1OsIG9Row5TkB9Lr9Swr4nFooNqmLBSzHiJss8uJEaBbv4lxJKTalsVfxT6dsQ5yA%2F%2FcjneuV1Eb3dfMuuwuOGc0vkq%2FuCaj%2BuTFOZVs77pgnpdkEOrgbnflkmhTSjJR5joRVbmPaN0GplnaEjG%2BDL7A6wmnQDh0YBjCRxjT2q3QhyEEtaSBDa3oGoECbwGcTFtt8R3N91YkRiGhrmLqIUBcMbA4GuhfhdCCoSdILhHJGfHZv9ElS1%2Fo4mwyyuZFrsuRIceVbK2Txd7oLhWJIyUtpMSRkkqBGr4AYi%2F6MJlYRAhqiSvgxIMHKQtJ7mY4G3Oegu2JrLwzRWCtyqysGrUt08ZTL9tIsFUX2RF1Zq0sa4Us8wzc1izbd%2BVuYwaBlZyZa8tc6%2Fssc91kguF1dCh5HK1j%2BITxWcfRKnaAk1utayhHe0gJKt1JP1dmaieFxnjZqztfspRjN9h7HfrqrJ8X5ZlgBqdoHJtAX%2BPTBm5otvnz9J4%2FF2b8W658kS599J15x5Pn%2F%2FfkWhxuB%2BHNJ7PpiTfR3ffRdyY6YF9Gr%2FrvGGvyP3c3Xb8%3D)
- [Rendering Benchmark](https://litecanvas.js.org?c=eJylVVtv2jAUfs%2BvsNikJG0aEqAdZcBUdd1F6i7aRXtAaDWJAasmYY5pyVr%2B%2B47tNBia0m7zA9j%2BvnN87onSJBMoShPBU5ahHorTaDEjifAjTrAgZ4zIk2PH9Mp2rTuiT5OE8HffPpyDyIXVBbRvIVjdDPBk0j%2BZpYtEdLr14qxBjKacjHu1V1jBvTAIan346dbxA4xDyTjcxQBxqeTyYUZDMRo7GC3FaO1gtBWjvYMRHmlDjnZwmtqUZmFLt67iJqOHMpEz0qvN04wKmiYdxAnDgl6RWqErwskVzhCNe7Wo1u%2FW9flOyYVVJm6UxrmP53OSxM5dvlxrC1fP%2BVHKUg4ZtJ%2BFYWhXUkY4upxwsD4%2BLcnj8di2LEYEWnAGNwm5Rt%2B%2FnDssjbA03vWUyZmAAgL4Rp3kilRRoH0Q8zOCeTT9jDmeZf6EQInpINkuur1FkFWvFLumsZh24K7RWl9OCZ1MQVmrXTBXYBIVRMfF0Y8WksoSXx00905YA%2FqkES3eAS8j21pB3MaLJJJOIZpQ4biFN28%2Bf%2F354ezb2Rc%2Fptmc4dwRfEFcwNau%2B9mcUxWBOabQQ6XpYcOr3A%2FKnVy2D6sFS%2F7bXgWG8QNYEEgsCCqxhtTZqMBewGrCOoR1Dzs6etEMw%2BbhaPR32A6d0pZjWFW2SB%2BO2%2B3jah98X2IPxUXq3MKG6%2B3NhkAWYUY6qLnGV2rnmmmkv2USzZzqWrIUqV5HUMWCRowgNTShWHQpqdk6L7CsaJQTzqFatDLVD65BjqnssEHooYNwqO7H0HOObDUKQPAS%2FrrIEIaL%2FX13o8WkniWQOYYB4KI9s%2FrRgeHTlkx%2BX0Y3xi6hQbz0UJwPpdUbgVWawI%2Bm1AZuDeQFdQIPhe7Q%2BxfqsNyVIR1Q%2BfANAhtyMEOZUiRwZRkZNHNQ7i0j7owml%2BbH79eC8PwrYSQSKXcuBptj%2FPmNkYFVbXihU0jHkClQZKZDnotJOoZZ%2FEMHFIboKGWxXVi6MqZMzPF1OWWgtE4ZzEkkpqSYTNpoljmBa5Wvnn86ef3%2B41sXPhpiwZP7dYkTOttVmFth%2Bo%2FK42aIIT9WiXN%2FiQ6gxPx4adzlxV2%2BJkqPJLmLAnerXeU1GLN1Fy%2FRXg86Zt3DiLCMFIryakV5laJ8W9F9q%2FbNqdA3m6va2Ee772k%2BVD6r%2B7Pat8c7%2BAk%2Bz%2FCESK89qdTbGIFuWbx%2FAI20sBc%3D)

_See other demos in [samples](samples) folder_

## Inspirations

- [floppy](https://github.com/lpagg/floppy): a micro game engine for beginners.
- [PICO-8](https://www.lexaloffle.com/pico-8.php): fantasy console for making, sharing and playing tiny games.
- [js13kGames](https://js13kgames.com/): a JavaScript coding competition with size limit set to 13 kilobytes.
- [raylib](https://www.raylib.com/): a simple and easy-to-use gamedev library.
- [p5.js/Processing](https://p5js.org/): a library for creative coding.
- [Pygame Zero](https://github.com/lordmauve/pgzero): A zero-boilerplate games programming framework for Python 3.
