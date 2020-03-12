import Axios from "axios";

/**
 * 配置管理接口
 */
export default {
    /**
     * 查询用户
     */
    queryUser: function ({ userName, IPAddr, status}) {
        var param = {
            userName: userName,
            IPAddr: IPAddr,
            status:status
        };
        return Axios.post('/api/config-api/queryUser', param);
    },

    /**
     * 新增或者修改用户
     */
    modifyUser: function ({userName,password,service,issuer,expireTime,authTime,token,status,createTime,updateTime,IPAddr,salt,timeout}) {
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
            IPAddr: IPAddr,
            salt: salt,
            timeout: timeout
        };
        return Axios.post('/api/config-api/modifyUser', param);
    },

    /**
     * 重置查询
     */
    resetUser: function () {
      var param = {
      };
        return Axios.post('/api/config-api/resetUser', param);
    },

    /**
     * 删除用户
     */
    delUserByUserNames: function ({ userNames }) {
        var param = {
            userNames: userNames
        };
        return Axios.post('/api/config-api/delUserByUserNames', param);
    },


    /**
     * 查询异步任务
     */
    queryAsyncTask: function ({ sqlID, DBSource, status}) {
        var param = {
            sqlID: sqlID,
            DBSource: DBSource,
            status:status
        };
        return Axios.post('/api/config-api/queryAsyncTask', param);
    },

    /**
     * 新增或者修改异步任务
     */
    modifyAsyncTask: function ({sqlID,sqlContext,params,plength,userName,status,tsqlContext,dirName,csqlContext,tableName,DBSource}) {
        var param = {
            sqlID: sqlID,
            sqlContext: sqlContext,
            params: params,
            plength: plength,
            userName: userName,
            status: status,
            tsqlContext: tsqlContext,
            dirName: dirName,
            csqlContext: csqlContext,
            tableName: tableName,
            DBSource: DBSource
        };
        return Axios.post('/api/config-api/modifyAsyncTask', param);
    },

    /**
     * 重置异步任务查询
     */
    resetAsyncTask: function () {
      var param = {
      };
        return Axios.post('/api/config-api/resetAsyncTask', param);
    },

    /**
     * 删除异步任务
     */
    delAsyncTaskBySqlIDs: function ({ sqlIDs }) {
        var param = {
            sqlIDs: sqlIDs
        };
        return Axios.post('/api/config-api/delAsyncTaskBySqlIDs', param);
    },
    
    
    /**
     * 查询同步任务
     */
    querySyncTask: function ({ sqlID, DBSource, status}) {
        var param = {
            sqlID: sqlID,
            DBSource: DBSource,
            status:status
        };
        return Axios.post('/api/config-api/querySyncTask', param);
    },
    
    /**
     * 新增或者修改同步任务
     */
    modifySyncTask: function ({sqlID,sqlContext,params,plength,userName,status,tsqlContext,dirName,csqlContext,tableName,DBSource}) {
        var param = {
            sqlID: sqlID,
            sqlContext: sqlContext,
            params: params,
            plength: plength,
            userName: userName,
            status: status,
            tsqlContext: tsqlContext,
            dirName: dirName,
            csqlContext: csqlContext,
            tableName: tableName,
            DBSource: DBSource
        };
        return Axios.post('/api/config-api/modifySyncTask', param);
    },
    
    /**
     * 重置同步任务查询
     */
    resetSyncTask: function () {
      var param = {
      };
        return Axios.post('/api/config-api/resetSyncTask', param);
    },
    
    /**
     * 删除同步任务
     */
    delSyncTaskBySqlIDs: function ({ sqlIDs }) {
        var param = {
            sqlIDs: sqlIDs
        };
        return Axios.post('/api/config-api/delSyncTaskBySqlIDs', param);
    }
}
