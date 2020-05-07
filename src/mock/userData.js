import Mock from 'mockjs'
import {userUrlRoot, roleAuthorityUrlRoot, dataHandleUrlRoot} from '@/api/http.js'

/**--------------------------------------------------------------------------------------- */
//02-导入用户信息
var importUserData = {
  "extend": {
  },
  "errCode": 0,
  "errMsg": "success"
}
Mock.mock(dataHandleUrlRoot + 'importUser', 'post', importUserData);
/**--------------------------------------------------------------------------------------- */
// 03-根据筛选条件分页获取用户信息列表
var findAllUserData = {
  "extend": {
    "page": {
      "totalRow": 12,
      "pageNumber": 1,
      "firstPage": true,
      "lastPage": true,
      "totalPage": 1,
      "pageSize": 30,
      "list|10": [{
        "userNum": "20190020",
        "loginAccount": "ljl-admin.sz",
        "isPartyMemberValue": "非党员",
        "isLeader": "0",
        "isPartyMember": "0",
        "roleName": "普通管理员",
        "isLeaderValue": "其他领导干部",
        "secondaryClass": "中心区支行",
        "userName": "ljl_admin",
        "userId": "1398e8d8d5b34bbab22a6823a6b9ed1f",
        "primaryClass": "中心区支行",
        "systemIdentify": "",
        "createTime": "",
        "updateTime": "",
        "userStatus": "1"
      }]
    }
  },
  "errCode": 0,
  "errMsg": "success"
}
Mock.mock(userUrlRoot + 'getUserByCondAndPage', 'post', findAllUserData);

/**--------------------------------------------------------------------------------------- */
// 04-根据userId获取用户基本信息
var getUserInfoData = {
  "extend": {
    "user": {
      "userNum": "20190025",
      "loginAccount": "ljl-user.sz",
      "isPartyMemberValue": "非党员",
      "roleId": "523517d2bd41436ebd552a248c1d787a",
      "isLeader": "0",
      "isPartyMember": "0",
      "roleName": "普通用户",
      "isLeaderValue": "其他领导干部",
      "secondaryClass": "中心区支行",
      "userName": "ljl_user",
      "userId": "1fdf0399a2e8419ca1aa86586b21e556",
      "primaryClass": "中心区支行"
    }

  },
  "errCode": 0,
  "errMsg": "success"
}
Mock.mock(userUrlRoot + 'getUserById', 'post', getUserInfoData);

/**--------------------------------------------------------------------------------------- */
// 修改用户状态
var changeUserStatusData = {
  "extend": {
    

  },
  "errCode": 0,
  "errMsg": "success"
}
Mock.mock(userUrlRoot + 'changeUserStatus', 'post', changeUserStatusData);


/**--------------------------------------------------------------------------------------- */
// 05-获取所有角色列表(除系统管理员)
var getAllRoleExceptAdminData = {
  "extend": {
    "roleList": [{
        "modifyTime": "2019-11-27 10:18:28",
        "roleId": "523517d2bd41436ebd552a248c1d787a",
        "roleName": "普通用户",
        "roleDescr": "参与评议的用户"
      },
      {
        "modifyTime": "2019-11-27 10:18:28",
        "roleId": "523517d2bd41324ebd552a248c1d787a",
        "roleName": "管理员",
        "roleDescr": "发布问卷，控制开始和结束评议系统，收集统计结果"
      },
    ]
  },
  "errCode": 0,
  "errMsg": "success"
}
Mock.mock(roleAuthorityUrlRoot + 'getAllRoleExceptAdmin', 'post', getAllRoleExceptAdminData);