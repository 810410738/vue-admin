import Mock from 'mockjs'
import {
  authorityUrlRoot
} from '@/api/http.js'
/**
 * @description 系统权限信息管理模块
 */
/**--------------------------------------------------------------------------------------- */
//01-编辑(新增/修改)权限信息
var editAuthorityData = {
  "errCode": 0,
  "errMsg": "[响应成功]",
  "extend": {

  }
}
Mock.mock(authorityUrlRoot + 'edit', 'post', editAuthorityData);
/**--------------------------------------------------------------------------------------- */
//02-根据authorityId删除权限信息
var deleteAuthorityByIdData = {
  "errCode": 0,
  "errMsg": "[响应成功]",
  "extend": {

  }
}
Mock.mock(authorityUrlRoot + 'deleteById', 'post', deleteAuthorityByIdData);
/**--------------------------------------------------------------------------------------- */
//03-根据authorityId获取权限信息
var getAuthorityByIdData = {
  "errCode": 0,
  "errMsg": "[响应成功]",
  "extend": {
    "data": {
      "authorityId": "c2dbbb1b013d4de3a9441589855398772",
      "parentId": "-1",
      "authorityKey": "111framework:rest:222",
      "authorityName": "ADMIN2",
      "authorityUrl": "el-icon-milk-tea",
      "authorityIcon": "el-icon-milk-tea",
      "isLeaf": "",
      "authorityType": "角色备注",
      "orderNum": "15",
      "remark": "",
      "systemIdentify": "ADMIN",
      "createTime": "2020-05-19T02:29:58.000+0000",
      "modifyTime": "2020-05-19T02:29:58.000+0000",
      "relateForm": ""
    }
  }
}
Mock.mock(authorityUrlRoot + 'getById', 'post', getAuthorityByIdData);
/**--------------------------------------------------------------------------------------- */
//04-获取所有权限详细信息(封装成多级权限列表)
var getAuthorityTreeData = {
  "errCode": 0,
  "errMsg": "[响应成功]",
  "extend": {
    "dataList": [{
      "authorityId": "3f05d250c61445d4bb7d1596070601050",
      "parentId": "0",
      "authorityKey": "admin:system",
      "authorityName": "系统管理",
      "authorityUrl": "wwww.baidu.com",
      "authorityIcon": "el-icon-milk-tea",
      "authorityType": "BUTTON",
      "orderNum": "1",
      "relateForm": null,
      "systemId": "ADMIN",
      "children": [{
        "authorityId": "a636230f6fc6442e9e111596070795631",
        "parentId": "3f05d250c61445d4bb7d1596070601050",
        "authorityKey": "admin:system:adminUser",
        "authorityName": "管理员信息维护",
        "authorityUrl": "wwww.baidu.com",
        "authorityIcon": "el-icon-milk-tea",
        "authorityType": "BUTTON",
        "orderNum": "1",
        "relateForm": null,
        "systemId": "ADMIN",
        "children": [{
          "authorityId": "8e817f3290364278ba571596070605832",
          "parentId": "a636230f6fc6442e9e111596070795631",
          "authorityKey": "admin:system:adminUser:addAdmin",
          "authorityName": "添加管理员",
          "authorityUrl": "wwww.baidu.com",
          "authorityIcon": "el-icon-milk-tea",
          "authorityType": "BUTTON",
          "orderNum": "1",
          "relateForm": null,
          "systemId": "ADMIN",
          "children": []
        }]
      }]
    }]

  }
}
Mock.mock(authorityUrlRoot + 'getByCond', 'post', getAuthorityTreeData);
/**--------------------------------------------------------------------------------------- */
//05-多级权限列表orderNum编辑(上下移保存)
var updateOrderNumData = {
  "errCode": 0,
  "errMsg": "[响应成功]",
  "extend": {
  }
}
Mock.mock(authorityUrlRoot + 'updateOrderNum', 'post', updateOrderNumData);