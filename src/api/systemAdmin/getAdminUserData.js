import {post} from '../http'
import {AdminUserUrlRoot} from '../http'

/**
 * 
 * @description 管理员用户模块
 */

// 编辑用户信息(新增或修改)
export const edit = data => post(AdminUserUrlRoot + 'edit', data);
// 根据userId删除用户信息
export const deleteById = data => post(AdminUserUrlRoot + 'deleteById', data);
// 根据用户id获取用户信息
export const getById = data => post(AdminUserUrlRoot + 'getById', data);
// 根据筛选条件分页获取用户数据
export const getByPage = data => post(AdminUserUrlRoot + 'getByPage', data);
// 用户账号状态修改(启用、禁用)
export const updateStatus = data => post(AdminUserUrlRoot + 'updateAdminStatus', data);
// 重置密码
export const updateLoginPassword = data => post(AdminUserUrlRoot + 'resetPwd', data);






