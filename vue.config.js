'use strict'

const path = require('path')
const defaultSettings = require('./src/settings.js')

function resolve(dir) {
  return path.join(__dirname,dir)
}

const name = defaultSettings.title || 'Vultr Vue Admin'

const port = process.env.port || process.env.npm_config_port || 9527

module.exports = {
  publicPath:'/',
  outputDir:'dist',
  lintOnSave:process.env.NODE_ENV ==='development',
  productionSourceMap:false,
  devServer:{
    port:port,
    open:true,
    overlay:{
      warnings:false,
      errors:true
    },
    proxy:{
      [process.env.VUE_APP_BASE_API]:{
        target:`http://127.0.0.1:${port}/mock`,
        changeOrigin:true,
        pathRewrite:{
          ['^'+process.env.VUE_APP_BASE_API]:''
        }
      }
    },
    after:require('./mock/mock-server.js')
  },
  configureWebpack:{
    name:name,
    resolve:{
      alias:{
        '@':resolve('src')
      }
    }
  },
  chainWebpack(config){
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')

    //set svg-sprite-loader
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
        symbolId:'icon-[name]'
      })
      .end()

    //set preserveWhitespace
    config.module
      .rule('vue').
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

    //https://webpack.js.org/configuration/devtool/#development
    config
      .when(process.env.NODE_ENV === 'development',
        config => config.devtool('cheap-source-map')
      )

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config.plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin',[{
              inline:/runtime\..*\.js$/
            }])
            .end()

          config
            .optimization.splitChunks({
              chunks:'all',
              cacheGroups:{
                libs:{
                  name:'chunk-libs',
                  test:/[\\/]node_modules[\\/]/,
                  priority:10,
                  chunks:'initial'            //only package third parties
                },
                elementUI:{
                  name:'chunk-elementUI',     //split elementUI into a single package
                  priority:20,
                  test:/[\\/]node_modules[\\/]_?element-ui(.*)/
                },
                commons:{
                  name:'chunk-commons',
                  test:resolve('src/components'),
                  minChunks:3,
                  priority:5,
                  reuseExistingChunk:true
                }
              }
            })

          config.optimization.runtimeChunk('single')
        }
      )
  }
}