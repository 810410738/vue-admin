import {post} from './http'
import {dataHandleUrlRoot} from './http'


/**
 * 
 * @description 数据管理模块
 */
// 获取各机构的统计详情
export const getDeptData = data => post(dataHandleUrlRoot + 'completionDetails', data);

// 获取一份问卷的统计信息
export const getCompletionStatus = data => post(dataHandleUrlRoot + 'completionStatus', data);










