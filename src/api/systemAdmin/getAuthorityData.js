import {post} from '@/api/http'
import {authorityUrlRoot} from '@/api/http'

/**
 * 
 * @description 后台系统管理模块 权限信息管理
 */

// 01-编辑(新增/修改)权限信息
export const editAuthority = data => post( authorityUrlRoot+ 'edit', data);
// 02-根据authorityId删除权限信息
export const deleteAuthorityById = data => post( authorityUrlRoot+ 'deleteById', data);
// 03-根据authorityId获取权限信息
export const getAuthorityById = data => post( authorityUrlRoot+ 'getById', data);
// 04-获取所有权限详细信息(封装成多级权限列表)
export const getAuthorityTree = data => post( authorityUrlRoot+ 'getByCond', data);
// 05-多级权限列表orderNum编辑(上下移保存)
export const updateOrderNum = data => post( authorityUrlRoot+ 'updateOrderNum', data);