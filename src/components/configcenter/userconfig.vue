<!-- wuth 20200309 -->
<template>
  <div class="container">
    <div class="class1">
      <el-form :label-position="labelPosition" :label-width="labelWidth" :inline="true" ref="formSearch" :model="formSearch" class="demo-form-inline">
          <el-form-item label="用户名:" prop="userName">
              <el-input v-model="formSearch.userName" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="IP地址:" prop="ipAddr">
              <el-input v-model="formSearch.ipAddr" placeholder="请输入"></el-input>
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

    <el-row class="mgb15">
      <el-button size="small" round type="primary" @click="handleAdd">新增</el-button>
      <el-button size="small" round type="danger" @click="userConfigDeleteBatch">批量删除</el-button>
      <el-button size="small" round type="primary" @click="handleExport">导出SQL</el-button>
    </el-row>

    <div class="tableData">
      <!--表格数据及操作-->
      <el-table :data="tableData" border stripe style="width: 100%"  highlight-current-row border ref="multipleTable" tooltip-effect="dark" v-loading="listLoading" @selection-change="handleSelectionChange">
          <!--勾选框-->
          <el-table-column type="selection" width="60">
          </el-table-column>

          <!--索引-->
          <el-table-column label="序号" type="index" :index="indexMethod" align="center" width="50">
          </el-table-column>

          <el-table-column prop="userName" label="用户名" width="100" align="center">
          </el-table-column>

          <el-table-column prop="password" label="密码" align="center">
          </el-table-column>

          <el-table-column prop="service" label="服务节点" align="center">
          </el-table-column>

          <el-table-column prop="issuer" label="发行人" align="center">
          </el-table-column>

          <el-table-column prop="expireTime" label="过期时长" align="center">
          </el-table-column>

          <el-table-column prop="authTime" label="认证时间" align="center">
          </el-table-column>

          <el-table-column prop="token" label="认证签名" align="center">
          </el-table-column>

          <el-table-column prop="status" label="状态" :formatter="formatStatus" align="center">
          </el-table-column>

          <el-table-column prop="createTime" label="创建时间" align="center">
          </el-table-column>

          <el-table-column prop="updateTime" label="更新时间" align="center">
          </el-table-column>

          <el-table-column prop="ipAddr" label="允许IP" align="center">
          </el-table-column>

          <el-table-column prop="salt" label="盐值" align="center">
          </el-table-column>

          <el-table-column prop="timeout" label="过期时间" align="center">
          </el-table-column>

          <el-table-column  fixed="right" label="操作" width="230" align="center">
             <template slot-scope="scope">
                <el-button type="primary" plain size="small" @click="viewUser(scope.row)">详情</el-button>
                <el-button size="small" @click="editUser(scope.row)">编辑</el-button>
                <el-button size="small" type="danger" @click="userConfigDelete(scope.$index, scope.row)">删除</el-button>
            	</template>
          </el-table-column>
      </el-table>

      <br>
      <br>
      <el-pagination background layout="total,sizes,prev, pager, next,jumper" :current-page="pageInfo.currentPage" :page-size="pageInfo.pageSize" :total="pageInfo.pageTotal" :page-sizes="[5, 10, 20, 50]" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      </el-pagination>
    </div>

    <!-- 用户界面   用户新增和用户详情界面-->
    <div class="userInfo">
      <el-dialog :title="formName" :visible.sync="formInfoVisible" :center="true" @close="resetForm('formInfo')">
      	<el-form :inline="true" :model="formInfo" label-width="80px" :rules="formInfoRules" ref="formInfo" :disabled="editable">
          <el-form-item label="用户名" prop="userName">
            <el-input v-model="formInfo.userName" auto-complete="off" :style="{width: editWidth}"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="formInfo.password" auto-complete="off" :style="{width: editWidth}"></el-input>
          </el-form-item>
          <el-form-item label="服务节点" prop="service">
            <el-input v-model="formInfo.service" auto-complete="off" :style="{width: editWidth}"></el-input>
          </el-form-item>
          <el-form-item label="发行人" prop="issuer">
            <el-input v-model="formInfo.issuer" auto-complete="off" :style="{width: editWidth}"></el-input>
          </el-form-item>
          <el-form-item label="过期时长" prop="expireTime" v-if="showItem">
            <el-input v-model="formInfo.expireTime" auto-complete="off" :style="{width: editWidth}"></el-input>
          </el-form-item>
          <el-form-item label="认证时间" prop="authTime" v-if="showItem">
            <el-input v-model="formInfo.authTime" auto-complete="off" :style="{width: editWidth}"></el-input>
          </el-form-item>
          <el-form-item label="认证签名" prop="token" v-if="showItem">
            <el-input v-model="formInfo.token" auto-complete="off" :style="{width: editWidth}"></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="status" v-if="showItem">
            <el-select v-model="formInfo.status" placeholder="请选择" clearable :style="{width: editWidth}">
                <el-option  v-for="item in statusOptions"   :key="item.value"  :label="item.label"  :value="item.value" ></el-option>
             </el-select>
          </el-form-item>
          <el-form-item label="创建时间" prop="createTime" v-if="showItem">
            <el-input v-model="formInfo.createTime" auto-complete="off" :style="{width: editWidth}"></el-input>
          </el-form-item>
          <el-form-item label="更新时间" prop="updateTime" v-if="showItem">
            <el-input v-model="formInfo.updateTime" auto-complete="off" :style="{width: editWidth}"></el-input>
          </el-form-item>
          <el-form-item label="允许IP" prop="ipAddr">
            <el-input v-model="formInfo.ipAddr" auto-complete="off" :style="{width: editWidth}"></el-input>
          </el-form-item>
          <el-form-item label="盐值" prop="salt">
            <el-input v-model="formInfo.salt" auto-complete="off"  :style="{width: editWidth}"></el-input>
          </el-form-item>
          <el-form-item label="过期时间" prop="timeout">
            <el-input v-model="formInfo.timeout" auto-complete="off" :style="{width: editWidth}"></el-input>
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
          <el-form-item label="密码更换" prop="password">
            <el-input v-model="exportSQLForm.password"  placeholder="[默认不修改]" auto-complete="off" @change="changeExportForm"></el-input>
          </el-form-item>
          <el-form-item label="IP更改" prop="ipAddr">
            <el-input v-model="exportSQLForm.ipAddr" placeholder="[默认不修改]" auto-complete="off" @change="changeExportForm"></el-input>
          </el-form-item>

          <el-form-item label="SQL预览" prop="sqlCode">
            <el-input v-model="exportSQLForm.sqlCode" style="width: 490px;" placeholder="select * from dual" type="textarea" auto-complete="off" :rows="12"></el-input>
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
    name: "userconfig",
    data() {
      return {
        formSearch: {
          //表单查询
          userName: "",
          ipAddr: "",
          status: "",
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
        labelWidth: '60px', //lable宽度
        formInfoVisible: false, //新增界面是否显示
        addLoading: false, //添加按钮Loading加载
        formName: "", //title初始值
        editable: false, //是否可编辑
        showItem: false, //用户子项是否可见
        footerVisible: false, //页脚是否可见
        listLoading: false, //列表Loading加载
        exportSQLVisible: false, //SQL导出界面是否可见
        editWidth: "200px", //设置输入框的长度
        dialogType:'',//弹框类型：add,edit,show
        multipleSelection: [],

        //用户新增输入框验证
        formInfoRules: {
          userName: [{ required: true, message: "请输入用户名", trigger: "blur" }],
          //TODO密码校验规则
          password: [{ required: true, message: "请输入密码", trigger: "blur" }],
          service: [{ required: true, message: "请输入服务节点", trigger: "blur" }],
          issuer: [{ required: true, message: "请输入发行人", trigger: "blur" }],
          ipAddr: [{ required: true, message: "请输入IP", trigger: "blur" }],
          salt: [{ required: true, message: "请输入盐值", trigger: "blur" }],
          timeout: [{ required: true, message: "请输入过期时间", trigger: "blur" }]
        },

        //SQL导出界面的校验规则
        exportSQLFormRules: {
        },

        //用户新增界面数据
        formInfo: {
          userName: "",
          password: "",
          service: "",
          issuer: "",
          expireTime: "",
          authTime: "",
          token: "",
          status: "",
          createTime: "",
          updateTime: "",
          ipAddr: "",
          salt: "",
          timeout: ""
        },

        exportSQLForm:{
          password: "",
          ipAddr: "",
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
        this.formName = "用户新增"; //新增界面title
        this.editable = false; //可编辑
        this.formInfoVisible = true; //界面可见
        this.showItem = false; //界面子项不可见
        this.footerVisible = true; //页脚可见
        this.dialogType = "add";
      },

      //新增提交   修改提交
      //当前编辑 和 新增界面共用一个提交按钮
      handleSubmit: function() {
        if(this.dialogType=='add'){
            this.userConfigAdd();
        }
        else if(this.dialogType=='edit'){
            this.userConfigUpdate();
        }
        else{
            this.$message({message: '操作异常',type: "error"});
        }
      },

      /**
       * 新增用户
       */
      userConfigAdd:function() {
          this.$refs["formInfo"].validate(valid => {
              if(valid){
                  let param = Object.assign({}, this.formInfo);
                  apis.configApi.addUserConfig(param)
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
       * 更新用户
       */
      userConfigUpdate:function() {
          this.$refs.formInfo.validate(valid => {
              if(valid){
                  let param = Object.assign({}, this.formInfo);
                  apis.configApi.updateUserConfig(param)
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

      //查看用户详情界面
      viewUser: function(row) {
        this.formName = "用户详情"; //用户详情界面title
        this.formInfoVisible = true; //界面可见
        this.dialogType = "show";
        this.$nextTick(()=>{
            this.editable = true; //不可编辑
            this.showItem = true; //界面子项可见
            this.footerVisible = false; //页脚可见
            this.formInfo = Object.assign({}, row);
        });
      },

      //修改用户信息界面
      editUser: function(row) {
        this.formName = "用户修改"; //用户修改界面title
        this.formInfoVisible = true; //界面可见
        this.dialogType = "edit";
        this.$nextTick(()=>{
            this.editable = false; //可编辑
            this.showItem = true; //界面子项可见
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
      userConfigDelete:function(index, rowData) {
          var userName=rowData.userName;
          this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
          }).then(() => {
                  apis.configApi.deleteUserConfig({userName:userName})
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
      userConfigDeleteBatch:function() {
          var userNames= this.multipleSelection.map(item => item.userName);
          if(userNames.length==0){
               this.$message({message: '请选择要删除的项',type: "warn"});
              return;
          }
          this.$confirm('此操作将批量永久删除记录, 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
              }).then(() => {
                      apis.configApi.deleteUserConfigBatch({userNames:userNames})
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
          this.exportSQLForm.password = this.multipleSelection[0].password;
          this.exportSQLForm.ipAddr = this.multipleSelection[0].ipAddr;
          this.exportSQLVisible = true;
          this.setExportSqlCode();
      },

      changeExportForm:function() {
          this.setExportSqlCode();
      },

      setExportSqlCode:function() {
          this.exportSQLForm.sqlCode = "insert into BATCHAUTH (userName,password,service,issuer,expireTime,"
                          +"authTime,token,status,createTime,updateTime,ipAddr,salt,timeout) values('"
                          + this.multipleSelection[0].userName + "', '" + this.exportSQLForm.password + "', '" + this.multipleSelection[0].service + "', '"
                          + this.multipleSelection[0].issuer + "', '" + this.multipleSelection[0].expireTime  + "', '"+ this.multipleSelection[0].authTime + "', '"
                          + this.multipleSelection[0].token + "', '" + this.multipleSelection[0].status + "', '" + this.multipleSelection[0].createTime + "', '"
                          + this.multipleSelection[0].updateTime + "', '" + this.exportSQLForm.ipAddr + "', '" + this.multipleSelection[0].salt + "', '"
                          + this.multipleSelection[0].timeout + "');";
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
          apis.configApi.queryUserConfigList(param)
          .then((data)=>{
              this.listLoading=false;
              if (data && data.data) {

                      var json = data.data;console.log(json.dataList);
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
      //text-align: center;
      width:90px
    }
  }
</style>
