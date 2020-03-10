<template>
  <div>
    <div class="container form02">
        <el-form :label-position="labelPosition" :rules="rules" ref="form02" :label-width="labelWidth" :inline="false" :model="form2" class="demo-form-inline">
            <el-form-item label="数据集名称" prop="name">
                <el-input v-model="form2.name" placeholder="数据集名称"></el-input>
            </el-form-item>
            <el-form-item label="数据集标识" prop="id">
                <el-input v-model="form2.id" placeholder="数据集标识"></el-input>
            </el-form-item>
            <el-form-item label="数据集类别" prop="region">
                <el-select v-model="form2.datatype" placeholder="数据集类别">
                    <el-option label="客户信息" value="shanghai"></el-option>
                    <el-option label="贷款信息" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="版本号" prop="version">
                <el-input v-model="form2.version" placeholder="版本号"></el-input>
            </el-form-item>
            <el-form-item label="数据集描述" prop="desc">
                <el-input type="textarea" :height="textHeight" v-model="form2.desc" placeholder="详细说明数据集的数据的内容和用途"></el-input>
            </el-form-item>
            <el-form-item label="属性" prop="attribute">
                <el-input type="textarea" v-model="form2.attribute" placeholder="请以 列名-中文说明 的方式，标注每一项"></el-input>
            </el-form-item>
            <el-form-item label=" ">
                <el-button type="primary" @click="onSubmit2">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "dataconfig",
  data() {
    return {
      form2: {
        //表单对象
        name: "",
        id: "",
        datatype: "",
        region: "",
        version: "",
        desc: "",
        attribute: ""
      },
      labelPosition: "right", //lable对齐方式
      labelWidth: "100px", //lable宽度
      textHeight: "40px",
      rules:  {
        name: [
          { required: true, message: "请输入数据集名称", trigger: "blur" },
          { min: 1, max: 10, message: "长度在 1 到 10 个字符", trigger: "blur" }
        ],
        id: [
          { required: true, message: "请输入数据集标识", trigger: "blur" },
          { min: 1, max: 10, message: "长度在 1 到 10 个字符", trigger: "blur" }
        ],
        version: [
          { required: true, message: "请输入版本号", trigger: "blur" },
          { min: 1, max: 10, message: "长度在 1 到 5 个字符", trigger: "blur" }
        ],
        datatype: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change"
          }
        ],
        region: [
          { required: true, message: "请选择数据集类别", trigger: "change" }
        ],
        desc: [
          { required: true, message: "请填写数据集描述", trigger: "blur" }
        ],
        attribute: [
          { required: true, message: "请以 列名-中文说明 的方式，标注每一项", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //表单2提交
    onSubmit2() {
      this.$refs["form02"].validate(valid => {
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
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  add() {

  }
};
</script>

<style lang="scss">
// 设置输入框的宽度
.form02 {
  .el-form-item__content {
    width: 430px;
    .el-select {
      width: 430px;
    }
  }
}
.el-checkbox-group .el-checkbox {
  margin-left: 0;
  // padding-right: 30px;
}
.el-checkbox{
  width:173px;
}
</style>
