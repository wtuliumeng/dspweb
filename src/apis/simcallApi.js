import Axios from "axios";

/**
 * 模拟调用接口
 */

export default {
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
  
  /*异步调用按钮*/
  syncCall: function({sqlId, userName, ip, token, params, totalDataParam, batchParam}){
    var param = {
      sqlId: sqlId,
      userName: userName,
      ip: ip,
      token: token,
      params: params,
      totalDataParam: totalDataParam,
      batchParam: batchParam
    };
    return Axios.post('/api/simcall-api/syncCall', param);
  }
}
