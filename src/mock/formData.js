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
    // 表单设置
    FormInfo: {
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
Mock.mock(formDesignUrlRoot + 'getFormData', 'post', getFormData);