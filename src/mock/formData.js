import Mock from 'mockjs'
import {
  formDesignUrlRoot
} from '@/api/http.js'
/**
 * @description 表单设计模块
 */

/**--------------------------------------------------------------------------------------- */
//获取所有表单列表
var getAllFormDesignData = {
  "extend": {
    "list": [{
      "formGroupId": "23fdgdg",
      "formGroup": "对公信息系统",
      "formName": "76-维护法定名称和证件信息模板",
      "time": "2020-03-20 17:43:01",
      "status": "1",
      "statusLabel": "已发布",
      "formId": "sfaf23423r"
    }]
  },
  "errCode": 0,
  "errMsg": "success"
}
Mock.mock(formDesignUrlRoot + 'getAllFormDesign', 'post', getAllFormDesignData);

/**--------------------------------------------------------------------------------------- */
// 保存表单数据
var saveFormData = {
  "extend": {

  },
  "errCode": 0,
  "errMsg": "success"
}
Mock.mock(formDesignUrlRoot + 'saveFormData', 'post', saveFormData);

/**--------------------------------------------------------------------------------------- */
// 获取服务器已经存在的表单数据
var getFormData = {
  "extend": {
    "list": [{
      "type": "input",
      "icon": "icon-input",
      "options": {
        "width": "100%",
        "defaultValue": "",
        "required": true,
        "dataType": "string",
        "pattern": "",
        "placeholder": "",
        "disabled": false,
        "remoteFunc": "func_1587890843000_31329"
      },
      "name": "单行文本",
      "key": "1587890843000_31329",
      "model": "input_1587890843000_31329",
      "rules": [{
        "type": "string",
        "message": "单行文本格式不正确"
      }, {
        "required": true,
        "message": "单行文本必须填写"
      }
    ]
    }],
    "config": {
      "labelWidth": 100,
      "labelPosition": "right",
      "size": "small"
    }
  },
  "errCode": 0,
  "errMsg": "success"
}
Mock.mock(formDesignUrlRoot + 'getFormData', 'post', getFormData);