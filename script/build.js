import fs from 'node:fs'
import esbuild from 'esbuild'
import { minify } from '@swc/core'

let size

fs.rmSync('dist', { recursive: true, force: true })

await esbuild.build({
    entryPoints: ['src/index.js'],
    outfile: 'dist/dist.js',
    bundle: true,
    legalComments: 'eof',
})

size = filesize('dist/dist.js')
console.log(`  dist/dist.js (${size})`)

const minified = await minify(
    fs.readFileSync('dist/dist.js', { encoding: 'utf-8' }),
    {
        format: {
            comments: false,
        },
        compress: {
            drop_console: true,
            // unsafe: true,
        },
        mangle: true,
        // sourceMap: true,
    }
)

fs.writeFileSync('dist/dist.min.js', minified.code)
// fs.writeFileSync('dist/dist.min.map', minified.map)

size = filesize('dist/dist.min.js')
console.log(`  dist/dist.min.js (${size})`)

function filesize(filename) {
    var stats = fs.statSync(filename)
    var fileSizeInBytes = stats.size
    return (fileSizeInBytes / 1000).toFixed(1) + 'kb'
}
