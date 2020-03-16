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

  userSimulateCertify:({body})=>{
    var result={
      "status":"SUCCESS",
      "message":"执行成功",
      "data":"异步任务模拟调用接口测试，wangsx",
      "count":null,
      "userName":"模拟认证1号",
      "token": "token123",
      "authTime": "2020-03-09"
    };
    return result;
  },

  //
  asyncCall:({body})=>{
    var result={
      "status":"SUCCESS",
      "message":"执行成功",
      "data":"异步任务模拟调用接口测试，wangsx",
      "count":null,
      "sqlId": "wangsxtestSQL",
      "state": "wangsxteststate",
      "retCode": "retCodetest",
      "description": "descriptiontest"
      };
      return result;
  },
  syncCall:({body})=>{
    var result={
      "status":"SUCCESS",
      "message":"执行成功",
      "data":"实时任务模拟调用接口测试，wangsx",
      "count":null,
      "sqlId": "synctestSQL",
      "state": "syncteststate",
      "retCode": "retCodetest",
      "description": "descriptiontest"
      };
      return result;
  },
}

//初始化mock数据和接口
mockObj.init();

/** mockjs end */
