import {get, post} from '../http'
import {userUrlRoot, dataHandleUrlRoot} from '../http'

/**
 * 
 * @description 用户模块
 */
// 下载用户信息模板
export const downloadUserTemplate = data => get(dataHandleUrlRoot + 'downloadUserTemplate', data);
// 导入用户信息
export const importUser = data => post(dataHandleUrlRoot + 'importUser', data);

// 编辑用户信息(新增或修改)
export const edit = data => post(userUrlRoot + 'edit', data);
// 根据userId删除用户信息
export const deleteById = data => post(userUrlRoot + 'deleteById', data);
// 根据用户id获取用户信息
export const getById = data => post(userUrlRoot + 'getById', data);
// 根据筛选条件分页获取用户数据
export const getByPage = data => post(userUrlRoot + 'getByPage', data);
// 用户账号状态修改(启用、禁用)
export const updateUserStatus = data => post(userUrlRoot + 'updateUserStatus', data);






