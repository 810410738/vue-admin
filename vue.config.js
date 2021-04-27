// vue.config.js 配置说明
//官方vue.config.js 参考文档 https://cli.vuejs.org/zh/config/#css-loaderoptions
let path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}

// cdn预加载的模块
const externals = {
	'vue': 'Vue',
	'vue-router': 'VueRouter',
	'axios': 'axios',
	'vuex': "Vuex",
  'element-ui': 'ELEMENT',
}

module.exports = {
  // 关闭eslint规范
  lintOnSave:false,

  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
      .set('assets', resolve('src/assets'))

    config.when(process.env.NODE_ENV === 'production', config=>{
      config.set('externals', externals)
    })
  },

  configureWebpack: {
    devtool: 'source-map'
  },
  productionSourceMap:false,

  publicPath: '/mip/admin',
  
  // devServer:{
  //   open:true,
  //   host:"localhost",
  //   port:'8080',
  //   https:false,
  //   hotOnly:true,
  //   proxy:{
  //     '/mip/admin':{
  //       target:'http://192.168.43.48:9082/',
  //       changOrigin:true,
  //     }
  //   }
  // }
  
}

  