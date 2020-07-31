import {post} from '../http'
import {childSystemInfoUrlRoot} from '../http'

/**
 * 
 * @description 子系统信息模块
 */

// 编辑信息(新增或修改)
export const edit = data => post(childSystemInfoUrlRoot + 'edit', data);
// 根据Id删除信息
export const deleteById = data => post(childSystemInfoUrlRoot + 'deleteById', data);
// 根据id获取信息
export const getById = data => post(childSystemInfoUrlRoot + 'getById', data);
// 根据筛选条件分页获取数据
export const getByPage = data => post(childSystemInfoUrlRoot + 'getByPage', data);
// 状态修改(启用、禁用)
export const updateSystemStatus = data => post(childSystemInfoUrlRoot + 'updateStatus', data);






