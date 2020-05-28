import Vue from 'vue'
import VueRouter from 'vue-router'

import login from '../views/login.vue'
import index from '../views/index.vue'
import main from '../views/main.vue'

// 问卷管理模块
import questionList from '@/views/Question/questionList.vue'
import doQuestion from '@/views/Question/doQuestion.vue'
import adminQuestion from '@/views/Question/adminQuestion.vue'
import adminQuestionDetail from '@/views/Question/adminQuestionDetail.vue'
import addQuestionnaire from '@/views/Question/addQuestionnaire.vue'

// 数据模块
import dataStatistics from '@/views/DataAdmin/dataStatistics.vue'
import statisticsDetails from '@/views/DataAdmin/statisticsDetails.vue'
import abnormal from '@/views/DataAdmin/abnormal.vue'
import abnormalDetails from '@/views/DataAdmin/abnormalDetails.vue'

// 错误页面
import pageNotFound from '@/errorPage/404';

import test from '@/views/Test/test.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'login',
    component: login,
    meta: {
      requireSystemIdentify: false
    }
  },
  {
    path: '/index',
    name: 'index',
    component: index,
    meta: {
      requireSystemIdentify: false
    }
  },
  {
    path: '/main',
    name: 'main',
    component: main,
    children: [{
        path: '',
        component: questionList,
      },
      {
        path: 'questionList',
        component: questionList,
        
      },
      {
        path: 'doQuestion',
        component: doQuestion,
        
      },
      {
        path: 'adminQuestion',
        component: adminQuestion,
       
      },
      {
        path: 'dataStatistics',
        component: dataStatistics,
        
      },
      {
        path: 'addQuestionnaire',
        component: addQuestionnaire,
       
      },
      {
        path: 'adminQuestionDetail',
        component: adminQuestionDetail,
       
      },
      {
        path: 'statisticsDetails',
        component: statisticsDetails,
       
      }, {
        path: 'abnormal',
        component: abnormal,
       
      },
      {
        path: 'abnormalDetails',
        component: abnormalDetails,
       
      }
    ]
  },
  {
    path: '/error',
    component: pageNotFound
  },
  {
    path: '/test',
    component: test
  },
  {
    path: '*',
		component: pageNotFound,
  }
]

const router = new VueRouter({
  routes
})


router.beforeEach((to, from, next) => {
  // 如果访问error页面，直接next
  if (to.path === '/error' || to.path === '/') {
    next();
    return ;
  }
  if(!isLogin()){
    next({
      path: '/',
      query:{
        message:'notLogin'
      }
    });
    return 
  }
  else{
    next();
  }

});

// 判断是否已经登陆
function isLogin(){
  if(localStorage.getItem('authToken')){
    return true;
  }
  return false;
}
export default router