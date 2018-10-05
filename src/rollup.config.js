import string from 'rollup-plugin-string'
import scss from '../tools/rollup-plugin-scss-inline'
import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import autoprefixer from 'autoprefixer'
import postcss from 'postcss'

export default {
  input: './index.js',
  output: {
    format: 'iife'
  },
  plugins: [
    resolve(),
    string({
      include: ['*.html', '*.css']
    }),
    scss({
      processor: css => postcss([
        autoprefixer({browsers: ['last 1 chrome versions', 'last 1 safari versions']})
      ]),
      output: false,
      outputStyle: 'compressed'
    }),
    babel({exclude: 'node_modules/**'})
  ]
}
