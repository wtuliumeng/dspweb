import Axios from "axios";

/**
 * 配置管理接口
 */
export default {
    /**
     * 查询用户配置
     */
    queryUserConfigList: function ({ userName, ipAddr, status, currentPage, pageSize}) {
        var param = {
            userName: userName,
            ipAddr: ipAddr,
            status:status,
            currentPage: currentPage,
            pageSize: pageSize
        };
        return Axios.post('/api/configCenter-api/queryUserConfigList', param);
    },

    /**
     * 新增用户配置
     */
    addUserConfig: function ({userName,password,service,issuer,expireTime,authTime,token,status,createTime,updateTime,ipAddr,salt,timeout}) {
        var param = {
            userName: userName,
            password: password,
            service: service,
            issuer: issuer,
            expireTime: expireTime,
            authTime: authTime,
            token: token,
            status: status,
            createTime: createTime,
            updateTime: updateTime,
            ipAddr: ipAddr,
            salt: salt,
            timeout: timeout
        };
        return Axios.post('/api/configCenter-api/addUserConfig', param);
    },

    /**
     * 修改用户配置
     */
    updateUserConfig: function ({userName,password,service,issuer,expireTime,authTime,token,status,createTime,updateTime,ipAddr,salt,timeout}) {
        var param = {
            userName: userName,
            password: password,
            service: service,
            issuer: issuer,
            expireTime: expireTime,
            authTime: authTime,
            token: token,
            status: status,
            createTime: createTime,
            updateTime: updateTime,
            ipAddr: ipAddr,
            salt: salt,
            timeout: timeout
        };
        return Axios.post('/api/configCenter-api/updateUserConfig', param);
    },


    /**
     * 删除用户配置
     */
    deleteUserConfig: function ({ userName }) {
        var param = {
            userName: userName
        };
        return Axios.post('/api/configCenter-api/deleteUserConfig', param);
    },

    /**
     * 批量删除用户配置
     */
    deleteUserConfigBatch: function ({ userNames }) {
        var param = {
            userNames: userNames
        };
        return Axios.post('/api/configCenter-api/deleteUserConfigBatch', param);
    },




    /**
     * 查询异步任务配置
     */
    queryAsyncTaskList: function ({ sqlId, dbSource, status, currentPage, pageSize}) {
        var param = {
            sqlId: sqlId,
            dbSource: dbSource,
            status:status,
            currentPage: currentPage,
            pageSize: pageSize
        };
        return Axios.post('/api/configCenter-api/queryAsyncTaskList', param);
    },

    /**
     * 新增异步任务配置
     */
    addAsyncTask: function ({sqlId,sqlContext,params,plength,userName,status,tsqlContext,dirName,csqlContext,tableName,dbSource}) {
        var param = {
            sqlId: sqlId,
            sqlContext: sqlContext,
            params: params,
            plength: plength,
            userName: userName,
            status: status,
            tsqlContext: tsqlContext,
            dirName: dirName,
            csqlContext: csqlContext,
            tableName: tableName,
            dbSource: dbSource
        };
        return Axios.post('/api/configCenter-api/addAsyncTask', param);
    },

    /**
     * 修改异步任务配置
     */
    updateAsyncTask: function ({sqlId,sqlContext,params,plength,userName,status,tsqlContext,dirName,csqlContext,tableName,dbSource}) {
        var param = {
            sqlId: sqlId,
            sqlContext: sqlContext,
            params: params,
            plength: plength,
            userName: userName,
            status: status,
            tsqlContext: tsqlContext,
            dirName: dirName,
            csqlContext: csqlContext,
            tableName: tableName,
            dbSource: dbSource
        };
        return Axios.post('/api/configCenter-api/updateAsyncTask', param);
    },


    /**
     * 删除异步任务配置
     */
    deleteAsyncTask: function ({ sqlId }) {
        var param = {
            sqlId: sqlId
        };
        return Axios.post('/api/configCenter-api/deleteAsyncTask', param);
    },

    /**
     * 批量删除异步任务配置
     */
    deleteAsyncTaskBatch: function ({ sqlIds }) {
        var param = {
            sqlIds: sqlIds
        };
        return Axios.post('/api/configCenter-api/deleteAsyncTaskBatch', param);
    },




    /**
     * 查询同步任务配置
     */
    querySyncTaskList: function ({ sqlId, dbSource, status, currentPage, pageSize}) {
        var param = {
            sqlId: sqlId,
            dbSource: dbSource,
            status:status,
            currentPage: currentPage,
            pageSize: pageSize
        };
        return Axios.post('/api/configCenter-api/querySyncTaskList', param);
    },

    /**
     * 新增同步任务配置
     */
    addSyncTask: function ({sqlId,userName,sqlContext,paramCount,params,csqlContext,listParamLimit,status,tableName,dbSource}) {
        var param = {
            sqlId: sqlId,
            userName: userName,
            sqlContext: sqlContext,
            paramCount: paramCount,
            params: params,
            csqlContext: csqlContext,
            listParamLimit: listParamLimit,
            status: status,
            tableName: tableName,
            dbSource: dbSource
        };
        return Axios.post('/api/configCenter-api/addSyncTask', param);
    },

    /**
     * 修改同步任务配置
     */
    updateSyncTask: function ({sqlId,userName,sqlContext,paramCount,params,csqlContext,listParamLimit,status,tableName,dbSource}) {
        var param = {
            sqlId: sqlId,
            userName: userName,
            sqlContext: sqlContext,
            paramCount: paramCount,
            params: params,
            csqlContext: csqlContext,
            listParamLimit: listParamLimit,
            status: status,
            tableName: tableName,
            dbSource: dbSource
        };
        return Axios.post('/api/configCenter-api/updateSyncTask', param);
    },


    /**
     * 删除同步任务配置
     */
    deleteSyncTask: function ({ sqlId }) {
        var param = {
            sqlId: sqlId
        };
        return Axios.post('/api/configCenter-api/deleteSyncTask', param);
    },

    /**
     * 批量删除同步任务配置
     */
    deleteSyncTaskBatch: function ({ sqlIds }) {
        var param = {
            sqlIds: sqlIds
        };
        return Axios.post('/api/configCenter-api/deleteSyncTaskBatch', param);
    }
}
