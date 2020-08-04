import Vue from 'vue';
import Vuex from 'vuex'; //引入 vuex
import Form from './modules/Form' 
import loginUser from './modules/loginUser' 
 
Vue.use(Vuex); //使用 vuex
 
export default new Vuex.Store({
  modules:{
    Form,
    loginUser
  }
})
