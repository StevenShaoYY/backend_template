'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')
const chalk = require('chalk')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const WebpackBuildNotifierPlugin = require('webpack-build-notifier')
const setTitle = require('node-bash-title')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// const ZipWebpackPlugin = require('zipwebpack')
function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title || '111' // page title
setTitle(name)
// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
const port = 9090 // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
const commonConfig = {
  /**
     * You will need to set publicPath if you plan to deploy your site under a sub path,
     * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
     * then publicPath should be set to "/bar/".
     * In most cases please use '/' !!!
     * Detail: https://cli.vuejs.org/config/#publicpath
     */
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
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
      },
      '/eyousystem': {
        target: 'http://61.174.54.120:9000',
        changeOrigin: true
      }
    },
    after: require('./mock/mock-server.js')
  },
  configureWebpack: (config) => {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    config.name = name
    const plugins = [
      new ProgressBarPlugin({
        format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
        clear: false
      }),
      new WebpackBuildNotifierPlugin({
        title: '我的~Webpack Build~',
        logo: path.resolve('./public/favicon.ico'),
        suppressSuccess: true
      })
    ]
    const prodPlugins = [
      new UglifyJsPlugin({
        uglifyOptions: {
          warnings: false,
          compress: {
            drop_console: true,
            drop_debugger: true
          },
          output: {
            // 去掉注释内容
            comments: false
          }
        },
        sourceMap: false,
        parallel: false
      })
    ]
    const StagePlugins = [
      // new ZipWebpackPlugin({
      //   filename: name
      // })
    ]
    if (process.env.NODE_ENV === 'production') {
      if (process.env.ENV === 'staging') {
        config.plugins = [...config.plugins, ...plugins, ...prodPlugins, ...StagePlugins]
      } else {
        config.plugins = [...config.plugins, ...plugins, ...prodPlugins]
      }
    } else {
      config.plugins = [...config.plugins, ...plugins]
    }
  },
  chainWebpack(config) {
    config.plugins.delete('preload') // TODO: need test
    config.plugins.delete('prefetch') // TODO: need test
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

    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

    config
    // https://webpack.js.org/configuration/devtool/#development
      .when(process.env.NODE_ENV === 'development',
        config => config.devtool('cheap-source-map')
      )

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
              // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                elementUI: {
                  name: 'chunk-elementUI', // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          config.optimization.runtimeChunk('single')
        }
      )
  }
}

module.exports = commonConfig
