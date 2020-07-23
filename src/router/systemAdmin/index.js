import Vue from 'vue'
import VueRouter from 'vue-router'

// 后台管理系统登陆模块
import adminLogin from '@/views/SystemAdmin/login.vue'
// 主页面
import main from '@/views/SystemAdmin/main.vue'
// 用户管理
import userList from '@/views/SystemAdmin/User/userList.vue'
// 权限管理
import authorityAdmin from '@/views/SystemAdmin/Authority/authorityAdmin.vue'
// 角色管理
import roleAuthorityAdmin from '@/views/SystemAdmin/Role/roleAuthorityAdmin.vue'
// 日志管理模块
import logAdmin from '@/views/SystemAdmin/Log/logAdmin.vue'
// 设计表单模块s
import DesignFormList from '@/views/SystemAdmin/Form/DesignFormList.vue'
import editForm from '@/views/SystemAdmin/Form/editForm.vue'
// 子系统管理模块
import checkChildSystem from "@/views/SystemAdmin/childSystem/checkChildSystem.vue"
// 错误页面
import pageNotFound from '@/errorPage/404';

import test from '@/views/Test/test.vue'


Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'adminLogin',
    component: adminLogin,
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
        component: userList,
      },
      {
        path: 'userList',
        component: userList,
      },
      {
        path: 'DesignFormList',
        component: DesignFormList,
      },
      {
        path: 'authorityAdmin',
        component: authorityAdmin,

      },
      {
        path: 'roleAuthorityAdmin',
        component: roleAuthorityAdmin,

      },
      {
        path: 'logAdmin',
        component: logAdmin,
      },
      {
        path:'checkChildSystem',
        component:checkChildSystem
      }
    ]
  },
  {
    path: '/Form',
    component: editForm,
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


// router.beforeEach((to, from, next) => {
//   // 如果访问error页面，直接next
//   if (to.path === '/error' || to.path === '/') {
//     next();
//     return ;
//   }
//   if(!isLogin()){
//     next({
//       path: '/',
//       query:{
//         message:'notLogin'
//       }
//     });
//     return 
//   }
//   else{
//     next();
//   }

// });

// 判断是否已经登陆
function isLogin() {
  if (localStorage.getItem('authToken')) {
    return true;
  }
  return false;
}
export default router