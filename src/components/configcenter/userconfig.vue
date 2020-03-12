<!-- wuth 20200309 -->
<template>
  <div class="container">
    <div class="class1">
      <el-form :label-position="labelPosition" :label-width="labelWidth" :inline="true" :model="form1" class="demo-form-inline">
          <el-form-item label="用户名:" prop="userName">
              <el-input v-model="form1.userName" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="IP地址:" prop="IPAddr">
              <el-input v-model="form1.IPAddr" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="状态:" prop="status">
            <el-select v-model="form1.status" placeholder="请选择" clearable>
                <el-option  v-for="item in form1.statusOptions"   :key="item.value"  :label="item.label"  :value="item.value" ></el-option>
             </el-select>
          </el-form-item>
          <!-- <el-form-item label=" "></el-form-item>
          <el-form-item label=" "></el-form-item> -->
          <el-button type="primary" @click="queryUser">查询</el-button>
          <el-button type="warning" plain @click="resetQuery">重置</el-button>
      </el-form>
    </div>

    <div class="btn">
      <el-button size="small" round type="primary" @click="addUser">新增</el-button>
      <el-button size="small" round type="danger" @click="deleteUser">批量删除</el-button>
      <el-button size="small" round type="primary" @click="exportSQL">导出SQL</el-button>
    </div>

    <div class="tableData">
      <!--表格数据及操作-->
      <el-table :data="tableData" size="mini"  highlight-current-row border   class="el-tb-edit mgt20" ref="multipleTable" tooltip-effect="dark" v-loading="listLoading">
          <!--勾选框-->
          <el-table-column type="selection" width="55">
          </el-table-column>

          <el-table-column prop="userName" label="用户名">
          </el-table-column>

          <el-table-column prop="password" label="密码" >
          </el-table-column>

          <el-table-column prop="service" label="服务节点" >
          </el-table-column>

          <el-table-column prop="issuer" label="发行人">
          </el-table-column>

          <el-table-column prop="expireTime" label="过期时长" >
          </el-table-column>

          <el-table-column prop="authTime" label="认证时间" >
          </el-table-column>

          <el-table-column prop="token" label="认证签名">
          </el-table-column>

          <el-table-column prop="status" label="状态" >
          </el-table-column>

          <el-table-column prop="createTime" label="创建时间" >
          </el-table-column>

          <el-table-column prop="updateTime" label="更新时间">
          </el-table-column>

          <el-table-column prop="IPAddr" label="允许IP" >
          </el-table-column>

          <el-table-column prop="salt" label="盐值" >
          </el-table-column>

          <el-table-column prop="timeout" label="过期时间" >
          </el-table-column>

          <el-table-column  fixed="right" label="操作" width="230" align="center">
             <template slot-scope="scope">
                <el-button type="primary" plain size="small" @click="viewUser(scope.row)">详情</el-button>
                <el-button size="small" @click="editUser(scope.row)">编辑</el-button>
                <el-button size="small" type="danger" @click="deleteUser(scope.row)">删除</el-button>
            	</template>
          </el-table-column>
      </el-table>
    </div>

    <!-- 用户界面   用户新增和用户详情界面-->
    <div class="userInfo">
      <el-dialog :title="formName" :visible.sync="formInfoVisible" :center="true" @close="resetForm('formInfo')">
      	<el-form :inline="true" :model="formInfo" label-width="80px" :rules="formInfoRules" ref="formInfo" :disabled="editable">
          <el-form-item label="用户名" prop="userName">
            <el-input v-model="formInfo.userName" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="formInfo.password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="服务节点" prop="service">
            <el-input v-model="formInfo.service" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="发行人" prop="issuer">
            <el-input v-model="formInfo.issuer" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="过期时长" prop="expireTime" v-if="showItem">
            <el-input v-model="formInfo.expireTime" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="认证时间" prop="authTime" v-if="showItem">
            <el-input v-model="formInfo.authTime" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="认证签名" prop="token" v-if="showItem">
            <el-input v-model="formInfo.token" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="status" v-if="showItem">
            <el-input v-model="formInfo.status" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="创建时间" prop="createTime" v-if="showItem">
            <el-input v-model="formInfo.createTime" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="更新时间" prop="updateTime" v-if="showItem">
            <el-input v-model="formInfo.updateTime" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="允许IP" prop="IPAddr">
            <el-input v-model="formInfo.IPAddr" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="盐值" prop="salt">
            <el-input v-model="formInfo.salt" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="过期时间" prop="timeout">
            <el-input v-model="formInfo.timeout" auto-complete="off"></el-input>
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
          <el-form-item label="密码更换" prop="password">
            <el-input v-model="exportSQLForm.password" placeholder="aicc[默认不修改]" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="IP更改" prop="IPAddr">
            <el-input v-model="exportSQLForm.IPAddr" placeholder="127.0.0.1[默认不修改]" auto-complete="off"></el-input>
          </el-form-item>

          <el-form-item label="SQL预览">
            <el-input v-model="exportSQLForm.sqlCode" placeholder="select * from dual" type="textarea" auto-complete="off" :rows="5"></el-input>
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
        form1: {
          //表单对象
          user: "",
          IPAddr: "",
          status: [],
          statusOptions: [
          {
            value: "1",
            label: "启用"
          },
          {
            value: "0",
            label: "不启用"
          }
        ]
        },
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

        //用户新增输入框验证
        formInfoRules: {
          userName: [{ required: true, message: "请输入用户名", trigger: "blur" }],
          //TODO密码校验规则
          password: [{ required: true, message: "请输入密码", trigger: "blur" }],
          service: [{ required: true, message: "请输入服务节点", trigger: "blur" }],
          issuer: [{ required: true, message: "请输入发行人", trigger: "blur" }],
          IPAddr: [{ required: true, message: "请输入IP", trigger: "blur" }],
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
          IPAddr: "",
          salt: "",
          timeout: ""
        },

        exportSQLForm:{
          password: "",
          IPAddr: ""
        },

        //测试数据，后续删除   to delete
        tableData: [
          {
            userName: "左之昨",
            password: "111111",
            service: "节点1",
            issuer: "发行人1",
            expireTime: "过期时长1",
            authTime: "认证时间1",
            token: "签名1",
            status: "启用",
            createTime: "创建时间1",
            updateTime: "更新时间1",
            IPAddr: "IP1",
            salt: "盐值1",
            timeout: "过期时间1"
          },
          {
            userName: "wuth",
            password: "222222",
            service: "节点2",
            issuer: "发行人2",
            expireTime: "过期时长2",
            authTime: "认证时间2",
            token: "签名2",
            status: "未启用",
            createTime: "创建时间2",
            updateTime: "更新时间2",
            IPAddr: "IP2",
            salt: "盐值2",
            timeout: "过期时间2"
          }
        ]
      };
    },
    methods: {
      queryUser: function() {
        this.$message({
          type: "success",
          message: "根据用户名或IP查询"
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

        //接口模拟 TODO
        apis.configApi.resetUser()
        .then((data) => {
            console.log('success:', data);
            if (data && data.data) {
              console.log("重置成功");
              console.log(data.data);
            }
        })
        .catch((err) => {
            console.log('error:', err);
        });
      },

      //显示新增界面
      addUser: function() {
        this.formName = "用户新增"; //新增界面title
        this.editable = false; //可编辑
        this.formInfoVisible = true; //界面可见
        this.showItem = false; //界面子项不可见
        this.footerVisible = true; //页脚可见
      },

      //新增提交   修改提交
      //当前编辑 和 新增界面共用一个提交按钮
      addSubmit: function() {
        this.$message({
          type: "success",
          message: "新增、修改用户TODO"
        });

        this.$refs.formInfo.validate(valid => {
          if (valid) {
            this.$confirm("确认提交吗？", "提示", {}).then(() => {


              //接口模拟 TODO
              apis.configApi.modifyUser(this.formInfo)
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

      //修改用户信息界面
      editUser: function(row) {
        this.formName = "用户修改"; //用户修改界面title
        this.formInfoVisible = true; //界面可见
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

      //删除用户
      deleteUser: function(row) {
        var selectList = this.$refs.multipleTable.selection;
        if (row.userName) {
          selectList[0] = row;
        }
        const length = selectList.length;
        if (length > 0) {
          let userName = "";
          for (let i = 0; i < length; i++) {
            userName += selectList[i].userName + ",";
          }
          //去掉结尾,
          userName = userName.substring(0, userName.length - 1);
          this.$confirm("确认删除该记录吗?", "提示", {
            type: "warning"
          })
            .then(() => {
              //this.listLoading = true;
              let param = new URLSearchParams();
              param.append("userNames", userName);
              console.log("userNames:" + param);

              //接口模拟 TODO
              apis.configApi.delUserByUserNames(param)
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
