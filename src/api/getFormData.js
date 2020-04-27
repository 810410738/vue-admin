import {post} from './http'
import {formDesignUrlRoot} from './http'


/**
 * 
 * @description 表单设计模块
 */
// 获取所有表单列表
export const getAllFormDesign = data => post(formDesignUrlRoot + 'getAllFormDesign', data);

// 保存表单的数据
export const saveFormData = data => post(formDesignUrlRoot + 'saveFormData', data);

// 获取服务器已经存在的表单数据
export const getFormData = data => post(formDesignUrlRoot + 'getFormData', data);













