const Mock = require("mockjs")
/** mockjs start */
var mockObj={
    //初始化
    init(){
        //DataDev
        Mock.mock('/api/mon-api/onSearch', 'post', this.onSearch);
        Mock.mock('/api/mon-api/onDown', 'post', this.onDown);
        Mock.mock('/api/mon-api/dataSearch', 'post', this.dataSearch);
        Mock.mock('/api/mon-api/dataDown', 'post', this.dataDown);
        Mock.mock('/api/mon-api/querySearch', 'post', this.querySearch);
        Mock.mock('/api/mon-api/queryDown', 'post', this.queryDown);
    },
    //模拟查询用户接口
    onSearch:({body})=>{
      var result={
        "status":"SUCCESS",
        "message":"执行成功",
        "data":"查询接口测试",
        "count":null
        };
        return result;
    },
    onDown:({body})=>{
      var result={
        "status":"SUCCESS",
        "message":"执行成功",
        "data":"下载接口测试",
        "count":null
        };
        return result;
    },
    dataSearch:({body})=>{
      var result={
        "status":"SUCCESS",
        "message":"执行成功",
        "data":"查询接口测试",
        "count":null
        };
        return result;
    },
    dataDown:({body})=>{
      var result={
        "status":"SUCCESS",
        "message":"执行成功",
        "data":"下载接口测试",
        "count":null
        };
        return result;
    },
    querySearch:({body})=>{
      var result={
        "status":"SUCCESS",
        "message":"执行成功",
        "data":"查询接口测试",
        "count":null
        };
        return result;
    },
    queryDown:({body})=>{
      var result={
        "status":"SUCCESS",
        "message":"执行成功",
        "data":"下载接口测试",
        "count":null
        };
        return result;
    },
}
//初始化mock数据和接口
mockObj.init();

/** mockjs end */
