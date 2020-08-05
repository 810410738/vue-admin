import Mock from 'mockjs'
import {
  childSystemInfoUrlRoot
} from '@/api/http.js'
/**--------------------------------------------------------------------------------------- */
// 编辑信息(新增或修改)
var editData = {
  "extend": {},
  "errCode": 0,
  "errMsg": "success"
}
Mock.mock(childSystemInfoUrlRoot + 'edit', 'post', editData);

/**--------------------------------------------------------------------------------------- */
// 02-根据Id删除信息
var deleteByIdData = {
  "extend": {},
  "errCode": 0,
  "errMsg": "success"
}
Mock.mock(childSystemInfoUrlRoot + 'deleteById', 'post', deleteByIdData);

/**--------------------------------------------------------------------------------------- */
// 03-根据id获取信息
var getByIdData = {
  "errCode": 0,
  "errMsg": "[响应成功]",
  "extend": {
    "data": {
      "systemId": "c6ce32e4f5b1406a8f221588926270102",
      "systemIdentify": "aps3",
      "systemName": "员工行为排查",
      "businessDept": "内控合规部",
      "systemStatus": "1",
      "remark": "测试",
      "systemUrl": "http:1.2.3:8080",
      "createTime": "2020-07-01 8:00:00",
      "modifyTime": "2020-07-01 8:00:00"
    }
  }
}
Mock.mock(childSystemInfoUrlRoot + 'getById', 'post', getByIdData);

/**--------------------------------------------------------------------------------------- */
// 04-根据筛选条件分页获取数据
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
        "systemId": "c6ce32e4f5b1406a8f221588926270102",
        "systemIdentify": "aps3",
        "systemName": "员工行为排查",
        "businessDept": "内控合规部",
        "systemStatus": "1",
        "remark": "测试",
        "systemUrl": "http:1.2.3:8080",
        "createTime": "2020-07-01 8:00:00",
        "modifyTime": "2020-07-01 8:00:00"
      }]
    }
  }
}
Mock.mock(childSystemInfoUrlRoot + 'getByPage', 'post', getByPageData);


/**--------------------------------------------------------------------------------------- */
// 状态修改(启用、禁用)
var updateStatusData = {
  "extend": {},
  "errCode": 0,
  "errMsg": "success"
}
Mock.mock(childSystemInfoUrlRoot + 'updateSystemStatus', 'post', updateStatusData);

/**--------------------------------------------------------------------------------------- */