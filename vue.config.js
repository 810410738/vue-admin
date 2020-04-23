// vue.config.js 配置说明
//官方vue.config.js 参考文档 https://cli.vuejs.org/zh/config/#css-loaderoptions
let path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  // 关闭eslint规范
  lintOnSave:false,

  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
  },

  configureWebpack: {
    devtool: 'source-map'
  },

  lintOnSave: false,
  publicPath: '/aps3/'
}

  