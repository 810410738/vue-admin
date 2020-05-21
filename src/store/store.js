import Vue from 'vue';
import Vuex from 'vuex'; //引入 vuex
import Form from './modules/Form' //注册store
 
Vue.use(Vuex); //使用 vuex
 
export default new Vuex.Store({
  modules:{
    Form,
  }
})
