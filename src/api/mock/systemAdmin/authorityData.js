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
Mock.mock(authorityUrlRoot + 'editAuthority', 'post', editAuthorityData);
/**--------------------------------------------------------------------------------------- */
//02-根据authorityId删除权限信息
var deleteAuthorityByIdData = {
  "errCode": 0,
  "errMsg": "[响应成功]",
  "extend": {

  }
}
Mock.mock(authorityUrlRoot + 'deleteAuthorityById', 'post', deleteAuthorityByIdData);
/**--------------------------------------------------------------------------------------- */
//03-根据authorityId获取权限信息
var getAuthorityByIdData = {
  "errCode": 0,
  "errMsg": "[响应成功]",
  "extend": {
      "authority": {
          "authorityId": "c2dbbb1b013d4de3a9441589855398772",
          "parentId": "-1",
          "authorityKey": "111framework:rest:222",
          "authorityName": "ADMIN2",
          "authorityUrl": "0",
          "authorityIcon": "0",
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
Mock.mock(authorityUrlRoot + 'getAuthorityById', 'post', getAuthorityByIdData);
/**--------------------------------------------------------------------------------------- */
//04-获取所有权限详细信息(封装成多级权限列表)
var getAuthorityTreeData = {
  "errCode": 0,
  "errMsg": "[响应成功]",
  "extend": {
      "authorityTree": [{
          "nodeId": "1",
          "nodePid": "-1",
          "nodeKey": "11",
          "nodeName": "111",
          "nodeUrl": "1",
          "nodeIcon": "1",
          "nodeType": "1",
          "orderNum": "19",
          "systemIdentify": "ADMIN",
          "children": [{
              "nodeId": "2",
              "nodePid": "1",
              "nodeKey": "22",
              "nodeName": "2222",
              "nodeUrl": "2",
              "nodeIcon": "2",
              "nodeType": "22",
              "orderNum": "22",
              "systemIdentify": "ADMIN",
              "children": []
          }]
      },
      {
        "nodeId": "3",
        "nodePid": "-1",
        "nodeKey": "11",
        "nodeName": "333",
        "nodeUrl": "1",
        "nodeIcon": "1",
        "nodeType": "1",
        "orderNum": "19",
        "systemIdentify": "ADMIN",
        "children": [{
            "nodeId": "4",
            "nodePid": "1",
            "nodeKey": "22",
            "nodeName": "444",
            "nodeUrl": "2",
            "nodeIcon": "2",
            "nodeType": "22",
            "orderNum": "22",
            "systemIdentify": "ADMIN",
            "children": []
        }]
    }
    ]
  }
}
Mock.mock(authorityUrlRoot + 'getAuthorityTree', 'post', getAuthorityTreeData);
/**--------------------------------------------------------------------------------------- */
//05-多级权限列表orderNum编辑(上下移保存)
var updateOrderNumData = {
  "errCode": 0,
  "errMsg": "[响应成功]",
  "extend": {

  }
}
Mock.mock(authorityUrlRoot + 'updateOrderNum', 'post', updateOrderNumData);