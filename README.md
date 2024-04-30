# litecanvas

Lightweight HTML5 canvas engine suitable for small games and animations for people who enjoy coding: there is no fancy interface, no visual helpers, no gui tools... just coding.

:warning: **This project is still under development. All feedback is appreciated!** :warning:

You can try our [online playground](https://litecanvas.github.io) or just installing the [basic template](https://github.com/litecanvas/template):

```sh
# requires Node.js
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

-   [Pong](https://litecanvas.js.org?c=eJylVUtS20AQ3fsUzUpSLFvCNp84GMoVDCZFMIVdYC%2BFNLInyJJLGmMqAa6QE2SXQ%2BQ8uUCukO6ZkSxTsEhlgeme6X79mdetiAvme%2FG9l5nfKgArHohZG5oN10Ztxvh0JtrQ2ncrT1alEi5jX%2FAkBh5zYVpAHgsvuIEObDdcpfRJ2VHymGRXX0xQaTVJCVgm6IosUL31oojUj72LUe8qP5kUJxOoQb93dtofgQMtfT3kX1keifRuPI3oQOLzVEZW4kSL2YKxAOWGTCjzkzS3j3jIMpSbKAv2IDS2rCgTXiqkX%2BhFGauQeeIFJ0ksTGPIo7vMTxmLDRuMmRCLrO04Id5l9Sl6Cu7X%2FWTuZE5WWDr3LWe%2B%2F2n8Jby%2BDHcbY36ydzeo8feT84vIW9VXSRg2EM1MWWZB51D2GICH%2BoTyC18Gt9AG3%2Bep9ELLReAJZgZCvRL5nw%2B6x2cXpxakTCzT%2BIM%2B3tIlWjrUuuJR9%2FKydywPlQuF0V66Zx3sYA4IjgNTb84guWfpEXUKD2ZeHODD8HixFJn2JVyZiAqY0%2BH5mW7G%2BNqSUw40ZF0aaI6oIGaMLhFRQ0mSbWEWEiRH1NSLWLqQFra6tsGtuztl0CCJDYF2ooSMqqdDqfaWQx1QuRqe6MGQE%2Bvbqsr8EG7Ojkf9wlBquqyKRlMUr665fKg5nteQT8X2rlvoROU9peacVf9rkuH4duFD%2BWXgCJrQ3uyjIoaEg0WScWJLMYTVjhqed3pa3kEginlUl5PNSwV6myDvNCiSb6NvGrlcqWrI46OOelDcFZSQSXSgti5Lv1u5e6%2F65eO%2B4aWy9GfMv1NJ%2BkkU8YwGZcXFbJNTeJcyX6jEbVW8XYQqS4pbtNvk74387VsvssmLkBunShuxSM9V6ZUHN0i9lV6tPjIxVTb%2FML%2B0IbyIT2PT8FksWEq7ac6pQLkolIWpt62dL1k0wumD0QCGo%2B7VCJ2aNjRU%2F9Y0V%2BQ6pCl4Gc3Si8IXIY8i8%2FXeIKqy83nqS7u3urxbyhW%2FRkB%2Fxu8fP%2F%2F8%2Bg4G0klmYkPLLlZ2yUFKUAwefoNsfdQoJNMgGPkqVh1zG1IbzV1cElZu0syFPIRUS3HyADuYnP5E1VSmJ5fDNuGbKBDTERR2bPxMlhr6X%2B9FgRDQOO1%2B7sHgundVfrG3fKrKRxbdhqJ%2B5VmQ8S%2B%2Fqjqk)
-   [Shockwaves](https://litecanvas.js.org?c=eJyNU01r3DAQvftXTG9y67jeNIWwxIFClm6g0EICOZQeHEnuqjWSkeTsmuD%2F3tGXbbqXHIw8M2%2FmvRmNOmE5beRLY0ieZR23oJ7%2FcGoN1PDzl3dQNUjLNTqqLGsHSa1QEoaeNZYTZnN4zQBEC2T37cuPh90dXMwpt1CVl58DAoBqjikPB0X%2FHpsXjoTeO5eP%2Beid8GuVBkKVNF4SqDYpS%2BXQLBcVPmtaCWS6OZKApR1vNNlssMM31O0Hc4jaHEWoEyKqJ%2BdEZ20Fzpmhhu%2BeoGyMEb8leZ0KMAntyjmWXhmiG8kEqQp4ur973OcFzI797v7r%2FjFPYNNzzrBuiF9XiLisqiqGXS%2BlbwKN3EkNWmZOzHQKT1uoCjzHeOqGicFE41lpxvWTYPawhU%2FeRVWn9Bau3L9XsIUNsjrTqT8VMKYR2oMw5Ql5Tos5ojm64bmE%2F7Yn7I%2BHrYjhBlcuAVAft4OWoRjjxmo1xnuZFpbQBHyogxkm9R6YXSBrhos60gbgR7jOE9rrXC0RQCckP7q0M6Vxk4WmIYSzCD0Xa1XR8HPMZ4bUybLV8fmlq2xFh%2B%2BDEJVDfQsK3tWhuVhiyv4BBm8dRw%3D%3D)
-   [Scroller](https://litecanvas.js.org/?c=eJxVkEFLAzEQhe%2F7K8aDNJvENW0pFNSD0IKCB0Gh57ibdgNpIptZXZT%2Bdye73dYeQpJ5732TibNoSu2%2FdGR5lm1bX6INHqy3CCyH3wxgb2LUOwMPMNkYV4a9AQzgTsGrCZk6kjfPq%2Fen7PAP035WGg2wCgcUkmv98vj6tl7RLdofM8Zuj10KZ%2FwOa1JrkhaqR9%2BkE3Co8IJeNfp7fGTpjG6YohkAtqEB5gyCJYS6o%2B0eLvFUE2IIAiQnppehYKqYcpufyrTQNCSN8dh%2BRGyYlTA9u8rgQm%2FSHZtLYvHF9XKQ0XTIUr2TMFO5sDwNzVWxlFCLmRLRekaBec5reWwnB6Ds%2FydhDjT1H73WemM%3D)
-   [Paint Pixel Art](https://litecanvas.js.org?c=eJx1UMFOwzAMvfcr3gXRSpWWgRBVJb4EcTCpt0a0SZS4bNO0f8drB5QDjg9%2Bfu85sgcnbMl%2FUi7PBXBwnfQtHh9qBT27fS%2FfKLojD5QUS5r42tlsQJOEbGngFjsasrYvVVEoMdIHg9Acm8UIdRY2%2BCwYT1rjBZGcl7Kpofm6jGOyPWxPCS6re3auGD%2BN73zjbBhCwi6FEQYS8LzoxMUWU2bwGOU0zyIraipzJMvVVbo15k6XIK%2BtxF7UeQ8YDS3qGZknDXNDCsz1%2FaCZ%2FOXMP9zfKasf3vRGu8lbccFjih0JlxXOywZdgA%2FSO78vLitZl%2BhwE9mBKZXbSks30p5LU0Nzvmulpi8dfX6%2B)
-   [Paint Image](https://litecanvas.js.org?c=eJxVUMFOwzAMvecrfExFYWWDgSZtl2lXDogDHK00bS3SpEpcJoT679TZQNvBkV%2Fe83tOHLE16L8w6R8FcKSauw2sllU5o85S2%2FE%2FxJFDMujsBhp0yaqpUGqxgB4%2FLSBQj61VJvjE0H9nBFsYkDzr9UMJUrqA7Q4kyVA0DTmnV8sS%2FuqpuGQe16fbee65yGHN6A1T8ECeePYSI%2FStk6BKTReCcaiR7ZXkZtbcVfdXsjri8SwyzmLUlWwwjKnT0nBEn5wY7Q8vb4fX9xJOzYewMbBQ2V1wfrK%2BlZXzcf6E7BiG2XBSv8BcaDI%3D)
-   [3D Projection](https://litecanvas.js.org?c=eJyNVU2P2jAQvfMrpodqnWI%2By6kt7WW3hVulrtTuRjk4JCyG4CDHFJYV%2F73jj5CYDUslROx579njGc844yqdMfGXFSRoteZbMVM8F8AFVySAlxZAxkW644lakGGA04IfUhjD7%2Bnt%2FQS%2BwuRu%2BmNyD9%2FKQQ9G8MmhOEbBRubL1K46hhANAOGAQh9%2FEbVTHA%2F8qbaYaaRXyLlQRaXuaB8o1D8RhV4Pwj2FZwqHyPKaaHWkAehcQ2oEf7GLwGt7pxGIqliliT6sNjDxlOlw91vHWna2m4SplCTKZsiS2sjq9gctNMxzCSRLFXAt%2FYyfLy6I3SwVT2qBpnbbigFmuSgU4jrChjVcMyX5nnS7XasKeRQYql5T5opZD5G23mbEGNCtP8Q4ElC9luVf5D6cuI5yhf%2FYzHeul1Eb3lbK6tqdaU5sPJU%2BcSVG%2BOjFOZFs56pglhWkH5gUYUSIvaLff%2F6iMAp0yDfbYkE0riQTRabTUxbBkFbFYUqoKT2j85QIdIpwCoRDGwYBvIcRrZwNfBpSECU1bmBNlwQUeAPhaIptg%2BeoR6EUMQoxdfeoag3EXREWhX39KxnaMPAM8TkjPjE%2B%2Bju6FOoNXfRNntksz%2FQlZahxF7nCZL4z2DkQO1HcIIqdKC4BRPgciN3o3XhsGQGoBX4B%2ByDcSZlLcjPFjpnxBGylpMWNuQR2VZkWZfk2Zdp46mUbBfYuhrZxnVRLq1qiyhwDh5XKVmOxXZv2YC0n5coqV3o%2Fq1zVlWB0bR1KHoWrCD5gfFZRuIwc4ei%2B1jW043ooaZXYUR9XpmorheZ42av6gWQJx2qw%2Bzr2xRdglhcngWmnojatE33El%2FVdK23y5%2BEtf86W8Xe58E6d%2B%2Bg784Ynj%2F%2FvyaU4XA%2FCq4e07onX592r6TsT7rEuw2f9d4i0%2BB%2FEGGLo)
-   [Clip](https://litecanvas.js.org?c=eJyNUMFKw0AQvecr5rhrF9nUlh7UQ6GxKYgEWlAJOaTJxg6ETchuNVX67042MdSDIOyy7z123sy8Eq3KUv2eGsY9rzjqzGKlATVaxuHLA2jhHnwpCZ0ILeYeoX3VKkMsTogUVQOsVBaQFHlLzx3MZQcmk95iKLiuj%2BbA4ibVOTIp4Hmz2oVcwCiEwWYd7kZlJmDBE04GZ%2B98MdyxzlOrWG57dyyA7ZZRtHla%2F7TrZibpxZFTT16dD4DBT0VKujfMoGbB4zLaBivO4Yqmhonb9bJb3qQfQxRZaZjs5nGLcKdgnWGTsVbASThvPny84X9k02dRKv1mD79CalRmCyxL5n7EmMQyETASn8h03t9RnLp8%2Btp%2F1Pl8SKGuareAVa3toqfzEG0FzDgt%2Fw2DoJGU)
-   [Clock](https://litecanvas.js.org?c=eJx9VF1v2jAUfc%2BvuI8OZCQE1k1jfdgKG0j7qDqkbk%2BTlRgSNTgoNi3t1P%2B%2Be20HHFrxEMW%2B99zj4%2FvhuNcLoAdXVZ3dDYCW9H3mSuRQSyi03qoPcbxt6kwoVcr1oG7WsdjzzbYSKs5MXKE3FYbFQVVqkXF5zxULg6ASGrJ9BNljhKygRFbLXN3wvNypCA2bUu608AxFvWu8rSGflnwjtGjIsLz9%2Bfd6AZeQosbrBZnmn759sbbrRZwGwWonM12i8kao8knkLIR%2FCGsMKaLwTHa7mC7nEcxni6%2FzZQgxpJNTeYh0IT1IBu8MoCO3C7hIJl35Xfdb4%2B5cxwcMB%2B%2BNf4%2FGq9mP5ezmt9k%2FHvZ%2FJsGzd7e84Q%2FuYlmlWBJOAlqWTcbafHcOi9MIUgeqpdKQcy2QXIoHmOJycnC4JKCPIIO10L%2BshYVHkEuEB%2FpuLT6IkuEh5pQb5msw1eBb5o6MIIngIjE%2FW%2BcQ3rTl9c52Ua2GPsi62ZyQhOfJ4CjSsRmxjsoxd6jSsUeFFUs72pAujmGKRQFdCCg4ZbBemY2pAwKqEpNd5rpgQ5Mk2h%2BLtcfDs1oxFSJ5d06oDfqAk%2FeacwQHMkueniHfUHx35o7krzlHJ%2BTjM%2BQFxfvze6R%2B6RqFL5JmjwZdZncKXau6AUbvB8cKJRP8fYTRBS36l6PEtj5KIYBcV9TLuVinOFGMG5HWRwN1UGiAL1J4BNO0HTSfA9OcrcqqYpgDTMG4TdRzZ0aprWQESvNGD%2Blfb4dum9pt6ibYdCLm%2BJ5XKIFJbC0bRU8TM4GeqWdNaWtClr5bkYhyRX7aYca8U%2FAJFHrXSGxIfLqZPe5Uj7kFiEqJ8zGIbUNfubmZovbqFu4eYcvmZ8a6zXDRXDxjX%2FwH0M711w%3D%3D)
-   [Bouncing ball](https://litecanvas.js.org?c=eJxtUj1vwjAQ3fMrbnQgkEBbqVWaDlWrwo7U2bIdasl1UOKERsB%2Fr7GviYEOHnzP7%2BPurKQRjOqONiSOIiUM7KpGGllpKKATjCyyLLEndlgnVMWk6XN329a0Gy415bJtLOn%2BMYrKVjOnIbU0JIZDBAMXdT%2FXb5vVZJms3tcfq026jHP7BhXxSYaghU6BZrvj1AjCjdf9yzv%2FgWkxuNjbBLgJ8f4C7z0eBPMCGGHkB4wAHulpCq%2BVzSagKksQfCsaW5UlkDHZFKfzAq5tOB6D2DMEnyHzHV1EmhQwW%2BT%2FVLP504MrBwMogCn6vQucE1xM4p3RK7bE03VK2x8MOXHy13l6l%2BfW%2BrwyT0EHZxBujdd0jz%2BBqYZkbt9KarGX3HwRv38ma1ZKpcIGRo8EW7m7%2BhDnv2Ib7b16LUxbazicKzbCL88d5VM%3D)

## Inspirations

-   [floppy](https://github.com/lpagg/floppy): a micro game engine for beginners.
-   [PICO-8](https://www.lexaloffle.com/pico-8.php): fantasy console for making, sharing and playing tiny games.
-   [js13kGames](https://js13kgames.com/): a JavaScript coding competition with size limit set to 13 kilobytes.
-   [raylib](https://www.raylib.com/): a simple and easy-to-use gamedev library.
