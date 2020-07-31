import Mock from 'mockjs'
import {roleAuthorityUrlRoot} from '@/api/http'
/**
 * @description 系统角色管理模块
 */
/**--------------------------------------------------------------------------------------- */
//01-获取角色关联的权限列表(反显角色权限关联关系)
var getRelateAuthByRoleIdData = {
  "errCode": 0,
  "errMsg": "[响应成功]",
  "extend": {
      "authorityList": [{
          "nodeId": "1",
          "nodePid": "-1",
          "nodeKey": "11",
          "nodeName": "111",
          "nodeUrl": "1",
          "nodeIcon": "1",
          "nodeType": "1",
          "orderNum": "19",
          "systemIdentify": "ADMIN",
          "chkDisabled": true,
          "checked": true,
          "children": [{
              "nodeId": "2",
              "nodePid": "1",
              "nodeKey": "22",
              "nodeName": "2222",
              "nodeUrl": "2",
              "nodeIcon": "2",
              "nodeType": "22",
              "orderNum": "19",
              "systemIdentify": "ADMIN",
              "chkDisabled": true,
              "checked": true,
              "children": []
          }]
      },
      
    ]
  }
}
Mock.mock(roleAuthorityUrlRoot + 'getRelateAuthByRoleId', 'post', getRelateAuthByRoleIdData);
/**--------------------------------------------------------------------------------------- */
//02-变更角色权限信息
var changeRoleAuthorityData = {
  "errCode": 0,
  "errMsg": "[响应成功]",
  "extend": {

  }
}
Mock.mock(roleAuthorityUrlRoot + 'changeRoleAuthority', 'post', changeRoleAuthorityData);