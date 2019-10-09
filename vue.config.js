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
  }
}