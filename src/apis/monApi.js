import Axios from "axios";
/**
 *提供监控接口
 */
export default{
	/**
	 * 配置采集服务查询接口
	 */

	querySearchList: function ({ sqlId, name, status, currentPage, pageSize}) {
	    var param = {
	        sqlId: sqlId,
	        name: name,
	        status:status,
          currentPage:currentPage,
          pageSize:pageSize
	    };
	    return Axios.post('/api/mon-api/querySearchList', param);
	},

  /**
   * 配置采集服务下载接口
   */
  queryDown: function () {
	    var param = {
	    };
	    return Axios.post('/api/mon-api/queryDown', param);
	},
  /**
   * 配置交换服务查询接口
   */
  queryDataSearchList: function ({ name, sqlname, switcsystem,resource,rundate,currentPage,pageSize}) {
	    var param = {
	        name: name,
	        sqlname: sqlname,
	        switcsystem:switcsystem,
          resource:resource,
          rundate:rundate,
          currentPage:currentPage,
          pageSize:pageSize
	    };
	    return Axios.post('/api/mon-api/queryDataSearchList', param);
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
  dataSearchList: function ({ querynumber, tasknumber, callsystem,resource,rundate,currentPage,pageSize}) {
      var param = {
          querynumber: querynumber,
          tasknumber: tasknumber,
          callsystem:callsystem,
          resource:resource,
          rundate:rundate,
          currentPage:currentPage,
          pageSize:pageSize
      };
      return Axios.post('/api/mon-api/dataSearchList', param);
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
