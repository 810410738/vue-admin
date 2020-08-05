import {post} from '@/api/http'
import {roleUrlRoot} from '@/api/http'

/**
 * 
 * @description 后台系统管理模块 角色和权限关联
 */

//01-获取角色关联的权限列表(反显角色权限关联关系)
export const getRelateAuthByRoleId = data => post( roleUrlRoot+ 'getRelateAuthByRoleId', data);
// 02-变更角色权限信息
export const changeRoleAuthority = data => post( roleUrlRoot+ 'updateRoleAuthority', data);
