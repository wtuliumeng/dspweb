<template>
    <div class="container messageboard">
        <div v-show="isTableShow">
          <!-- 查询区----start -->
          <el-form :label-position="labelPosition" :label-width="labelWidth" :inline="true" ref="formSearch" :model="formSearch" >
              <el-form-item label="TaskID" prop="taskId">
                  <el-input v-model="formSearch.taskId" placeholder="任务编号"></el-input>
              </el-form-item>
              <el-form-item label="文件名" prop="fileName">
                  <el-input v-model="formSearch.fileName" placeholder="文件名"></el-input>
              </el-form-item>
              <el-form-item label=" "></el-form-item>
              <el-button type="primary" @click="onSearch" >查询</el-button>
              <el-button type="warning" plain @click="onReset" >重置</el-button>
          </el-form>
          <!-- 查询区----end -->
          <!-- 表格---start -->
          <el-table :data="tableData" v-loading="listLoading"  border stripe style="width: 100%">
              <!--索引-->
              <el-table-column label="序号" type="index" :index="indexMethod" align="center" width="50">
              </el-table-column>
              <el-table-column prop="taskId" label="任务编号" align="center" width="200">
              </el-table-column>
              <el-table-column prop="fileName" label="文件名" align="center" width="180">
              </el-table-column>
              <el-table-column prop="createTime" label="生成时间" :formatter="this.$common.timestampToTime" align="center" width="180">
              </el-table-column>
              <el-table-column prop="digist" label="数字签名" align="center" width="200">
              </el-table-column>
              <el-table-column prop="status" label="状态" :formatter="statusFormat" align="center" width="100">
              </el-table-column>
              <el-table-column prop="dtimes" label="下载次数" align="center" width="100">
              </el-table-column>
              <el-table-column label="操作" fixed="right" min-width="220" align="center">
                  <template slot-scope="scope">
                      <el-button size="mini" plain type="primary" @click="handleDetail(scope.$index, scope.row)">详情</el-button>
                      <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">查看文件</el-button>
                  </template>
              </el-table-column>
          </el-table>
          <el-pagination background layout="total,sizes,prev, pager, next,jumper" :current-page="pageInfo.currentPage" :page-size="pageInfo.pageSize" :total="pageInfo.pageTotal" :page-sizes="[5, 10, 20, 50]" @size-change="handleSizeChange" @current-change="handleCurrentChange">
          </el-pagination>
        </div>
        <!-- 表格---end -->
        <div v-show="isEditShow">
            <!-- 编辑弹框---start -->
                <!-- <div>{{formEditTitle}}</div> -->
                <el-form :label-position="labelPosition" :label-width="labelWidth"  :disabled="formEditDisabled" :inline="true" ref="formEdit" :model="formEdit" class="demo-form-inline">

                    <el-form-item class="_editor">
                        <!-- 留言编辑器---start -->
                        <div  class="document-editor" >
                                <!-- 工具栏容器 start -->
                                <div v-show="!formEditDisabled" class="document-editor__toolbar"></div>
                                <!-- 工具栏容器 end -->

                                <!-- 编辑器容器 start -->
                                <div class="document-editor__editable-container">
                                    <div class="document-editor__editable">
                                        <p>张三|07232443|20101224</p>
                                    </div>
                                </div>
                                <!-- 编辑器容器 end -->
                        </div>
                        <!-- 留言编辑器---end -->
                    </el-form-item>
                </el-form>

                <div slot="footer" class="dialog-footer">
                    <el-button @click="closeEdit">取 消</el-button>
                </div>
            <!-- 编辑弹框---end -->
        </div>

        <!-- 编辑弹框---start -->
        <el-dialog  :title="formEditTitle" :visible.sync="dialogEdittVisible" width="500px" @close="closeDialog('formEdit')">
            <el-form :label-position="labelPosition" :label-width="labelWidth" :disabled="formEditDisabled" :inline="true" ref="formEdit" :model="formEdit" class="demo-form-inline">
                <el-form-item label="任务编号" prop="taskId" >
                    <el-input v-model="formEdit.name" placeholder="任务编号" :style="{width: editWidth}"></el-input>
                </el-form-item>
                <el-form-item label="文件名" prop="fileName">
                    <el-input v-model="formEdit.fileName" placeholder="文件名" :style="{width: editWidth}"></el-input>
                </el-form-item>
                <el-form-item label="生成时间" prop="createTime">
                    <el-date-picker format="yyyy 年 MM 月 dd 日 hh 时 mm 分 ss 秒" value-format="yyyy-MM-dd hh:mm:ss"  v-model="formEdit.createTime" :style="{width: editWidth}"></el-date-picker>
                </el-form-item>
                <el-form-item label="数字签名" prop="digist">
                    <el-input  v-model="formEdit.digist" placeholder="数字签名" :style="{width: editWidth}"></el-input>
                </el-form-item>
                <el-form-item label="状态" prop="status"  v-if="itemShow">
                    <el-select v-model="formEdit.status" placeholder="请选择" :style="{width: editWidth}">
                        <el-option value="0" label="未下载"></el-option>
                        <el-option value="1" label="已下载"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="下载次数" prop="dtimes" v-if="itemShow">
                    <el-input v-model="formEdit.dtimes"  :style="{width: editWidth}" placeholder="下载次数"></el-input>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogEdittVisible = false">取 消</el-button>
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
    .table-info-row{
      color: #5daf34
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
                taskId: '',
                fileName: ''
            },
            formEdit: { //表单编辑
                taskId: '',
                fileName: '',
                createTime: '',
                digist: '',
                status: '',
                dtimes: ''
            },
            formEditTitle:'编辑',//新增，编辑和查看标题
            formEditDisabled:false,//编辑弹窗是否可编辑
            dialogEdittVisible: false,  //编辑弹框显示
            itemShow: false, //某些列是否展示
            dialogType:'',//弹框类型：add,edit,show
            tableData: [], //表单列表
            labelPosition: 'right', //lable对齐方式
            labelWidth: '100px', //lable宽度
            formLabelWidth: '120px',
            editWidth: "300px", //设置输入框的长度
            isTableShow: true,
            isEditShow: false
        };
    },
    computed:{

    },
    created: function() {
       this.onSearch();
    },
    filters: {

    },
    mounted(){
        this.initCKEditor();
    },
    methods: {
        /**
         * 状态转换
         */
        statusFormat: function (row, column) {
          return row.status == 1 ? "已下载" : row.status == 0 ? "未下载" : "未知";
        },
        //table序号
        indexMethod(index) {
          return (this.pageInfo.currentPage -1 )*this.pageInfo.pageSize + index + 1;
        },
        /**
         * 查询列表
         */
        onSearch(){
            this.listLoading=true;
            let param = Object.assign({}, this.formSearch,{username:this.$common.getSessionStorage('username')},this.pageInfo);
            apis.fileRetrievalApi.getList(param)
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
                this.$message({message: '查询异常，请重试',type: "error"});
            });
        },
        onReset(){
            this.$refs['formSearch'].resetFields();
        },
        /**
         * 打开查看文件
         */
        handleEdit(index, rowData) {
            this.openEdit();
            this.$nextTick(()=>{
                this.listLoading=true;
                this.EditorObj.isReadOnly=true;
                var _taskId = rowData.taskId;
                var _fileName = rowData.fileName;
                let param = Object.assign({},{taskId:_taskId,fileName:_fileName});
                apis.fileRetrievalApi.searchFile(param)
                .then((data)=>{
                    this.listLoading=false;
                    if (data && data.data) {
                            var json = data.data;
                            if (json.status == 'SUCCESS') {
                                this.EditorObj.setData(json.data.text);
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
         * 打开详情页
         */
        openDetail(row){
            this.$common.OpenNewPage(this,'detail',row);
        },
        /**
         * 打开查看文件
         */
        openEdit(){
            this.isTableShow=false;
            this.isEditShow = true;
        },
         /**
         * 关闭编查看文件
         */
        closeEdit(){
            this.$refs['formEdit'].resetFields();
            this.isTableShow=true;
            this.isEditShow = false;

        },
         //初始化容器
        initCKEditor() {
            DecoupledEditor.create(document.querySelector('.document-editor__editable'), {
                ckfinder: {
                    // Upload the images to the server using the CKFinder QuickUpload command.
                    uploadUrl: '/api/img-api/upload'
                }
            })
            .then(editor => {
                    const toolbarContainer = document.querySelector('.document-editor__toolbar');
                    toolbarContainer.appendChild(editor.ui.view.toolbar.element);//添加工具栏
                    this.EditorObj = editor;
                    console.log('初始化富编辑器');
            })
            .catch(err => {
                    console.error(err);
                    console.log('初始化富编辑器失败');
            });
        }
    }
};
</script>
