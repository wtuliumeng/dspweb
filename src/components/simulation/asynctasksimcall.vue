<template>
  <div class="container certForm1">
    <!--输入框----start-->
    <el-form :model="form1" class="demo-form-inline" :label-position="labelPosition" :label-width="labelWidth"
        :inline="false" :rules="formRules" ref="form1">
        <el-form-item label="任务编号" prop="taskId">
          <el-input v-model="form1.taskId" placeholder="请输入任务编号"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="form1.userName" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="IP" prop="ip">
          <el-input v-model="form1.ip" placeholder="请输入IP"></el-input>
        </el-form-item>
        <el-form-item label="Token" prop="token">
          <el-input v-model="form1.token" placeholder="请输入Token令牌"></el-input>
        </el-form-item>
        <el-form-item label="取数参数" prop="callDataParam">
          <el-input v-model="form1.callDataParam" placeholder="请输入取数参数"></el-input>
        </el-form-item>
        <el-form-item label="数据总量参数" prop="totalDataParam">
          <el-input v-model="form1.totalDataParam" placeholder="请输入数据总量参数"></el-input>
        </el-form-item>
        <el-form-item label="跑批参数" prop="batchParam">
          <el-input v-model="form1.batchParam" placeholder="请输入跑批参数"></el-input>
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" @click="onCall">调用</el-button>
        </el-form-item>
    </el-form>
    <!--输入框----end-->
    <hr /><br />
    <!--调用结果----start-->
    <el-form v-show="isShow" :model="form2" class="demo-form-inline" :label-position="labelPosition" :label-width="labelWidth">
      <el-form-item label="任务编号:" prop="taskId">{{form2.taskId}}</el-form-item>
      <el-form-item label="任务状态:" prop="state">{{form2.state}}</el-form-item>
      <el-form-item label="返回码:" prop="retCode">{{form2.retCode}}</el-form-item>
      <el-form-item label="描述:" prop="description">{{form2.description}}</el-form-item>
    </el-form>
    <!--调用结果----end-->
  </div>
</template>

<script>
  export default {
    name: "asyntasksimcall",
    data(){
      return {
        isShow: false,
        listLoading : false,
        labelPosition: "right", //lable对齐方式
        labelWidth: "120px", //lable宽度
        //输入框验证
        formRules: {
          taskId: [
              { required: true, message: "任务编号不能为空", trigger: "blur" },
              { min: 1, max: 15, message: "长度在 1 到 15 个字符", trigger: "blur" }
          ],
          userName: [
              { required: true, message: "用户名不能为空", trigger: "blur" },
              { min: 1, max: 15, message: "长度在 1 到 15 个字符", trigger: "blur" }
          ],
          ip: [
              { required: true, message: "IP不能为空", trigger: "blur" },
              { min: 7, max: 15, message: "长度在 7 到 15 个字符", trigger: "blur" }
          ],
          token: [
              { required: true, message: "Token令牌不能为空", trigger: "blur" },
              { min: 1, max: 32, message: "长度在 1 到 32 个字符", trigger: "blur" }
          ],
          callDataParam: [
              { required: true, message: "取数参数不能为空", trigger: "blur" },
              { min: 1, max: 15, message: "长度在 1 到 15 个字符", trigger: "blur" }
          ],
          totalDataParam: [
              { required: true, message: "数据总量参数不能为空", trigger: "blur" },
              { min: 1, max: 15, message: "长度在 1 到 15 个字符", trigger: "blur" }
          ],
          batchParam: [
              { required: true, message: "跑批参数不能为空", trigger: "blur" },
              { min: 1, max: 15, message: "长度在 1 到 15 个字符", trigger: "blur" }
          ]
        },
        //提交表单
        form1: {
          taskId: "",
          userName: "",
          ip: "",
          token: "",
          callDataParam: "",
          totalDataParam: "",
          batchParam: ""
        },
        //返回表单
        form2:{
          taskId: "",
          state: "",
          retCode: "",
          description: ""
        }
      };
    },

    methods:{
      onCall(){

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
