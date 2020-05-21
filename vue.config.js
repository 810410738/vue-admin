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
      .set('assets', resolve('src/assets'))
  },

  configureWebpack: {
    devtool: 'source-map'
  },

  lintOnSave: false,
  publicPath: '/mip/',

  // devServer:{
  //   open:true,
  //   host:"localhost",
  //   port:'8080',
  //   https:false,
  //   hotOnly:true,
  //   proxy:{
  //     '/mip':{
  //       target:'http://192.168.43.14:8080/',
  //       changOrigin:true,
  //     }
  //   }
  // }
  
}

  