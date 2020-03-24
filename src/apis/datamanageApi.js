import Axios from "axios";
/**
 * 数据集管理模块
 */
export default {
  /**
   * 查询数据集列表数据
   */
  getList: function ({ name, id, type,username,currentPage,pageSize}) {
      var param = {
          dataSetsName: name,
          dataSetsId: id,
          dataSetsType: type,
          pageSize: pageSize,
          currentPage: currentPage,
          userId: username
      };
      return Axios.post('/api/data-server-api/list', param);
  },
  add: function ({id,name,type,version,desc,attribute,createUser}){
      var param = {
        id: id,
        name: name,
        type: type,
        version: version,
        desc: desc,
        attribute: attribute,
        createUser: createUser
      };
      return Axios.post('/api/data-server-api/add', param);
  },
  update: function ({id,name,type,version,desc,attribute,createUser}){
      var param = {
        id: id,
        name: name,
        type: type,
        version: version,
        desc: desc,
        attribute: attribute,
        createUser: createUser
      };
      return Axios.post('/api/data-server-api/update', param);
  },
  delete: function ({id}){
    var param = {
      id: id
    };
    return Axios.post('/api/data-server-api/delete', param);
  },
  deleteBatch: function ({ids}){
    var param = {
      ids: ids
    };
    return Axios.post('/api/data-server-api/deleteBatch', param);
  }
}
