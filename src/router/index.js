import Vue from 'vue'
import VueRouter from 'vue-router'

// 后台管理系统登陆模块
import adminLogin from '@/views/login.vue'
// 主页面
import main from '@/views/main.vue'
// 个人信息页面
import userInfo from "@/views/userInfo.vue"
/**
 *  子系统管理
 */

// 用户管理
import userList from '@/views/childSystem/User/userList.vue'
// 权限管理
import authorityAdmin from '@/views/childSystem/Authority/authorityAdmin.vue'
// 角色管理
import roleAuthorityAdmin from '@/views/childSystem/Role/roleAuthorityAdmin.vue'
// 设计表单模块
import DesignFormList from '@/views/childSystem/Form/DesignFormList.vue'
import editForm from '@/views/childSystem/Form/editForm.vue'

/**
 *  后台系统管理 
 */
// 管理员用户
import adminUserList from "@/views/SystemAdmin/User/adminUserList.vue";
// 子系统信息
import checkChildSystem from "@/views/SystemAdmin/childSystemInfo/checkChildSystem.vue"
// 日志管理模块
import logAdmin from '@/views/SystemAdmin/Log/logAdmin.vue'


// 错误页面
import pageNotFound from '@/errorPage/404';
// 测试
import test from '@/views/Test/test.vue'
import websocket from '@/views/Test/websocket.vue'


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
    path:'/userInfo',
    component:userInfo
  },
  {
    path: '/main',
    name: 'main',
    component: main,
    children: [
      {
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
      },
      {
        path:'adminUserList',
        component:adminUserList
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
    path: '/websocket',
    component: websocket
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