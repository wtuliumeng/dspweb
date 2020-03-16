import Axios from "axios";
/**
 *提供监控接口
 */
export default{
	/**
	 * 配置采集服务查询接口
	 */

	onSearch: function ({ sqlId, name, status}) {
	    var param = {
	        sqlId: sqlId,
	        name: name,
	        status:status
	    };
	    return Axios.post('/api/mon-api/onSearch', param);
	},
  /**
   * 配置采集服务下载接口
   */
  onDown: function ({ sqlId, name, status}) {
	    var param = {
	        sqlId: sqlId,
	        name: name,
	        status:status
	    };
	    return Axios.post('/api/mon-api/onDown', param);
	},
  /**
   * 配置交换服务查询接口
   */
  dataSearch: function ({ name, sqlname, switcsystem,resource,rundate}) {
	    var param = {
	        name: name,
	        sqlname: sqlname,
	        switcsystem:switcsystem,
          resource:resource,
          rundate:rundate
	    };
	    return Axios.post('/api/mon-api/dataSearch', param);
	},
  dataDown: function ({ name, sqlname, switcsystem,resource,rundate}) {
      var param = {
          name: name,
          sqlname: sqlname,
          switcsystem:switcsystem,
          resource:resource,
          rundate:rundate
      };
      return Axios.post('/api/mon-api/dataDown', param);
  },
  querySearch: function ({ querynumber, tasknumber, callsystem,resource,rundate}) {
      var param = {
          querynumber: querynumber,
          tasknumber: tasknumber,
          callsystem:callsystem,
          resource:resource,
          rundate:rundate
      };
      return Axios.post('/api/mon-api/querySearch', param);
  },
  queryDown: function ({ querynumber, tasknumber, callsystem,resource,rundate}) {
      var param = {
          querynumber: querynumber,
          tasknumber: tasknumber,
          callsystem:callsystem,
          resource:resource,
          rundate:rundate
      };
      return Axios.post('/api/mon-api/querySearch', param);
  },
}
