<!-- wuth 20200312 -->
<template>
  <div class="container">
    <div class="class1">
      <el-form :label-position="labelPosition" :inline="true" :model="formSearch" ref="formSearch" class="demo-form-inline">
          <el-form-item label="SQL编号:" prop="sqlId">
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
      <el-button size="small" round type="danger" @click="syncTaskDeleteBatch">批量删除</el-button>
      <el-button size="small" round type="primary" @click="exportSQL">导出SQL</el-button>
    </div>

    <div class="tableData">
      <!--表格数据及操作-->
      <el-table :data="tableData"  highlight-current-row border   class="el-tb-edit mgt20" ref="multipleTable" @selection-change="handleSelectionChange" tooltip-effect="dark" v-loading="listLoading">
          <!--勾选框-->
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column prop="sqlId" label="SQL编号" align="center"></el-table-column>
          <el-table-column prop="userName" label="调用方系统" align="center"></el-table-column>
          <el-table-column prop="sqlContext" label="取数sql" align="center"></el-table-column>
          <el-table-column prop="paramCount" label="参数个数" align="center"></el-table-column>
          <el-table-column prop="params" label="取数参数" align="center"></el-table-column>
          <el-table-column prop="csqlContext" label="跑批sql" align="center"></el-table-column>
          <el-table-column prop="listParamLimit" label="跑批参数" align="center"></el-table-column>
          <el-table-column prop="status" label="状态" :formatter="formatStatus" align="center"></el-table-column>
          <el-table-column prop="tableName" label="表名" align="center"></el-table-column>
          <el-table-column prop="dbSource" label="数据源" align="center"></el-table-column>

          <el-table-column  fixed="right" label="操作" width="230" align="center">
             <template slot-scope="scope">
                <el-button type="primary" plain size="small" @click="viewTask(scope.row)">详情</el-button>
                <el-button size="small" @click="editTask(scope.row)">编辑</el-button>
                <el-button size="small" type="danger" @click="syncTaskDelete(scope.$index, scope.row)">删除</el-button>
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
      	<el-form :inline="true" :model="formInfo" label-width="80px" :rules="formInfoRules" ref="formInfo" :disabled="editable">
          <el-form-item label="SQL编号" prop="sqlId">
            <el-input v-model="formInfo.sqlId" auto-complete="off" :style="{width: editWidth}"></el-input>
          </el-form-item>
          <el-form-item label="调用方系统" prop="userName">
            <el-input v-model="formInfo.userName" auto-complete="off" :style="{width: editWidth}"></el-input>
          </el-form-item>
          <el-form-item label="取数sql" prop="sqlContext">
            <el-input v-model="formInfo.sqlContext" auto-complete="off" :style="{width: editWidth}"></el-input>
          </el-form-item>
          <el-form-item label="参数个数" prop="paramCount">
            <el-input v-model="formInfo.paramCount" auto-complete="off" :style="{width: editWidth}"></el-input>
          </el-form-item>
          <el-form-item label="取数参数" prop="params">
            <el-input v-model="formInfo.params" auto-complete="off" :style="{width: editWidth}"></el-input>
          </el-form-item>
          <el-form-item label="跑批sql" prop="csqlContext">
            <el-input v-model="formInfo.csqlContext" auto-complete="off" :style="{width: editWidth}"></el-input>
          </el-form-item>
          <el-form-item label="跑批参数" prop="listParamLimit">
            <el-input v-model="formInfo.listParamLimit" auto-complete="off" :style="{width: editWidth}"></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select v-model="formInfo.status" placeholder="请选择" clearable :style="{width: editWidth}">
                <el-option  v-for="item in statusOptions"   :key="item.value"  :label="item.label"  :value="item.value" ></el-option>
             </el-select>
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
    name: "synctaskconfig",
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
          sqlId: [{ required: true, message: "请输入SQL编号", trigger: "blur" }],
          userName: [{ required: true, message: "请输入调用方系统", trigger: "blur" }],
          sqlContext: [{ required: true, message: "请输入取数sql", trigger: "blur" }],
          paramCount: [{ required: true, message: "请输入参数个数", trigger: "blur" }],
          params: [{ required: true, message: "请输入取数参数", trigger: "blur" }],
          csqlContext: [{ required: true, message: "请输入跑批sql", trigger: "blur" }],
          listParamLimit: [{ required: true, message: "请输入跑批参数", trigger: "blur" }],
          status: [{ required: true, message: "请输入状态", trigger: "blur" }],
          tableName: [{ required: true, message: "请输入表名", trigger: "blur" }],
          dbSource: [{ required: true, message: "请输入数据源", trigger: "blur" }]
        },

        //SQL导出界面的校验规则
        exportSQLFormRules: {
        },

        //任务新增界面数据
        formInfo: {
          sqlId: "",
          userName: "",
          sqlContext: "",
          paramCount: "",
          params: "",
          csqlContext: "",
          listParamLimit: "",
          status: "",
          tableName: "",
          dbSource: ""
        },

        exportSQLForm:{
          csqlContext: ""
        },

        //测试数据，后续删除   to delete
        tableData: [
          {
            sqlId: "00001",
            userName: "zzz",
            sqlContext: "123",
            paramCount: "123",
            params: "123",
            csqlContext: "123",
            listParamLimit: "123",
            status: "1",
            tableName: "123",
            dbSource: "123"
          },
          {
            sqlId: "00002",
            userName: "wuth",
            sqlContext: "456",
            paramCount: "456",
            params: "456",
            csqlContext: "456",
            listParamLimit: "456",
            status: "0",
            tableName: "456",
            dbSource: "456"
          }
        ]
      };
    },
    methods: {
      //状态显示转换
      formatStatus: function(row, column) {
        return row.status == 1 ? "启用" : "未启用";
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
            this.syncTaskAdd();
        }
        else if(this.dialogType=='edit'){
            this.syncTaskUpdate();
        }
        else{
            this.$message({message: '操作异常',type: "error"});
        }
      },

      /**
       * 新增同步任务
       */
      syncTaskAdd:function() {
          this.$refs["formInfo"].validate(valid => {
              if(valid){
                  let param = Object.assign({}, this.formInfo);
                  apis.configApi.addSyncTask(param)
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
       * 更新同步任务
       */
      syncTaskUpdate:function() {
          this.$refs.formInfo.validate(valid => {
              if(valid){
                  let param = Object.assign({}, this.formInfo);
                  apis.configApi.updateSyncTask(param)
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
      syncTaskDelete:function(index, rowData) {
          var sqlId=rowData.sqlId;
          this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
          }).then(() => {
                  apis.configApi.deleteSyncTask({sqlId:sqlId})
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
      syncTaskDeleteBatch:function() {
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
                      apis.configApi.deleteSyncTaskBatch({sqlIds:sqlIds})
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
        this.exportSQLVisible = true;
        this.$message({
          type: "success",
          message: "导出SQL"
        });
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
          apis.configApi.querySyncTaskList(param)
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
