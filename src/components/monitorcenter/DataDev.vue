<template>
    <div class="container messageboard2">
        <div v-show="isTableShow">
            <!-- 查询区----start -->
            <el-form :label-position="labelPosition" :label-width="labelWidth" :inline="true"  :model="form1" class="demo-form-inline">
                <el-form-item label="SQL编号" prop="sqlId">
                  <el-input v-model="form1.sqlId" placeholder="请输入SQL编号"></el-input>
                </el-form-item>
                <el-form-item label="数据集名称" prop="name" style="white-space: nowrap;">
                    <el-input v-model="form1.name" placeholder="请输入数据集名称"></el-input>
                </el-form-item>
                <el-form-item label="采集状态:" prop="status">
                  <el-select  v-model="form1.sex" placeholder="请选择采集状态" clearable>
                      <el-option  v-for="item in form1.statusOptions"   :key="item.value"  :label="item.label"  :value="item.value" ></el-option>
                   </el-select>
                </el-form-item>
                <el-form-item></el-form-item>
                <el-form-item></el-form-item>
                <el-form-item></el-form-item>
                <el-form-item></el-form-item>
                <el-form-item></el-form-item>
                <el-form-item></el-form-item>
                <el-button type="primary" @click="onSearch">查询</el-button>
                <el-button type="warning" plain @click="onReset">重置</el-button>
            </el-form>
            <!-- 操作区----start -->
            <el-row class="mgb15">
                <el-button size="small" round type="primary" @click="onDown">批量下载</el-button>
            </el-row>
            <!-- 操作区 ----end-->
            <!-- 表格---start -->
            <el-table :data="tableData" v-loading="listLoading"  border stripe style="width: 100%" @selection-change="handleSelectionChange" >
                <el-table-column type="selection" width="60" label="全选">
                </el-table-column>
                <el-table-column prop="name" label="数据集名称" width="150" align="center">
                </el-table-column>
                <el-table-column prop="sqlId" label="SQL编号" width="120" align="center">
                </el-table-column>
                <el-table-column prop="createtime" label="采集开始日期" width="200" align="center">
                </el-table-column>
                <el-table-column prop="endtime" label="采集结束日期" width="200" align="center">
                </el-table-column>
                <el-table-column prop="descript" label="描述" width="150" align="center">
                </el-table-column>
                <el-table-column prop="state" label="采集状态" width="100" align="center">
                </el-table-column>
                <el-table-column   label="操作" fixed="right" min-width="150" align="center">
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
                <el-form-item label="数据集名称" prop="name" style="white-space: nowrap;">
                  <el-input v-model="form1.name" auto-complete="off" v-if="showItem"></el-input>
                </el-form-item>
                <el-form-item label="采集开始日期" prop="createtime" style="white-space: nowrap;">
                  <el-input v-model="form1.createtime" auto-complete="off" v-if="showItem"></el-input>
                </el-form-item>
                <el-form-item label="采集结束日期" prop="endtime" style="white-space: nowrap;">
                  <el-input v-model="form1.endtime" auto-complete="off" v-if="showItem"></el-input>
                </el-form-item>
                <el-form-item label="描述" prop="descript" style="white-space: nowrap;">
                  <el-input v-model="form1.descript" auto-complete="off" v-if="showItem"></el-input>
                </el-form-item>
                <el-form-item label="采集状态" prop="state" style="white-space: nowrap;">
                  <el-input v-model="form1.state" auto-complete="off" v-if="showItem"></el-input>
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
                name: '',
                status:[],
                sqlId: '',
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
                {   id:"1",
                    name:'开发环境',
                    sqlId: '132',
                    createtime: "2017-07-09",
                    endtime: "2017-07-13",
                    descript: "采集成功",
                    state:'成功',
                    resource:''
                },
                {   id:"2",
                    name:'测试环境1',
                    sqlId: '32',
                    createtime: "2016-07-09",
                    endtime: "2016-07-12",
                    descript: "采集成功",
                    state:'成功',
                    resource:''
                },
                {   id:"3",
                    name:'测试环境2',
                    sqlId: '15',
                    createtime: "2018-07-09",
                    endtime: "2018-07-12",
                    descript: "采集成功",
                    state:'成功',
                    resource:''
                },
                {   id:"4",
                    name:'测试环境5',
                    sqlId: '191',
                    createtime: "2018-07-09",
                    endtime: "2018-07-12",
                    descript: "采集成功",
                    state:'失败',
                    resource:''
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
