![logo](https://github.com/user-attachments/assets/cbff543a-17be-44e4-b4ce-f9ff0a0581bb)

# Litecanvas

Litecanvas is a lightweight HTML5 canvas engine suitable for small web games, prototypes, game jams, animations, creative coding, learning game programming and game design, etc.

:warning: **This project is still under development. All feedback is appreciated!** :warning:

[![Discord Server](https://flat.badgen.net/static/CHAT/ON%20DISCORD/5865f2?scale=1.5)](https://discord.com/invite/r2c3rGsvH3)
[![Discord Server](https://flat.badgen.net/static/FOLLOW/ON%20ITCH.IO/fa5c5c?scale=1.5)](https://bills.itch.io/litecanvas)

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

```js
// import the package or put the CDN script in your HTML
// CDN: https://unpkg.com/litecanvas/dist/dist.dev.js
import litecanvas from 'litecanvas'

// Start and setup the engine
// learn more: https://litecanvas.js.org/about.html#settings
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

- [Pong](https://litecanvas.js.org?c=eJy1Vlly20YQ%2FccpOl8ATBACuEiWYslFM5DlKkdMkUwkJpVKwcCQnAoEoIChpdiWr%2BAT%2BC%2BHyHlygVwh3TODTZYU%2F0QsDdELenm9DBMmIA%2FjCzgGf%2BA5BuAf0mdEj2vykkivEa%2BQHg01HbNSkALpKc6bMElaj6vmccHfsZZpYk3STUK8yhovpLeaWjVUmTMWIzmoQimjrGi9m%2FA1K5EcKlKwG0EOta4ICyFfX4dJyQwj4YJFYfo2LK33UuOax2J7BMMKhy3jm604gtFTZNzahrG3B9NdKbIr%2BPnd6SWU2S6NS1hnBYgtL2ETXjHSyQsmBGdFn29SjM%2BIsrQU8GL24%2Fk0QPe%2FOOCAz4b05XpDOgbIcGBAHAcOR54WVB8XJe6%2B0t%2F%2F9duHfSyWk%2FmSXHju2EFUYIxIyddGeAzbXsYHnvYsD%2B3IGz1m%2FsXk9evfZqeni%2Bk8CM7Jj%2B8OfZnOGB14rkdeyQ8eB9KbpPqH7iGe%2B3TSx3N9v3oayPfkOZKnTxka610aCZ6lwFMuLBveN42FfqfB%2BTKYXzYdVvNW0Iez4NXLsyXswajTBqhz8eq75RkK%2FIFx2%2FIhwjxnsXXjwB%2BVJ74G6xvdMhWv20Wi2LGGvb6xJPh2zUIEd0UqydvOnHz8aN1glHLq9mBgd0LZ5XEomBWL%2BwNRRgErJLjAsSmjgrH0ea2pJ%2BAYR6KtTJ0J2VtWPDekKrKukMS2ZRRHnLD2pCesyC05zSpmVVm7fjXOUlOglmi9j2SoDaqY6pCk0WcUjzbvSRHDGWzkPQXHiapQrarqpbAyaouq4r1moZzokrcLVbWKv%2B91eNQqBw2rWhnquw9%2Bp6Tdhrd1MSscVK2kVcizklMBW23aO1bL7IneW08gFq2OVeJVV6zWGCL7BndL1N5W2qfiK5%2FYLnew1o7byCgIP3zQQT2rZW2wVJzH0G%2FSbwKoG%2F22KZpK4UFjcmc%2FaqpOKNqy6HeVT5QlCS9pCq652LYbk1yitGCRUDk6%2BmKpA2g%2Fqdala0qeF7iI7HsCbCWr7pEeXXJfEbUEQElt1SZytXcHOS7C63pvRUlpefaji4W2VJjgurXMiKWCFaYD5hUnCEy7o1Vikla11LoiSy9Gp9qGaGM5%2BQGWM3U1oM2hfbeWqvVPaEKbcAjqNU8S60sw6edBbUdmx4tI6j5Ummp3PJDBfRhIhAiCbZhueLq5g4Hl4%2B1F%2F%2Bbfn%2F%2F8569PYLoFy1koVDa2A6P77bI0fsRqtW8q65Zp4jTJ7rBdzHtBUVl4E3v2XST%2F70piVAO8Xc2Xk%2B8DmP0UzM1ODb4wh%2FvEc5%2BO%2F8tqT6G4mM7mwREl%2B1UpY6f%2FC73Is6Q%3D)
- [Bouncing Ball](https://litecanvas.js.org?c=eJxtUstugzAQvPMVewTiBCdtpVYpPVStSu6ReraMiSy5gIyhRUn%2BvQZvg0NzsGTveGdmH0oYqKtGGlmVkEIneLimlNgTkQDsW1Vcmn64HzTr8KpZLtvG%2Fr9%2FDAIljeCs7FgTRkFQtCUfyWQpTRjB0WNBgc%2Fd2z6LNyR7331k%2B2QTbSd2%2FEIRtNDZ42zrnBkR5sbx%2Fhlf%2FcAivajYVwy58fH%2BCu8d7hlzBGhhyvcyPHhKTxJ4raw3AVVRgMgPorFRWUA4OVtgr15gLBtOJ8%2F2EsFnoK6iK0txCsv19kaUrp4exrDXgBS4Yl%2B1p0xwTMQpo1ZkE89zl7Y%2BuPjEzs%2F99KOf%2F9LDyFwKKowC%2FtRyzb5xE7hqQjrOm0vNC6mUb3jiJGj9brYAw27YwnrHpoVpdQnHIWIlfwGU6d0i)
- [Scroller](https://litecanvas.js.org?c=eJxVUMFOwzAMvfcrzAEtacNIxwZDsAPSJoG0AxJIO0w7hDZdI6XN1HhQgfbvOOs22CGJ7ff8nh1rUGeq%2FlSe8SgqtnWGxtVgaoPAOPxEAJX2Xq01TKC30DZzlQZ0YE%2BNFz0itQQvXqbvzxRvlKVsORQjcSvuxFjci1SKNF1Fu38W202uUAPLsbNB6pnNn17fZlPKvPnWR8nrwwR9q%2Bs1loSWBI3k3vZqAjdSQgw5nsnnjfo6bpBZzySnoHANMKsRDAnIB3oe4VycaknSdQEEJoa5MGGyn8aGn8p0UDcEHdv99sNjw4yA9I%2BVOesCiX5kWVjnGoYYjy4pPdjx1Z6LusWwMQsXP5VYpVrWChhInpg4YLHsjwWUyUAm3tRBbcjjUhzGEZ1hENjRZ%2FwCV%2F6J0w%3D%3D)
- [3D projection](https://litecanvas.js.org?c=eJyNVUuP2jAQvudXTA%2FVOsU8y6kt7WVXhftK7W6Ug0PCYggOckxhqfjvHT9CYjYslRC2Z75vPJ5Xcq6yORN%2FWEnCIFjsxFzxQgAXXJEQ%2FgYAORfZnqdqSUYhHkt%2BzGACv2b3j1P4DtOH2c%2FpI%2FyoNn0YwxenxT0StrJYZdbqBCIUAERDCgP8xdQecT%2F0j1pijrG2UHChyprd1T5QaC4xhX4fogOFVwrH2OLaYE1Ni6J7S9MA%2BMauKt7Ku62KuI5VlurHagETL7kO9yA4NbKz26ZMZSRVNkMW1EFUbzAMULAoJJA8U8A19Ssu31wQe3kmXtQSRZ2OJQPMC1Eq1OsIG9Row5TkB9Lr9Swr4nFooNqmLBSzHiJss8uJEaBbv4lxJKTalsVfxT6dsQ5yA%2F%2FcjneuV1Eb3dfMuuwuOGc0vkq%2FuCaj%2BuTFOZVs77pgnpdkEOrgbnflkmhTSjJR5joRVbmPaN0GplnaEjG%2BDL7A6wmnQDh0YBjCRxjT2q3QhyEEtaSBDa3oGoECbwGcTFtt8R3N91YkRiGhrmLqIUBcMbA4GuhfhdCCoSdILhHJGfHZv9ElS1%2Fo4mwyyuZFrsuRIceVbK2Txd7oLhWJIyUtpMSRkkqBGr4AYi%2F6MJlYRAhqiSvgxIMHKQtJ7mY4G3Oegu2JrLwzRWCtyqysGrUt08ZTL9tIsFUX2RF1Zq0sa4Us8wzc1izbd%2BVuYwaBlZyZa8tc6%2Fssc91kguF1dCh5HK1j%2BITxWcfRKnaAk1utayhHe0gJKt1JP1dmaieFxnjZqztfspRjN9h7HfrqrJ8X5ZlgBqdoHJtAX%2BPTBm5otvnz9J4%2FF2b8W658kS599J15x5Pn%2F%2FfkWhxuB%2BHNJ7PpiTfR3ffRdyY6YF9Gr%2FrvGGvyP3c3Xb8%3D)
- [Rendering Benchmark](https://litecanvas.js.org?c=eJylVu1z2jYY%2F%2B6%2FQkd3Z7shAgOhCQXvctlu61229ZrtE8ddhC1Ai7CoJJK4Kf%2F7HknGGHBot%2BkDSM%2FLT8%2B7nIhMaZSITEvBFRqhVCTrJc00TiQlmv7MqTkFfsoe%2FdDbCmKWZVT%2B%2Budvt6By7w2VzjmNPYJJotkjRS8egjUD6fMnyuYLPUBTwdP33sYbtgrhIUDGVg7Upcjm8fVSrDM9MBL27JgELSSdjRo%2FEsseRe12A6VEk%2FOC0DCUGH6GLfKKzsWRjqHEF6d0ALDmInPTw%2BtKnWMlS4o7J5R6x0qWFPdOKF0eK1lSfHlCKerXONV3XvVP6HVr%2FHK0uFt4NmzZfJqsIpvhUWMlFNNMZAMkKSemMBoFvhFi6aihNNGqERe6lpWQ7JEoy00Mx523%2BPdeWaBTkeZ4JemKZmmwLczwgG8twYngQkKl%2Bm%2BiKPJrRaYkeZhL8Cy9KYVns5nveZxqtJYcKBl9Qn99ug24SIjxK2xak40TFNiu6M3S%2BYoOkK9WkmnqN0t6YusbnQEcVpTIZPGRSLJUeE6hxVxg%2FRB9%2FYqg0nZqTyzViwHQOr0dcVH0Ve%2BykNzsrDGNnK05B%2BPBABfBwJlXYFmbsT04tS2cY7iT4zj1wW4yfF5Tmd9RThMtZOC%2FSWAwbELPm62zxIQFsYzpICziwQVJ7xLJVuDhQuuVGrRaS5kKMcVzphfrKWaiZY3Gf6vWdM14WhyXLAOS30SANYrL8JYOQjbuzL5Kx2ohnj6SjPKgHe4xUrEsUr0tS5NjMlWCryFJheyrTloQP8RkZertZgFmBiWwu8nEoKwH7JIPd6wIgwFa5i3qNGv343Jnlo9h9WCZ%2F0oF7XiEvMJrtw2v3a7ldQxmp4b3DlYX1gWsI16%2F%2F64bRd2L6fTf8U5gGluuYNXZYny4ury8qvcBY8N7LS4G84A32W1f9hRUQjj0aXfH39hdWE0j%2B2KSWM2paxuX61YLQQtrlnCK7IsJdeW6xj6sq4K3rddrKUkeODA7DMKKcMrM2BlHTXQeTYoHVKLAzB8GjPZ7%2BBuiijIQzs7CilMO5xmEJYGhGKK31UZH5xWfDnTyYx03A04pjdPnJkrzibF6L7AWCfzoGjRwa2wILGg3URROmv9FdFLuypCOmbn4BYENOZhhTSkSuKk2YjUH5d6rxJ2z7KH65bPf%2BvfjvVfvh5dKAjaNyb3LIJtBogCnmg1zxgknSt0ypTFJU5jx9vvILwZGaYSAscTFPLj%2FBMOFSpbN0f5FyJWegsqGGzeVYZtK8lQOWyjHGw4PC9ILWgxudwdXZh6Wpt7%2Bcf3Th99%2FCeFh1muZ7cKl8JTOWRaEx%2BVNMrY8Vd8H0f4fBSyrmYI0eyVf4md0DpWK0%2BcKLS9o%2BU7QOGmEh6gdHnS9IYMxB7T0Gb0dQePtRgGiXNECKK8HyuuA8kOgY6vOqsMlrvZovbHfbOLv86H2Wtfm9b59exB8h89LMqfG66YBbe5N0vCwWxU2H3OmwP8BV89smg%3D%3D)

_See other demos in [samples](samples) folder_

## Inspirations

- [floppy](https://github.com/lpagg/floppy): a micro game engine for beginners.
- [PICO-8](https://www.lexaloffle.com/pico-8.php): fantasy console for making, sharing and playing tiny games.
- [js13kGames](https://js13kgames.com/): a JavaScript coding competition with size limit set to 13 kilobytes.
- [raylib](https://www.raylib.com/): a simple and easy-to-use gamedev library.
- [p5.js/Processing](https://p5js.org/): a library for creative coding.
- [Pygame Zero](https://github.com/lordmauve/pgzero): A zero-boilerplate games programming framework for Python 3.
