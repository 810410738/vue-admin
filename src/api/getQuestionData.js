import {post} from './http'
import {questionUrlRoot} from './http'


/**
 * @description 问卷模块
 */
// 01-管理员查看所有问卷列表（public）
export const getQuestionnaires = data => post(questionUrlRoot + 'getQuestionnaires', data);






