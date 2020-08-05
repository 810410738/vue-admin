import {post} from '@/api/http'
import {roleUrlRoot} from '@/api/http'

/**
 * 
 * @description 子系统管理模块 角色信息管理
 */

// 01-编辑(新增/修改)角色信息
export const editRole = data => post( roleUrlRoot+ 'edit', data);
// 02-根据roleId删除角色信息
export const deleteRoleById = data => post( roleUrlRoot+ 'deleteById', data);
// 03-根据roleId获取角色信
export const getRoleById = data => post( roleUrlRoot+ 'getById', data);
//04-根据筛选条件分页获取所有角色信息
export const getAllRoleByPage = data => post( roleUrlRoot+ 'getByPage', data);
// 05-启用/禁用角色
export const updateRoleStatus = data => post( roleUrlRoot+ 'updateRoleStatus', data);