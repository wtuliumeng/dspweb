const Mock = require("mockjs")
/** mockjs start */
var mockObj = {
  init(){
    //userSimCert
    Mock.mock('/api/simcall-api/userSimulateCertify', 'post', this.userSimulateCertify);

    //asyncTaskSimCall
    Mock.mock('/api/simcall-api/asyncCall', 'post', this.asyncCall);

    //syncTaskSimCall
    Mock.mock('/api/simcall-api/syncCall', 'post', this.syncCall);

  },

  //
  asyncCall:({body})=>{
    var result={
      "status":"SUCCESS",
      "message":"执行成功",
      "data":"异步任务模拟调用接口测试，wangsx",
      "count":null,
      "sqlId": "wangsxtestSQL"
      };
      return result;
  },
  syncCall:({body})=>{
    var result={
      "status":"SUCCESS",
      "message":"执行成功",
      "data":"实时任务模拟调用接口测试，wangsx",
      "count":null
      };
      return result;
  },
}

//初始化mock数据和接口
mockObj.init();

/** mockjs end */
