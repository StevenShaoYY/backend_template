const webpack = require('webpack')
const APP_NAME = require('./package.json').name
// const PORT = require('./package.json').devPort
const NODE_ENV = process.env.NODE_ENV || 'development'
const path = require('path')
const port = 9091 // dev port
function resolve(dir) {
  return path.join(__dirname, dir)
}

log('APP_NAME: ', APP_NAME)

module.exports = {
  publicPath: `/${APP_NAME}/`,

  productionSourceMap: false,
  configureWebpack: {
    externals: {
      vue: 'Vue'
    },

    entry: './src/main.js',

    output: {
      libraryExport: 'default',
      jsonpFunction: `webpackJsonp-${APP_NAME}`
    },

    plugins: [
      new webpack.DefinePlugin({
        'process.env.VUE_APP_NAME': JSON.stringify(APP_NAME)
      })
    ]
  },
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      // change xxx-api/login => mock/login
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      [process.env.VUE_APP_BASE_API]: {
        target: `http://localhost:${port}/mock`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    },
    after: require('./mock/mock-server.js')
  },
  chainWebpack(config) {
    config.resolve.alias
      .set('@', resolve('src'))
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
}

function log(label, content, options) {
  console.log('\x1b[1m%s\x1b[31m%s\x1b[0m', label, content)
}
