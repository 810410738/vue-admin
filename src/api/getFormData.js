import {post} from './http'
import {formDesignUrlRoot} from './http'


/**
 * 
 * @description 表单设计模块
 */
// 01-编辑表单模板数据（新增、修改-基本属性）
export const editForm = data => post(formDesignUrlRoot + 'editForm', data);

// 02-编辑表单数据(formData)
export const updateFromDataById = data => post(formDesignUrlRoot + 'updateFromDataById', data);

// 03-根据formId删除表单数据
export const deleteFormById = data => post(formDesignUrlRoot + 'deleteFormById', data);

// 04-根据formId查看表单模板（获取基本属性）
export const getFormById = data => post(formDesignUrlRoot + 'getFormById', data);

// 05-根据formId查看表单数据(formData)
export const getFormDataById = data => post(formDesignUrlRoot + 'getFormDataById', data);

// 06-根据筛选条件分页获取表单列表(表单管理中列举表单信息)
export const getFormByPage = data => post(formDesignUrlRoot + 'getFormByPage', data);













