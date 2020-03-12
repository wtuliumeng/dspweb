<!-- wuth 20200309 -->
<template>
  <div class="container messageboard2">
    <div class="class1">
      <el-form :label-position="labelPosition" :label-width="labelWidth" :inline="true" :model="form1" class="demo-form-inline">
          <el-form-item label="查询编号:" prop="querynumber" style="white-space: nowrap;">
              <el-input v-model="form1.querynumber" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="任务编号:" prop="tasknumber" style="white-space: nowrap;">
              <el-input v-model="form1.tasknumber" placeholder="请输入"></el-input>
          </el-form-item>
                <el-form-item label="调用方系统:" prop="callsystem" style="white-space: pre-line;">
                    <el-input v-model="form1.callsystem" placeholder="请输入"></el-input>
                </el-form-item>
          <el-form-item label="运行日期:" prop="rundate" style="white-space: nowrap;">
              <el-date-picker type="date"  placeholder="请输入" v-model="form1.rundate"  style="width: 100%;"></el-date-picker>
          </el-form-item>
          <el-form-item label="任务状态:" prop="status" style="white-space: nowrap;">
            <el-select v-model="form1.status" placeholder="请选择" clearable>
                <el-option  v-for="item in form1.statusOptions"   :key="item.value"  :label="item.label"  :value="item.value" ></el-option>
             </el-select>
          </el-form-item>
          <el-button type="primary" @click="queryUser">查询</el-button>
          <el-button type="warning" plain @click="resetQuery">重置</el-button>
          <el-button type="primary" @click="onDown">下载</el-button>
      </el-form>
    </div>
    <div class="tableData">
      <!--表格数据及操作-->
      <el-table :data="tableData" size="mini"  highlight-current-row border   class="el-tb-edit mgt20" ref="multipleTable" tooltip-effect="dark" v-loading="listLoading">
          <!--勾选框-->
          <el-table-column type="selection" width="55">
          </el-table-column>

          <el-table-column prop="querynumber" label="查询编号">
          </el-table-column>

          <el-table-column prop="tasknumber" label="任务编号" >
          </el-table-column>

          <el-table-column prop="callsystem" label="调用方系统" >
          </el-table-column>

          <el-table-column prop="calldate" label="调用日期">
          </el-table-column>

          <el-table-column prop="callparam" label="调用参数" >
          </el-table-column>

          <el-table-column prop="servicename" label="服务名" >
          </el-table-column>

          <el-table-column prop="requestdate" label="请求时间">
          </el-table-column>

          <el-table-column prop="returndate" label="返回时间" >
          </el-table-column>

          <el-table-column prop="responcode" label="响应代码" >
          </el-table-column>

          <el-table-column prop="state" label="任务状态">
          </el-table-column>

          <el-table-column prop="descr" label="描述" >
          </el-table-column>

          <el-table-column  fixed="right" label="操作" width="230" align="center">
             <template slot-scope="scope">
                <el-button type="primary" plain size="small" @click="viewUser(scope.row)">详情</el-button>
            	</template>
          </el-table-column>
      </el-table>
    </div>

    <!-- 用户详情界面-->
    <div class="userInfo">
      <el-dialog :title="formName" :visible.sync="formInfoVisible" :center="true" @close="resetForm('formInfo')">
      	<el-form :inline="true" :model="formInfo" label-width="80px" :rules="formInfoRules" ref="formInfo" :disabled="editable">
          <el-form-item label="查询编号" prop="querynumber">
            <el-input v-model="formInfo.querynumber" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="任务编号" prop="tasknumber">
            <el-input v-model="formInfo.tasknumber" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="调用方系统" prop="callsystem">
            <el-input v-model="formInfo.callsystem" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="调用日期" prop="calldate">
            <el-input v-model="formInfo.calldate" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="调用参数" prop="callparam" v-if="showItem">
            <el-input v-model="formInfo.callparam" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="服务名" prop="servicename" v-if="showItem">
            <el-input v-model="formInfo.servicename" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="请求时间" prop="requestdate" v-if="showItem">
            <el-input v-model="formInfo.requestdate" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="返回时间" prop="returndate" v-if="showItem">
            <el-input v-model="formInfo.returndate" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="响应代码" prop="responcode" v-if="showItem">
            <el-input v-model="formInfo.responcode" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="任务状态" prop="state" v-if="showItem">
            <el-input v-model="formInfo.state" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="descr">
            <el-input v-model="formInfo.descr" auto-complete="off"></el-input>
          </el-form-item>
      	</el-form>
      	<div slot="footer" class="dialog-footer" v-if="footerVisible">
      		<el-button @click="formInfoVisible = false">取消</el-button>
      	</div>
      </el-dialog>
    </div>
  </div>
</template>

<style lang="scss">
// 设置输入框的宽度
.messageboard2{
    .el-input {
        width: 200px;
    }
}
</style>

<script>
  import apis from '../../apis/apis';
  export default {
    name: "userconfig",
    data() {
      return {
        form1: {
          //表单对象
          querynumber: '',
          tasknumber:'',
          callsystem:'',
          rundate:'',
          status:[],
          statusOptions: [
          {
            value: "1",
            label: "成功"
          },
          {
            value: "0",
            label: "失败"
          },
          {
            value: "2",
            label: "延迟"
          }]
        },
        labelPosition: "right", //lable对齐方式
        labelWidth: "60px", //lable宽度
        formInfoVisible: false, //新增界面是否显示
        addLoading: false, //添加按钮Loading加载
        formName: "", //title初始值
        editable: false, //是否可编辑
        showItem: false, //用户子项是否可见
        footerVisible: false, //页脚是否可见
        listLoading: false, //列表Loading加载
        exportSQLVisible: false, //SQL导出界面是否可见

        //用户新增界面数据
        formInfo: {
          querynumber: "",
          tasknumber: "",
          callsystem: "",
          calldate: "",
          callparam: "",
          servicename: "",
          requestdate: "",
          returndate: "",
          responcode: "",
          state: "",
          descr: ""
        },

        //测试数据，后续删除   to delete
        tableData: [
          {
            querynumber:'1',
            tasknumber:'1',
            callsystem:'dsp',
            calldate:'2018-09-08',
            callparam:'1',
            servicename:'1',
            requestdate:'2019-09-10',
            returndate:'2019-09-10',
            responcode:'1',
            state:'1',
            descr:'成功'
          },
          {
            querynumber:'2',
            tasknumber:'2',
            callsystem:'dsp2',
            calldate:'2017-06-08',
            callparam:'1',
            servicename:'1',
            requestdate:'2018-09-10',
            returndate:'2018-09-10',
            responcode:'1',
            state:'1',
            descr:'成功'
          }
        ]
      };
    },
    methods: {
      queryUser: function() {
        this.$message({
          type: "success"
        });

        //接口模拟 TODO
        apis.configApi.queryUser(this.form1)
        .then((data) => {
            console.log('success:', data);
            if (data && data.data) {
              console.log("查询成功");
              console.log(data.data);
            }
        })
        .catch((err) => {
            console.log('error:', err);
        });
      },

      //重置查询
      resetQuery: function() {
        this.$message({
          type: "success",
          message: "重置查询"
        });
      },


      //查看用户详情界面
      viewUser: function(row) {
        this.formName = "用户详情"; //用户详情界面title
        this.formInfoVisible = true; //界面可见
        this.$nextTick(()=>{
            this.editable = true; //不可编辑
            this.showItem = true; //界面子项可见
            this.footerVisible = false; //页脚可见
            this.formInfo = Object.assign({}, row);
        });
      },


    }
  };
</script>

<style lang="scss">
  .btn{
    .el-button{
      text-align: center;
      width:90px
    }
  }
</style>
