<template>
    <div class="container messageboard">
        <!-- 查询区----start -->
        <el-form :label-position="labelPosition" :label-width="labelWidth" :inline="true" ref="formSearch" :model="formSearch" class="demo-form-inline">
            <el-form-item label="Sql编号" prop="sqlId">
                <el-input v-model="formSearch.sqlId" placeholder="SQL任务编号"></el-input>
            </el-form-item>
            <el-form-item label="运行日期" prop="date">
                <el-date-picker type="date"  placeholder="请输入运行日期" value-format="yyyyMMdd" v-model="formSearch.date"  style="width: 100%;"></el-date-picker>
            </el-form-item>
            <el-form-item label=" "></el-form-item>
            <el-button type="primary" @click="onSearch">查询</el-button>
            <el-button type="warning" plain @click="onReset">重置</el-button>
        </el-form>
        <!-- 查询区----end -->
        <!-- 表格---start -->
        <el-table :data="tableData" v-loading="listLoading"  border stripe style="width: 100%">
            <el-table-column
              :key="col.prop"
              :label="col.label"
              :prop="col.prop"
              v-for="col in cols" align="center" width="150">
            </el-table-column>
        </el-table>
        <el-pagination background layout="total,sizes,prev, pager, next,jumper" :current-page="pageInfo.currentPage" :page-size="pageInfo.pageSize" :total="pageInfo.pageTotal" :page-sizes="[5, 10, 20, 50]" @size-change="handleSizeChange" @current-change="handleCurrentChange">
        </el-pagination>
        <!-- 表格---end -->
    </div>
</template>

<style lang="scss">
.messageboard{
    // 设置输入框的宽度
    .el-form-item__content {
        width: 220px;
    }
}

</style>

<script>
import apis from '../../apis/apis';
export default {
    name: 'dataquery',
    data() {
        return {
            listLoading : false,//
            pageInfo: { //分页
                currentPage: 1,
                pageSize: 5,
                pageTotal: 0
            },
            formSearch: { //表单查询
                sqlId: '',
                date:''
            },
            itemShow: false, //某些列是否展示
            cols: [],//列集合
            tableData: [], //表格数据
            labelPosition: 'right', //lable对齐方式
            labelWidth: '80px', //lable宽度
            formLabelWidth: '120px',
            editWidth: "300px"//设置输入框的长度
        };
    },
    computed:{
    },
    filters: {
    },
    methods: {
        /**
         * 查询列表
         */
        onSearch(){
            if(!this.formSearch.sqlId){
              this.$message({message: 'Sql编号不能为空',type: "error"});
              return;
            }
            if(!this.formSearch.date){
              this.$message({message: '运行日期不能为空',type: "error"});
              return;
            }
            this.listLoading=true;
            let param = Object.assign({}, this.formSearch,{username:this.$common.getSessionStorage('username')},this.pageInfo);
            apis.dataRetrievalApi.getList(param)
            .then((data)=>{
                this.listLoading=false;
                if (data && data.data) {
                        var json = data.data;
                        if (json.status == 'SUCCESS') {
                            this.pageInfo.pageTotal=json.count;
                            this.cols = json.data.cols;
                            this.tableData=json.data.tableData;
                        }
                        else if (json.message) {
                            this.$message({message: json.message,type: "error"});
                        }
                }
            })
            .catch((err)=>{
                this.listLoading=false;
                this.$message({message: '查询异常，请重试',type: "error"});
            });
        },
        handleSave(){
            if(this.dialogType=='add'){
                this.save();
            }
            else if(this.dialogType=='edit'){
                this.update();
            }
            else{
                this.$message({message: '操作异常',type: "error"});
            }
        },
        onReset(){
            this.$refs['formSearch'].resetFields();
        },
        /**
         * 分页大小切换
         */
        handleSizeChange(val) {
            this.pageInfo.pageSize = val;
            this.onSearch();
        },
        /**
         * 分页切换
         */
        handleCurrentChange(val) {
            this.pageInfo.currentPage = val;
            this.onSearch();
        }
    }
};
</script>
