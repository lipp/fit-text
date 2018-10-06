import babel from 'rollup-plugin-babel'

export default {
  input: './index.js',
  output: {
    format: 'iife'
  },
  plugins: [
    babel({exclude: 'node_modules/**'})
  ]
}
