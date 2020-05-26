import Vue from 'vue'
import VueRouter from 'vue-router'

import login from '../views/login.vue'
import index from '../views/index.vue'
import main from '../views/main.vue'
import userList from '@/views/User/userList.vue'

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

// 系统管理模块
import authorityAdmin from '@/views/SystemAdmin/authorityAdmin.vue'
import roleAuthorityAdmin from '@/views/SystemAdmin/roleAuthorityAdmin.vue'
// 日志管理模块
import logAdmin from '@/views/SystemAdmin/logAdmin.vue'

// 设计表单模块
import DesignFormList from '@/views/Form/DesignFormList.vue'
import editForm from '@/views/Form/editForm.vue'

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
    meta: {
      requireSystemIdentify: true
    },
    children: [{
        path: '',
        component: questionList,
        meta: {
          requireSystemIdentify: true
        },
      },
      {
        path: 'DesignFormList',
        component: DesignFormList,
        meta: {
          requireSystemIdentify: true
        },
      },
      {
        path: 'userList',
        component: userList,
        meta: {
          requireSystemIdentify: true
        },
      },
      {
        path: 'questionList',
        component: questionList,
        meta: {
          requireSystemIdentify: true
        },
      },
      {
        path: 'doQuestion',
        component: doQuestion,
        meta: {
          requireSystemIdentify: true
        },
      },
      {
        path: 'adminQuestion',
        component: adminQuestion,
        meta: {
          requireSystemIdentify: true
        },
      },
      {
        path: 'dataStatistics',
        component: dataStatistics,
        meta: {
          requireSystemIdentify: true
        },
      },
      {
        path: 'authorityAdmin',
        component: authorityAdmin,
        meta: {
          requireSystemIdentify: true
        },
      },
      {
        path: 'roleAuthorityAdmin',
        component: roleAuthorityAdmin,
        meta: {
          requireSystemIdentify: true
        },
      },
      {
        path: 'logAdmin',
        component: logAdmin,
        meta: {
          requireSystemIdentify: true
        },
      },
      {
        path: 'addQuestionnaire',
        component: addQuestionnaire,
        meta: {
          requireSystemIdentify: true
        },
      },
      {
        path: 'adminQuestionDetail',
        component: adminQuestionDetail,
        meta: {
          requireSystemIdentify: true
        },
      },
      {
        path: 'statisticsDetails',
        component: statisticsDetails,
        meta: {
          requireSystemIdentify: true
        },
      }, {
        path: 'abnormal',
        component: abnormal,
        meta: {
          requireSystemIdentify: true
        },
      },
      {
        path: 'abnormalDetails',
        component: abnormalDetails,
        meta: {
          requireSystemIdentify: true
        },
      }


    ]
  },
  {
    path: '/Form',
    component: editForm,
    meta: {
      requireSystemIdentify: true
    },
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
  // 如果该页面带有isVisited参数，直接next
  if(to.query.isVisited){
    next();
    return ;
  }
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
  // query需要添加系统标识这个字段
  if (from.meta.requireSystemIdentify == true) {
    if (from.query.systemIdentify) {
      next({
        path: to.path,
        query: {
          systemIdentify: from.query.systemIdentify,
          isVisited:true
        },
      })
      return ;
    } else {
      next({
        path: '/error'
      });
      return ;
    }
  } 
  else {
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