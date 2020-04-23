import Mock from 'mockjs'
import {questionUrlRoot} from './mock'
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