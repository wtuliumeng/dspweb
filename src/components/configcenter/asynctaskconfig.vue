<!-- wuth 20200311 -->
<template>
  <div class="container">
    <div class="class1">
      <el-form :label-position="labelPosition" :inline="true" :model="formSearch" ref="formSearch" class="demo-form-inline">
          <el-form-item label="任务编号:" prop="sqlId">
              <el-input v-model="formSearch.sqlId" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="数据集:" prop="dbSource">
              <el-input v-model="formSearch.dbSource" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="状态:" prop="status">
            <el-select v-model="formSearch.status" placeholder="请选择" clearable>
                <el-option  v-for="item in statusOptions"   :key="item.value"  :label="item.label"  :value="item.value" ></el-option>
             </el-select>
          </el-form-item>
          <!-- <el-form-item label=" "></el-form-item>
          <el-form-item label=" "></el-form-item> -->
          <el-button type="primary" @click="onSearch">查询</el-button>
          <el-button type="warning" plain @click="resetQuery">重置</el-button>
      </el-form>
    </div>

    <div class="btn">
      <el-button size="small" round type="primary" @click="handleAdd">新增</el-button>
      <el-button size="small" round type="danger" @click="asyncTaskDeleteBatch">批量删除</el-button>
      <el-button size="small" round type="primary" @click="handleExport">导出SQL</el-button>
    </div>

    <div class="tableData">
      <!--表格数据及操作-->
      <el-table :data="tableData" highlight-current-row border   class="el-tb-edit mgt20" ref="multipleTable" tooltip-effect="dark" @selection-change="handleSelectionChange" v-loading="listLoading">
          <!--勾选框-->
          <el-table-column type="selection" width="60">
          </el-table-column>

          <el-table-column label="序号" type="index" :index="indexMethod" width="60" align="center">
          </el-table-column>

          <el-table-column prop="sqlId" label="任务编号" align="center">
          </el-table-column>

          <el-table-column prop="sqlContext" label="取数sql" align="center">
          </el-table-column>

          <el-table-column prop="params" label="取数参数" align="center">
          </el-table-column>

          <el-table-column prop="plength" label="数据项个数" width="100" align="center">
          </el-table-column>

          <el-table-column prop="userName" label="所属系统" width="100" align="center">
          </el-table-column>

          <el-table-column prop="status" label="状态" :formatter="formatStatus" align="center">
          </el-table-column>

          <el-table-column prop="tsqlContext" label="总量sql" align="center">
          </el-table-column>

          <el-table-column prop="dirName" label="文件保存路径" width="110" align="center">
          </el-table-column>

          <el-table-column prop="csqlContext" label="跑批sql" align="center">
          </el-table-column>

          <el-table-column prop="tableName" label="表名" align="center">
          </el-table-column>

          <el-table-column prop="dbSource" label="数据源" align="center">
          </el-table-column>

          <el-table-column  fixed="right" label="操作" width="230" align="center">
             <template slot-scope="scope">
                <el-button type="primary" plain size="small" @click="viewTask(scope.row)">详情</el-button>
                <el-button size="small" @click="editTask(scope.row)">编辑</el-button>
                <el-button size="small" type="danger" @click="asyncTaskDelete(scope.$index, scope.row)">删除</el-button>
            	</template>
          </el-table-column>
      </el-table>

      <br>
      <br>
      <el-pagination background layout="total,sizes,prev, pager, next,jumper" :current-page="pageInfo.currentPage" :page-size="pageInfo.pageSize" :total="pageInfo.pageTotal" :page-sizes="[5, 10, 20, 50]" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      </el-pagination>
    </div>

    <!-- 任务界面   任务新增和任务详情界面-->
    <div class="taskInfo">
      <el-dialog :title="formName" :visible.sync="formInfoVisible" :center="true" @close="resetForm('formInfo')">
      	<el-form :inline="true" :model="formInfo" label-width="110px" :rules="formInfoRules" ref="formInfo" :disabled="editable">
          <el-form-item label="任务编号" prop="sqlId">
            <el-input v-model="formInfo.sqlId" auto-complete="off" :style="{width: editWidth}"></el-input>
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
          <el-form-item label="所属系统" prop="userName">
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
          <el-form-item label="数据源" prop="dbSource">
            <el-input v-model="formInfo.dbSource" auto-complete="off" :style="{width: editWidth}"></el-input>
          </el-form-item>
      	</el-form>
      	<div slot="footer" class="dialog-footer">
      		<el-button @click="formInfoVisible = false">取消</el-button>
      		<el-button v-if="footerVisible" type="primary" @click="handleSubmit" :loading="addLoading">提交</el-button>
      	</div>
      </el-dialog>
    </div>

    <!-- SQL导出界面-->
    <div class="exportSQL">
      <el-dialog title="SQL导出" :visible.sync="exportSQLVisible" :center="true" @close="resetForm('exportSQLForm')">
      	<el-form :inline="true" :model="exportSQLForm" label-width="100px" :rules="exportSQLFormRules" ref="exportSQLForm">
          <el-form-item label="跑批sql更换" prop="csqlContext">
            <el-input v-model="exportSQLForm.csqlContext" placeholder="[默认不修改]" style="width: 490px;" auto-complete="off" type="textarea" @change="changeExportForm" :rows="5"></el-input>
          </el-form-item>

          <el-form-item label="SQL预览" prop="sqlCode">
            <el-input v-model="exportSQLForm.sqlCode" style="width: 490px;" placeholder="select * from log where query_date = ?" type="textarea" auto-complete="off" :rows="10"></el-input>
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
        formSearch: {
          //表单对象
          sqlId: "",
          dbSource: "",
          status: ""
        },
        pageInfo: { //分页
            currentPage: 1,
            pageSize: 5,
            pageTotal: 80
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
        dialogType:'',//弹框类型：add,edit,show
        multipleSelection: [],

        //任务新增输入框验证
        formInfoRules: {
          sqlId: [{ required: true, message: "请输入任务编号", trigger: "blur" }],
          sqlContext: [{ required: true, message: "请输入取数sql", trigger: "blur" }],
          params: [{ required: true, message: "请输入取数参数", trigger: "blur" }],
          plength: [{ required: true, message: "请输入数据项个数", trigger: "blur" }],
          userName: [{ required: true, message: "请输入所属任务", trigger: "blur" }],
          status: [{ required: true, message: "请输入状态", trigger: "blur" }],
          tsqlContext: [{ required: true, message: "请输入总量sql", trigger: "blur" }],
          dirName: [{ required: true, message: "请输入文件保存路径", trigger: "blur" }],
          csqlContext: [{ required: true, message: "请输入跑批sql", trigger: "blur" }],
          tableName: [{ required: true, message: "请输入表名", trigger: "blur" }],
          dbSource: [{ required: true, message: "请输入数据源", trigger: "blur" }]
        },

        //SQL导出界面的校验规则
        exportSQLFormRules: {
        },

        //任务新增界面数据
        formInfo: {
          sqlId: "",
          sqlContext: "",
          params: "",
          plength: "",
          userName: "",
          status: "",
          tsqlContext: "",
          dirName: "",
          csqlContext: "",
          tableName: "",
          dbSource: ""
        },

        exportSQLForm:{
          csqlContext: "",
          sqlCode: ""
        },

        //测试数据，后续删除   to delete
        tableData: []
      };
    },
    created: function() {
      this.onSearch();
    },
    methods: {
      //状态显示转换
      formatStatus: function(row, column) {
        return row.status == 1 ? "启用" : "未启用";
      },

      //table序号
      indexMethod(index) {
        return (this.pageInfo.currentPage -1 )*this.pageInfo.pageSize + index + 1;
      },

      //重置查询
      resetQuery: function() {
        this.$refs['formSearch'].resetFields();
      },

      //显示新增界面
      handleAdd: function() {
        this.formName = "任务新增"; //新增界面title
        this.editable = false; //可编辑
        this.formInfoVisible = true; //界面可见
        this.footerVisible = true; //页脚可见
        this.dialogType = "add";
      },

      //新增提交   修改提交
      //当前编辑 和 新增界面共用一个提交按钮
      handleSubmit: function() {
        if(this.dialogType=='add'){
            this.asyncTaskAdd();
        }
        else if(this.dialogType=='edit'){
            this.asyncTaskUpdate();
        }
        else{
            this.$message({message: '操作异常',type: "error"});
        }
      },

      /**
       * 新增异步任务
       */
      asyncTaskAdd:function() {
          this.$refs["formInfo"].validate(valid => {
              if(valid){
                  let param = Object.assign({}, this.formInfo);
                  apis.configApi.addAsyncTask(param)
                  .then((data)=>{
                      if(data&&data.data){
                          var json=data.data;
                           if(json&&json.status=='SUCCESS'){
                              this.$message({message: '执行成功',type: "success"});
                              this.formInfoVisible = false;
                              this.onSearch();
                              return;
                          }
                      }
                     this.$message({message: '执行失败，请重试',type: "error"});
                  })
                  .catch((err)=>{
                      this.$message({message: '执行失败，请重试',type: "error"});
                  });
              }
          });
      },

       /**
       * 更新异步任务
       */
      asyncTaskUpdate:function() {
          this.$refs.formInfo.validate(valid => {
              if(valid){
                  let param = Object.assign({}, this.formInfo);
                  apis.configApi.updateAsyncTask(param)
                  .then((data)=>{
                      if(data&&data.data){
                          var json=data.data;
                           if(json&&json.status=='SUCCESS'){
                              this.$message({message: '执行成功',type: "success"});
                              this.formInfoVisible = false;
                              this.onSearch();
                              return;
                          }
                      }
                     this.$message({message: '执行失败，请重试',type: "error"});
                  })
                  .catch((err)=>{
                      this.$message({message: '执行失败，请重试',type: "error"});
                  });
              }
          });
      },

      //查看任务详情界面
      viewTask: function(row) {
        this.formName = "任务详情"; //任务详情界面title
        this.formInfoVisible = true; //界面可见
        this.dialogType = "show";
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
        this.dialogType = "edit";
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

      /**
       * 删除用户配置
       */
      asyncTaskDelete:function(index, rowData) {
          var sqlId=rowData.sqlId;
          this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
          }).then(() => {
                  apis.configApi.deleteAsyncTask({sqlId:sqlId})
                  .then((data)=>{
                      this.$common.isSuccess(data,()=>{
                          this.onSearch();
                      });
                  })
                  .catch((err)=>{
                      this.$message({message: '执行失败，请重试',type: "error"});
                  });
          }).catch(() => {
              this.$message({type: 'info',message: '已取消删除'});
          });

      },

      /**
       * 点击选择
       */
      handleSelectionChange:function(val) {
          this.multipleSelection = val;
      },

      /**
       * 批量删除用户配置
       */
      asyncTaskDeleteBatch:function() {
          var sqlIds= this.multipleSelection.map(item => item.sqlId);
          if(sqlIds.length==0){
               this.$message({message: '请选择要删除的项',type: "warn"});
              return;
          }
          this.$confirm('此操作将批量永久删除记录, 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
              }).then(() => {
                      apis.configApi.deleteAsyncTaskBatch({sqlIds:sqlIds})
                      .then((data)=>{
                          this.$common.isSuccess(data,()=>{
                              this.onSearch();
                          });
                      })
                      .catch((err)=>{
                          this.$message({message: '执行失败，请重试',type: "error"});
                      });

              }).catch(() => {
                  this.$message({type: 'info',message: '已取消删除'});
              });
      },

      //SQL导出，未做处理
      exportSQL: function() {
        this.exportSQLVisible = false;
        this.$message({
          type: "success",
          message: "导出SQL"
        });
      },

      //SQL导出页面
      handleExport: function() {
          const length= this.multipleSelection.length;
          if(length < 1){
              this.$message({message: '请选择需要导出SQL的一项',type: "warn"});
              return;
          }
          if(length > 1){
              this.$message({message: '系统暂时只支持单项导出',type: "warn"});
              return;
          }
          this.exportSQLForm.csqlContext = this.multipleSelection[0].csqlContext;
          this.exportSQLVisible = true;
          this.setExportSqlCode();
      },

      changeExportForm:function() {
          this.setExportSqlCode();
      },

      setExportSqlCode:function() {
          this.exportSQLForm.sqlCode = "insert into BATCHSQL (sqlId,sqlContext,params,plength,userName,"
                          + "status,tsqlContext,dirName,csqlContext,tableName,dbSource) values('"
                          + this.multipleSelection[0].sqlId + "', '" + this.multipleSelection[0].sqlContext + "', '" + this.multipleSelection[0].params + "', '"
                          + this.multipleSelection[0].plength + "', '" + this.multipleSelection[0].userName  + "', '"+ this.multipleSelection[0].status + "', '"
                          + this.multipleSelection[0].tsqlContext + "', '" + this.multipleSelection[0].dirName + "', '" + this.exportSQLForm.csqlContext + "', '"
                          + this.multipleSelection[0].tableName + "', '" + this.multipleSelection[0].dbSource + "');";
      },

      /**
       * 分页大小切换
       */
      handleSizeChange:function(val) {
          this.pageInfo.pageSize = val;
          this.onSearch();
      },
      /**
       * 分页切换
       */
      handleCurrentChange:function(val) {
          this.pageInfo.currentPage = val;
          this.onSearch();
      },

      /**
       * 查询列表
       */
      onSearch:function(){
          this.listLoading=true;
          let param = Object.assign({}, this.formSearch, this.pageInfo);
          apis.configApi.queryAsyncTaskList(param)
          .then((data)=>{
              this.listLoading=false;
              if (data && data.data) {

                      var json = data.data;
                      if (json.status == 'SUCCESS') {
                          this.pageInfo.pageTotal=json.count;
                          this.tableData=json.dataList;
                      }
                      else if (json.message) {
                          this.$message({message: json.message,type: "error"});
                      }
              }
          })
          .catch((err)=>{
              this.listLoading=false;
              this.$message({message: '查询异常，请重试',type: "error"});
          });
      }
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
