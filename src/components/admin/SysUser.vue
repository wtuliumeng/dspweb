<template>
     <section>
        <div class="table"> <!-- 页面表格begin -->
          <div class="crumbs"> <!-- 页面标题begin -->
              <el-breadcrumb separator="/">
                  <el-breadcrumb-item><i class="el-icon-tickets"></i>用户管理</el-breadcrumb-item>
              </el-breadcrumb>
          </div> <!-- 页面标题end-->
          <div class="container"><!-- 页面内容区begin -->
             <div class="handle-box"> <!-- 搜索区begin -->
  <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters" :label-width="labelWidth" :label-position="labelPosition">
                <el-form-item>
                  编码：<el-input v-model="filters.userNo"   placeholder="编码" style="width:200px; heght:30px;" size="mini"></el-input>
                </el-form-item>
                <el-form-item>
                   用户名： <el-input v-model="filters.userName"  placeholder="用户名" style="width:200px; heght:30px;" size="mini"></el-input>
                </el-form-item>
                <el-form-item>
                   登陆名： <el-input v-model="filters.loginName"  placeholder="用户名" style="width:200px; heght:30px;" size="mini"></el-input>
                </el-form-item>
                <el-form-item>
                   对接人：<el-input v-model="filters.charge"   placeholder="对接人" style="width:200px; heght:30px;" size="mini"></el-input>
                </el-form-item>
                <el-form-item>
                   <el-button type="primary" icon="el-icon-search" @click="getResult(1)" size="mini">搜索</el-button>
                </el-form-item>
            </el-form>
        </el-col>
         </div> <!-- 搜索区end -->
          <!--新增按钮-->
            <el-button type="success" icon="el-icon-circle-plus-outline" @click="handleAdd" size="mini" round>新增</el-button>
            <el-button type="danger" icon="el-icon-delete" @click="handleDeleteList" size="mini" round>删除</el-button>
            <template>
        <!--表格数据及操作-->
        <el-table :data="tableData" size="mini"  highlight-current-row border   class="el-tb-edit mgt20" ref="multipleTable" tooltip-effect="dark" v-loading="listLoading" @selection-change="selectChange">
            <!--勾选框-->
            <el-table-column type="selection" width="55">
            </el-table-column>
            <!--索引-->
            <el-table-column label="序号" type="index" :index="indexMethod" align="center" width="50">
            </el-table-column>
            <el-table-column prop="id" label="编码" align="center">
            </el-table-column>
            <el-table-column prop="userName" label="用户名" align="center">
            </el-table-column>
            <el-table-column prop="loginName" label="登陆名" align="center">
            </el-table-column>
            <el-table-column prop="orgname" label="所属机构" align="center">
            </el-table-column>
            <el-table-column prop="charge" label="对接人" align="center">
            </el-table-column>
             <el-table-column prop="mobile" label="对接人电话" align="center">
            </el-table-column>
             <el-table-column prop="validateState" label="是否有效" :formatter="formatState" sortable align="center">
            </el-table-column>
              <el-table-column  fixed="right" label="操作" width="200" align="center">
               <template slot-scope="scope">
                 <el-button size="small" @click="handleEdit(scope.$index,scope.row)">编辑</el-button>
                 <el-button type="primary" plain size="small" @click="handleRole(scope.$index,scope.row)">角色</el-button>
			        	</template>
            </el-table-column>
        </el-table>
        </template>
        </div><!-- 页面内容区end-->
    </div><!-- 页面表格end -->
     <!--新增界面-->
		<el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false">
			<el-form :inline="true" :model="addForm" label-width="100px" :rules="addFormRules" ref="addForm">
				<el-form-item label="用户名" prop="userName">
					<el-input v-model="addForm.userName" auto-complete="off"></el-input>
				</el-form-item>
        &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
        <el-form-item label="登录名" prop="loginName">
					<el-input v-model="addForm.loginName" auto-complete="off"></el-input>
				</el-form-item>
        	<el-form-item label="登录密码" prop="password">
					<el-input v-model="addForm.password" auto-complete="off"></el-input>
				</el-form-item>
         &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
        <el-form-item label="对接人" prop="charge">
        	<el-input v-model="addForm.charge" auto-complete="off"></el-input>
        </el-form-item>
         &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
        <el-form-item label="对接人电话" prop="mobile">
					<el-input v-model="addForm.mobile" auto-complete="off"></el-input>
				</el-form-item>
         &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
        <el-form-item label="所属机构" prop="orgname">
          <el-button @click="orgSelect" type="text" size="medium">{{addForm.orgname}}</el-button>
        </el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>

     <!--编辑界面-->
		<el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
			<el-form :inline="true" :model="editForm" :label-position="right" label-width="95px" :rules="addFormRules" ref="editForm">
				<el-form-item label="用户名" prop="userName">
					<el-input v-model="editForm.userName" auto-complete="off"></el-input>
				</el-form-item>
        <el-form-item label="登录名" prop="loginName">
					<el-input v-model="editForm.loginName" auto-complete="off"></el-input>
				</el-form-item>
        <el-form-item label="交接人" prop="charge">
        	<el-input v-model="editForm.charge" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="交接人电话" prop="mobile">
					<el-input v-model="editForm.mobile" auto-complete="off"></el-input>
				</el-form-item>
        <el-form-item label="登录密码" prop="password">
        	<el-input v-model="editForm.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="" prop="">
          <el-checkbox v-model="checked">修改密码</el-checkbox>
        </el-form-item>
        <el-form-item label="所属机构" prop="orgName">
            <el-button @click="orgSelect" type="text" size="small">{{editForm.orgname}}</el-button>
        </el-form-item>
        <el-form-item label="是否有效" prop="validateState">
          <el-select v-model="editForm.validateState" auto-complete="off">
              <el-option label="有效" value="1"></el-option>
              <el-option label="无效" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="操作提示" prop="">
         <span style="color:#F00"> 修改登入密码请选中“修改密码”并点击保存；不选中密码将不会同步更新
         </span>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>
     <!--组织结构界面-->
		<el-dialog title="主机构" :visible.sync="orgFormVisible" :close-on-click-modal="false">
			<el-form :inline="true" label-width="500px"   v-loading="treeLoading">
				<el-form-item >
                <el-tree   :data="treeData" :props="defaultProps"   node-key="id"    :expand-on-click-node="false"  >
                        <span class="custom-tree-node" slot-scope="{ node, data }">
                            <span>{{node.label}}
                           <i class="el-icon-plus" @click="() => append(node)">选择</i>
                           </span>
                        </span>
                </el-tree>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="orgFormVisible = false">取消</el-button>
			</div>
		</el-dialog>
       <!-- 查看角色 -->
              <el-dialog title="查看角色" :visible.sync="roleFormVisible" :close-on-click-modal="false">
                <el-form :model="infoForm" label-width="80px"  ref="infoForm" :inline="true">
                  <el-form-item label="用户名" prop="positionName">
                    <el-input v-model="infoForm.userName" auto-complete="off" :disabled="true"></el-input>
                  </el-form-item>
                  <el-form-item label="编码" prop="positionCode">
                    <el-input v-model="infoForm.id" auto-complete="off" :disabled="true"></el-input>
                  </el-form-item>
                </el-form>
                <el-form  label-width="80px" :inline="true">
                  <div v-for="item in roleData" :key="item.id">
                  <el-form-item label="角色名称" prop="">
                    <el-input v-model="item.roleName" auto-complete="off" :disabled="true"></el-input>
                  </el-form-item>
                  <el-form-item label="角色编码" prop="">
                    <el-input v-model="item.roleCode" auto-complete="off" :disabled="true"></el-input>
                  </el-form-item>
                </div>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="roleFormVisible = false">取消</el-button>
                </div>
              </el-dialog>
  </section>
 </template>
 <script>
export default {
  name: 'SysUser',
  data() {
    return {
      //搜索区域参数
      filters: {
        userName: "",
        loginName: "",
        userNo: "",
        charge: "",
        positionName: "",
        positionCode: ""
      },
      //table返回的数据
      tableData: [],
      //列表Loading加载
      listLoading: false,
      //批量选中data
      selectList: [],
      //分页
      count: 0,
      currentPage: 1,
      pageSize: 10,
      //角色信息
      roleData:[],
      //新增界面是否显示
      addFormVisible: false,
      //添加按钮Loading加载
      addLoading: false,
      labelPosition: 'right', //lable对齐方式
      labelWidth: '100px', //lable宽度
      //输入框验证
      addFormRules: {
        userName: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        loginName: [
          { required: true, message: "请输入登录名", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" }
        ],
        orgid: [
          { required: true, message: "请选择主机构", trigger: "blur" }
        ],
        charge: [
          { required: true,message: "请输入对接人"}
        ],
        mobile: [
          { required: true , message: "请输入对接人电话"}
        ]
      },
      //新增界面数据
      addForm: {
        id: "0",
        userName: "",
        loginName: "",
        password: "",
        orgid: "",
        orgname: "选择主机构",
        charge: "",
        mobile: "",
        validateState: "1"
      },
      //编辑界面是否显示
      editFormVisible: false,
      //是否修改密码复选框
      checked: false,
      //编辑按钮Loading加载
      editLoading: false,
      //编辑界面数据
      editForm: {
        id: "",
        userName: "",
        loginName: "",
        password: "",
        orgid: "",
        orgname: "选择主机构",
        mobile: "",
        charge: "",
        lock: "",
        validateState: ""
      },
      //组织结构界面是否显示
      orgFormVisible: false,
      //结构树Loading
      treeLoading: false,
      //组织结构数据
      treeData: [],
      //属性名称转换
      defaultProps: {
        children: "children",
        label: "name"
      },
      //岗位列表Loading加载
      positionListLoading: false,
      //是否显示岗位列表
      positionFormVisible:false,
      //岗位table分页
      positionCount: 0,
      positionCurrentPage: 1,
      positionPageSize: 10,
      //用户信息
      infoForm:[],
      //角色Loading加载
      roleListLoading:false,
      //是否显示角色信息
      roleFormVisible:false,
    };
  },
  methods: {
    getResult: function(val) {
      var _this = this;
      this.listLoading = true;
      let param = Object.assign(
        {},
        {
          currentPage: val,
          pageSize: 10,
          userName: this.filters.userName,
          userNo: this.filters.userNo,
          loginName: this.filters.loginName
        }
      );
      this.$ajax({
        method: "post",
        url: "/api/sysuser-api/querySysUserList",
        data: param
      }).then(function(resultData) {
        _this.tableData = resultData.data.dataList;
        _this.count = resultData.data.count;
        _this.listLoading = false;
      });
    },
    //是否有效显示转换
    formatState: function(row, column) {
      return row.validateState == 1
        ? "有效"
        : row.validateState == 0 ? "无效" : "";
    },
    //是否锁定显示转换
    formatLocked: function(row, column) {
      return row.lock == 1 ? "锁定" : row.lock == 0 ? "未锁定" : "";
    },
    //查看角色
    handleRole: function(index, row) {
      //显示角色信息页面
      this.roleFormVisible=true;

      var _this = this;
      _this.infoForm=Object.assign({}, row);
      this.roleListLoading = true;
      let param = Object.assign({},{targetId: row.id});
      this.$ajax({
        method: "post",
        url: "/api/sysrole-api/queryRoleUserList",
        data: param
      }).then(function(resultData) {
        _this.roleData = resultData.data.data;
        _this.roleListLoading = false;
        console.log(_this.roleData);
      });


    },
    //显示新增界面
    handleAdd: function() {
      this.addFormVisible = true;
    },
    //新增
    addSubmit: function() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          //主机构必填提示
          if (this.addForm.orgid == "") {
            this.$message({
              message: "请选择主机构",
              type: "error"
            });
            return;
          }
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.addLoading = true;
            let param = Object.assign({}, this.addForm);
            console.log(param);
            this.$ajax({
              method: "post",
              url: "/api/sysuser-api/addUser",
              data: param
            }).then(res => {
              this.addLoading = false;
              this.$message({
                message: "提交成功",
                type: "success"
              });
              this.$refs["addForm"].resetFields();
              this.addFormVisible = false;
              this.getResult(1);
            });
          });
        }
      });
    },
    //显示组织结构
    orgSelect: function() {
      //加载组织结构树
      this.getTreeResult();

      //显示组织结构界面
      this.orgFormVisible = true;
    },
    //获取组织结构信息
    getTreeResult: function() {
      var _this = this;
      this.treeLoading = true;
      let param = Object.assign({}, {});
      this.$ajax({
        method: "post",
        url: "/api/sysorg-api/querySysOrgList",
        data: param
      }).then(
        function(resultData) {
          _this.treeData = resultData.data.data;
          _this.treeLoading = false;
        },
        function(resultData) {
          _this.treeData.message = "Local Reeuest Error!";
        }
      );
    },
    //组织结构节点赋值
    append(node, param) {
      //新增信息赋值
      this.addForm.orgname = node.data.name;
      this.addForm.orgid = node.data.id;
      //编辑信息赋值
      this.editForm.orgname = node.data.name;
      this.editForm.orgid = node.data.id;
      this.orgFormVisible = false;
    },
    //批量删除
    handleDeleteList: function() {
      var ids= this.selectList.map(item => item.id);
      if(ids.length==0){
           this.$message({message: '请选择要删除的项',type: "warn"});
          return;
      }
      debugger;
      const length = this.selectList.length;
      let id = "";
      for (let i = 0; i < length; i++) {
        id += this.selectList[i].id + ",";
      }
      //去掉结尾,
      id = id.substring(0, id.length - 1);
      this.$confirm("确认删除该记录吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          let param = new URLSearchParams();
          param.append("ids", id);
          console.log("ids:" + param);
          this.$ajax({
            method: "post",
            url: "/api/sysuser-api/delSysUserByUserId",
            data: param
          }).then(res => {
            this.listLoading = false;
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.selectList = [];
            this.getResult(1);
          });
        })
        .catch(() => {});
    },
    //显示编辑界面
    handleEdit: function(index, row) {
      this.editFormVisible = true;
      this.editForm = Object.assign({}, row);
    }, //编辑
    editSubmit: function() {
      if (this.checked == true) {
        this.editForm.lock = "1";
      }
      if (this.checked == false) {
        this.editForm.lock = "0";
      }
      //主机构必填提示
      if (this.editForm.orgid == "") {
        this.$message({
          message: "请选择主机构",
          type: "error"
        });
        return;
      }
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.editLoading = true;
            let param = Object.assign({}, this.editForm);
            console.log(param);
            this.$ajax({
              method: "post",
              url: "/api/sysuser-api/addUser",
              data: param
            }).then(res => {
              this.editLoading = false;
              this.$message({
                message: "提交成功",
                type: "success"
              });
              this.$refs["editForm"].resetFields();
              this.editFormVisible = false;
              this.getResult(1);
            });
          });
        }
      });
    },
    //批量选中
    selectChange: function(val) {
      this.selectList = val;
    },
    //table序号
    indexMethod(index) {
      return index + 1;
    },
    //显示岗位列表
    positionSelect: function() {
      //加载岗位列表
      this.getPositionResult(1);

      //显示岗位构界面
      this.positionFormVisible = true;
    },
    //获取岗位列表
     getPositionResult: function(val) {
      var _this = this;
      this.positionListLoading = true;
      let param = Object.assign(
        {},
        {
          currentPage: val,
          pageSize: 10,
          positionName: this.filters.positionName,
          positionCode: this.filters.positionCode
        }
      );
      this.$ajax({
        method: "post",
        url: "/api/api/sysPosition/Web/getSysPositionList",
        data: param
      }).then(function(resultData) {
        _this.positionTableData = resultData.data.data;
        _this.positionCount = resultData.data.count;
        _this.positionListLoading = false;
      });
    },
    //选中岗位
    handleChoice:function(index, row) {
      //新增信息赋值
      this.addForm.positionid =row.id;
      this.addForm.positionname = row.positionName;
      //编辑信息赋值
      this.editForm.positionid =row.id;
      this.editForm.positionname =row.positionName;
      console.log(row.positionname);

      this.positionFormVisible=false;
    }

  },
  mounted() {
    //初始加载
    this.getResult(1);
  }
};
</script>
