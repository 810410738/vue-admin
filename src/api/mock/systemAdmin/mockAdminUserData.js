import Mock from 'mockjs'
import {AdminUserUrlRoot} from '@/api/http.js'
/**--------------------------------------------------------------------------------------- */
// 编辑用户信息(新增或修改)
var editData = {
  "extend": {
  },
  "errCode": 0,
  "errMsg": "success"
}
Mock.mock(AdminUserUrlRoot + 'edit', 'post', editData);

/**--------------------------------------------------------------------------------------- */
// 02-根据userId删除用户信息
var deleteByIdData = {
  "extend": {
  },
  "errCode": 0,
  "errMsg": "success"
}
Mock.mock(AdminUserUrlRoot + 'deleteById', 'post', deleteByIdData);

/**--------------------------------------------------------------------------------------- */
// 03-根据用户id获取用户信息
var getByIdData = {
  "errCode": 0,
  "errMsg": "[响应成功]",
  "extend": {
      "data": {
          "adminId": "c6ce32e4f5b1406a8f221588926270102",
          "adminNum": "20200001",
          "adminName": "haha",
          "primaryClass": "中心区支行",
          "secondaryClass": "中心区支行",
          "loginAccount": "haha.sz",
          "createTime": "2020-05-08T08:24:30.000+0000",
          "modifyTime": "2020-05-08T08:24:30.000+0000",
          "adminStatus": "1",
          "remark": "测试",
          "adminRole": "subAdmin"
      }
  }
}
Mock.mock(AdminUserUrlRoot + 'getById', 'post', getByIdData);

/**--------------------------------------------------------------------------------------- */
// 04-根据筛选条件分页获取用户数据
var getByPageData = {
  "errCode": 0,
  "errMsg": "[响应成功]",
  "extend": {
      "pageData": {
          "total": 2,
          "size": 3,
          "pages": 1,
          "current": 1,
          "records|10": [{
            "adminId": "c6ce32e4f5b1406a8f221588926270102",
            "adminNum": "20200001",
            "adminName": "haha",
            "primaryClass": "中心区支行",
            "secondaryClass": "中心区支行",
            "loginAccount": "haha.sz",
            "createTime": "2020-05-08 08:24:30",
            "modifyTime": "2020-05-08 08:24:30",
            "adminStatus": "1",
            "remark": "测试",
            "adminRole": "subAdmin"
          }]
      }
  }
}
Mock.mock(AdminUserUrlRoot + 'getByPage', 'post', getByPageData);


/**--------------------------------------------------------------------------------------- */
// 用户账号状态修改(启用、禁用)
var updateStatusData = {
  "extend": {
  },
  "errCode": 0,
  "errMsg": "success"
}
Mock.mock(AdminUserUrlRoot + 'updateStatus', 'post', updateStatusData);

/**--------------------------------------------------------------------------------------- */
// 重置密码
var updateLoginPasswordData = {
  "extend": {
  },
  "errCode": 0,
  "errMsg": "success"
}
Mock.mock(AdminUserUrlRoot + 'updateLoginPassword', 'post', updateLoginPasswordData);

