<template>
    <div class="container messageboard">
        <!-- 查询区----start -->
        <el-form :label-position="labelPosition" :label-width="labelWidth" :inline="true" ref="formSearch" :model="formSearch" class="demo-form-inline">
            <el-form-item label="数据集名称" prop="name">
                <el-input v-model="formSearch.name" placeholder="模糊匹配"></el-input>
            </el-form-item>
            <el-form-item label="数据集标识" prop="id">
                <el-input v-model="formSearch.id" placeholder="模糊匹配"></el-input>
            </el-form-item>
            <el-form-item label="数据集类别" prop="type">
                <el-select v-model="formSearch.type" placeholder="请选择">
                    <el-option  v-for="item in typeOptions"   :key="item.value"  :label="item.label"  :value="item.value" ></el-option>
                </el-select>
            </el-form-item>
            <el-button type="primary" @click="onSearch">查询</el-button>
            <el-button type="warning" plain @click="onReset">重置</el-button>
        </el-form>
        <!-- 查询区----end -->
        <!-- 操作区----start -->
        <el-row class="mgb15">
            <el-button size="small" round type="primary" @click="handleAdd">新增</el-button>
            <el-button size="small" round type="danger" @click="deleteMany">批量删除</el-button>
        </el-row>
        <!-- 操作区 ----end-->
        <!-- 表格---start -->
        <el-table :data="tableData" v-loading="listLoading"  border stripe style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="60">
            </el-table-column>
            <!--索引-->
            <el-table-column label="序号" type="index" :index="indexMethod" align="center" width="50">
            </el-table-column>
            <el-table-column prop="name" label="数据集名称" width="120" align="center" sortable>
            </el-table-column>
            <el-table-column prop="id" label="数据集标识" align="center" width="100">
            </el-table-column>
            <el-table-column prop="typeName" label="数据集类别" align="center" width="120">
            </el-table-column>
             <el-table-column prop="version" label="版本号" align="center" width="70">
            </el-table-column>
            <el-table-column prop="desc" label="数据集描述" align="center" width="150">
            </el-table-column>
            <el-table-column prop="attribute" label="数据集属性" align="center" width="150">
            </el-table-column>
            <el-table-column prop="createUser" label="更新人" align="center" width="80">
            </el-table-column>
            <el-table-column prop="createTime" label="创建日期" :formatter="this.$common.timestampToTime" width="160" sortable>
            </el-table-column>
             <el-table-column prop="updateTime" label="更新日期" :formatter="this.$common.timestampToTime" width="160" sortable>
            </el-table-column>
            <el-table-column label="操作" fixed="right" min-width="230" align="center">
                <template slot-scope="scope">
                    <el-button size="mini" plain type="primary" @click="handleDetail(scope.$index, scope.row)">详情</el-button>
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" plain type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
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
                    <el-select v-model="formEdit.type" placeholder="请选择" :style="{width: editWidth}">
                        <el-option  v-for="item in typeOptions"   :key="item.value"  :label="item.label"  :value="item.value" ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="版本号" prop="version">
                    <el-input  v-model="formEdit.version" placeholder="版本号" :style="{width: editWidth}"></el-input>
                </el-form-item>
                <el-form-item label="创建时间" prop="createTime" v-if="itemShow">
                    <el-date-picker format="yyyy 年 MM 月 dd 日 hh 时 mm 分 ss 秒" value-format="yyyy-MM-dd hh:mm:ss"  v-model="formEdit.createTime" :style="{width: editWidth}"></el-date-picker>
                </el-form-item>
                <el-form-item label="更新时间" prop="updateTime"  width="180" sortable v-if="itemShow">
                    <el-date-picker format="yyyy 年 MM 月 dd 日 hh 时 mm 分 ss 秒" value-format="yyyy-MM-dd hh:mm:ss"  v-model="formEdit.updateTime" :style="{width: editWidth}"></el-date-picker>
                </el-form-item>
                <el-form-item label="更新人" prop="createUser">
                    <el-input  v-model="formEdit.createUser" placeholder="更新人" :style="{width: editWidth}"></el-input>
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
                <el-button v-if="!formEditDisabled" type="primary" @click="handleSave">保 存</el-button>
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
    name: 'datamanage',
    data() {
        return {
            listLoading : false,//
            pageInfo: { //分页
                currentPage: 1,
                pageSize: 5,
                pageTotal: 0
            },
            formSearch: { //表单查询
                name: '',
                id:'',
                type: ''
            },
            typeOptions: [
              {
                value: "",
                label: ""
              }
            ],
            formEdit: { //表单编辑
                id: '',
                name: '',
                type: '',
                version: '',
                desc: '',
                attribute: '',
                createTime: '',
                updateTime: '',
                createUser: ''
            },
             rulesEdit:  {
                name: [
                    { required: true, message: "请输入数据集名称", trigger: "change" },
                    { min: 1, max: 15, message: "长度在 1 到 15 个字符", trigger: "change" }
                ],
                id:[
                    { required: true, message: "请输入数据集标识", trigger: "change" },
                    { min: 1, max: 15, message: "长度在 1 到 15 个字符", trigger: "change" }
                ],
                type: [
                  { required: true, message: "请选择类别", trigger: "change" },
                ],
                version: [
                  { required: true, message: "请输入版本号", trigger: "change" },
                ],
                desc: [
                  { required: true, message: "请输入数据集描述"},
                  { min: 10, max:100, message: "长度在10到100个字符",trigger: "change"}
                ],
                attribute: [
                  { required: true, message: "请输入数据集属性"},
                  { min: 10, max:100, message: "长度在10到100个字符",trigger: "change"}
                ],
                createUser: [
                  { required: true, message: "不要删原先更新人，采用 | 进行追加"}
                ]
            },
            formEditTitle:'编辑',//新增，编辑和查看标题
            formEditDisabled:false,//编辑弹窗是否可编辑
            dialogEdittVisible: false,  //编辑弹框显示
            itemShow: false, //某些列是否展示
            dialogType:'',//弹框类型：add,edit,show
            tableData: [  //表单列表
                {
                    id: '',
                    name: '',
                    type: '',
                    typeName: '',
                    version: '',
                    desc: '',
                    attribute: '',
                    createTime: null,
                    updateTime: null,
                    createUser: ''
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
    created: function() {
       this.getTypeSelect();
       this.onSearch();
    },
    filters: {

    },
    methods: {
        //table序号
        indexMethod(index) {
          return (this.pageInfo.currentPage -1 )*this.pageInfo.pageSize + index + 1;
        },
        /**
         * 查询列表
         */
        onSearch(flag){
            this.listLoading=true;
            let param = Object.assign(this.formSearch,{username:this.$common.getSessionStorage('username')},this.pageInfo);
            apis.datamanageApi.getList(param)
            .then((data)=>{
                this.listLoading=false;
                if (data && data.data) {
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
            .catch((err)=>{
                this.listLoading=false;
                this.$message({message: '查询异常，请重新登录',type: "error"});
            });
        },
        /* 查询类型下拉框查询数据*/
        getTypeSelect(){
          let param = {
            type: "1"
          };
          apis.commonApi.getSelectList(param)
            .then((data)=>{
               if (data && data.data) {
                  var json = data.data;
                  if (json.status == 'SUCCESS') {
                      //清空列表
                      this.typeOptions = [];
                      this.typeOptions = json.dataList;
                  }
                  else if (json.message) {
                      this.$message({message: json.message,type: "error"});
                  }
                }
              })
              .catch((err)=>{
                  this.$message({message: '获取数据类型下拉框数据异常',type: "error"});
              });
        },
        /* 点击保存*/
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
                    apis.datamanageApi.add(param)
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
                    apis.datamanageApi.update(param)
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
            var id=rowData.id;
            this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                    apis.datamanageApi.delete({id:id})
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
            this.$confirm('此操作将批量永久删除记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                        apis.datamanageApi.deleteBatch({ids:ids})
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
            this.itemShow = false;
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
            this.itemShow = false;
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
