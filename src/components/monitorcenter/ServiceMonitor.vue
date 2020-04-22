<template>
  <div class="container messageboard2">
    <div v-show="isTableShow">
      <!-- 查询区----start -->
      <el-form :label-position="labelPosition" :inline="true" ref="form1" :model="formSearch" class="demo-form-inline">
        <el-form-item label="任务编号" prop="name" style="white-space: nowrap;">
          <el-input v-model="formSearch.name" placeholder="请输入任务编号"></el-input>
        </el-form-item>
        <el-form-item label="SQL编号" prop="sqlname" style="white-space: nowrap;">
          <el-input v-model="formSearch.sqlname" placeholder="请输入SQL编号"></el-input>
        </el-form-item>
        <el-form-item label="交换方系统" prop="switcsystem" style="white-space: nowrap;">
          <el-input v-model="formSearch.switcsystem" placeholder="请输入交换方系统"></el-input>
        </el-form-item>
        <el-form-item label="任务状态" prop="resource">
          <el-select v-model="formSearch.resource" placeholder="请选择任务状态" clearable>
            <el-option v-for="item in formSearch.statusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="运行日期" prop="rundate" style="white-space: nowrap;">
            <el-date-picker type="date"  placeholder="请输入运行日期" v-model="formSearch.rundate"  style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label=" " style="margin-left:65px;">
          <el-button type="primary" @click="dataSearch">查询</el-button>
          <el-button type="warning" plain @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>

      <el-row class="mgb15">
          <el-button size="small" round type="primary" @click="dataDown">批量下载</el-button>
      </el-row>
      <!-- 操作区----end -->
      <!-- 表格---start -->
      <el-table :data="tableData" v-loading="listLoading" border stripe style="width: 100%"
                @selection-change="handleSelectionChange"
                ref="multipleTable">
        <el-table-column type="selection" width="60" align="center" label="全选">
        </el-table-column>
        <!--索引-->
        <el-table-column label="序号" type="index" :index="indexMethod" align="center" width="50">
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
        :page-size="pageInfo.pageSize" @size-change="handleSizeChange" :total="pageInfo.pageTotal" :page-sizes="[5, 10, 20, 50]" @current-change="handleCurrentChange">
      </el-pagination>
      <!-- 表格---end -->
      <!-- 编辑弹框 start-->

      <el-dialog :visible.sync="formInfoVisible" :center="true">
      	<el-form :inline="true" :model="formInfo" label-width="80px"  ref="formInfo" :disabled="editable" @close="closeDialog('formEdit')">
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

        multipleSelectionAll: [], //所有选中的数据包含跨页数据
        multipleSelection: [], // 当前页选中的数据
        idKey: 'sqlnumber', //标识列表数据中每一行的唯一键的名称

        pageInfo: { //分页
          currentPage: 1,
          pageSize: 5,
          pageTotal: 80
        },
        formSearch: { //表单查询
          name: '',
          sqlname: '',
          switchsystem: '',
          rundate: '',
          resource:'',
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
    created:function(){
      this.dataSearch();
    },
    methods: {
      //table序号
      indexMethod(index) {
        return (this.pageInfo.currentPage -1 )*this.pageInfo.pageSize + index + 1;
      },
      /**
       * 分页大小切换
       */
      handleSizeChange(val) {
          this.pageInfo.pageSize = val;
          this.dataSearch();
      },
      /**
       * 分页切换
       */
      handleCurrentChange(val) {
        this.changePageCoreRecordData();
        this.pageInfo.currentPage = val;
        this.dataSearch();
      },
      /**
       * 表格多选
       */
      handleSelectionChange(val) {
        this.multipleSelection = val;
        //实时记录选中的数据
        setTimeout(() => {
          this.changePageCoreRecordData();
        }, 50)
        console.log('val', val);
      },
      /**
       * 分页刷新显示已勾选项
       */
      setSelectRow() {
        //没有选中任何行
        if (!this.multipleSelectionAll || this.multipleSelectionAll.length <= 0) {
          return;
        }
        // 标识当前行的唯一键的名称
        let idKey = this.idKey;
        let selectAllIds = [];
        let that = this;
        this.multipleSelectionAll.forEach(row => {
          selectAllIds.push(row[idKey]);
        })
        this.$refs.multipleTable.clearSelection();
        for (var i = 0; i < this.tableData.length; i++) {
          if (selectAllIds.indexOf(this.tableData[i][idKey]) >= 0) {
            //按照multipleSelectionAll中保存的id设置默认勾选
            this.$refs.multipleTable.toggleRowSelection(this.tableData[i], true);
          }
        }
      },
      /**
       * 记忆多选核心方法
       */
      changePageCoreRecordData() {
        // 标识当前行的唯一键的名称
        let idKey = this.idKey;
        let that = this;
        // 如果总记忆中还没有选择的数据，那么就直接取当前页选中的数据，不需要后面一系列计算
        if (this.multipleSelectionAll.length <= 0) {
          this.multipleSelectionAll = this.multipleSelection;
          return;
        }
        // 总选择里面的key集合
        let selectAllIds = [];
        this.multipleSelectionAll.forEach(row => {
          selectAllIds.push(row[idKey]);
        })
        let selectIds = []
        // 获取当前页选中的id
        this.multipleSelection.forEach(row => {
          selectIds.push(row[idKey]);
          // 如果总选择里面不包含当前页选中的数据，那么就加入到总选择集合里
          if (selectAllIds.indexOf(row[idKey]) < 0) {
            that.multipleSelectionAll.push(row);
          }
        })
        let noSelectIds = [];
        // 得到当前页没有选中的id
        this.tableData.forEach(row => {
          if (selectIds.indexOf(row[idKey]) < 0) {
            noSelectIds.push(row[idKey]);
          }
        })
        noSelectIds.forEach(id => {
          if (selectAllIds.indexOf(id) >= 0) {
            for (let i = 0; i < that.multipleSelectionAll.length; i++) {
              if (that.multipleSelectionAll[i][idKey] == id) {
                // 如果总选择中有未被选中的，那么就删除这条
                that.multipleSelectionAll.splice(i, 1);
                break;
              }
            }
          }
        })
      },
      /**
       * 查询列表
       */
      dataSearch() {
          this.listLoading=true;
          let param = Object.assign({}, this.formSearch, this.pageInfo);
          apis.monApi.queryDataSearchList(param)
          .then((data)=>{
              this.listLoading=false;
              if (data && data.data) {
                console.log(data.data.dataList);
                      var json = data.data;
                      if (json.status == 'SUCCESS') {
                          this.pageInfo.pageTotal=json.count;
                          this.tableData=json.dataList;
                          setTimeout(() => {
                            this.setSelectRow();
                          }, 50)
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
      dataDown(){
        apis.monApi.download(this.multipleSelectionAll, this.idKey)
          .then((data) => {
            console.log(data);
            const blob = new Blob([data.data])
            let url = window.URL.createObjectURL(blob)
            //创建一个a标签元素，设置下载属性，点击下载，最后移除该元素
            let link = document.createElement('a')
            link.href = url
            link.style.display = 'none'
            //data.headers.fileName 取出后台返回下载的文件名
            const downlaodFileName = decodeURIComponent(data.headers.filename)
            console.log(data.headers)
            link.setAttribute('download', downlaodFileName)
            link.click()
            //释放url对象
            window.URL.revokeObjectURL(url)
            this.$message({
              type: "success",
              message: "下载成功"
            });
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
        Object.assign(this.$data, this.$options.data('formSearch'));
      }
    }
  };
</script>
