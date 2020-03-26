<template>
  <div class="container certForm1">
    <!--输入框----start-->
    <el-form :model="form1" class="demo-form-inline" :label-position="labelPosition" :label-width="labelWidth"
        :inline="false" :rules="formRules" ref="form1">
        <el-form-item label="任务编号" prop="sqlId">
          <el-input v-model="form1.sqlId" placeholder="请输入任务编号"></el-input>
        </el-form-item>
        <el-form-item label="用户" prop="userName">
          <el-input v-model="form1.userName" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="IP" prop="ip">
          <el-input v-model="form1.ip" placeholder="请输入IP"></el-input>
        </el-form-item>
        <el-form-item label="提数参数" prop="params">
          <el-input v-model="form1.params" placeholder="请输入取数参数"></el-input>
        </el-form-item>
        <el-form-item label="跑批参数" prop="batchParam">
          <el-input v-model="form1.batchParam" placeholder="请输入跑批参数"></el-input>
        </el-form-item>
        <el-form-item label="页码" prop="pageNum">
          <el-input v-model="form1.pageNum" placeholder="非必填"></el-input>
        </el-form-item>
        <el-form-item label="每页记录数" prop="countPage">
          <el-input v-model="form1.countPage" placeholder="非必填"></el-input>
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" @click="onCall">调用</el-button>
        </el-form-item>
    </el-form>
    <!--输入框----end-->
    <hr /><br />
    <!--调用结果----start-->
    <el-form v-show="isShow" :model="form2" class="demo-form-inline" :label-position="labelPosition" :label-width="labelWidth">
      <el-form-item label="任务编号:" prop="sqlId">{{form2.sqlId}}</el-form-item>
      <el-form-item label="任务状态:" prop="state">{{form2.state}}</el-form-item>
      <el-form-item label="返回码:" prop="retCode">{{form2.retCode}}</el-form-item>
      <el-form-item label="描述:" prop="description">{{form2.description}}</el-form-item>
    </el-form>
    <!--调用结果----end-->
  </div>
</template>

<script>
  import apis from '../../apis/apis';
  export default {
    name: "synTaskSimCall",
    data(){
      return {
        isShow: false,
        listLoading : false,
        labelPosition: "right", //lable对齐方式
        labelWidth: "120px", //lable宽度
        //输入框验证
        formRules: {
          sqlId: [
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
          params: [
              { required: true, message: "取数参数不能为空", trigger: "blur" },
              { min: 1, max: 15, message: "长度在 1 到 15 个字符", trigger: "blur" }
          ],
          batchParam: [
              { required: true, message: "跑批参数不能为空", trigger: "blur" },
              { min: 1, max: 15, message: "长度在 1 到 15 个字符", trigger: "blur" }
          ]
        },
        //提交表单
        form1: {
          sqlId: "",
          userName: "",
          ip: "",
          params: "",
          batchParam: "",
          pageNum: "",
          countPage: ""
        },
        //返回表单
        form2:{
          sqlId: "",
          state: "",
          retCode: "",
          description: ""
        }
      };
    },

    methods:{
      onCall: function(){
        this.$message({
          type: "success",
          message: "新增、修改任务TODO"
        });

        this.$refs.form1.validate(valid=>{
          if(valid){
            this.$confirm("确认调用吗？", "提示", {}).then(() => {
              //接口模拟 TODO
              apis.simcallApi.syncCall(this.form1).then((data) => {
                console.log('success:', data);
                if (data && data.data) {
                  console.log("操作成功");
                  console.log(data.data);
                  this.isShow=true;
                  this.form2.sqlId=data.data.data.sqlId;
                  this.form2.state=data.data.data.state;
                  this.form2.retCode=data.data.data.retCode;
                  this.form2.description=data.data.data.description;
                }
              }).catch((err) => {
                console.log('error:', err);
              });
            });
          }
          else{
            this.$alert("error!");
            console.log("error submit!!");
          }
        })
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
