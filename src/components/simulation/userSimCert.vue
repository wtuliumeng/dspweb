
<template>
  <div class="container certForm1">
    <el-form :model="certForm" class="demo-form-inline" :label-position="labelPosition" :label-width="labelWidth":inline="false" :rules="formRules" ref="certForm1">
      <el-form-item label="用户名" prop="userName">
        <el-select v-model="certForm.userName" placeholder="请选择用户">
          <el-option
            v-for="item in userList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
           ></el-option>
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
      <el-form-item label="认证结果" prop="result">
        <el-input type="textarea" :height="textHeight" readonly="true" resize="none" v-model="certForm.result" placeholder="认证结果"></el-input>
      </el-form-item>
    </el-form>

  </div>


</template>

<script>
  export default{
    name: "userSimCert",
    data() {
      return{
        labelPosition: "right", //lable对齐方式
        labelWidth: "100px", //lable宽度
        textHeight: "40px",
        //用户列表
        userList: [
          {
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
        //输入框验证
        formRules: {
          userName: [
            { required: true, message: "用户名不能为空", trigger: "blur" }
          ],
          password: [
            { required: true, message: "密码不能为空", trigger: "blur" }
          ],
          ipAddr: [
            { required: true, message: "IP不能为空", trigger: "blur" }
          ]
        },
        //提交页面数据
        certForm: {
          userName: "",
          password: "",
          ipAddr: "",
          result: ""
        },
      };
    },
    methods: {
      onSubmit() {
        this.$refs["certForm1"].validate(valid => {
          if (valid) {
            this.$alert("表单验证通过，提交成功", "标题名称", {
              confirmButtonText: "确定",
              callback: action => {
                //   this.$message({
                //     type: "info",
                //     message: `action: ${action}`
                //   });
              }
            });
          } else {
            this.$alert("error!");
            console.log("error submit!!");
            return false;
          }
        });
      }
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
