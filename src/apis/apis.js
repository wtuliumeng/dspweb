
import adminApi from './adminApi';
import shiroApi from './shiroApi';
import mayiApi from './mayiApi';
import msgApi from './msgApi';
import configApi from './configApi';
import simcallApi from './simcallApi';
import monApi from './monApi.js';
import datamanageApi from './datamanageApi.js';
import commonApi from './commonApi.js';
/**
 * 接口汇总
 */
export default {
    /**用户,角色,组织等管理接口 */
    adminApi: adminApi,
    /**认证接口 */
    shiroApi: shiroApi,
    /**蚂蚁种树接口 */
    mayiApi:mayiApi,
    /**消息接口 */
    msgApi:msgApi,
    /**配置管理接口 */
    configApi:configApi,
    /**模拟调用接口*/
    simcallApi: simcallApi,
    /**监控中心接口*/
    monApi:monApi,
    /**数据集管理接口*/
    datamanageApi: datamanageApi,
    /* 公共方法接口*/
    commonApi: commonApi
}
