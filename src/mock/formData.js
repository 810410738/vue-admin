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
        "type": "grid",
        "icon": "icon-grid-",
        "columns": [{
          "span": 12,
          "list": [{
            "type": "text",
            "icon": "icon-wenzishezhi-",
            "options": {
              "defaultValue": "",
              "customClass": "",
              "remoteFunc": "func_1588842501000_795"
            },
            "name": "创建时间",
            "key": "1588842501000_795",
            "model": "createTime",
            "rules": []
          }]
        }, {
          "span": 12,
          "list": [{
            "type": "text",
            "icon": "icon-wenzishezhi-",
            "options": {
              "defaultValue": "",
              "customClass": "",
              "remoteFunc": "func_1588842503000_9633"
            },
            "name": "修改时间",
            "key": "1588842503000_9633",
            "model": "updateTime",
            "rules": []
          }]
        }],
        "options": {
          "gutter": 0,
          "justify": "start",
          "align": "top",
          "remoteFunc": "func_1588842498000_37976"
        },
        "name": "栅格布局",
        "key": "1588842498000_37976",
        "model": "grid_1588842498000_37976",
        "rules": []
      }, {
        "type": "input",
        "icon": "icon-input",
        "options": {
          "width": "100%",
          "defaultValue": "",
          "required": true,
          "dataType": "string",
          "pattern": "",
          "placeholder": "请输入8位用户编号",
          "disabled": false,
          "remoteFunc": "func_1588835095000_1129"
        },
        "name": "用户编号",
        "key": "1588835095000_1129",
        "model": "userNum",
        "rules": [{
          "type": "string",
          "message": "用户编号格式不正确"
        }, {
          "required": true,
          "message": "用户编号必须填写"
        }]
      }, {
        "type": "input",
        "icon": "icon-input",
        "options": {
          "width": "100%",
          "defaultValue": "",
          "required": false,
          "dataType": "string",
          "pattern": "",
          "placeholder": "请输入UASS账号（非必填）",
          "disabled": false,
          "remoteFunc": "func_1588835097000_56202"
        },
        "name": "登录账号",
        "key": "1588835097000_56202",
        "model": "loginAccount",
        "rules": [{
          "type": "string",
          "message": "登录账号格式不正确"
        }]
      }, {
        "type": "input",
        "icon": "icon-input",
        "options": {
          "width": "100%",
          "defaultValue": "",
          "required": true,
          "dataType": "string",
          "pattern": "",
          "placeholder": "请输入用户姓名",
          "disabled": false,
          "remoteFunc": "func_1588834320000_28961"
        },
        "name": "用户姓名",
        "key": "1588834320000_28961",
        "model": "userName",
        "rules": [{
          "type": "string",
          "message": "用户姓名格式不正确"
        }, {
          "required": true,
          "message": "用户姓名必须填写"
        }]
      }, {
        "type": "select",
        "icon": "icon-select",
        "options": {
          "defaultValue": "",
          "multiple": false,
          "disabled": false,
          "clearable": false,
          "placeholder": "请选择所属一级机构",
          "required": false,
          "requiredMessage": "",
          "showLabel": false,
          "width": "100%",
          "options": [

          ],
          "remote": false,
          "remoteType": "func",
          "filterable": false,
          "remoteOptions": [],
          "props": {
            "value": "value",
            "label": "label"
          },
          "remoteFunc": "getPrimaryClass",
          "customClass": "",
          "labelWidth": 100,
          "isLabelWidth": false,
          "hidden": false,
          "dataBind": true
        },
        "name": "所属一级机构",
        "key": "1588845617787",
        "model": "primaryClass",
        "rules": []
      },
      {
        "type": "select",
        "icon": "icon-select",
        "options": {
          "defaultValue": "",
          "multiple": false,
          "disabled": false,
          "clearable": false,
          "placeholder": "请选择所属二级机构",
          "required": true,
          "showLabel": false,
          "width": "100%",
          "options": [{
            "value": "Option 1"
          }, {
            "value": "Option 2"
          }, {
            "value": "Option 3"
          }],
          "remote": false,
          "filterable": false,
          "remoteOptions": [],
          "props": {
            "value": "value",
            "label": "label"
          },
          "remoteFunc": "func_1588835084000_43809"
        },
        "name": "所属二级机构",
        "key": "1588835084000_43809",
        "model": "secondaryClass",
        "rules": [{
          "required": true,
          "message": "所属二级机构必须填写"
        }]
      }, {
        "type": "select",
        "icon": "icon-select",
        "options": {
          "defaultValue": "",
          "multiple": false,
          "disabled": false,
          "clearable": false,
          "placeholder": "请选择是否为党员",
          "required": true,
          "showLabel": true,
          "width": "100%",
          "options": [{
            "value": "1",
            "label": "是"
          }, {
            "value": "0",
            "label": "否"
          }],
          "remote": false,
          "filterable": false,
          "remoteOptions": [],
          "props": {
            "value": "value",
            "label": "label"
          },
          "remoteFunc": "func_1588834519000_173"
        },
        "name": "是否为党员",
        "key": "1588834519000_173",
        "model": "isPartyMember",
        "rules": []
      }, {
        "type": "select",
        "icon": "icon-select",
        "options": {
          "defaultValue": "",
          "multiple": false,
          "disabled": false,
          "clearable": false,
          "placeholder": "请选择是否为主要负责人",
          "required": true,
          "showLabel": true,
          "width": "100%",
          "options": [{
            "value": "1",
            "label": "是"
          }, {
            "value": "0",
            "label": "否"
          }],
          "remote": false,
          "filterable": false,
          "remoteOptions": [],
          "props": {
            "value": "value",
            "label": "label"
          },
          "remoteFunc": "func_1588834825000_54682"
        },
        "name": "是否为主要负责人",
        "key": "1588834825000_54682",
        "model": "isLeader",
        "rules": []
      }, {
        "type": "select",
        "icon": "icon-select",
        "options": {
          "defaultValue": "",
          "multiple": false,
          "disabled": false,
          "clearable": false,
          "placeholder": "请选择系统角色",
          "required": true,
          "showLabel": false,
          "width": "100%",
          "options": [{
            "value": "Option 1"
          }, {
            "value": "Option 2"
          }, {
            "value": "Option 3"
          }],
          "remote": false,
          "filterable": false,
          "remoteOptions": [],
          "props": {
            "value": "value",
            "label": "label"
          },
          "remoteFunc": "func_1588834609000_45855"
        },
        "name": "系统角色",
        "key": "1588834609000_45855",
        "model": "roleId",
        "rules": [{
          "required": true,
          "message": "系统角色必须填写"
        }]
      }, {
        "type": "select",
        "icon": "icon-select",
        "options": {
          "defaultValue": "",
          "multiple": false,
          "disabled": false,
          "clearable": false,
          "placeholder": "请选择所归属的子系统",
          "required": true,
          "showLabel": false,
          "width": "100%",
          "options": [{
            "value": "Option 1"
          }, {
            "value": "Option 2"
          }, {
            "value": "Option 3"
          }],
          "remote": false,
          "filterable": false,
          "remoteOptions": [],
          "props": {
            "value": "value",
            "label": "label"
          },
          "remoteFunc": "func_1588834644000_43238"
        },
        "name": "归属子系统",
        "key": "1588834644000_43238",
        "model": "systemIdentify",
        "rules": [{
          "required": true,
          "message": "归属子系统必须填写"
        }]
      }, {
        "type": "textarea",
        "icon": "icon-diy-com-textarea",
        "options": {
          "width": "100%",
          "defaultValue": "",
          "required": false,
          "disabled": false,
          "pattern": "",
          "placeholder": "",
          "remoteFunc": "func_1588842055000_7915"
        },
        "name": "备注",
        "key": "1588842055000_7915",
        "model": "remark",
        "rules": []
      }
    ],
    "config": {
      "labelWidth": 130,
      "labelPosition": "right",
      "size": "small"
    }
  },
  "errCode": 0,
  "errMsg": "success"
}
Mock.mock(formDesignUrlRoot + 'getFormData', 'post', getFormData);

/**--------------------------------------------------------------------------------------- */
// 获取新增用户的表单数据
var getUserFormData = {
  "extend": {
    // 表单设置
    userInfoForm: {
      // 表单配置项
      labelPosition: "right",
      labelWidth: "130",
      size: "small",
      disabled: false,
      Item:[
        {
          key:'123456',
          name:'userNum',
          type:'input',
          label:'用户编号',
          placeholder:'请输入8位用户编号',
          width:'100',
          isClick:false,
          disabled:false,
          required:true,
          pattern:'',
          errorText:'输入数据的格式不正确',
          rules:[]
        },
        {
          key:'123457',
          name:'loginAccount',
          type:'input',
          label:'登录账号',
          placeholder:'请输入UASS账号（非必填）',
          width:'100',
          isClick:false,
          disabled:false,
          required:true,
          pattern:'',
          errorText:'输入数据的格式不正确',
          rules:[]
        },
        {
          key:'123458',
          name:'primaryClass',
          type:'select',
          label:'所属一级机构',
          placeholder:'请选择所属一级机构',
          width:'100',
          isClick:false,
          disabled:false,
          required:true,
          pattern:'',
          errorText:'输入数据的格式不正确',
          remote:false,
          remoteURL:'/aps3/common/getAllPrimaryClass',
          // 是否联动获取下拉数据
          isLinkOptions:false,
          // 联动选项的id
          linkOptionsKey:'',
          // 是否被联动
          isLinked:false,
          // 被联动获取到的参数
          linkedParmas:{},
          rules:[],
          options:[
            
          ]
        }
      ],
      // 表单字段数据
      Data: {},
      // 表单验证规则
      Rules: {  
      },
    }
  },
  "errCode": 0,
  "errMsg": "success"
}
Mock.mock(formDesignUrlRoot + 'getUserFormData', 'post', getUserFormData);