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
  "errCode": 0,
  "errMsg": "[响应成功]",
  "extend": {
    "tokenId": "5b32ec2b-e052-4a4e-b598-75b7f263d57b"
  }
}
Mock.mock(urlRoot + 'framework/rest/login/toLogin', 'post', toLoginData);

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
    "classList": [{
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
// 02-获取数据字典数据(下拉框或者多级列表)
var getLeafDictByCondData = {
  "errCode": 0,
  "errMsg": "[响应成功]",
  "extend": {
    "classList": [{
      "label": "APS-员工线上排查系统",
      "value": "4"
    }]
  }
}
Mock.mock(commonUrlRoot + 'getLeafDictByCond', 'post', getLeafDictByCondData);


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
        "nodeName": "系统管理",
        "nodeUrl": "",
        "checked": true,
        "chkDisable": false,
        "icon": '',
        "nodeUrl": "",
        "children": [{
            "nodeId": "2",
            "nodeName": "用户管理",
            "nodeUrl": "",
            "checked": true,
            "chkDisable": false,
            "icon": 'el-icon-user',
            "nodeUrl": "/main/userList",
          },
          {
            "nodeId": "41",
            "nodeName": "表单设计",
            "checked": true,
            "nodeUrl": "/main/DesignFormList",
            "icon": 'el-icon-s-order',
          }, {
            "nodeId": "42",
            "nodeName": "角色管理",
            "checked": true,
            "nodeUrl": "/main/roleAuthorityAdmin",
            "icon": 'el-icon-picture-outline-round',
          }, {
            "nodeId": "43",
            "nodeName": "权限管理",
            "checked": true,
            "nodeUrl": "/main/authorityAdmin",
            "icon": 'el-icon-open',
          },
          {
            "nodeId": "44",
            "nodeName": "日志管理",
            "checked": true,
            "nodeUrl": "/main/logAdmin",
            "icon": 'el-icon-postcard',
          },
          {
            "nodeId": "45",
            "nodeName": "子系统管理",
            "checked": true,
            "nodeUrl": "/main/checkChildSystem",
            "icon": 'el-icon-s-data',
          }
        ]
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

/**--------------------------------------------------------------------------------------- */
// 获取所有icon
var getIconOptionData = {
  "errCode": 0,
  "errMsg": "[响应成功]",
  "extend": {
    "classList": [{
      "label": "el-icon-platform-eleme",
      "value": "el-icon-platform-eleme"
    }]
  }
}
Mock.mock(commonUrlRoot + 'getIconOption', 'post', getIconOptionData);