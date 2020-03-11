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
    }
}
