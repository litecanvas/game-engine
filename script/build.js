import esbuild from 'esbuild'
import fs from 'node:fs'

let size

await esbuild.build({
    entryPoints: ['src/web.js'],
    outfile: 'dist/dist.js',
    bundle: true,
    legalComments: 'eof',
})

size = filesize('dist/dist.js')
console.log(`  dist/dist.js (${size})`)

await esbuild.build({
    entryPoints: ['src/web.js'],
    outfile: 'dist/dist.min.js',
    bundle: true,
    minify: true,
    legalComments: 'eof',
    sourcemap: true,
})

size = filesize('dist/dist.min.js')
console.log(`  dist/dist.min.js (${size})`)

function filesize(filename) {
    var stats = fs.statSync(filename)
    var fileSizeInBytes = stats.size
    return (fileSizeInBytes / 1000).toFixed(1) + 'kb'
}
