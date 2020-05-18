import Mock from 'mockjs'
import {
  roleAuthorityUrlRoot
} from '@/api/http.js'
/**
 * @description 系统权限管理模块
 */
/**--------------------------------------------------------------------------------------- */
//02-根据roleId删除角色信息
var deleteRoleByIdData = {
  "errCode": 0,
  "errMsg": "[响应成功]",
  "extend": {

  }
}
Mock.mock(RegExp(roleAuthorityUrlRoot + 'deleteRoleById' + ".*"), 'get', deleteRoleByIdData);

/**--------------------------------------------------------------------------------------- */
// 04-根据筛选条件分页获取所有角色信息
var getAllRoleByPageData = {
  "errCode": 0,
  "errMsg": "[响应成功]",
  "extend": {
    "pageData": {
      "total": 1,
      "size": 10,
      "pages": 1,
      "current": 1,
      "records|5": [{
        "roleId": "878134555ea349f6bbfc1588991568444",
        "roleKey": "framework:rest:222",
        "roleName": "管理员",
        "remark": "角色备注",
        "dataScope": "0",
        "roleStatus": "0",
        "systemIdentify": "ADMIN",
        "createTime": "2020-05-09T02:32:48.000+0000",
        "modifyTime": "2020-05-09T02:32:48.000+0000"
      }]
    }
  }
}
Mock.mock(roleAuthorityUrlRoot + 'getAllRoleByPage', 'post', getAllRoleByPageData);

/**--------------------------------------------------------------------------------------- */
//获取权限菜单列表
var getChangeAuthorityListData = {
  "extend": {
    "authorityList": [{
        "nodeId": "1",
        "nodeName": "问卷排查",
        "nodeUrl": "",
        "chkDisable": false,
        "checked": true,
        "icon": "el-icon-edit-outline",
        "children": [{
            "nodeId": "11",
            "nodeName": "发布问卷排查",
            "nodeUrl": "/index/adminQuestion",
            "checked": true
          },
          {
            "nodeId": "12",
            "nodeName": "参与问卷排查",
            "nodeUrl": "/index/questionList",
            "checked": true
          },
          {
            "nodeId": "13",
            "nodeName": "查看历史问卷",
            "nodeUrl": "/index/history",
            "checked": true
          }
        ]
      },
      {
        "nodeId": "2",
        "nodeName": "用户管理",
        "nodeUrl": "",
        "checked": true,
        "chkDisable": false,
        "icon": "el-icon-user",
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
        "icon": "el-icon-s-data",
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
        "icon": "el-icon-s-data",
        "chkDisable": false,
        "children": [{
          "nodeId": "41",
          "nodeName": "表单设计",
          "checked": true,
          "nodeUrl": "/index/DesignFormList"
        }, {
          "nodeId": "42",
          "nodeName": "权限管理",
          "checked": true,
          "nodeUrl": "/index/roleAuthorityAdmin"
        }, {
          "nodeId": "43",
          "nodeName": "角色管理",
          "checked": true,
          "nodeUrl": "/index/userRoleAdmin"
        },{
          "nodeId": "44",
          "nodeName": "用户管理",
          "checked": true,
          "nodeUrl": "",
          "children":[
            {
              "nodeId": "441",
              "nodeName": "用户查询",
              "checked": false,
              "nodeUrl": "",
            },
            {
              "nodeId": "442",
              "nodeName": "用户新增",
              "checked": false,
              "nodeUrl": "",
            }
          ]
        }]
      }
    ]
  },
  "errCode": "0",
  "errMsg": ""

}
Mock.mock(RegExp(roleAuthorityUrlRoot + 'getChangeAuthorityList'), 'post', getChangeAuthorityListData);

/**--------------------------------------------------------------------------------------- */
//获取所有权限
var getAuthorityListData = {
  "extend": {
    "authorityList": [{
        "nodeId": "1",
        "nodeName": "问卷排查",
        "nodeUrl": "",
        "chkDisable": false,
        "checked": true,
        "icon": "el-icon-edit-outline",
        "pId":"-1",
        "children": [{
            "nodeId": "11",
            "nodeName": "发布问卷排查",
            "nodeUrl": "/index/adminQuestion",
            "checked": true,
            "pId":"1"
          },
          {
            "nodeId": "12",
            "nodeName": "参与问卷排查",
            "nodeUrl": "/index/questionList",
            "checked": true,
            "pId":"1"
          },
          {
            "nodeId": "13",
            "nodeName": "查看历史问卷",
            "nodeUrl": "/index/history",
            "checked": true,
            "pId":"1"
          }
        ]
      },
      {
        "nodeId": "2",
        "nodeName": "用户管理",
        "nodeUrl": "",
        "checked": true,
        "chkDisable": false,
        "icon": "el-icon-user",
        "pId":"-1",
        "children": [{
          "nodeId": "21",
          "nodeName": "查看用户列表",
          "checked": true,
          "nodeUrl": "/index/userList",
          "pId":"2"
        }]
      },
      {
        "nodeId": "3",
        "nodeName": "数据管理",
        "checked": true,
        "nodeUrl": "",
        "icon": "el-icon-s-data",
        "chkDisable": false,
        "pId":"-1",
        "children": [{
            "nodeId": "31",
            "nodeName": "数据统计",
            "checked": true,
            "nodeUrl": "/index/dataStatistics",
            "pId":"3"
          },
          {
            "nodeId": "32",
            "nodeName": "查看异常记录",
            "checked": true,
            "nodeUrl": "/index/abnormal",
            "pId":"3"
          }
        ]
      },
      {
        "nodeId": "4",
        "nodeName": "系统管理",
        "checked": true,
        "nodeUrl": "",
        "icon": "el-icon-s-data",
        "chkDisable": false,
        "pId":"-1",
        "children": [{
          "nodeId": "41",
          "nodeName": "表单设计",
          "checked": true,
          "nodeUrl": "/index/DesignFormList",
          "pId":"4"
        }, {
          "nodeId": "42",
          "nodeName": "权限管理",
          "checked": true,
          "nodeUrl": "/index/roleAuthorityAdmin",
          "pId":"4"
        }, {
          "nodeId": "43",
          "nodeName": "角色管理",
          "checked": true,
          "nodeUrl": "/index/userRoleAdmin",
          "pId":"4"
        },{
          "nodeId": "44",
          "nodeName": "用户管理",
          "checked": true,
          "nodeUrl": "",
          "pId":"4",
          "children":[
            {
              "nodeId": "441",
              "nodeName": "用户查询",
              "checked": false,
              "nodeUrl": "",
              "pId":"44",
            },
            {
              "nodeId": "442",
              "nodeName": "用户新增",
              "checked": false,
              "nodeUrl": "",
              "pId":"44",
            }
          ]
        }]
      }
    ]
  },
  "errCode": "0",
  "errMsg": ""

}
Mock.mock(RegExp(roleAuthorityUrlRoot + 'getAuthorityList'), 'post', getAuthorityListData);

/**--------------------------------------------------------------------------------------- */
//删除一个权限
var deleteAuthorityData = {
  "errCode": 0,
  "errMsg": "[响应成功]",
  "extend": {

  }
}
Mock.mock(RegExp(roleAuthorityUrlRoot + 'deleteAuthority'), 'post', deleteAuthorityData);

/**--------------------------------------------------------------------------------------- */
//获取所有日志列表
var getLogDataData = {
  "errCode": 0,
  "errMsg": "[响应成功]",
  "extend": {
      "pageData": {
          "total": 1,
          "size": 10,
          "pages": 1,
          "current": 1,
          "records|10": [{
              "rocordId":"sdfsdfsdf",
              "logNum": "1",
              "systemIdentify": "用户管理模块",
              "type": "修改",
              "userName": "小明",
              "department": "金融科技部",
              "status": "0",
              "systemIdentify": "ADMIN",
              "time": "2020-05-09",
          }]
      }
  }
}
Mock.mock(RegExp(roleAuthorityUrlRoot + 'getLogData'), 'post', getLogDataData);



