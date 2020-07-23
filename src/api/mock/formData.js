import Mock from 'mockjs'
import {
  formDesignUrlRoot
} from '@/api/http.js'
/**
 * @description 表单设计模块
 */

/**--------------------------------------------------------------------------------------- */
// 01-编辑表单模板数据（新增、修改-基本属性）
var editFormData = {
  "extend": {

  },
  "errCode": 0,
  "errMsg": "success"
}
Mock.mock(formDesignUrlRoot + 'editForm', 'post', editFormData);
/**--------------------------------------------------------------------------------------- */
// 02-编辑表单数据(formData)
var updateFromDataByIdData = {
  "extend": {

  },
  "errCode": 0,
  "errMsg": "success"
}
Mock.mock(formDesignUrlRoot + 'updateFromDataById', 'post', updateFromDataByIdData);
/**--------------------------------------------------------------------------------------- */
// 03-根据formId删除表单数据
var deleteFormByIdData = {
  "extend": {

  },
  "errCode": 0,
  "errMsg": "success"
}
Mock.mock(formDesignUrlRoot + 'deleteFormById', 'post', deleteFormByIdData);
/**--------------------------------------------------------------------------------------- */
// 05-根据formId查看表单数据(formData)
var getFormDataByIdData = {
  "extend": {
    // 表单设置
    formData: {
      // 表单配置项
      disabled:false,
      isShowButton:true,
      submitText:'提交',
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
          remoteURL:'/aps3/common/getPrimaryClass',
          remoteParmas:[

          ],
          // 是否联动获取下拉数据
          isLinkOptions:false,
          // 联动选项的id
          linkOptionsKey:'',
          // 是否被联动
          isLinked:false,
          // 被联动获取到的参数
          linkedParmas:{},
          rules:[],
          // 下拉数据
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
Mock.mock(formDesignUrlRoot + 'getFormDataById', 'post', getFormDataByIdData);
/**--------------------------------------------------------------------------------------- */
//06-根据筛选条件分页获取表单列表(表单管理中列举表单信息)
var getFormByPageData = {
  "errCode": 0,
  "errMsg": "[响应成功]",
  "extend": {
      "pageData": {
          "total": 2,
          "size": 3,
          "pages": 1,
          "current": 1,
          "records|5":[ {
              "formId": "2d606095ae114d1ab72a1589441072234",
              "formName": "测试表单",
              "remark": "表单备注",
              "formData": "",
              "publishStatus": "0",
              "systemIdentify": "ADMIN",
              "createTime": "2020-05-14T07:24:32.000+0000",
              "modifyTime": "2020-05-14T07:24:32.000+0000"
          }]
      }
  }
}
Mock.mock(formDesignUrlRoot + 'getFormByPage', 'post', getFormByPageData);