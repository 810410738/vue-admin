import {get, post} from './http'
import {userUrlRoot, roleAuthorityUrlRoot, dataHandleUrlRoot} from './http'

/**
 * 
 * @description 用户模块
 */
// 01-下载用户信息模板
export const downloadUserTemplate = data => get(dataHandleUrlRoot + 'downloadUserTemplate', data);
// 02-导入用户信息
export const importUser = data => post(dataHandleUrlRoot + 'importUser', data);
// 03-根据筛选条件分页获取用户信息列表
export const getUserList = data => post(userUrlRoot + 'getUserByCondAndPage', data);
// 04-根据userId获取用户基本信息
export const getUserInfo = data => post(userUrlRoot + 'getUserById', data);
// 05-获取所有角色列表(除系统管理员)
export const getAllRoleExceptAdmin = data => post(roleAuthorityUrlRoot + 'getAllRoleExceptAdmin', data);
// 06-更新用户角色信息





