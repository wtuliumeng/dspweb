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
            <el-select v-model="form1.sex" placeholder="请选择" clearable>
                <el-option  v-for="item in form1.statusOptions"   :key="item.value"  :label="item.label"  :value="item.value" ></el-option>
             </el-select>
          </el-form-item>
      </el-form>
    </div>

    <div class="btn">
      <el-button type="primary" @click="queryUser">查询</el-button>
      <el-button type="primary" @click="addUser">新增</el-button>
      <el-button type="primary" @click="deleteUser">删除</el-button>
      <el-button type="primary" @click="exportSQL">导出SQL</el-button>
    </div>

    <div class="tableData">
      <!--表格数据及操作-->
      <el-table :data="tableData" size="mini"  highlight-current-row border   class="el-tb-edit mgt20" ref="multipleTable" tooltip-effect="dark">
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
      </el-table>
    </div>

    <!-- 用户新增界面 -->
    <el-dialog title="用户新增" :visible.sync="addFormVisible" :close-on-click-modal="false">
    	<el-form :inline="true" :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="addForm.userName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="服务节点" prop="service">
          <el-input v-model="addForm.service" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="发行人" prop="issuer">
          <el-input v-model="addForm.issuer" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="过期时长" prop="expireTime">
          <el-input v-model="addForm.expireTime" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="认证时间" prop="authTime">
          <el-input v-model="addForm.authTime" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="认证签名" prop="token">
          <el-input v-model="addForm.token" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-input v-model="addForm.status" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="创建时间" prop="createTime">
          <el-input v-model="addForm.createTime" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="更新时间" prop="updateTime">
          <el-input v-model="addForm.updateTime" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="允许IP" prop="IPAddr">
          <el-input v-model="addForm.IPAddr" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="盐值" prop="salt">
          <el-input v-model="addForm.salt" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="过期时间" prop="timeout">
          <el-input v-model="addForm.timeout" auto-complete="off"></el-input>
        </el-form-item>
    	</el-form>
    	<div slot="footer" class="dialog-footer">
    		<el-button @click="addFormVisible = false">取消</el-button>
    		<el-button type="primary" @click="addSubmit" :loading="addLoading">提交</el-button>
    	</div>
    </el-dialog>

  </div>
</template>

<script>
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
            value: "启用",
            label: "启用"
          },
          {
            value: "不启用",
            label: "不启用"
          }
        ]
        },
        labelPosition: "right", //lable对齐方式
        labelWidth: "80px", //lable宽度
        addFormVisible: false, //新增界面是否显示
        addLoading: false, //添加按钮Loading加载

        //用户新增输入框验证
        addFormRules: {
          userName: [{ required: true, message: "请输入用户名", trigger: "blur" }]
        },

        //用户新增界面数据
        addForm: {
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
      },

      //显示新增界面
      addUser: function() {
        this.addFormVisible = true;
      },

      //新增提交
      addSubmit: function() {
        this.$message({
          type: "success",
          message: "新增用户TODO"
        });
      },

      deleteUser: function() {
        this.$message({
          type: "success",
          message: "删除"
        });
      },

      exportSQL: function() {
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
    position: right;
    text-align: right;
    .el-button{
      width:100px
    }
  }
</style>
