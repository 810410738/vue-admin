import {get,post} from '../http'
import {userUrlRoot, roleAuthorityUrlRoot} from '../http'

/**
 * 
 * @description 2.后台系统管理模块 a.用户角色管理 b.角色权限管理
 */
// 02-根据roleId删除角色信息
export const deleteRoleById = data => get( roleAuthorityUrlRoot+ 'deleteRoleById', data);
// 04-根据筛选条件分页获取所有角色信息
export const getAllRoleByPage = data => post( roleAuthorityUrlRoot+ 'getAllRoleByPage', data);

// 获取该角色的权限菜单列表
export const getChangeAuthorityList = data => post( roleAuthorityUrlRoot+ 'getChangeAuthorityList', data);

// 获取系统的所有权限列表
export const getAuthorityList = data => post( roleAuthorityUrlRoot+ 'getAuthorityList', data);

// 删除一个权限
export const deleteAuthority = data => post( roleAuthorityUrlRoot+ 'deleteAuthority', data);

// 获取所有日志列表
export const getLogData = data => post( roleAuthorityUrlRoot+ 'getLogData', data);