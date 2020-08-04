import Mock from 'mockjs'
import {
  urlRoot,
  commonUrlRoot,
  commonUrlPimRoot
} from '@/api/http.js'
/**
 * @description 公共接口
 */
// 登陆接口
var toLoginData = {
  "errCode": 0,
  "errMsg": "[响应成功]",
  "extend": {
    "data": {
      "currentUser": {
        "adminId": "1",
        "adminNum": "ADMIN",
        "adminName": "梁振杰",
        "primaryClass": "金融科技部",
        "secondaryClass": "信息开发科",
        "loginAccount": "ADMIN",
        "loginPassword": "000000",
        "logicDel": "0",
        "createTime": "2020-07-28 19:35:50",
        "modifyTime": "2020-07-28 19:35:53",
        "adminStatus": "1",
        "remark": null,
        "adminRole": "superAdmin",
        "dataScope": null
      },
      "tokenId": "9fa33821-2c45-4e8f-bb8a-4d1974ae04d1"
    }
  }
}
Mock.mock(urlRoot + 'login/toLogin', 'post', toLoginData);

// 退出登录
var logoutData = {
  'errCode': "0"
}
Mock.mock(urlRoot + 'login/toLogout', 'post', logoutData);



/**--------------------------------------------------------------------------------------- */
//获取管理员所属一级机构列表
var getAdminPrimaryClassData = {
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
Mock.mock(commonUrlRoot + 'getAdminPrimaryClass', 'post', getAdminPrimaryClassData);

/**--------------------------------------------------------------------------------------- */
// 根据一级机构获取管理员所属二级机构列表
var getAdminSecByPrimData = {
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
Mock.mock(commonUrlRoot + 'getAdminSecByPrim', 'post', getAdminSecByPrimData);
/**--------------------------------------------------------------------------------------- */
//-获取基本用户所属一级机构列表
var getUserPrimaryClassData = {
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
Mock.mock(commonUrlRoot + 'getUserPrimaryClass', 'post', getUserPrimaryClassData);

/**--------------------------------------------------------------------------------------- */
// 根据一级机构获取基本用户所属二级机构列表
var getUserSecByPrimData = {
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
Mock.mock(commonUrlRoot + 'getUserSecByPrim', 'post', getUserSecByPrimData);
/**--------------------------------------------------------------------------------------- */
// 02-获取数据字典数据(下拉框或者多级列表)
// var getLeafDictByCondData = {
//   "errCode": 0,
//   "errMsg": "[响应成功]",
//   "extend": {
//     "classList": [{
//       "label": "APS-员工线上排查系统",
//       "value": "4"
//     }]
//   }
// }
// Mock.mock(commonUrlRoot + 'getLeafDictByCond', 'post', getLeafDictByCondData);
/**--------------------------------------------------------------------------------------- */
// 获取当前已激活的所有子系统列表(封装为下拉框数据)-用于绑定数据
var getActiveSubSystemData = {
  "errCode": 0,
  "errMsg": "[响应成功]",
  "extend": {
    "classList": [{
      "label": "APS-员工线上排查系统",
      "value": "4"
    }]
  }
}
Mock.mock(commonUrlRoot + 'getActiveSubSystem', 'post', getActiveSubSystemData);
/**--------------------------------------------------------------------------------------- */
// 根据指定systemId获取当前已激活的所有角色列表(封装为下拉框数据)
var getActiveRoleBySystemIdData = {
  "errCode": 0,
  "errMsg": "[响应成功]",
  "extend": {
    "classList": [{
      "label": "管理员",
      "value": "4"
    }]
  }
}
Mock.mock(commonUrlRoot + 'getActiveRoleBySystemId', 'post', getActiveRoleBySystemIdData);

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

/**--------------------------------------------------------------------------------------- */
// 修改个人信息
var updatePIData = {
  "errCode": 0,
  "errMsg": "[响应成功]",
  "extend": {
  }
}
Mock.mock(commonUrlPimRoot + 'updatePI', 'post', updatePIData);
/**--------------------------------------------------------------------------------------- */
// 修改个人密码
var updatePwdData = {
  "errCode": 0,
  "errMsg": "[响应成功]",
  "extend": {
  }
}
Mock.mock(commonUrlPimRoot + 'updatePwd', 'post', updatePwdData);