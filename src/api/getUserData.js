import {get, post} from './http'
import {userUrlRoot, roleAuthorityUrlRoot, dataHandleUrlRoot} from './http'

/**
 * 
 * @description 用户模块
 */
// 下载用户信息模板
export const downloadUserTemplate = data => get(dataHandleUrlRoot + 'downloadUserTemplate', data);
// 导入用户信息
export const importUser = data => post(dataHandleUrlRoot + 'importUser', data);

// 01-编辑用户信息(新增或修改)
export const editUser = data => post(userUrlRoot + 'editUser', data);
// 02-根据userId删除用户信息
export const deleteUserById = data => post(userUrlRoot + 'deleteUserById', data);
// 03-根据用户id获取用户信息
export const getUserById = data => post(userUrlRoot + 'getUserById', data);
// 04-根据筛选条件分页获取用户数据
export const getUserByPage = data => post(userUrlRoot + 'getUserByPage', data);
// 05-用户账号状态修改(启用、禁用)
export const changeUserStatus = data => post(userUrlRoot + 'changeUserStatus', data);
// 06-根据用户id获取关联的角色数据
export const getRoleByUserId = data => post(userUrlRoot + 'getRoleByUserId', data);
// 07-用户角色变更
export const updateUserRole = data => post(userUrlRoot + 'updateUserRole', data);






