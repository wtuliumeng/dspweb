<template>
<div>
  <div class="table"> <!-- 页面表格begin -->
            <div class="crumbs"> <!-- 页面标题begin -->
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item><i class="el-icon-tickets"></i> 菜单管理</el-breadcrumb-item>
                </el-breadcrumb>
            </div> <!-- 页面标题end-->
            <div class="container"><!-- 页面内容区begin -->

      <div class="custom-tree-container">
            <div class="block">
              <el-button type="primary" size="small" @click="append(null,0)">添加一级菜单</el-button>

                <el-tree   :data="treeData" :props="defaultProps"   node-key="id"    :expand-on-click-node="false" >
                        <span class="custom-tree-node" slot-scope="{ node, data }">
                            <span>{{node.label}}
                           <i class="el-icon-plus" @click="() => append(node,'1')"></i>
                           <i class="el-icon-edit-outline" @click="() => append(node,'2')"></i>
                           <i class="el-icon-delete" @click="() => remove(node, data)"></i>
                           </span>
                        </span>
                </el-tree>
        </div>
    </div>
       </div><!-- 页面内容区end-->
    </div><!-- 页面表格end -->
     <!--新增界面-->
		<el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="80px" :rules="formRules" ref="addForm">
				<el-form-item label="菜单名称" prop="menuName">
					<el-input v-model="addForm.menuName" auto-complete="off"></el-input>
				</el-form-item>
                 <el-form-item label="排序" prop="orderBy">
					<el-input v-model="addForm.orderBy" auto-complete="off"></el-input>
				</el-form-item>

           <el-form-item label="图片" prop="menuIcon">
					<el-input v-model="addForm.menuIcon" auto-complete="off"></el-input>
				</el-form-item>
        <el-form-item label="资源" prop="resoureUrl">
          <el-button @click="resourceVisible=true" type="text" size="small">{{addForm.resourceName}}</el-button>
          <!-- <el-input v-model="addForm.resourceId" auto-complete="off"></el-input> -->


				</el-form-item>
           <el-form-item label="是否显示" prop="isShow">
            <el-select v-model="addForm.isShow" placeholder="请选择" clearable>
                <el-option  v-for="item in isShowOptions"   :key="item.value"  :label="item.label"  :value="item.value" ></el-option>
            </el-select>
				</el-form-item>
        <!-- <el-form-item label="" prop="parentId">
					<el-input v-model="addForm.parentId" auto-complete="off"></el-input>
				</el-form-item> -->

			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="addFormVisible=false">取消</el-button>
				<el-button type="primary" @click="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>
     <el-dialog title="资源" :visible.sync="resourceVisible" :close-on-click-modal="false">

          <el-tree :data="resourcetree" :props="defaultProps"  @node-click="handleNodeClick" v-model="addForm.resourceId" ref="resourcetreeref"></el-tree>
          </el-dialog>
</div>
</template>


<script>
  export default {
    data() {
      return {
        treeData:[],
        resourcetree:[],
        addFormVisible:false,
        addLoading:false,
        resourceVisible:false,
        resourcename:"",
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        addForm:{},
        resoureTypeOptions:[{
          value: 'module',
          label: 'module'
        }, {
          value: 'url',
          label: 'url'
        }, {
          value: 'button',
          label: 'button'
        }],
         //输入框验证
       //  permission: "",
      //           resoureUrl: "" ,
      //           parentId:node.data.id
      formRules: {
        resoureName: [{ required: true, message: "请输入资源名称", trigger: "blur" }],
        resoureType: [
          { required: true, message: "请选择资源类型", trigger: "blur" }
        ],
        parentId: [{ required: true, message: "请输入机构名称", trigger: "blur" }],
      },
           isShowOptions:[
             {
               value:1,
               label:'是'
             },
             {
                value:0,
               label:'否'
             }
           ]

      };
    },
    methods: {
      handleNodeClick(data) {
        console.log(data);
        var _this=this;
        _this.addForm.resourceName=data.name;
        _this.addForm.resourceId=data.id;
        _this.resourceVisible=false;
      },
      getResult()
      {
            var _this = this;
            //this.listLoading = true;

            let param = Object.assign({}, {});
            this.$ajax({
                method: "post",
                url: "/api/sysMenu-api/querySysMenuList",
                data: param
            }).then(
                function(resultData) {

                _this.treeData = resultData.data.data;


                },
                function(resultData) {
                // _this.tableData.message = "Local Reeuest Error!";
                //console.log(resultData);
                }
            );
      },
      getresourceResult()
      {
            var _this = this;
            //this.listLoading = true;

            let param = Object.assign({}, {});
            this.$ajax({
                method: "post",
                url: "/api/sysResource_api/getSysResourceList",
                data: param
            }).then(
                function(resultData) {

                _this.resourcetree = resultData.data.data;


                },
                function(resultData) {
                // _this.tableData.message = "Local Reeuest Error!";
                //console.log(resultData);
                }
            );
      },
      //添加组织结构节点
    append(node,param) {
      var _this = this;
      if(param=='1')
      {
     //新增组织节点时获取当前节点的ID
      //this.addForm.parentId=node.data.id;
       this.addForm.id='0';
      //显示添加组织结构界面
      this.addFormVisible = true;

      this.addForm={
                id:0,
                menuName:"",
                orderBy: "",
                menuIcon: "",
                resourceId: "" ,
                parentId:node.data.id,
                resourceName:"--请选择--",
                isShow:1
        };
      }
      else if (param == "0") {
        //新增组织节点时父级节点id设置为0，表名是根级节点
        this.addForm.parentId = "0";
        this.addForm.id = "0";
        this.addForm.resourceName = "--请选择--";
        //显示添加组织结构界面
        this.addFormVisible = true;
      }
       if(param=='2')
      {
        //根据id获取
        let param = new URLSearchParams();
             var id=node.data.id;
             param.append("ID",id);

            this.$ajax({
                method: "post",
                url: "/api/sysMenu-api/querySysMenuByPrimaryKey",
                data: param
            }).then(
                function(resultData) {
                _this.addForm = resultData.data.data;
                console.log(JSON.stringify(_this.addForm))
                if(_this.addForm.resourceName=="" )
                {
                  _this.addForm.resourceName="--请选择--";
                }
                _this.listLoading = false;
                }
            );
      //显示添加组织结构界面
       this.addFormVisible = true;

       }

      },
    //删除
    remove(node, data) {
        if(node.data.children != null){
            this.$message({message: '请先删除子菜单',type: "warn"});
            return;
        }
        this.$confirm("确认删除该记录吗?", "提示", {
        type: "warning"
         })
        .then(() => {
        let param = new URLSearchParams();
        param.append("ids", node.data.id);
          this.$ajax({
            method: "post",
            url: "/api/sysMenu-api/deleteSysMenu",
            data: param
          }).then(res => {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            const parent = node.parent;
            const children = parent.data.children || parent.data;
            const index = children.findIndex(d => d.id === data.id);
            children.splice(index, 1);
           //重新获取新增后的组织机构数据
            this.getResult();
          });
        })
        .catch(() => {});

    },
    //新增
    addSubmit: function() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.addLoading = true;
            let param = Object.assign({}, this.addForm);
            this.$ajax({
              method: "post",
              url: "/api/sysMenu-api/add",
              data: param
            }).then(res => {
              this.addLoading = false;
              this.$message({
                message: "提交成功",
                type: "success"
              });
              //this.$refs["addForm"].resetFields();
              this.addFormVisible = false;
              //重新获取新增后的组织机构数据
              this.getResult();
            });
          });
        }
      });
    }

    },
     mounted() {
    //获取列表
    this.getResult();
    this.getresourceResult();

         }
  };
</script>
