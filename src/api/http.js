import axios from 'axios';
import { MessageBox } from 'element-ui';

// 访问的url
export const urlRoot = "/mip/admin/";

export const commonUrlRoot = urlRoot + "common/screenCond/";
export const commonUrlPimRoot = urlRoot + "common/pim/";

export const dataHandleUrlRoot = urlRoot+ "dataHandle/";
export const commentUrlRoot = urlRoot + "comment/";
export const questionUrlRoot = urlRoot + "questionnaire/";
export const roleAuthorityUrlRoot = urlRoot + "framework/rest/roleAuthority/";
export const formDesignUrlRoot = urlRoot + "admin/system/form/";
export const AdminUserUrlRoot = urlRoot + "system/adminUser/";


export const userUrlRoot = urlRoot + "subSystem/baseUser/";
export const childSystemInfoUrlRoot = urlRoot + "subSystem/config/";
export const roleUrlRoot = urlRoot + "subSystem/role/";
export const authorityUrlRoot = urlRoot + "subSystem/authority/";

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
// 设置公共请求参数
var requestParams = {};
// 设置post请求头
axios.defaults.headers.post['Content-Type'] = 'application/json';
//定义一个请求拦截器
axios.interceptors.request.use(
  config => {
    //在请求发出之前进行一些操作
    // 设置公共请求头的token
    var tokenId = localStorage.getItem('tokenId');
    if(tokenId){
      config.headers.common['tokenId'] = tokenId;
    }
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
      MessageBox.alert(err+"网络连接失败，请稍候再试" , "请求失败");
      // return Promise.reject(response);
      return;
    }
  },
  err => {
    MessageBox.alert(err+"请求失败，请稍候再试" , "请求失败");
    hideLoading();
    return Promise.reject(err);
  })

  // 设置公共参数
  export function setRequestParams(key, value){
    requestParams[key] = value;
  }
  // 重置公共参数
  export function resetRequestParams(){
    for(var key in requestParams){
      delete requestParams[key];
    }
  }
  export function get(url, params){
    return new Promise((resolve, reject) =>{
      axios.get(url,{
        params:params
      }).then(res=>{
        // 下载文件
        var url = window.URL.createObjectURL(res.data);
        var link = document.createElement('a');
        link.style.display = 'none';
        link.href = url;
        document.body.appendChild(link);
        link.click();
        resolve(res.data);
      }).catch(err =>{
        reject(err.data);
      })
    })
  }
  export function post(url,params){
    // 拼接公共参数
    for(var key in requestParams){
      params[key] = requestParams[key];
    }
    return new Promise((resolve, reject) =>{
      var postParams;
      if(Object.prototype.toString.call(params) === '[object FormData]'){
        postParams = params;
      }
      else if(Object.prototype.toString.call(params) === '[object Object]'){
        postParams = JSON.stringify(params);
      }
      axios.post(url, postParams)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error.data);
      })
      .finally(() => {});
    })
  }

