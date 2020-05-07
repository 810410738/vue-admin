import Vue from 'vue'
import VueRouter from 'vue-router'

import login from '../views/login.vue'
import index from '../views/index.vue'
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

import userRoleAdmin from '@/views/SystemAdmin/userRoleAdmin.vue'
import roleAuthorityAdmin from '@/views/SystemAdmin/roleAuthorityAdmin.vue'

// 设计表单模块
import DesignFormList from '@/views/Form/DesignFormList.vue'
import editForm from '@/views/Form/editForm.vue'
import checkForm from '@/views/Form/checkForm.vue'

import test from '@/views/Test/test.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/index',
    name: 'index',
    component: index,
    children: [{
        path: '',
        component: questionList,
      },
      {
        path: 'DesignFormList',
        component: DesignFormList,
      },
      {
        path: 'checkForm',
        component: checkForm,
      },
      {
        path: 'userList',
        component: userList,
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
        path: 'userRoleAdmin',
        component: userRoleAdmin,
      },
      {
        path: 'roleAuthorityAdmin',
        component: roleAuthorityAdmin,
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
      },{
        path:'abnormal',
        component: abnormal
      },
      {
        path:'abnormalDetails',
        component:abnormalDetails
      }
      
      
    ]
  },
  {
    path: '/Form',
    component:editForm,
  },
  {
    path:'/test',
    component:test
  }

]

const router = new VueRouter({
  routes
})

export default router