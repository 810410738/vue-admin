import { getFormById } from './getFormData';
import {post} from './http'


/**
 * 
 * @description 
 */
export const testData = data => post("http://39.108.181.169/relife_admin/websocket/buildConnect/", data);