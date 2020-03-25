import Axios from "axios";
/**
 * 文件检索模块
 */
export default {
  /**
   * 查询文件列表数据
   */
  getList: function ({ taskId,fileName,username,currentPage,pageSize}) {
      var param = {
          taskId: taskId,
          fileName: fileName,
          pageSize: pageSize,
          currentPage: currentPage,
          userId: username
      };
      return Axios.post('/api/file-server-api/list', param);
  },
  searchFile: function ({taskId,fileName}) {
    var param = {
      taskId: taskId,
      fileName: fileName
    };
    return Axios.post('/api/file-server-api/searchFile', param);
  }
}
