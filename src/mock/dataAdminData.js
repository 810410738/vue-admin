import Mock from 'mockjs'
var Random = Mock.Random
import {
  dataHandleUrlRoot
} from './mock'
/**
 * @description 数据管理模块
 */

/**--------------------------------------------------------------------------------------- */
// 获取各机构的统计详情
var completionDetailsData = {
  "extend": {
    "dataList|10": [{
      "deptName": '金融科技部',
      "done": '1',
      "undone": '2',
      "reject": '3',
      "unusual": '4',
      "progress": 99.98
    }]
  },
  "errCode": 0,
  "errMsg": "success"
}
Mock.mock(dataHandleUrlRoot + 'completionDetails', 'post', completionDetailsData);

/**--------------------------------------------------------------------------------------- */
// 获取一份问卷的统计信息
var completionStatusData = {
  "extend": {
    "chartData": [{
        value: 10,
        name: "正常提交",
        itemStyle: {
          color: "rgba(75, 192, 192, 0.6)"
        }
      },
      {
        value: 200,
        name: "未完成",
        itemStyle: {
          color: "rgba(220,220,220,0.5)"
        }
      },
      {
        value: 30,
        name: "异常驳回",
        itemStyle: {
          color: "rgba(255, 206, 86, 0.6)"
        }
      },
      {
        value: 30,
        name: "异常提交",
        itemStyle: {
          color: "rgba(255,100,97,1)"
        }
      }
    ]

  },
  "errCode": 0,
  "errMsg": "success"
}
Mock.mock(dataHandleUrlRoot + 'completionStatus', 'post', completionStatusData);