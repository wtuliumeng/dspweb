import Axios from "axios";
/**
 * 公共方法
 */
export default {
  /**
   * 查询下拉框数据
   */
  getSelectList: function ({type}) {
      var param = {
          type: type
      };
      return Axios.post('/api/common-api/select', param);
  },
  getLabel: function ({type,value}){
    var param = {
      type: type,
      value: value
    };
    return Axios.post('/api/common-api/getLabel', param);
  },
}
