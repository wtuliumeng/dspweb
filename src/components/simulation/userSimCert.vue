<template>
  <div>
    <el-form :model="certForm" label-width="80px" :rules="formRules" ref="certForm">
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
        <el-input v-model="certForm.password" style="width: 220px" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="IP" prop="ipAddr">
        <el-input v-model="certForm.ipAddr" style="width: 220px" placeholder="请输入IP"></el-input>
      </el-form-item>
      <el-form-item label=" ">
          <el-button type="primary" @click="onSubmit">认证</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default{
    name: "userSimCert",
    data() {
      return{

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
          ipAddr: ""
        },
      };
    },
    methods: {
      onSubmit() {
        console.log("submit!");
      }
    }
  }
</script>

<style>
</style>
