<template>
    <div class="container messageboard">
        <!-- 查询区----start -->
        <el-form :label-position="labelPosition" :label-width="labelWidth" :inline="true" ref="formSearch" :model="formSearch" class="demo-form-inline">
            <el-form-item label="SqlID" prop="sqlid">
                <el-input v-model="formSearch.sqlid" placeholder="SQL任务编号"></el-input>
            </el-form-item>
            <el-form-item label="运行日期" prop="date">
                <el-input v-model="formSearch.date" placeholder="运行日期"></el-input>
            </el-form-item>
            <el-button type="primary" @click="onSearch">查询</el-button>
            <el-button type="warning" plain @click="onReset">重置</el-button>
        </el-form>
        <!-- 查询区----end -->
        <!-- 表格---start -->
        <el-table :data="tableData" v-loading="listLoading"  border stripe style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column prop="sort" label="序号" align="center" width="150">
            </el-table-column>
            <el-table-column prop="item1" label="列项1" align="center" width="150">
            </el-table-column>
            <el-table-column prop="item2" label="列项2" align="center" width="150">
            </el-table-column>
             <el-table-column prop="item3" label="列项3" align="center" width="100">
            </el-table-column>
            <el-table-column prop="item4" label="列项4" align="center" width="100">
            </el-table-column>
            <el-table-column prop="item5" label="列项5" align="center" width="100">
            </el-table-column>
            <el-table-column prop="item6" label="列项6" align="center" width="100">
            </el-table-column>
            <el-table-column prop="item7" label="列项7" align="center" width="100">
            </el-table-column>
            <el-table-column prop="item8" label="列项8" align="center" width="100">
            </el-table-column>
            <el-table-column prop="item9" label="列项9" align="center" width="100">
            </el-table-column>
            <el-table-column prop="item10" label="列项10" align="center" width="100">
            </el-table-column>
            <el-table-column prop="item11" label="列项11" align="center" width="100">
            </el-table-column>
            <el-table-column prop="item12" label="列项12" align="center" width="100">
            </el-table-column>
            <el-table-column prop="item13" label="列项13" align="center" width="100">
            </el-table-column>
        </el-table>
        <el-pagination background layout="total,sizes,prev, pager, next,jumper" :current-page="pageInfo.currentPage" :page-size="pageInfo.pageSize" :total="pageInfo.pageTotal" :page-sizes="[5, 10, 20, 50]" @size-change="handleSizeChange" @current-change="handleCurrentChange">
        </el-pagination>
        <!-- 表格---end -->

        <!-- 编辑弹框---start -->
        <el-dialog  :title="formEditTitle" :visible.sync="dialogEdittVisible" width="500px" @close="closeDialog('formEdit')">
            <el-form :label-position="labelPosition" :label-width="labelWidth" :rules="rulesEdit" :disabled="formEditDisabled" :inline="true" ref="formEdit" :model="formEdit" class="demo-form-inline">
                <el-form-item label="数据集名称" prop="name" >
                    <el-input v-model="formEdit.name" placeholder="数据集名称" :style="{width: editWidth}"></el-input>
                </el-form-item>
                <el-form-item label="数据集标识" prop="id">
                    <el-input v-model="formEdit.id" placeholder="数据集标识" :style="{width: editWidth}"></el-input>
                </el-form-item>
                <el-form-item label="数据集类别" prop="type">
                    <el-select v-model="formEdit.type" placeholder="数据集类别" :style="{width: editWidth}">
                        <el-option label="类别1" value="1"></el-option>
                        <el-option label="类别2" value="2"></el-option>
                        <el-option label="类别3" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="版本号" prop="version">
                    <el-input  v-model="formEdit.version" placeholder="版本号" :style="{width: editWidth}"></el-input>
                </el-form-item>
                <el-form-item label="创建时间" prop="createtime" v-if="itemShow">
                    <el-input v-model="formEdit.createtime"  :style="{width: editWidth}"></el-input>
                </el-form-item>
                <el-form-item label="更新时间" prop="updatetime" v-if="itemShow">
                    <el-input v-model="formEdit.updatetime"  :style="{width: editWidth}"></el-input>
                </el-form-item>
                <el-form-item label="数据集描述" prop="desc">
                    <el-input type="textarea" :rows="5" v-model="formEdit.desc" placeholder="详细说明数据集的数据的内容和用途" :style="{width: editWidth}"></el-input>
                </el-form-item>
                <el-form-item label="属性" prop="attribute">
                    <el-input type="textarea" :rows="5" v-model="formEdit.attribute" placeholder="请以 列名-中文说明 的方式，标注每一项" :style="{width: editWidth}"></el-input>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogEdittVisible = false">取 消</el-button>
                <el-button v-if="!formEditDisabled" type="primary" @click="handleSave">确 定</el-button>
            </div>
      </el-dialog>
      <!-- 编辑弹框---end -->
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
                pageTotal: 80
            },
            formSearch: { //表单查询
                name: '',
                id:'',
                type: ''
            },
            formEdit: { //表单编辑
                id: '',
                name: '',
                type: '',
                version: '',
                desc: '',
                attribute: '',
                createtime: '',
                updatetime: ''
            },
             rulesEdit:  {
                name: [
                    { required: true, message: "请输入数据集名称", trigger: "blur" },
                    { min: 1, max: 15, message: "长度在 1 到 15 个字符", trigger: "blur" }
                ],
                id:[
                    { required: true, message: "请输入数据集标识", trigger: "blur" },
                    { min: 1, max: 15, message: "长度在 1 到 15 个字符", trigger: "blur" }
                ],
                type: [
                  { required: true, message: "请选择类别", trigger: "change" },
                ],
                version: [
                  { required: true, message: "请输入版本号", trigger: "change" },
                ],
                desc: [
                  { required: true, message: "请输入数据集描述"},
                  { min: 10, max:100, message: "长度在10到100个字符",trigger: "blur"}
                ],
                attribute: [
                  { required: true, message: "请输入数据集属性"},
                  { min: 10, max:100, message: "长度在10到100个字符",trigger: "blur"}
                ]
            },
            formEditTitle:'编辑',//新增，编辑和查看标题
            formEditDisabled:false,//编辑弹窗是否可编辑
            dialogEdittVisible: false,  //编辑弹框显示
            itemShow: false, //某些列是否展示
            dialogType:'',//弹框类型：add,edit,show
            tableData: [  //表单列表
                {   id:"1",
                    createtime: "2016-05-02",
                    name: "李紫婷",
                    address: "上海市普陀区金沙江路 1518 弄"
                },
                {
                     id:"2",
                    createtime: "2016-05-04",
                    name: "杨超越",
                    address: "上海市普陀区金沙江路 1517 弄"
                },
                {
                     id:"3",
                    createtime: "2016-05-01",
                    name: "赖小七",
                    address: "上海市普陀区金沙江路 1519 弄"
                },
                {
                    id:"4",
                    createtime: "2016-05-03",
                    name: "张紫宁",
                    address: "上海市普陀区金沙江路 1516 弄"
                }
            ],
            labelPosition: 'right', //lable对齐方式
            labelWidth: '100px', //lable宽度
            formLabelWidth: '120px',
            editWidth: "300px", //设置输入框的长度
            multipleSelection: []
        };
    },
    computed:{

    },
    filters: {
        convertType: function (type) {
            if(type==1){
                return '留言';
            }
            else if(type==2)
            {
                return '建议';
            }
            else if(type==3){
                return 'BUG';
            }
        }
    },
    methods: {
        /**
         * 查询列表
         */
        onSearch(){
            this.listLoading=true;

            if(this.formSearch.createtime){
                this.formSearch.startdate=this.formSearch.createtime[0];
                this.formSearch.enddate=this.formSearch.createtime[1];
            }
            let param = Object.assign({}, this.formSearch,this.pageInfo);
            apis.msgApi.getList(param)
            .then((data)=>{
                this.listLoading=false;
                if (data && data.data) {

                        var json = data.data;
                        if (json.status == 'SUCCESS') {
                            this.pageInfo.pageTotal=json.count;
                            this.tableData=json.data;
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
        /**
         * 保存
         */
        save() {
            this.$refs["formEdit"].validate(valid => {
                if(valid){
                    let param = Object.assign({}, this.formEdit);
                    apis.msgApi.add(param)
                    .then((data)=>{
                        if(data&&data.data){
                            var json=data.data;
                             if(json&&json.status=='SUCCESS'){
                                this.$message({message: '执行成功',type: "success"});
                                this.dialogEdittVisible = false;
                                this.onSearch();
                                return;
                            }
                        }
                       this.$message({message: '执行失败，请重试',type: "error"});
                    })
                    .catch((err)=>{
                        this.$message({message: '执行失败，请重试',type: "error"});
                    });
                }


            });
        },
         /**
         * 更新
         */
        update() {
            this.$refs["formEdit"].validate(valid => {
                if(valid){
                    let param = Object.assign({}, this.formEdit);
                    apis.msgApi.update(param)
                    .then((data)=>{
                        if(data&&data.data){
                            var json=data.data;
                             if(json&&json.status=='SUCCESS'){
                                this.$message({message: '执行成功',type: "success"});
                                this.dialogEdittVisible = false;
                                this.onSearch();
                                return;
                            }
                        }
                       this.$message({message: '执行失败，请重试',type: "error"});
                    })
                    .catch((err)=>{
                        this.$message({message: '执行失败，请重试',type: "error"});
                    });
                }


            });
        },
         /**
         * 删除
         */
        handleDelete(index, rowData) {
             if(rowData.name=='使用文档'){
                this.$message('使用文档不可删除');
                return;
            }
            var id=rowData.id;
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                    apis.msgApi.delete({id:id})
                    .then((data)=>{
                        this.$common.isSuccess(data,()=>{
                            debugger;
                            this.onSearch();
                        });
                    })
                    .catch((err)=>{
                        debugger;
                        this.$message({message: '执行失败，请重试',type: "error"});
                    });

            }).catch(() => {
                this.$message({type: 'info',message: '已取消删除'});
            });

        },
        /**
         * 批量删除
         */
        deleteMany() {
            var ids= this.multipleSelection.map(item => item.id);
            if(ids.length==0){
                 this.$message({message: '请选择要删除的项',type: "warn"});
                return;
            }
            debugger;
            this.$confirm('此操作将批量永久删除文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                        apis.msgApi.deleteBatch({ids:ids})
                        .then((data)=>{
                            this.$common.isSuccess(data,()=>{
                                debugger;
                                this.onSearch();
                            });
                        })
                        .catch((err)=>{
                            debugger;
                            this.$message({message: '执行失败，请重试',type: "error"});
                        });

                }).catch(() => {
                    this.$message({type: 'info',message: '已取消删除'});
                });

        },
        onReset(){
            this.$refs['formSearch'].resetFields();
        },
        /**
         * 打开编辑弹窗
         */
        handleAdd() {
            this.dialogEdittVisible = true;
            this.$nextTick(()=>{
                this.dialogType='add';
                this.formEditTitle='数据集新增';
                this.formEditDisabled=false;
            });


        },
        /**
         * 打开编辑弹窗
         */
        handleEdit(index, rowData) {
            //var msg = "索引是:" + index + ",行内容是:" + JSON.stringify(rowData);
            //this.$message({message: msg,type: "success"});
            this.dialogEdittVisible = true;//等dom渲染完，读取data中初始值，然后再复制，这样重置的是data中初始值
            this.$nextTick(()=>{
                this.dialogType='edit';
                this.formEditTitle='数据集编辑';
                this.formEditDisabled=false;
                this.formEdit= Object.assign({}, rowData);
                this.formEdit.gender+='';//必须转换成字符串才能回显
            });
        },
        /**
         * 打开详情页
         */
        handleDetail(index,rowData){
            this.itemShow = true;
            this.dialogEdittVisible = true;
            this.$nextTick(()=>{
                 this.dialogType='show';
                this.formEditTitle='数据集详情';
                this.formEditDisabled=true;
                this.formEdit= Object.assign({}, rowData) ;
                this.formEdit.gender+='';
            });

        },
        /**
         * 关闭弹框，数据重置
         */
        closeDialog(formName){
            this.$refs[formName].resetFields();
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
        },
        /**
         * 点击选择
         */
        handleSelectionChange(val) {
            this.multipleSelection = val;
            // this.$message({
            //     message: '选中的项是:' + JSON.stringify(this.multipleSelection),
            //     type: "success"
            // });
        },
        /**
         * 打开详情页
         */
        openDetail(row){
            this.$common.OpenNewPage(this,'detail',row);
        }


    }
};
</script>
