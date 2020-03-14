<template>
  <div class="container messageboard2">
    <div v-show="isTableShow">
      <!-- 查询区----start -->
      <el-form :label-position="labelPosition" :label-width="labelWidth" :inline="true" :model="formSearch" class="demo-form-inline">
        <el-form-item label="任务编号" prop="name" style="white-space: nowrap;">
          <el-input v-model="formSearch.name" placeholder="请输入任务编号"></el-input>
        </el-form-item>
        <el-form-item label="SQL编号" prop="sqlname" style="white-space: nowrap;">
          <el-input v-model="formSearch.sqlname" placeholder="请输入SQL编号"></el-input>
        </el-form-item>
        <el-form-item label="交换方系统" prop="switcsystem" style="white-space: nowrap;">
          <el-input v-model="formSearch.switcsystem" placeholder="请输入交换方系统"></el-input>
        </el-form-item>
        <el-form-item label="任务状态:" prop="resource">
          <el-select v-model="formSearch.sex" placeholder="请选择任务状态" clearable>
            <el-option v-for="item in formSearch.statusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="运行日期:" prop="rundate" style="white-space: nowrap;">
            <el-date-picker type="date"  placeholder="请输入运行日期" v-model="formSearch.rundate"  style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label=" " style="margin-left:50px;">
          <el-button type="primary" @click="dataSearch">查询</el-button>
          <el-button type="warning" plain @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
      <el-row class="mgb15">
          <el-button size="small" round type="primary" @click="dataDown">批量下载</el-button>
      </el-row>
      <!-- 操作区----end -->
      <!-- 表格---start -->
      <el-table :data="tableData" v-loading="listLoading" border stripe style="width: 100%">
        <el-table-column type="selection" width="60" label="全选">
        </el-table-column>
        <el-table-column prop="number" label="任务编号" width="100" align="center">
        </el-table-column>
        <el-table-column prop="sqlnumber" label="sql编号" width="100" align="center">
        </el-table-column>
        <el-table-column prop="switchsystem" label="交换方系统" width="100" align="center">
        </el-table-column>
        <el-table-column prop="taskstatus" label="任务状态" width="100" align="center">
        </el-table-column>
        <el-table-column prop="filetype" label="文件类型" width="100" align="center">
        </el-table-column>
        <el-table-column prop="filepath" label="文件路径" width="180" align="center">
        </el-table-column>
        <el-table-column prop="downaddr" label="下载地址" width="180" align="center">
        </el-table-column>
        <el-table-column prop="telephone" label="对接人电话" width="180" align="center">
        </el-table-column>
        <el-table-column prop="takeparam" label="取数参数" width="100" align="center">
        </el-table-column>
        <el-table-column prop="totalparam" label="总量参数" width="100" align="center">
        </el-table-column>
        <el-table-column prop="runparam" label="跑批参数" width="100" align="center">
        </el-table-column>
        <el-table-column prop="procenode" label="处理节点" width="100"  align="center">
        </el-table-column>
        <el-table-column prop="switchstate" label="状态码"  min-width="100"  align="center">
        </el-table-column>
        <el-table-column prop="desc" label="描述"  min-width="100" align="center">
        </el-table-column>
        <el-table-column  fixed="right" label="操作" width="150" align="center">
           <template slot-scope="scope">
              <el-button type="primary" plain size="small" @click="viewUser(scope.row)">详情</el-button>
          	</template>
        </el-table-column>
      </el-table>
      <el-pagination background layout="total,sizes,prev, pager, next,jumper" :current-page="pageInfo.currentPage"
        :page-size="pageInfo.pageSize" :total="pageInfo.pageTotal" :page-sizes="[5, 10, 20, 50]">
      </el-pagination>
      <!-- 表格---end -->
      <!-- 编辑弹框 start-->

      <el-dialog :visible.sync="formInfoVisible" :center="true">
      	<el-form :inline="true" :model="formInfo" label-width="80px"  ref="formInfo" :disabled="editable">
          <el-form-item label="任务编号" prop="number" style="white-space: nowrap;">
            <el-input v-model="formInfo.number" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="sql编号" prop="sqlnumber" style="white-space: nowrap;">
            <el-input v-model="formInfo.sqlnumber" auto-complete="off" ></el-input>
          </el-form-item>
          <el-form-item label="交换方系统" prop="switchsystem" style="white-space: nowrap;">
            <el-input v-model="formInfo.switchsystem" auto-complete="off" ></el-input>
          </el-form-item>
          <el-form-item label="任务状态" prop="taskstatus" style="white-space: nowrap;">
            <el-input v-model="formInfo.taskstatus" auto-complete="off" ></el-input>
          </el-form-item>
          <el-form-item label="文件类型" prop="filetype" style="white-space: nowrap;">
            <el-input v-model="formInfo.filetype" auto-complete="off" ></el-input>
          </el-form-item>
          <el-form-item label="文件路径" prop="filepath" style="white-space: nowrap;">
            <el-input v-model="formInfo.filepath" auto-complete="off" ></el-input>
          </el-form-item>
          <el-form-item label="下载地址" prop="downaddr" style="white-space: nowrap;">
            <el-input v-model="formInfo.downaddr" auto-complete="off" ></el-input>
          </el-form-item>
          <el-form-item label="对接人电话" prop="telephone" style="white-space: nowrap;">
            <el-input v-model="formInfo.telephone" auto-complete="off" ></el-input>
          </el-form-item>
          <el-form-item label="取数参数" prop="takeparam" style="white-space: nowrap;">
            <el-input v-model="formInfo.takeparam" auto-complete="off" ></el-input>
          </el-form-item>
          <el-form-item label="总量参数" prop="totalparam" style="white-space: nowrap;">
            <el-input v-model="formInfo.totalparam" auto-complete="off" ></el-input>
          </el-form-item>
          <el-form-item label="跑批参数" prop="runparam" style="white-space: nowrap;">
            <el-input v-model="formInfo.runparam" auto-complete="off" ></el-input>
          </el-form-item>
          <el-form-item label="处理节点" prop="procenode" style="white-space: nowrap;">
            <el-input v-model="formInfo.procenode" auto-complete="off" ></el-input>
          </el-form-item>
          <el-form-item label="状态码" prop="switchstate" style="white-space: nowrap;">
            <el-input v-model="formInfo.switchstate" auto-complete="off" ></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="desc" style="white-space: nowrap;">
            <el-input v-model="formInfo.desc" auto-complete="off" ></el-input>
          </el-form-item>
      	</el-form>
      	<div slot="footer" class="dialog-footer" >
      		<el-button @click="formInfoVisible = false">取消</el-button>
      	</div>
      </el-dialog>

      <!-- 编辑弹框 end-->
    </div>
  </div>


  </div>
</template>

<style lang="scss">
  // 设置输入框的宽度
  .messageboard2 {
    .el-input {
      width: 220px;
    }
  }
</style>

<script>
  import apis from '../../apis/apis';
  export default {
    name: 'messageboard2',
    data() {
      return {
        listLoading: false, //
        pageInfo: { //分页
          currentPage: 1,
          pageSize: 5,
          pageTotal: 80
        },
        formSearch: { //表单查询
          name: '',
          sqlname: '',
          switchsystem: '',
          runtime: '',
          statusOptions: [
          {
            value: "1",
            label: "成功"
          },
          {
            value: "0",
            label: "失败"
          },
          {
            value: "2",
            label: "延迟"
          }]
        },
        formInfo:{
          number:'',
          sqlnumber:'',
          switchsystem:'',
          taskstatus:'',
          filetype:'',
          filepath:'',
          downaddr:'',
          telephone:'',
          takeparam:'',
          totalparam:'',
          runparam:'',
          procenode:'',
          switchstate:'',
          desc:''
        },
        tableData: [ //表单列表
          {
            number:'1',
            sqlnumber:'1',
            switchsystem:'dsp',
            taskstatus:'执行成功',
            filetype:'csv',
            filepath:'/path/kuhu/sdhu',
            downaddr:'hubei',
            telephone:'400000000',
            takeparam:'1',
            totalparam:'1',
            runparam:'1',
            procenode:'1',
            switchstate:'successd',
            desc:'成功'
          },
          {
            number:'2',
            sqlnumber:'2',
            switchsystem:'dsp',
            taskstatus:'执行成功',
            filetype:'csv',
            filepath:'/',
            downaddr:'hubei1',
            telephone:'400000001',
            takeparam:'1',
            totalparam:'1',
            runparam:'1',
            procenode:'1',
            switchstate:'successd',
            desc:'成功'
          }
        ],
        labelPosition: 'right', //lable对齐方式
        labelWidth: '80px', //lable宽度
        formLabelWidth: '120px',
        formInfoVisible : false,
        multipleSelection: [],
        isTableShow: true, //表格显示
        editable: false, //是否可编辑
      };
    },
    computed: {

    },
    methods: {
      /**
       * 查询列表
       */
      dataSearch() {
        this.$message({
           type:"success",
           message:"查询成功"
         });
         apis.monApi.dataSearch(this.formSearch)
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
      dataDown(){
        this.$message({
           type:"success",
           message:"下载成功"
         });
         apis.monApi.dataDown(this.formSearch)
         .then((data) => {
             console.log('success:', data);
             if (data && data.data) {
               console.log("下载完成");
               console.log(data.data);
             }
         })
         .catch((err) => {
             console.log('error:', err);
         });
      },
      viewUser: function(row) {
        this.formName = "详情页面"; //用户详情界面title
        this.formInfoVisible = true; //界面可见
        this.$nextTick(()=>{
            this.editable = true; //不可编辑
            this.showItem = true; //界面子项可见
            this.footerVisible = false; //页脚可见
            this.formInfo = Object.assign({}, row);
        });
      },
      onReset() {
        Object.assign(this.$data, this.$options.data('form1'));
      }
    }
  };
</script>
