import Mock from 'mockjs'
import {
  urlRoot,
  commonUrlRoot
} from '@/api/http.js'
/**
 * @description 公共接口
 */
// 登陆接口
var toLoginData = {
  'errCode': "0"
}
Mock.mock(urlRoot + 'toLogin', 'post', toLoginData);

// 退出登录
var logoutData = {
  'errCode': "0"
}
Mock.mock(urlRoot + 'logout', 'post', logoutData);



/**--------------------------------------------------------------------------------------- */
// 01-封装“所属机构”
var getAllPrimaryClassData = {
  "extend": {
    "classList": [{
        "label": "龙岗支行",
        "value": "龙岗支行",
      },

      {
        "label": "中心区支行",
        "value": "中心区支行",
      }

    ]
  },
  "errCode": 0,
  "errMsg": "success"

}
Mock.mock(commonUrlRoot + 'getPrimaryClass', 'post', getAllPrimaryClassData);

/**--------------------------------------------------------------------------------------- */
// 02-封装“所属网点”
var getAllSecoByPrimData = {
  "extend": {
    "classList": [
      {
        "label": "龙岗网点",
        "value": "龙岗网点",
      },
      {
        "label": "中心区网点",
        "value": "中心区网点",
      }
      
    ]
  },
  "errCode": 0,
  "errMsg": "success"

}
Mock.mock(commonUrlRoot + 'getSecByPrim', 'post', getAllSecoByPrimData);

/**--------------------------------------------------------------------------------------- */
//  03-获取当前登录用户信息
var getLoginerData = {
  "extend": {
    "loginUser": {
      "userNum": "20190016",
      "loginAccount": "admin",
      "roleId": "c17bb2a461554ba6822d41ab788bf063",
      "secondaryClass": "办公室(公共关系与企业文化部）",
      "userName": "梁振杰",
      "userId": "7645696b70624565bd6c36ac17c594cf",
      "primaryClass": "办公室(公共关系与企业文化部）"
    },
    "roleType": "1"
  },
  "errCode": 0,
  "errMsg": "success"
}
Mock.mock(commonUrlRoot + 'getLoginer', 'post', getLoginerData);

/**-------------------------------------------------------------------------------------------- */
// 04-获取当前登录用户访问菜单
var AuthorityByLoginRoleData = {
  "extend": {
    "authorityList": [{
        "nodeId": "1",
        "nodeName": "问卷排查",
        "nodeUrl": "",
        "chkDisable": false,
        "checked": true,
        "icon": 'el-icon-edit-outline',
        "children": [{
            "nodeId": "11",
            "nodeName": "发布问卷排查",
            "nodeUrl": "/index/adminQuestion",
            "checked": true,
          },
          {
            "nodeId": "12",
            "nodeName": "参与问卷排查",
            "nodeUrl": "/index/questionList",
            "checked": true,
          },
          {
            "nodeId": "13",
            "nodeName": "查看历史问卷",
            "nodeUrl": "/index/history",
            "checked": true,
          },
        ]
      },
      {
        "nodeId": "2",
        "nodeName": "用户管理",
        "nodeUrl": "",
        "checked": true,
        "chkDisable": false,
        "icon": 'el-icon-user',
        "children": [{
          "nodeId": "21",
          "nodeName": "查看用户列表",
          "checked": true,
          "nodeUrl": "/index/userList"
        }]
      },
      {
        "nodeId": "3",
        "nodeName": "数据管理",
        "checked": true,
        "nodeUrl": "",
        "icon": 'el-icon-s-data',
        "chkDisable": false,
        "children": [{
            "nodeId": "31",
            "nodeName": "数据统计",
            "checked": true,
            "nodeUrl": "/index/dataStatistics"
          },
          {
            "nodeId": "32",
            "nodeName": "查看异常记录",
            "checked": true,
            "nodeUrl": "/index/abnormal"
          }
        ]
      },
      {
        "nodeId": "4",
        "nodeName": "系统管理",
        "checked": true,
        "nodeUrl": "",
        "icon": 'el-icon-s-data',
        "chkDisable": false,
        "children": [{
          "nodeId": "41",
          "nodeName": "表单设计",
          "checked": true,
          "nodeUrl": "/index/DesignFormList"
        },{
          "nodeId": "42",
          "nodeName": "角色管理",
          "checked": true,
          "nodeUrl": "/index/roleAuthorityAdmin"
        },{
          "nodeId": "43",
          "nodeName": "权限管理",
          "checked": true,
          "nodeUrl": "/index/authorityAdmin"
        }]
      }
    ]
  },
  "errCode": "0",
  "errMsg": ""
}
Mock.mock(commonUrlRoot + 'getMenuByLoginRole', 'post', AuthorityByLoginRoleData);


/**--------------------------------------------------------------------------------------- */
// 05-获取评议系统启动状态
var getCurrentCommentOperateData = {
  "extend": {
    "configCode": "0"
  },
  "errCode": 0,
  "errMsg": "success"
}
Mock.mock(commonUrlRoot + 'getCurrentCommentOperate', 'post', getCurrentCommentOperateData);