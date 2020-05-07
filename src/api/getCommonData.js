import {post, get} from './http'
import {urlRoot, commonUrlRoot} from './http'

/**
 * 
 * @description 公共接口
 */

// 登陆
export const toLogin = data => post(urlRoot + 'toLogin', data);
// 退出登录
export const logout = data => post(urlRoot + 'logout', data);

// 01-封装“所属机构”
export const getAllPrimaryClass = data => post( commonUrlRoot + 'getAllPrimaryClass', data);
// 02-封装“所属网点”
export const getAllSecoByPrim = data => post( commonUrlRoot + 'getAllSecoByPrim', data);
// 03-获取当前登录用户信息
export const getLoginer = data => post( commonUrlRoot + 'getLoginer', data);
// 04-获取当前登录用户访问菜单
export const findAuthorityByLoginRole = data => post( commonUrlRoot + 'getMenuByLoginRole', data);
// 05-获取评议系统启动状态
export const getCurrentCommentOperate = data => post( commonUrlRoot + 'getCurrentCommentOperate', data);

// 测试跨域请求
export const testProxy = data => get('/statistics/findLoginer', data);






