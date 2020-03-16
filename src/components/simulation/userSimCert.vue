<template>
  <div class="container certForm1">
    <div>
      <el-form :model="certForm" class="demo-form-inline" :label-position="labelPosition" :label-width="labelWidth"
        :inline="false" :rules="formRules" ref="certForm1">
        <el-form-item label="用户名" prop="userName">
          <el-select v-model="certForm.userName" placeholder="请选择用户">
            <el-option v-for="item in userList" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="certForm.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="IP" prop="ipAddr">
          <el-input v-model="certForm.ipAddr" placeholder="请输入IP"></el-input>
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" @click="onSubmit">认证</el-button>
        </el-form-item>
        <hr />
        <br />
      </el-form>
    </div>
    <!--:model="resultForm"-->
    <div>
      <el-form :model="resultForm" v-show="isShow" class="demo-form-inline" :label-position="labelPosition" :label-width="labelWidth"
        :inline="false" ref="resultForm1">
        <el-form-item label="认证结果:"></el-form-item>
        <el-form-item label="用户名: ">{{resultForm.userName}}</el-form-item>
        <el-form-item label="Token令牌:">{{resultForm.token}}</el-form-item>
        <el-form-item label="认证时间: ">{{resultForm.authTime}}</el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import apis from '../../apis/apis';
  export default {
    name: "userSimCert",
    data() {
      return {
        labelPosition: "right", //lable对齐方式
        labelWidth: "100px", //lable宽度
        textHeight: "40px",
        isShow: false,
        //用户列表测试数据，待删；
        userList: [{
            value: "1",
            label: "user1"
          },
          {
            value: "2",
            label: "user1"
          },
          {
            value: "3",
            label: "user3"
          }
        ],
        //认证结果测试数据，待删；
        certResult: {
          userName: "wangsx",
          token: "123456789987654321",
          authTime: "2020-03-11",
          status: "启用"
        },
        //输入框验证
        formRules: {
          userName: [{
            required: true,
            message: "用户名不能为空",
            trigger: "blur"
          }],
          password: [{
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          }],
          ipAddr: [{
            required: true,
            message: "IP不能为空",
            trigger: "blur"
          }]
        },
        //提交页面数据
        certForm: {
          userName: "",
          password: "",
          ipAddr: ""
        },
        //返回数据，只展示部分
        resultForm: {
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
        }
      };
    },

    mounted(){
      this.getUserNameList();
    },
    methods: {
      onSubmit() {
        this.$refs["certForm1"].validate(valid => {
          if (valid) {
            this.$confirm("确认认证吗？", "提示", {}).then(() => {
              //接口模拟 TODO
              apis.simcallApi.userSimulateCertify(this.certForm).then((data) => {
                console.log('success:', data);
                if (data && data.data) {
                  console.log("操作成功");
                  console.log(data.data);
                  this.isShow=true;
                  this.resultForm.userName=data.data.userName;
                  this.resultForm.token=data.data.token;
                  this.resultForm.authTime=data.data.authTime;
                }
              }).catch((err) => {
                console.log('error:', err);
              });
            });
          } else {
            this.$alert("error!");
            console.log("error submit!!");
          }
        });
      },

      getUserNameList: function(){
        // let data={};
        // this.$ajax({
        //   url: "/api/sysuser-api/searchUserList",
        //   type: "get",
        //   dataType: "json",
        //   success:function(res){
        //     res.data.
        //   }
        // })
        console.log("searchUserList");
      },
    }
  }
</script>

<style lang="scss">
  .certForm1 {
    .el-form-item__content {
      width: 430px;

      .el-select {
        width: 430px;
      }
    }
  }
</style>
