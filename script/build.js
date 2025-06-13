import fs from 'node:fs'
import esbuild from 'esbuild'
import { minify } from '@swc/core'
import { gzipSizeSync } from 'gzip-size'

fs.rmSync('dist', { recursive: true, force: true })

// build the dist.dev.js (for development)
await esbuild.build({
    entryPoints: ['src/web.js'],
    outfile: 'dist/dist.dev.js',
    bundle: true,
    legalComments: 'eof',
    drop: ['debugger'],
})
console.log(`  📄 dist/dist.dev.js (${filesize('dist/dist.dev.js')})`)

// build the dist.js
await esbuild.build({
    entryPoints: ['src/web.js'],
    outfile: 'dist/dist.js',
    bundle: true,
    legalComments: 'eof',
    drop: ['console'],
    dropLabels: ['DEV'],
})

console.log(`  📄 dist/dist.js (${filesize('dist/dist.js')})`)

// build the dist.min.js
const minified = await minify(fs.readFileSync('dist/dist.js', { encoding: 'utf-8' }), {
    format: {
        comments: false,
    },
    compress: {
        drop_console: true,
    },
    mangle: true,
})
fs.writeFileSync('dist/dist.min.js', minified.code)
console.log(
    `  📄 dist/dist.min.js (${filesize('dist/dist.min.js')} ~= ${gzipsize(minified.code)} gzip)`
)

function filesize(filename) {
    const stats = fs.statSync(filename)
    return (stats.size / 1000).toFixed(2) + 'kb'
}

function gzipsize(code) {
    return (gzipSizeSync(code) / 1000).toFixed(3) + 'kb'
}
