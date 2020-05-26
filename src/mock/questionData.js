import Mock from 'mockjs'
import {questionUrlRoot} from '@/api/http.js'
/**
 * @description 问卷模块
 */

/**--------------------------------------------------------------------------------------- */
//01-管理员查看所有问卷列表（public）
var getQuestionnairesData = {
  "extend": {
      "questionnaireList|2": [{
          "questionnaireTitle": "员工工作情况调研：2019-12-18",
          "questionnaireId": "1e15bd32fef64c25a97e9d1cc23c0664",
          "time": "2020-03-20 17:43:01",
          "questionnaireName": "员工工作满意度调研2019-12-18",
          "publishStatus": "1"
      }]
  },
  "errCode": 0,
  "errMsg": "success"
}
Mock.mock(questionUrlRoot + 'getQuestionnaires', 'post', getQuestionnairesData);

/**--------------------------------------------------------------------------------------- */
// 结束问卷
var endQuestionnaireData = {
  "extend": {
  },
  "errCode": 0,
  "errMsg": "success"
}
Mock.mock(questionUrlRoot + 'endQuestionnaire', 'post', endQuestionnaireData);

/**--------------------------------------------------------------------------------------- */
// 查看问卷具体的题目
var getTempQuestionnaireData = {
  "extend": {
    questionnaireName:'第一季度排查',
    title:'请认真填写问卷，谢谢',
    "list":[
      {
        type:'content',
        content:'是否存在异常行为',
        selfAnswer:'否',
        otherAnswer:'否',
        remark:'123'
      },
      {
        subTitle:'工作方面',
        type:'subTitle'
      }
    ]
  },
  "errCode": 0,
  "errMsg": "success"
}
Mock.mock(questionUrlRoot + 'getTempQuestionnaire', 'post', getTempQuestionnaireData);
