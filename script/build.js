import fs from 'node:fs/promises'
import esbuild from 'esbuild'
import { minify } from '@swc/core'
import { gzipSizeSync } from 'gzip-size'
import * as prettier from 'prettier'

await fs.rm('dist', { recursive: true, force: true })

// build the dist.dev.js (for development)
{
    const filepath = 'dist/dist.dev.js'
    await esbuild.build({
        entryPoints: ['src/web.js'],
        outfile: filepath,
        bundle: true,
        legalComments: 'eof',
        minifyWhitespace: true,
        drop: ['debugger'],
    })
    const formatted = await prettier.format(await fs.readFile(filepath, 'utf8'), {
        parser: 'babel',
        tabWidth: 2,
        semi: false,
    })
    await fs.writeFile(filepath, formatted)

    console.log(`  📄 ${filepath} (${await filesize(filepath)})`)
}

// build the dist.js
{
    {
        const filepath = 'dist/dist.js'
        await esbuild.build({
            entryPoints: ['src/web.js'],
            outfile: filepath,
            bundle: true,
            legalComments: 'eof',
            minifyWhitespace: true,
            drop: ['debugger', 'console'],
            dropLabels: ['DEV'],
        })
        const formatted = await prettier.format(await fs.readFile(filepath, 'utf8'), {
            parser: 'babel',
            tabWidth: 2,
            semi: false,
        })
        await fs.writeFile(filepath, formatted)

        console.log(`  📄 ${filepath} (${await filesize(filepath)})`)
    }
}

// build the dist.min.js
{
    const minified = await minify(await fs.readFile('dist/dist.js', { encoding: 'utf-8' }), {
        format: {
            comments: false,
        },
        compress: {
            drop_console: true,
        },
        mangle: true,
    })
    await fs.writeFile('dist/dist.min.js', minified.code)
    console.log(
        `  📄 dist/dist.min.js (${await filesize('dist/dist.min.js')} ~= ${gzipsize(minified.code)} gzip)`
    )
}

async function filesize(filename) {
    const stats = await fs.stat(filename)
    return (stats.size / 1000).toFixed(2) + 'kb'
}

function gzipsize(code) {
    return (gzipSizeSync(code) / 1000).toFixed(3) + 'kb'
}
