import {post} from './http'
import {urlRoot, commonUrlRoot,commonUrlPimRoot} from './http'

/**
 * 
 * @description 公共接口
 */

// 登陆
export const toLogin = data => post(urlRoot + 'login/toLogin', data);
// 退出登录
export const logout = data => post(urlRoot + 'login/toLogout', data);

// 修改个人信息
export const updatePI = data => post( commonUrlPimRoot + 'updatePI', data);
// 个人密码修改
export const updatePwd = data => post( commonUrlPimRoot + 'updatePwd', data);

// 获取管理员所属一级机构列表
export const getAdminPrimaryClass = data => post( commonUrlRoot + 'getAdminPrimaryClass', data);
// 根据一级机构获取管理员所属二级机构列表
export const getAdminSecByPrim = data => post( commonUrlRoot + 'getAdminSecByPrim', data);

// 获取基本用户所属一级机构列表
export const getUserPrimaryClass = data => post( commonUrlRoot + 'getUserPrimaryClass', data);
// 根据一级机构获取基本用户所属二级机构列表
export const getUserSecByPrim = data => post( commonUrlRoot + 'getUserSecByPrim', data);

// 获取当前已激活的所有子系统列表(封装为下拉框数据)-用于绑定数据
export const getActiveSubSystem = data => post( commonUrlRoot + 'getActiveSubSystem', data);
// 根据指定systemId获取当前已激活的所有角色列表(封装为下拉框数据)
export const getActiveRoleBySystemId = data => post( commonUrlRoot + 'getActiveRoleBySystemId', data);

// 02-获取数据字典数据(下拉框或者多级列表)
// export const getLeafDictByCond = data => post( commonUrlRoot + 'getLeafDictByCond', data);

// export const getIconOption = data => post( commonUrlRoot + 'getIconOption', data);







