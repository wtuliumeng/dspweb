const Mock = require("mockjs")
/** mockjs start */
var mockObj={
    //初始化
    init(){
        //delUserByUserNames
        Mock.mock('/api/config-api/delUserByUserNames', 'post', this.delUserByUserNames);
        Mock.mock('/api/config-api/queryUser', 'post', this.queryUser);
        Mock.mock('/api/config-api/resetUser', 'post', this.resetUser);
        Mock.mock('/api/config-api/modifyUser', 'post', this.modifyUser);
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
    queryUser:({body})=>{
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
    }
}
//初始化mock数据和接口
mockObj.init();

/** mockjs end */
