import Mock from 'mockjs'
import {
  roleUrlRoot
} from '@/api/http.js'
/**
 * @description 系统角色管理模块
 */
/**--------------------------------------------------------------------------------------- */
//01-编辑(新增/修改)角色信息
var editRoleData = {
  "errCode": 0,
  "errMsg": "[响应成功]",
  "extend": {

  }
}
Mock.mock(roleUrlRoot + 'edit', 'post', editRoleData);
/**--------------------------------------------------------------------------------------- */
// 02-根据roleId删除角色信息
var deleteRoleByIdData = {
  "errCode": 0,
  "errMsg": "[响应成功]",
  "extend": {

  }
}
Mock.mock(roleUrlRoot + 'deleteById', 'post', deleteRoleByIdData);
/**--------------------------------------------------------------------------------------- */
//03-根据roleId获取角色信息
var getRoleByIdData = {
  "errCode": 0,
  "errMsg": "[响应成功]",
  "extend": {
      "roleInfo": {
          "roleId": "878134555ea349f6bbfc1588991568444",
          "roleKey": "framework:rest:222",
          "roleName": "管理员",
          "remark": "角色备注",
          "dataScope": "0",
          "roleStatus": "0",
          "systemIdentify": "ADMIN",
          "createTime": "2020-05-09T02:32:48.000+0000",
          "modifyTime": "2020-05-09T02:32:48.000+0000",
          "dataScopeValue": "",
          "roleStatusValue": ""
      }
  }
}
Mock.mock(roleUrlRoot + 'getById', 'post', getRoleByIdData);
/**--------------------------------------------------------------------------------------- */
//04-根据筛选条件分页获取所有角色信息
var getAllRoleByPageData = {
  "errCode": 0,
  "errMsg": "[响应成功]",
  "extend": {
      "pageData": {
          "total": 1,
          "size": 10,
          "pages": 1,
          "current": 1,
          "records": [{
              "roleId": "878134555ea349f6bbfc1588991568444",
              "roleKey": "framework:rest:222",
              "roleName": "管理员",
              "remark": "角色备注",
              "dataScope": "0",
              "roleStatus": "0",
              "systemId":"sdfsdfds",
              "systemName": "ADMIN",
              "createTime": "2020-05-09T02:32:48.000+0000",
              "modifyTime": "2020-05-09T02:32:48.000+0000",
              "dataScopeValue": "",
              "roleStatusValue": ""
          }]
      }
  }
}
Mock.mock(roleUrlRoot + 'getByPage', 'post', getAllRoleByPageData);
/**--------------------------------------------------------------------------------------- */
// 05-启用/禁用角色
var updateRoleStatusData = {
  "errCode": 0,
  "errMsg": "[响应成功]",
  "extend": {
     
  }
}
Mock.mock(roleUrlRoot + 'updateRoleStatus', 'post', updateRoleStatusData);