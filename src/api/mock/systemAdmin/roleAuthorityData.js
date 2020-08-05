import Mock from 'mockjs'
import {
  roleUrlRoot
} from '@/api/http'
/**
 * @description 系统角色管理模块
 */
/**--------------------------------------------------------------------------------------- */
//01-获取角色关联的权限列表(反显角色权限关联关系)
var getRelateAuthByRoleIdData = {
  "errCode": 0,
  "errMsg": "[响应成功]",
  "extend": {
    "dataList": [{
      "authorityId": "3f05d250c61445d4bb7d1596070601050",
      "parentId": "0",
      "authorityKey": "admin:system",
      "authorityName": "系统管理",
      "authorityUrl": "0",
      "authorityIcon": "0",
      "authorityType": "BUTTON",
      "orderNum": "10",
      "relateForm": null,
      "systemId": "BOXING",
      "chkDisabled": true,
      "checked": false,
      "children": [{
        "authorityId": "a636230f6fc6442e9e111596070795631",
        "parentId": "3f05d250c61445d4bb7d1596070601050",
        "authorityKey": "admin:system:adminUser",
        "authorityName": "管理员信息维护",
        "authorityUrl": "0",
        "authorityIcon": "0",
        "authorityType": "BUTTON",
        "relateForm": null,
        "orderNum": "1",
        "systemId": "BOXING",
        "chkDisabled": true,
        "checked": false,
        "children": [{
          "authorityId": "8e817f3290364278ba571596070605832",
          "parentId": "a636230f6fc6442e9e111596070795631",
          "authorityKey": "admin:system:adminUser:addAdmin",
          "authorityName": "添加管理员",
          "authorityUrl": "0",
          "authorityIcon": "0",
          "authorityType": "BUTTON",
          "relateForm": null,
          "orderNum": "22",
          "systemId": "BOXING",
          "chkDisabled": true,
          "checked": false,
          "children": []
        }]
      }]
    }]
  },
}
Mock.mock(roleUrlRoot + 'getRelateAuthByRoleId', 'post', getRelateAuthByRoleIdData);
/**--------------------------------------------------------------------------------------- */
//02-变更角色权限信息
var changeRoleAuthorityData = {
  "errCode": 0,
  "errMsg": "[响应成功]",
  "extend": {

  }
}
Mock.mock(roleUrlRoot + 'updateRoleAuthority', 'post', changeRoleAuthorityData);