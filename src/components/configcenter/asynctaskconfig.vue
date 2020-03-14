<!-- wuth 20200311 -->
<template>
  <div class="container">
    <div class="class1">
      <el-form :label-position="labelPosition" :inline="true" :model="form1" class="demo-form-inline">
          <el-form-item label="任务编号:" prop="sqlID">
              <el-input v-model="form1.sqlID" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="数据集:" prop="DBSource">
              <el-input v-model="form1.DBSource" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="状态:" prop="status">
            <el-select v-model="form1.status" placeholder="请选择" clearable>
                <el-option  v-for="item in statusOptions"   :key="item.value"  :label="item.label"  :value="item.value" ></el-option>
             </el-select>
          </el-form-item>
          <!-- <el-form-item label=" "></el-form-item>
          <el-form-item label=" "></el-form-item> -->
          <el-button type="primary" @click="queryTask">查询</el-button>
          <el-button type="warning" plain @click="resetQuery">重置</el-button>
      </el-form>
    </div>

    <div class="btn">
      <el-button size="small" round type="primary" @click="addTask">新增</el-button>
      <el-button size="small" round type="danger" @click="deleteTask">批量删除</el-button>
      <el-button size="small" round type="primary" @click="exportSQL">导出SQL</el-button>
    </div>

    <div class="tableData">
      <!--表格数据及操作-->
      <el-table :data="tableData" size="mini"  highlight-current-row border   class="el-tb-edit mgt20" ref="multipleTable" tooltip-effect="dark" v-loading="listLoading">
          <!--勾选框-->
          <el-table-column type="selection" width="55">
          </el-table-column>

          <el-table-column prop="sqlID" label="任务编号">
          </el-table-column>

          <el-table-column prop="sqlContext" label="取数sql" >
          </el-table-column>

          <el-table-column prop="params" label="取数参数" >
          </el-table-column>

          <el-table-column prop="plength" label="数据项个数">
          </el-table-column>

          <el-table-column prop="userName" label="所属任务" >
          </el-table-column>

          <el-table-column prop="status" label="状态" :formatter="formatStatus">
          </el-table-column>

          <el-table-column prop="tsqlContext" label="总量sql">
          </el-table-column>

          <el-table-column prop="dirName" label="文件保存路径" >
          </el-table-column>

          <el-table-column prop="csqlContext" label="跑批sql" >
          </el-table-column>

          <el-table-column prop="tableName" label="表名">
          </el-table-column>

          <el-table-column prop="DBSource" label="数据源" >
          </el-table-column>

          <el-table-column  fixed="right" label="操作" width="230" align="center">
             <template slot-scope="scope">
                <el-button type="primary" plain size="small" @click="viewTask(scope.row)">详情</el-button>
                <el-button size="small" @click="editTask(scope.row)">编辑</el-button>
                <el-button size="small" type="danger" @click="deleteTask(scope.row)">删除</el-button>
            	</template>
          </el-table-column>
      </el-table>
    </div>

    <!-- 任务界面   任务新增和任务详情界面-->
    <div class="taskInfo">
      <el-dialog :title="formName" :visible.sync="formInfoVisible" :center="true" @close="resetForm('formInfo')">
      	<el-form :inline="true" :model="formInfo" label-width="80px" :rules="formInfoRules" ref="formInfo" :disabled="editable">
          <el-form-item label="任务编号" prop="sqlID">
            <el-input v-model="formInfo.sqlID" auto-complete="off" :style="{width: editWidth}"></el-input>
          </el-form-item>
          <el-form-item label="取数sql" prop="sqlContext">
            <el-input v-model="formInfo.sqlContext" auto-complete="off" :style="{width: editWidth}"></el-input>
          </el-form-item>
          <el-form-item label="取数参数" prop="params">
            <el-input v-model="formInfo.params" auto-complete="off" :style="{width: editWidth}"></el-input>
          </el-form-item>
          <el-form-item label="数据项个数" prop="plength">
            <el-input v-model="formInfo.plength" auto-complete="off" :style="{width: editWidth}"></el-input>
          </el-form-item>
          <el-form-item label="所属任务" prop="userName">
            <el-input v-model="formInfo.userName" auto-complete="off" :style="{width: editWidth}"></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select v-model="formInfo.status" placeholder="请选择" clearable :style="{width: editWidth}">
                <el-option  v-for="item in statusOptions"   :key="item.value"  :label="item.label"  :value="item.value" ></el-option>
             </el-select>
          </el-form-item>
          <el-form-item label="总量sql" prop="tsqlContext">
            <el-input v-model="formInfo.tsqlContext" auto-complete="off" :style="{width: editWidth}"></el-input>
          </el-form-item>
          <el-form-item label="文件保存路径" prop="dirName">
            <el-input v-model="formInfo.dirName" auto-complete="off" :style="{width: editWidth}"></el-input>
          </el-form-item>
          <el-form-item label="跑批sql" prop="csqlContext">
            <el-input v-model="formInfo.csqlContext" auto-complete="off" :style="{width: editWidth}"></el-input>
          </el-form-item>
          <el-form-item label="表名" prop="tableName">
            <el-input v-model="formInfo.tableName" auto-complete="off" :style="{width: editWidth}"></el-input>
          </el-form-item>
          <el-form-item label="数据源" prop="DBSource">
            <el-input v-model="formInfo.DBSource" auto-complete="off" :style="{width: editWidth}"></el-input>
          </el-form-item>
      	</el-form>
      	<div slot="footer" class="dialog-footer" v-if="footerVisible">
      		<el-button @click="formInfoVisible = false">取消</el-button>
      		<el-button type="primary" @click="addSubmit" :loading="addLoading">提交</el-button>
      	</div>
      </el-dialog>
    </div>

    <!-- SQL导出界面-->
    <div class="exportSQL">
      <el-dialog title="SQL导出" :visible.sync="exportSQLVisible" :center="true" @close="resetForm('exportSQLForm')">
      	<el-form :inline="true" :model="exportSQLForm" label-width="80px" :rules="exportSQLFormRules" ref="exportSQLForm">
          <el-form-item label="跑批sql更换" prop="csqlContext">
            <el-input v-model="exportSQLForm.csqlContext" placeholder="aicc[默认不修改]" auto-complete="off"></el-input>
          </el-form-item>

          <el-form-item label="SQL预览">
            <el-input v-model="exportSQLForm.sqlCode" placeholder="select * from log where query_date = ?" type="textarea" auto-complete="off" :rows="5"></el-input>
          </el-form-item>
      	</el-form>

        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="exportSQL" :loading="addLoading" :center="true">导出</el-button>
        </div>
      </el-dialog>
    </div>

  </div>
</template>

<script>
  import apis from '../../apis/apis';
  export default {
    name: "asynctaskconfig",
    data() {
      return {
        form1: {
          //表单对象
          sqlID: "",
          DBSource: "",
          status: ""
        },

        statusOptions: [
          {
            value: "1",
            label: "启用"
          },
          {
            value: "0",
            label: "不启用"
          }
        ],

        labelPosition: "right", //lable对齐方式
        labelWidth: '70px', //lable宽度
        formInfoVisible: false, //新增界面是否显示
        addLoading: false, //添加按钮Loading加载
        formName: "", //title初始值
        editable: false, //是否可编辑
        footerVisible: false, //页脚是否可见
        listLoading: false, //列表Loading加载
        exportSQLVisible: false, //SQL导出界面是否可见
        editWidth: "200px", //设置输入框的长度

        //任务新增输入框验证
        formInfoRules: {
          sqlID: [{ required: true, message: "请输入任务编号", trigger: "blur" }],
          sqlContext: [{ required: true, message: "请输入取数sql", trigger: "blur" }],
          params: [{ required: true, message: "请输入取数参数", trigger: "blur" }],
          plength: [{ required: true, message: "请输入数据项个数", trigger: "blur" }],
          userName: [{ required: true, message: "请输入所属任务", trigger: "blur" }],
          status: [{ required: true, message: "请输入状态", trigger: "blur" }],
          tsqlContext: [{ required: true, message: "请输入总量sql", trigger: "blur" }],
          dirName: [{ required: true, message: "请输入文件保存路径", trigger: "blur" }],
          csqlContext: [{ required: true, message: "请输入跑批sql", trigger: "blur" }],
          tableName: [{ required: true, message: "请输入表名", trigger: "blur" }],
          DBSource: [{ required: true, message: "请输入数据源", trigger: "blur" }]
        },

        //SQL导出界面的校验规则
        exportSQLFormRules: {
        },

        //任务新增界面数据
        formInfo: {
          sqlID: "",
          sqlContext: "",
          params: "",
          plength: "",
          userName: "",
          status: "",
          tsqlContext: "",
          dirName: "",
          csqlContext: "",
          tableName: "",
          DBSource: ""
        },

        exportSQLForm:{
          csqlContext: ""
        },

        //测试数据，后续删除   to delete
        tableData: [
          {
            sqlID: "00001",
            sqlContext: "select * from dual",
            params: "params1",
            plength: "2",
            userName: "左之昨",
            status: "0",
            tsqlContext: "select * from dual",
            dirName: "a\b\c",
            csqlContext: "select * from dual",
            tableName: "tableName1",
            DBSource: "DBSource1"
          },
          {
            sqlID: "00001",
            sqlContext: "select * from dual",
            params: "params2",
            plength: "3",
            userName: "wuth",
            status: "1",
            tsqlContext: "select * from dual",
            dirName: "a\b\c",
            csqlContext: "select * from dual",
            tableName: "tableName2",
            DBSource: "DBSource2"
          }
        ]
      };
    },
    methods: {
      //状态显示转换
      formatStatus: function(row, column) {
        return row.status == 1 ? "启用" : "未启用";
      },

      queryTask: function() {
        this.$message({
          type: "success",
          message: "根据ID或数据集查询"
        });

        //接口模拟 TODO
        apis.configApi.queryAsyncTask(this.form1)
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

        //接口模拟 TODO
        apis.configApi.resetAsyncTask()
        .then((data) => {
            console.log('success:', data);
            if (data && data.data) {
              console.log("重置任务成功");
              console.log(data.data);
            }
        })
        .catch((err) => {
            console.log('error:', err);
        });
      },

      //显示新增界面
      addTask: function() {
        this.formName = "任务新增"; //新增界面title
        this.editable = false; //可编辑
        this.formInfoVisible = true; //界面可见
        this.footerVisible = true; //页脚可见
      },

      //新增提交   修改提交
      //当前编辑 和 新增界面共用一个提交按钮
      addSubmit: function() {
        this.$message({
          type: "success",
          message: "新增、修改任务TODO"
        });

        this.$refs.formInfo.validate(valid => {
          if (valid) {
            this.$confirm("确认提交吗？", "提示", {}).then(() => {


              //接口模拟 TODO
              apis.configApi.modifyAsyncTask(this.formInfo)
              .then((data) => {
                  console.log('success:', data);
                  if (data && data.data) {
                    console.log("操作成功");
                    console.log(data.data);
                  }
              })
              .catch((err) => {
                  console.log('error:', err);
              });
            });
          }
        });
      },

      //查看任务详情界面
      viewTask: function(row) {
        this.formName = "任务详情"; //任务详情界面title
        this.formInfoVisible = true; //界面可见
        this.$nextTick(()=>{
            this.editable = true; //不可编辑
            this.footerVisible = false; //页脚可见
            this.formInfo = Object.assign({}, row);
        });
      },

      //修改任务信息界面
      editTask: function(row) {
        this.formName = "任务修改"; //任务修改界面title
        this.formInfoVisible = true; //界面可见
        this.$nextTick(()=>{
            this.editable = false; //可编辑
            this.footerVisible = true; //页脚可见
            this.formInfo = Object.assign({}, row);
        });
      },

      //重置表单
      resetForm: function(form) {
        this.$refs[form].resetFields();
      },

      //删除任务
      deleteTask: function(row) {
        var selectList = this.$refs.multipleTable.selection;
        if (row.sqlID) {
          selectList[0] = row;
        }
        const length = selectList.length;
        if (length > 0) {
          let sqlID = "";
          for (let i = 0; i < length; i++) {
            sqlID += selectList[i].sqlID + ",";
          }
          //去掉结尾,
          sqlID = sqlID.substring(0, sqlID.length - 1);
          this.$confirm("确认删除该记录吗?", "提示", {
            type: "warning"
          })
            .then(() => {
              //this.listLoading = true;
              let param = new URLSearchParams();
              param.append("sqlID", sqlID);
              console.log("sqlID:" + param);

              //接口模拟 TODO
              apis.configApi.delAsyncTaskBySqlIDs(param)
              .then((data) => {
                  console.log('success:', data);
                  if (data && data.data) {
                    console.log("删除成功");
                    console.log(data.data);
                  }
              })
              .catch((err) => {
                  console.log('error:', err);
              });

              //TODO
              // this.$ajax({
              //   method: "post",
              //   url: "/api/config-api/delUserByUserNames",
              //   data: param
              // }).then(res => {
              //   this.listLoading = false;
              //   this.$message({
              //     message: "删除成功",
              //     type: "success"
              //   });
              //   //this.selectList = [];
              //   //this.getResult(1);
              // });
            })
            .catch(() => {});
        } else {
          this.$confirm("请选择一条或多条记录！", "提示", {
            type: "warning"
          }).catch(() => {});
        }
      },

      //SQL导出，未做处理
      exportSQL: function() {
        this.exportSQLVisible = true;
        this.$message({
          type: "success",
          message: "导出SQL"
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
