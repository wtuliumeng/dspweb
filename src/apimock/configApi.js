const Mock = require("mockjs")
/** mockjs start */
var mockObj={
    //初始化
    init(){
        //user
        Mock.mock('/api/config-api/delUserByUserNames', 'post', this.delUserByUserNames);
        Mock.mock('/api/config-api/queryUser', 'post', this.queryUser);
        Mock.mock('/api/config-api/resetUser', 'post', this.resetUser);
        Mock.mock('/api/config-api/modifyUser', 'post', this.modifyUser);
        
        //AsyncTask
        Mock.mock('/api/config-api/delAsyncBySqlIDs', 'post', this.delAsyncBySqlIDs);
        Mock.mock('/api/config-api/queryAsyncTask', 'post', this.queryAsyncTask);
        Mock.mock('/api/config-api/resetAsyncTask', 'post', this.resetAsyncTask);
        Mock.mock('/api/config-api/modifyAsyncTask', 'post', this.modifyAsyncTask);
        
        //Sync
        Mock.mock('/api/config-api/delSyncBySqlIDs', 'post', this.delSyncBySqlIDs);
        Mock.mock('/api/config-api/querySyncTask', 'post', this.querySyncTask);
        Mock.mock('/api/config-api/resetSyncTask', 'post', this.resetSyncTask);
        Mock.mock('/api/config-api/modifySyncTask', 'post', this.modifySyncTask);
    },
    //模拟查询用户接口
    queryUser:({body})=>{
      var result={
        "status":"SUCCESS",
        "message":"执行成功",
        "data":"查询用户接口测试 wuth",
        "count":null
        };
        return result;
    },
    
    //模拟新增用户和编辑接口
    modifyUser:({body})=>{
      var result={
        "status":"SUCCESS",
        "message":"执行成功",
        "data":"用户接口测试 wuth",
        "count":null
        };
        return result;
    },

    //模拟重置查询接口
    resetUser:({body})=>{
      var result={
        "status":"SUCCESS",
        "message":"执行成功",
        "data":"重置查询接口测试 wuth",
        "count":null
        };
        return result;
    },

    //模拟删除用户接口
    delUserByUserNames:({body})=>{
      var result={
        "status":"SUCCESS",
        "message":"执行成功",
        "data":"删除用户接口测试 wuth",
        "count":null
        };
        return result;
    },
    
    
    //
    ////模拟查询异步任务接口
    queryAsyncTask:({body})=>{
      var result={
        "status":"SUCCESS",
        "message":"执行成功",
        "data":"查询异步任务接口测试 wuth",
        "count":null
        };
        return result;
    },
    
    //模拟新增任务和编辑接口
    modifyAsyncTask:({body})=>{
      var result={
        "status":"SUCCESS",
        "message":"执行成功",
        "data":"异步任务接口测试 wuth",
        "count":null
        };
        return result;
    },

    //模拟重置查询接口
    resetAsyncTask:({body})=>{
      var result={
        "status":"SUCCESS",
        "message":"执行成功",
        "data":"重置异步任务接口测试 wuth",
        "count":null
        };
        return result;
    },

    //模拟删除用户接口
    delAsyncBySqlIDs:({body})=>{
      var result={
        "status":"SUCCESS",
        "message":"执行成功",
        "data":"删除异步任务接口测试 wuth",
        "count":null
        };
        return result;
    },
    
    
    //
    ////模拟查询同步任务接口
    querySyncTask:({body})=>{
      var result={
        "status":"SUCCESS",
        "message":"执行成功",
        "data":"查询同步任务接口测试 wuth",
        "count":null
        };
        return result;
    },
    
    //模拟新增任务和编辑接口
    modifySyncTask:({body})=>{
      var result={
        "status":"SUCCESS",
        "message":"执行成功",
        "data":"同步任务接口测试 wuth",
        "count":null
        };
        return result;
    },
    
    //模拟重置查询接口
    resetSyncTask:({body})=>{
      var result={
        "status":"SUCCESS",
        "message":"执行成功",
        "data":"重置同步任务接口测试 wuth",
        "count":null
        };
        return result;
    },
    
    //模拟删除用户接口
    delSyncBySqlIDs:({body})=>{
      var result={
        "status":"SUCCESS",
        "message":"执行成功",
        "data":"删除同步任务接口测试 wuth",
        "count":null
        };
        return result;
    }
}
//初始化mock数据和接口
mockObj.init();

/** mockjs end */
