import Axios from "axios";
/**
 * 数据检索模块
 */
export default {
  /**
   * 查询文件列表数据
   */
  getList: function ({ sqlId,date,username,currentPage,pageSize}) {
      var param = {
          sqlId: sqlId,
          date: date,
          pageSize: pageSize,
          currentPage: currentPage,
          userId: username
      };
      return Axios.post('/api/data-retrieval-api/list', param);
  }
}
