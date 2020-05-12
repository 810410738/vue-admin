import axios from 'axios';
import { MessageBox } from 'element-ui';

// 访问的url
export const urlRoot = "/aps3/";
export const commonUrlRoot = urlRoot + "common/";
export const dataHandleUrlRoot = urlRoot+ "dataHandle/";
export const commentUrlRoot = urlRoot + "comment/";
export const questionUrlRoot = urlRoot + "questionnaire/";
export const userUrlRoot = urlRoot + "user/";
export const roleAuthorityUrlRoot = urlRoot + "roleAuthority/";
export const formDesignUrlRoot = urlRoot + "formDesign/";
// 引入element-ui 的loading方法
import {
  showLoading,
  hideLoading
} from '../plugins/loading';
// 设置不同环境的axios请求默认地址
if (process.env.NODE_ENV == 'development') {
  // axios.defaults.baseURL = '';
} else if (process.env.NODE_ENV == 'debug') {
  // axios.defaults.baseURL = '';
} else if (process.env.NODE_ENV == 'production') {
  // axios.defaults.baseURL = '';
}
// 设置请求超时时间
axios.defaults.timeout = 20000;
// 设置post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
export function setHeader(key, value){
  axios.defaults.headers.post[key] = value;
  axios.defaults.headers.get[key] = value;
}
//定义一个请求拦截器
axios.interceptors.request.use(
  config => {
    //在请求发出之前进行一些操作
    showLoading();
    return config;
  },
  err => Promise.error(err));

//定义一个响应拦截器
axios.interceptors.response.use(
  response => {
    //在这里对返回的数据进行处理
    hideLoading();
    // 服务器正常返回数据
    if (response.status === 200) {
      // 用户尚未登录或登录信息已过期
      // 成功
      if (response.data.errCode == 0 || response.data.errCode == "0") {
        return Promise.resolve(response);
      } 
      else{
        MessageBox.alert("错误信息：" + response.data.errMsg + "----错误代码: " + response.data.errCode, "请求失败");
        // return Promise.reject(response);
        return;
      } 
    } 
    // 服务器不正常返回数据
    else {
      MessageBox.alert("网络连接失败，请稍候再试" , "请求失败");
      // return Promise.reject(response);
      return;
    }
  },
  err => {
    hideLoading();
    return Promise.reject(err);
  })

  export function get(url, params){
    return new Promise((resolve, reject) =>{
      axios.get(url,{
        params:params
      }).then(res=>{
        resolve(res.data);
      }).catch(err =>{
        reject(err.data);
      })
    })
  }
  export function post(url,params){
    return new Promise((resolve, reject) =>{
      axios.post(url, JSON.stringify(params))
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error.data);
      })
      .finally(() => {});
    })
  }

