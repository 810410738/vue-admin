import Mock from 'mockjs'
import {userUrlRoot, roleAuthorityUrlRoot, dataHandleUrlRoot} from '@/api/http.js'
/**--------------------------------------------------------------------------------------- */
// 01-编辑用户信息(新增或修改)
var editUserData = {
  "extend": {
  },
  "errCode": 0,
  "errMsg": "success"
}
Mock.mock(userUrlRoot + 'editUser', 'post', editUserData);

/**--------------------------------------------------------------------------------------- */
// 02-根据userId删除用户信息
var deleteUserByIdData = {
  "extend": {
  },
  "errCode": 0,
  "errMsg": "success"
}
Mock.mock(userUrlRoot + 'deleteUserById', 'post', deleteUserByIdData);

/**--------------------------------------------------------------------------------------- */
// 03-根据用户id获取用户信息
var getUserByIdData = {
  "errCode": 0,
  "errMsg": "[响应成功]",
  "extend": {
      "user": {
          "userId": "c6ce32e4f5b1406a8f221588926270102",
          "userNum": "20200001",
          "userName": "haha",
          "primaryClass": "中心区支行",
          "secondaryClass": "中心区支行",
          "loginAccount": "haha.sz",
          "loginPassword": "",
          "isPartyMember": "0",
          "isLeader": "0",
          "logicDel": "0",
          "systemIdentify": "ADMIN",
          "createTime": "2020-05-08T08:24:30.000+0000",
          "modifyTime": "2020-05-08T08:24:30.000+0000",
          "userStatus": "1",
          "remark": "测试",
          "isPartyMemberValue": "非党员",
          "isLeaderValue": "否",
          "userStatusValue": "启用"
      }
  }
}
Mock.mock(userUrlRoot + 'getUserById', 'post', getUserByIdData);

/**--------------------------------------------------------------------------------------- */
// 04-根据筛选条件分页获取用户数据
var getUserByPageData = {
  "errCode": 0,
  "errMsg": "[响应成功]",
  "extend": {
      "pageData": {
          "total": 2,
          "size": 3,
          "pages": 1,
          "current": 1,
          "records|10": [{
              "userId": "61a0b23bc4f7414f95891588983569816",
              "userNum": "20200001",
              "userName": "haha",
              "primaryClass": "中心区支行",
              "secondaryClass": "中心区支行",
              "loginAccount": "haha.sz",
              "loginPassword": "000000",
              "isPartyMember": "0",
              "isLeader": "0",
              "logicDel": "0",
              "systemIdentify": "ADMIN1",
              "createTime": "2020-05-09 19:00:02",
              "modifyTime": "2020-05-09 19:00:02",
              "userStatus": "1",
              "remark": "测试",
              "isPartyMemberValue": "非党员",
              "isLeaderValue": "否",
              "userStatusValue": "启用"
          }]
      }
  }
}
Mock.mock(userUrlRoot + 'getUserByPage', 'post', getUserByPageData);


/**--------------------------------------------------------------------------------------- */
// 05-用户账号状态修改(启用、禁用)
var changeUserStatusData = {
  "extend": {
  },
  "errCode": 0,
  "errMsg": "success"
}
Mock.mock(userUrlRoot + 'changeUserStatus', 'post', changeUserStatusData);

/**--------------------------------------------------------------------------------------- */
// 06-根据用户id获取关联的角色数据
var getRoleByUserIdData = {
  "errCode": 0,
  "errMsg": "[响应成功]",
  "extend": {
      "userRoleVOList|5": [{
          "userRoleId": "111",
          "userId": "61a0b23bc4f7414f95891588983569816",
          "roleId": "878134555ea349f6bbfc1588991568444",
          "roleKey": "framework:rest:222",
          "roleName": "管理员",
          "dataScope": "0",
          "roleStatus": "0",
          "systemIdentify": "ADMIN",
          "roleAuthorityVOList": ""
      }]
  }
}
Mock.mock(userUrlRoot + 'getRoleByUserId', 'post', getRoleByUserIdData);

/**--------------------------------------------------------------------------------------- */
// 07-用户角色变更
var updateUserRoleData = {
  "errCode": 0,
  "errMsg": "[响应成功]",
  "extend": {}
}
Mock.mock(userUrlRoot + 'updateUserRole', 'post', updateUserRoleData);

/**--------------------------------------------------------------------------------------- */
//-导入用户信息
var importUserData = {
  "extend": {
  },
  "errCode": 0,
  "errMsg": "success"
}
Mock.mock(dataHandleUrlRoot + 'importUser', 'post', importUserData);
/**--------------------------------------------------------------------------------------- */
