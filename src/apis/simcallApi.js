import Axios from "axios";

/**
 * 模拟调用接口
 */

export default {
  /*用户模拟认证按钮*/
  userSimulateCertify: function({userName, password, ipAddr}){
    var param = {
      userName: userName,
      password: password,
      ipAddr: ipAddr
    };
    return Axios.post('/api/simcall-api/userSimulateCertify', param);
  },
  /*异步调用按钮*/
  asyncCall: function({sqlId, userName, ip, token, params, totalDataParam, batchParam}){
    var param = {
      sqlId: sqlId,
      userName: userName,
      ip: ip,
      token: token,
      params: params,
      totalDataParam: totalDataParam,
      batchParam: batchParam
    };
    return Axios.post('/api/simcall-api/asyncCall', param);
  },

  /*实时调用按钮*/
  syncCall: function({sqlId, userName, ip, params, batchParam, pageNum, countPage}){
    var param = {
      sqlId: sqlId,
      userName: userName,
      ip: ip,
      params: params,
      batchParam: batchParam,
      pageNum: pageNum,
      countPage: countPage
    };
    return Axios.post('/api/simcall-api/syncCall', param);
  }
}
