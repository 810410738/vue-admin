import {get,post} from './http'
import {userUrlRoot, roleAuthorityUrlRoot} from './http'

/**
 * 
 * @description 2.后台系统管理模块 a.用户角色管理 b.角色权限管理
 */
// 02-根据roleId删除角色信息
export const deleteRoleById = data => get( roleAuthorityUrlRoot+ 'deleteRoleById', data);
// 04-根据筛选条件分页获取所有角色信息
export const getAllRoleByPage = data => post( roleAuthorityUrlRoot+ 'getAllRoleByPage', data);

// 获取权限菜单列表
export const getChangeAuthorityList = data => post( roleAuthorityUrlRoot+ 'getChangeAuthorityList', data);