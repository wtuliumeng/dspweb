
<template>
    <div class="container messageboard2">
        <div v-show="isTableShow">
            <!-- 查询区----start -->
            <el-form :label-position="labelPosition" :label-width="labelWidth" :inline="true" ref="formSearch" :model="formSearch" class="demo-form-inline">
                <el-form-item label="采集状态:" prop="resource">
                    <el-radio-group v-model="formSearch.resource">
                        <el-radio label="成功"></el-radio>
                        <el-radio label="失败"></el-radio>
                        <el-radio label="延迟"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="数据集名称" prop="name" style="white-space: nowrap;">
                    <el-input v-model="formSearch.name" placeholder="模糊匹配"></el-input>
                </el-form-item>
                <el-form-item label=" " style="margin-left:50px;">
                    <el-button type="primary" @click="onSearch">查询</el-button>
                </el-form-item>
            </el-form>
            <el-form>
                  <el-form-item label=" 列表展示" style="margin-left:50px;">
                  <el-button type="primary" @click="datadown">下载</el-button>
              </el-form-item>
            </el-form>
            <el-link ></el-link>
            <!-- 操作区----end -->
            <!-- 表格---start -->
            <el-table :data="tableData" v-loading="listLoading"  border stripe style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="60" label="全选">
                </el-table-column>
                <el-table-column prop="name" label="数据集名称" width="150" align="center">
                </el-table-column>
                <el-table-column prop="createtime" label="采集开始日期" :formatter="this.$common.timestampToTime" width="180" sortable>
                </el-table-column>
                <el-table-column prop="endtime" label="采集结束日期" :formatter="this.$common.timestampToTime" width="180" sortable>
                </el-table-column>
                <el-table-column prop="descript" label="描述" width="150" align="center">
                </el-table-column>
                <el-table-column prop="state" label="采集状态" fixed="right" min-width="230" class='changecolor'>
                </el-table-column>
            </el-table>
            <el-pagination background layout="total,sizes,prev, pager, next,jumper" :current-page="pageInfo.currentPage" :page-size="pageInfo.pageSize" :total="pageInfo.pageTotal" :page-sizes="[5, 10, 20, 50]" @size-change="handleSizeChange" @current-change="handleCurrentChange">
            </el-pagination>
            <!-- 表格---end -->
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
    ._editor{
        width:100%;
        .el-form-item__content{
            width:100%;
            .document-editor{
                border:1px solid #c4c4c4;
                .document-editor__toolbar{
                    border:0;
                    border-bottom:1px solid #c4c4c4;
                    .ck-toolbar{
                        border:0;
                    }
                }
                .document-editor__editable{
                    min-height: 400px;
                    border:0;
                }
            }

        }

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
            formSearch: { //表单查询
                resource:'',
                name: '',
                createtime:'',
                updatetime:null,
                descript:'',
                state:''
            },
            dialogType:'show',//弹框类型：add,edit,show

            tableData: [  //表单列表
                {   id:"1",
                    name:'开发环境',
                    createtime: "2017-07-09",
                    updatetime: "2017-07-13",
                    descript: "采集成功",
                    state:'成功',
                    resource:''
                }
            ],
            labelPosition: 'right', //lable对齐方式
            labelWidth: '80px', //lable宽度
            formLabelWidth: '120px',
            multipleSelection: [],
            isTableShow:true,//表格显示
            isEditShow:false,//编辑区显示
            editBtnText:'',//编辑按钮文本
            EditorObj: null,//编辑器实例
        };
    },
    computed:{

    },
    methods: {
        /**
         * 查询列表
         */
        onSearch(){
            this.listLoading=true;
        },



    }
};
</script>
