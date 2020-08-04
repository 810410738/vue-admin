import Mock from 'mockjs'
import {userUrlRoot, dataHandleUrlRoot} from '@/api/http.js'


/**--------------------------------------------------------------------------------------- */
// 根据用户id和子系统id获取当前关联绑定的角色信息
var getUserRoleByCondData = {
  "extend": {
    "data":{
      "roleId":"4"
    }
  },
  "errCode": 0,
  "errMsg": "success"
}
Mock.mock(userUrlRoot + 'getUserRoleByCond', 'post', getUserRoleByCondData);
/**--------------------------------------------------------------------------------------- */
// 根据用户id和子系统id获取当前关联绑定的角色信息
var bindUserRoleData = {
  "extend": {
   
  },
  "errCode": 0,
  "errMsg": "success"
}
Mock.mock(userUrlRoot + 'bindUserRole', 'post', bindUserRoleData);

/**--------------------------------------------------------------------------------------- */
// 01-编辑用户信息(新增或修改)
var editUserData = {
  "extend": {
  },
  "errCode": 0,
  "errMsg": "success"
}
Mock.mock(userUrlRoot + 'edit', 'post', editUserData);

/**--------------------------------------------------------------------------------------- */
// 02-根据userId删除用户信息
var deleteUserByIdData = {
  "extend": {
  },
  "errCode": 0,
  "errMsg": "success"
}
Mock.mock(userUrlRoot + 'deleteById', 'post', deleteUserByIdData);

/**--------------------------------------------------------------------------------------- */
// 03-根据用户id获取用户信息
var getUserByIdData = {
  "errCode": 0,
  "errMsg": "[响应成功]",
  "extend": {
      "data": {
          "userId": "c6ce32e4f5b1406a8f221588926270102",
          "userNum": "20200001",
          "userName": "haha",
          "primaryClass": "中心区支行",
          "secondaryClass": "中心区支行",
          "createTime": "2020-05-08T08:24:30.000+0000",
          "modifyTime": "2020-05-08T08:24:30.000+0000",
          "userStatus": "1",
      }
  }
}
Mock.mock(userUrlRoot + 'getById', 'post', getUserByIdData);

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
            "userId": "c6ce32e4f5b1406a8f221588926270102",
            "userNum": "20200001",
            "userName": "haha",
            "primaryClass": "中心区支行",
            "secondaryClass": "中心区支行",
            "createTime": "2020-05-08T08:24:30.000+0000",
            "modifyTime": "2020-05-08T08:24:30.000+0000",
            "userStatus": "1",
          }]
      }
  }
}
Mock.mock(userUrlRoot + 'getByPage', 'post', getUserByPageData);


/**--------------------------------------------------------------------------------------- */
// 05-用户账号状态修改(启用、禁用)
var changeUserStatusData = {
  "extend": {
  },
  "errCode": 0,
  "errMsg": "success"
}
Mock.mock(userUrlRoot + 'updateUserStatus', 'post', changeUserStatusData);

/**--------------------------------------------------------------------------------------- */

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
