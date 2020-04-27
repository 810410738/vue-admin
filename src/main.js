import '@babel/polyfill'
import Vue from 'vue';
import App from './App.vue';
import './plugins/element.js';
import router from './router';
// 引用公共样式
import './assets/css/public.css';
// echarts插件
import echarts from 'echarts';
Vue.prototype.$echarts = echarts;
// 引入FormMaking
import FormMaking from 'form-making'
import 'form-making/dist/FormMaking.css'
Vue.use(FormMaking)

// 开发环境
if (process.env.NODE_ENV === "development") {
  // 引入mock
  require('./mock/commonData.js');
  require('./mock/questionData.js');
  require('./mock/dataAdminData.js');
  require('./mock/systemAdminData.js');
  require('./mock/userData.js');
  require('./mock/formData.js');
}
// 生产环境 
else {

}
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')