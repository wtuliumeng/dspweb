<template>
  <div class="container certForm1">
    <!--输入框----start-->
    <el-form :model="form1" class="demo-form-inline" :label-position="labelPosition" :label-width="labelWidth"
        :inline="false" :rules="formRules" ref="form1">
        <el-form-item label="任务编号" prop="sqlId">
          <el-input v-model="form1.sqlId" placeholder="请输入任务编号"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="userName">
          <el-select v-model="form1.userName" placeholder="请选择用户">
            <el-option v-for="item in userList" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="IP" prop="ip">
          <el-input v-model="form1.ip" placeholder="请输入IP"></el-input>
        </el-form-item>
        <el-form-item label="Token" prop="token">
          <el-input v-model="form1.token" placeholder="请输入Token令牌"></el-input>
        </el-form-item>
        <el-form-item label="提数参数" prop="params">
          <el-input v-model="form1.params" placeholder="请输入取数参数"></el-input>
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
      <el-form-item label="任务编号:" prop="sqlId">{{form2.sqlId}}</el-form-item>
      <el-form-item label="任务状态:" prop="state">{{form2.state}}</el-form-item>
      <el-form-item label="返回码:" prop="retCode">{{form2.retCode}}</el-form-item>
      <el-form-item label="描述:" prop="description">{{form2.description}}</el-form-item>
      <el-form-item label=" ">
        <el-button type="primary" @click="onRefresh">刷新</el-button>
      </el-form-item>
    </el-form>
    <!--调用结果----end-->
  </div>
</template>

<script>
import apis from '../../apis/apis';
  export default {
    name: "asyntasksimcall",
    data(){
      return {
        isShow: false,
        listLoading : false,
        labelPosition: "right", //lable对齐方式
        labelWidth: "120px", //lable宽度
        
        userList: [{
            value: "",
            label: ""
          }
        ],
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
          token: [
              { required: true, message: "Token令牌不能为空", trigger: "blur" },
              { min: 1, max: 32, message: "长度在 1 到 32 个字符", trigger: "blur" }
          ],
          params: [
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
          sqlId: "",
          userName: "",
          ip: "",
          token: "",
          params: "",
          totalDataParam: "",
          batchParam: ""
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
    created: function() {
       this.getUserNameList();
    },
    methods:{
      //调用按钮
      onCall: function(){
        // this.$message({
        //   type: "success",
        //   message: "新增、修改任务TODO"
        // });

        this.$refs.form1.validate(valid=>{
          if(valid){
            this.$confirm("确认调用吗？", "提示", {}).then(() => {
              //接口模拟 TODO
              apis.simcallApi.asyncCall(this.form1).then((data) => {
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
            console.log("error submit!!");
          }
        })
      },

      onRefresh: function(){
        this.onCall();
      },
      
      getUserNameList: function(){
        let param = {
          type:"2"
        };
        apis.commonApi.getSelectList(param)
          .then((data)=>{
             if (data && data.data) {
                var json = data.data;
                if (json.status == 'SUCCESS') {
                    //清空列表
                    this.userList = [];
                    this.userList = json.dataList;
                }
                else if (json.message) {
                    this.$message({message: json.message,type: "error"});
                }
              }
            })
            .catch((err)=>{
                this.$message({message: '获取数据类型下拉框数据异常',type: "error"});
            });
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
