<template>
  <div class="container messageboard2">
    <div v-show="isTableShow">
      <!-- 查询区----start -->
      <el-form :label-position="labelPosition" :inline="true" ref="form1" :model="form1" class="demo-form-inline">
        <el-form-item label="SQL编号" prop="sqlId">
          <el-input v-model="form1.sqlId" placeholder="请输入SQL编号"></el-input>
        </el-form-item>
        <el-form-item label="数据集名称" prop="name" style="white-space: nowrap;">
          <el-input v-model="form1.name" placeholder="请输入数据集名称"></el-input>
        </el-form-item>
        <el-form-item label="采集状态:" prop="resource">
          <el-select v-model="form1.resource" placeholder="请选择任务状态" clearable>
            <el-option v-for="item in form1.statusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-button type="primary" @click="onSearch">查询</el-button>
        <el-button type="warning" plain @click="onReset">重置</el-button>
      </el-form>
      <!-- 操作区----start -->
      <el-row class="mgb15">
        <el-button size="small" round type="primary" @click="onDown">批量下载</el-button>
      </el-row>
      <!-- 操作区 ----end-->
      <!-- 表格---start -->
      <el-table :data="tableData" v-loading="listLoading" border stripe style="width: 100%" @selection-change="handleSelectionChange"
        ref="multipleTable">
        <el-table-column type="selection" width="60" label="全选">
        </el-table-column>
        <!--索引-->
        <el-table-column label="序号" type="index" :index="indexMethod" align="center" width="50">
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
        <el-table-column label="操作" fixed="right" min-width="150" align="center">
          <template slot-scope="scope">
            <el-button type="primary" plain size="small" @click="viewUser(scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background layout="total,sizes,prev, pager, next,jumper" :current-page="pageInfo.currentPage"
        :page-size="pageInfo.pageSize" @size-change="handleSizeChange" :total="pageInfo.pageTotal" :page-sizes="[5, 10, 20, 50]"
        @current-change="handleCurrentChange">
      </el-pagination>
      <!-- 表格---end -->
      <!-- 编辑弹框 start-->

      <el-dialog :visible.sync="formInfoVisible" :center="true">
        <el-form :inline="true" :model="formInfo" label-width="120px" ref="formInfo" :disabled="editable" @close="closeDialog('formEdit')">
          <el-form-item label="SQL编号" prop="sqlId" style="white-space: nowrap;">
            <el-input v-model="formInfo.sqlId" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="数据集名称" prop="name" style="white-space: nowrap;">
            <el-input v-model="formInfo.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="采集开始日期" prop="createtime" style="white-space: nowrap;">
            <el-input v-model="formInfo.createtime" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="采集结束日期" prop="endtime" style="white-space: nowrap;">
            <el-input v-model="formInfo.endtime" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="descript" style="white-space: nowrap;">
            <el-input v-model="formInfo.descript" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="采集状态" prop="state" style="white-space: nowrap;">
            <el-input v-model="formInfo.state" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
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
        idKey: 'sqlId', //标识列表数据中每一行的唯一键的名称

        pageInfo: { //分页
          currentPage: 1,
          pageSize: 5,
          pageTotal: 80
        },
        form1: { //表单查询
          name: '',
          sqlId: '',
          resource: '',
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
        formInfo: {
          name: "",
          sqlId: "",
          createtime: "",
          endtime: "",
          descript: "",
          state: ""
        },
        tableData: [],
        labelPosition: 'right', //lable对齐方式
        labelWidth: '80px', //lable宽度
        formLabelWidth: '120px',
        footerVisible: false,
        formInfoVisible: false,
        isTableShow: true, //表格显示
        editable: false, //是否可编辑
      };
    },
    computed: {

    },
    created: function() {
      this.onSearch();
    },

    methods: {
      //table序号
      indexMethod(index) {
        return (this.pageInfo.currentPage - 1) * this.pageInfo.pageSize + index + 1;
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
        this.changePageCoreRecordData();
        this.pageInfo.currentPage = val;
        this.onSearch();
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
      onSearch() {
        this.listLoading = true;
        let param = Object.assign({}, this.form1, this.pageInfo);
        apis.monApi.querySearchList(param)
          .then((data) => {
            this.listLoading = false;
            if (data && data.data) {
              console.log(data.data.dataList);
              var json = data.data;
              if (json.status == 'SUCCESS') {
                this.pageInfo.pageTotal = json.count;
                this.tableData = json.dataList;
                setTimeout(() => {
                  this.setSelectRow();
                }, 50)
              } else if (json.message) {
                this.$message({
                  message: json.message,
                  type: "error"
                });
              }
            }
          })
          .catch((err) => {
            this.listLoading = false;
            this.$message({
              message: '查询异常，请重试',
              type: "error"
            });
          });
      },

      onDown() {
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
            // if (data) {
            //   console.log("download===", data);
            //   console.log( data.data);
            //   const content = data.date.dataList;
            //   const blob = new Blob([content]);
            //   const fileName = `采集服务监控详情.xlsx`;
            //   if ("download" in document.createElement("a")) {
            //     // 非IE下载
            //     const elink = document.createElement("a");
            //     elink.style.display = "none";
            //     elink.href = URL.createObjectURL(blob);
            //     elink.download = fileName;
            //     document.body.appendChild(elink);
            //     elink.click();
            //   } else {
            //     // IE10+下载
            //     navigator.msSaveBlob(blob, fileName);
            //   }

            // }
          })
          .catch(() => {
            this.$message.error("下载附件失败，请联系管理员");
          });

      },

      viewUser: function(row) {
        this.formName = "详情页面"; //用户详情界面title
        this.formInfoVisible = true; //界面可见
        this.$nextTick(() => {
          this.editable = true; //不可编辑
          this.footerVisible = false; //页脚可见
          this.formInfo = Object.assign({}, row);
        });
      },
      onReset() {
        this.$refs['form1'].resetFields();
      }
    }
  };
</script>
