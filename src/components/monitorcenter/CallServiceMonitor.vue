<template>
    <div class="container messageboard2">
        <div v-show="isTableShow">
            <!-- 查询区----start -->
            <el-form :label-position="labelPosition" :label-width="labelWidth" :inline="true"  :model="form1" class="demo-form-inline">

                <el-form-item label="查询编号" prop="querynumber" style="white-space: nowrap;">
                    <el-input v-model="form1.querynumber" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="任务编号" prop="tasknumber" style="white-space: nowrap;">
                    <el-input v-model="form1.tasknumber" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="调用方系统" prop="callsystem" style="white-space: nowrap;">
                    <el-input v-model="form1.callsystem" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="运行日期" prop="rundate" style="white-space: nowrap;">
                    <el-date-picker type="date"  placeholder="请输入" v-model="form1.rundate"  style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="任务状态" prop="status">
                  <el-select  v-model="form1.sex" placeholder="请选择" clearable>
                      <el-option  v-for="item in form1.statusOptions"   :key="item.value"  :label="item.label"  :value="item.value" ></el-option>
                   </el-select>
                </el-form-item>
                <el-form-item label=" " style="margin-left:50px;">
                    <el-button type="primary" @click="onSearch">查询</el-button>
                    <el-button type="primary" @click="onReset">重置</el-button>
                    <el-button type="primary" @click="onDown">下载</el-button>
                </el-form-item>
            </el-form>
            <!-- 操作区----end -->
            <!-- 表格---start -->
            <el-table :data="tableData" v-loading="listLoading"  border stripe style="width: 100%" @selection-change="handleSelectionChange" >
                <el-table-column type="selection" width="60" label="全选">
                </el-table-column>
                <el-table-column prop="querynumber" label="查询编号" width="100" align="center">
                </el-table-column>
                <el-table-column prop="tasknumber" label="任务编号"  width="100" align="center">
                </el-table-column>
                <el-table-column prop="callsystem" label="调用方系统"  width="100" align="center">
                </el-table-column>
                <el-table-column prop="calldate" label="调用日期" :formatter="this.$common.timestampToTime" width="150" align="center">
                </el-table-column>
                <el-table-column prop="callparam" label="调用参数" fixed="right" min-width="100"  align="center">
                </el-table-column>
                <el-table-column prop="servicename" label="服务名" fixed="right" min-width="100"  align="center">
                </el-table-column>
                <el-table-column prop="requestdate" label="请求时间" :formatter="this.$common.timestampToTime" fixed="right" min-width="159" align="center">
                </el-table-column>
                <el-table-column prop="returndate" label="返回时间" :formatter="this.$common.timestampToTime" fixed="right" min-width="150" align="center">
                </el-table-column>
                <el-table-column prop="responcode" label="响应代码" fixed="right" min-width="50" align="center">
                </el-table-column>
                <el-table-column prop="state" label="任务状态" fixed="right" min-width="50" align="center">
                </el-table-column>
                <el-table-column prop="descr" label="描述" fixed="right" min-width="50" class='changecolor' align="center">
                </el-table-column>
                <el-table-column  fixed="right" label="操作" width="50" align="center">
                   <template slot-scope="scope">
                      <el-button type="primary" plain size="small" @click="viewUser(scope.row)">详情</el-button>
                  	</template>
                </el-table-column>
            </el-table>
            <el-pagination background layout="total,sizes,prev, pager, next,jumper" :current-page="pageInfo.currentPage" :page-size="pageInfo.pageSize" :total="pageInfo.pageTotal" :page-sizes="[5, 10, 20, 50]" @size-change="handleSizeChange" @current-change="handleCurrentChange">
            </el-pagination>
            <!-- 表格---end -->
            <!-- 编辑弹框 start-->

            <el-dialog :title="formName" :visible.sync="formInfoVisible" :center="true" @close="resetForm('formInfo')">
            	<el-form :inline="true" :model="formInfo" label-width="80px"  ref="formInfo"  :disabled="editable">
                <el-form-item label="查询编号" prop="querynumber" style="white-space: nowrap;">
                  <el-input v-model="form1.querynumber" auto-complete="off" v-if="showItem"></el-input>
                </el-form-item>
                <el-form-item label="任务编号" prop="tasknumber" style="white-space: nowrap;">
                  <el-input v-model="form1.tasknumber" auto-complete="off" v-if="showItem"></el-input>
                </el-form-item>
                <el-form-item label="调用方系统" prop="callsystem" style="white-space: nowrap;">
                  <el-input v-model="form1.callsystem" auto-complete="off" v-if="showItem"></el-input>
                </el-form-item>
                <el-form-item label="调用日期" prop="calldate" style="white-space: nowrap;">
                  <el-input v-model="form1.calldate" auto-complete="off" v-if="showItem"></el-input>
                </el-form-item>
                <el-form-item label="调用参数" prop="callparam" style="white-space: nowrap;">
                  <el-input v-model="form1.callparam" auto-complete="off" v-if="showItem"></el-input>
                </el-form-item>
                <el-form-item label="服务名" prop="servicename" style="white-space: nowrap;">
                  <el-input v-model="form1.servicename" auto-complete="off" v-if="showItem"></el-input>
                </el-form-item>
                <el-form-item label="请求时间" prop="requestdate" style="white-space: nowrap;">
                  <el-input v-model="form1.requestdate" auto-complete="off" v-if="showItem"></el-input>
                </el-form-item>
                <el-form-item label="返回时间" prop="returndate" style="white-space: nowrap;">
                  <el-input v-model="form1.returndate" auto-complete="off" v-if="showItem"></el-input>
                </el-form-item>
                <el-form-item label="响应代码" prop="responcode" style="white-space: nowrap;">
                  <el-input v-model="form1.responcode" auto-complete="off" v-if="showItem"></el-input>
                </el-form-item>
                <el-form-item label="任务状态" prop="state" style="white-space: nowrap;">
                  <el-input v-model="form1.state" auto-complete="off" v-if="showItem"></el-input>
                </el-form-item>
                <el-form-item label="描述" prop="descr" style="white-space: nowrap;">
                  <el-input v-model="form1.descr" auto-complete="off" v-if="showItem"></el-input>
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
.messageboard2{
    .el-input {
        width: 220px;
    }
}
</style>
<script>
export default {
    name: 'messageboard2',
    data() {
        return {
            listLoading : false,//
            pageInfo: { //分页
                currentPage: 1,
                pageSize: 5,
                pageTotal: 80
            },
            form1: { //表单查询
                querynumber: '',
                tasknumber:'',
                callsystem:'',
                rundate:'',
                status:[],
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
            dialogType:'show',//弹框类型：add,edit,show

            tableData: [  //表单列表
                {
                  querynumber:'1',
                  tasknumber:'1',
                  callsystem:'dsp',
                  calldate:'2018-09-08',
                  callparam:'1',
                  servicename:'1',
                  requestdate:'2019-09-10',
                  returndate:'2019-09-10',
                  responcode:'1',
                  state:'1',
                  descr:'成功'
                }
            ],
            forminfo: {
              name: "",
              createtime: "",
              endtime: "",
              descript: "",
              state: ""
            },
            labelPosition: 'right', //lable对齐方式
            labelWidth: '80px', //lable宽度
            formLabelWidth: '120px',
            footerVisible:false,
            formInfoVisible : false,
            isTableShow:true,//表格显示
            editable: false, //是否可编辑
        };
    },
    computed:{

    },
    methods: {
        /**
         * 查询列表
         */
        onSearch(){

        },
        onDown(){
          let data=this.$data
          let data1=Object.assign().then('1')
          console.log(data1)
        },
        viewUser: function(row) {
          this.formName = "详情页面"; //用户详情界面title
          this.formInfoVisible = true; //界面可见
          this.$nextTick(()=>{
              this.editable = true; //不可编辑
              this.showItem = true; //界面子项可见
              this.footerVisible = false; //页脚可见
              this.form1 = Object.assign({}, row);
          });
        }

    }
};
</script>
