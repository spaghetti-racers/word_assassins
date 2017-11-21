'use strict'

const LiveReloadPlugin = require('webpack-livereload-plugin')
  , devMode = require('.').isDevelopment

  /**
   * Fast source maps rebuild quickly during development, but only give a link
   * to the line where the error occurred. The stack trace will show the bundled
   * code, not the original code. Keep this on `false` for slower builds but
   * usable stack traces. Set to `true` if you want to speed up development.
   */

  , USE_FAST_SOURCE_MAPS = false

module.exports = {
  entry: './app/main.jsx',
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  context: __dirname,
  devtool: devMode && USE_FAST_SOURCE_MAPS
    ? 'cheap-module-eval-source-map'
    : 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.eot', '.woff', '.svg', '.woff2', '.ttf', '*']
  },
  module: {
    rules: [{
      test: /jsx?$/,
      exclude: /(node_modules|bower_components)/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: ['react', 'es2015', 'stage-2']
        }
      }]
    }, {
      test: /\.(css|scss|sass)$/,
      use: [{
        loader: 'style-loader' // creates style nodes from JS strings
      }, {
        loader: 'css-loader' // translates CSS into CommonJS
      }, {
        loader: 'sass-loader' // compiles Sass to CSS
      }]
    }, {
      test: /\.svg$|\.ttf?|\.woff$|\.woff2|\.eof|\.eot/,
      loader: 'file-loader'
    }, {
      test: /\.(png|jpg|gif)$/,
      use: [
        {
          loader: 'url-loader'
        }
      ]
    }]
  },
  plugins: devMode
    ? [new LiveReloadPlugin({ appendScriptTag: true })]
    : []
}
