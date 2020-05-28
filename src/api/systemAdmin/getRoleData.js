import {post} from '@/api/http'
import {roleUrlRoot} from '@/api/http'

/**
 * 
 * @description 后台系统管理模块 角色信息管理
 */

// 01-编辑(新增/修改)角色信息
export const editRole = data => post( roleUrlRoot+ 'editRole', data);
// 02-根据roleId删除角色信息
export const deleteRoleById = data => post( roleUrlRoot+ 'deleteRoleById', data);
// 03-根据roleId获取角色信
export const getRoleById = data => post( roleUrlRoot+ 'getRoleById', data);
//04-根据筛选条件分页获取所有角色信息
export const getAllRoleByPage = data => post( roleUrlRoot+ 'getAllRoleByPage', data);
// 05-根据筛选条件获取有效的角色信息(已启用)
export const getActiveRoleByCond = data => post( roleUrlRoot+ 'getActiveRoleByCond', data);