<template>
  <div class="container messageboard2">
    <div v-show="isTableShow">
      <!-- 查询区----start -->
      <el-form :label-position="labelPosition" :label-width="labelWidth" :inline="true" :model="formSearch" class="demo-form-inline">
        <el-form-item label="查询编号" prop="querynumber" style="white-space: nowrap;">
          <el-input v-model="formSearch.querynumber" placeholder="请输入任务编号"></el-input>
        </el-form-item>
        <el-form-item label="任务编号" prop="tasknumber" style="white-space: nowrap;">
          <el-input v-model="formSearch.tasknumber" placeholder="请输入SQL编号"></el-input>
        </el-form-item>
        <el-form-item label="调用方系统" prop="callsystem" style="white-space: nowrap;">
          <el-input v-model="formSearch.callsystem" placeholder="请输入交换方系统"></el-input>
        </el-form-item>
        <el-form-item label="任务状态:" prop="resource">
          <el-select v-model="formSearch.resource" placeholder="请选择任务状态" clearable>
            <el-option v-for="item in formSearch.statusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="运行日期:" prop="rundate" style="white-space: nowrap;">
            <el-date-picker type="date"  placeholder="请输入运行日期" v-model="formSearch.rundate"  style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label=" " style="margin-left:50px;">
          <el-button type="primary" @click="querySearch">查询</el-button>
          <el-button type="warning" plain @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
      <el-row class="mgb15">
          <el-button size="small" round type="primary" @click="queryDown">批量下载</el-button>
      </el-row>
      <!-- 操作区----end -->
      <!-- 表格---start -->
      <el-table :data="tableData" v-loading="listLoading" border stripe style="width: 100%">
        <el-table-column type="selection" width="60" label="全选">
        </el-table-column>
        <el-table-column prop="querynumber" label="查询编号"  width="150" align="center">
        </el-table-column>
        <el-table-column prop="tasknumber" label="任务编号"  width="150" align="center">
        </el-table-column>
        <el-table-column prop="callsystem" label="调用方系统"  width="150" align="center">
        </el-table-column>
        <el-table-column prop="calldate" label="调用日期"  width="150" align="center">
        </el-table-column>
        <el-table-column prop="callparam" label="调用参数"  width="150" align="center">
        </el-table-column>
        <el-table-column prop="servicename" label="服务名"  width="150" align="center">
        </el-table-column>
        <el-table-column prop="requestdate" label="请求时间"  width="150" align="center">
        </el-table-column>
        <el-table-column prop="returndate" label="返回时间"  width="150" align="center">
        </el-table-column>
        <el-table-column prop="responcode" label="响应代码"  width="150" align="center">
        </el-table-column>
        <el-table-column prop="state" label="任务状态"  width="150" align="center">
        </el-table-column>
        <el-table-column prop="descr" label="描述"  width="150" align="center">
        </el-table-column>
        </el-table-column>
        <el-table-column  fixed="right" label="操作" width="150" align="center">
           <template slot-scope="scope">
              <el-button type="primary" plain size="small" @click="viewUser(scope.row)">详情</el-button>
          	</template>
        </el-table-column>
      </el-table>
      <el-pagination background layout="total,sizes,prev, pager, next,jumper" :current-page="pageInfo.currentPage"
        :page-size="pageInfo.pageSize" @size-change="handleSizeChange" :total="pageInfo.pageTotal" :page-sizes="[5, 10, 20, 50]" @current-change="handleCurrentChange">
      </el-pagination>
      <!-- 表格---end -->
      <!-- 编辑弹框 start-->

      <el-dialog :visible.sync="formInfoVisible" :center="true">
      	<el-form :inline="true" :model="formInfo" label-width="80px"  ref="formInfo" :disabled="editable">
          <el-form-item label="查询编号" prop="querynumber">
            <el-input v-model="formInfo.querynumber" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="任务编号" prop="tasknumber">
            <el-input v-model="formInfo.tasknumber" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="调用方系统" prop="callsystem">
            <el-input v-model="formInfo.callsystem" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="调用日期" prop="calldate">
            <el-input v-model="formInfo.calldate" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="调用参数" prop="callparam" >
            <el-input v-model="formInfo.callparam" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="服务名" prop="servicename">
            <el-input v-model="formInfo.servicename" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="请求时间" prop="requestdate">
            <el-input v-model="formInfo.requestdate" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="返回时间" prop="returndate">
            <el-input v-model="formInfo.returndate" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="响应代码" prop="responcode">
            <el-input v-model="formInfo.responcode" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="任务状态" prop="state">
            <el-input v-model="formInfo.state" auto-complete="off"></el-input>
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
        formSearch: {
            //表单查询
          querynumber: '',
          tasknumber: '',
          callsystem: '',
          rundate: '',
          status: [],
          statusOptions: [{
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
            }
          ]
        },
        formInfo:{
          querynumber: "",
          tasknumber: "",
          callsystem: "",
          calldate: "",
          callparam: "",
          servicename: "",
          requestdate: "",
          returndate: "",
          responcode: "",
          state: "",
          descr: ""
        },
        tableData: [ //表单列表
          {
            querynumber: '1',
            tasknumber: '1',
            callsystem: 'dsp',
            calldate: '2018-09-08',
            callparam: '1',
            servicename: '1',
            requestdate: '2019-09-10',
            returndate: '2019-09-10',
            responcode: '1',
            state: '1',
            descr: '成功'
          },
          {
            querynumber: '2',
            tasknumber: '2',
            callsystem: 'dsp2',
            calldate: '2017-06-08',
            callparam: '1',
            servicename: '1',
            requestdate: '2018-09-10',
            returndate: '2018-09-10',
            responcode: '1',
            state: '1',
            descr: '成功'
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
       * 分页大小切换
       */
      handleSizeChange(val) {
          this.pageInfo.pageSize = val;
          this.querySearch();
      },
      /**
       * 分页切换
       */
      handleCurrentChange(val) {
          this.pageInfo.currentPage = val;
          this.querySearch();
      },
      /**
       * 查询列表
       */
      querySearch() {
        this.listLoading=true;
        let param = Object.assign({}, this.formSearch, this.pageInfo);
         apis.monApi.dataSearchList(param)
         .then((data) => {
             this.listLoading=false;
             if (data && data.data) {
               console.log(data.data.dataList);
                     var json = data.data;
                     if (json.status == 'SUCCESS') {
                         this.pageInfo.pageTotal=json.count;
                         this.tableData=json.dataList;
                     }
                     else if (json.message) {
                         this.$message({message: json.message,type: "error"});
                     }
             }
         })
         .catch((err) => {
             this.listLoading=false;
             this.$message({message: '查询异常，请重试',type: "error"});
         });

      },
      queryDown(){
        this.$message({
           type:"success",
           message:"下载成功"
         });
         apis.monApi.queryDown(this.formSearch)
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
