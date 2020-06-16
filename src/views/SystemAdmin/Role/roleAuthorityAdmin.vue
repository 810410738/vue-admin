<template>
  <!-- 
  角色管理页面
  -->
  <div>
    <h3 class="headTitle">角色管理</h3>
    <el-card class="primaryCard topCard">
      <!-- 搜索组件 -->
      <selfFindRoleListComponent @find="find(arguments)"></selfFindRoleListComponent>
    </el-card>
    <el-card class="primaryCard">
      <el-row>
        <el-button type="warning" size="small" icon="el-icon-plus" @click="newRole">新增</el-button>
      </el-row>
      <!-- 用户表格数据 -->
      <el-table :data="tableData.records" highlight-current-row style="width: 100%" stripe>
        <el-table-column type="index" width="100"></el-table-column>
        <el-table-column property="roleName" label="角色名称" width="150"></el-table-column>
        <el-table-column property="systemIdentify" label="系统标识" width="150"></el-table-column>
        <el-table-column property="roleKey" label="权限字符" width="200"></el-table-column>
        <el-table-column property="dataScope" label="数据访问权限" width="200"></el-table-column>
        <el-table-column property="remark" label="描述" width="200"></el-table-column>
        <el-table-column label="状态" width="100">
          <template slot-scope="scope">
            <el-tag v-show="scope.row.roleStatus == '1'" type="success">已启用</el-tag>
            <el-tag v-show="scope.row.roleStatus == '0'" type="danger">未启用</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="success" plain size="mini" @click="edit(scope.row)">编辑</el-button>
            <el-button type="primary" plain size="mini" @click="editAuthority(scope.row)">分配权限</el-button>
            <el-button type="danger" plain size="mini" @click="deleteRole(scope.row.roleId)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <div class="Pagination" style="text-align: left;margin-top: 10px;">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="this.tableData.current"
          :page-size="this.tableData.size"
          layout="total, prev, pager, next"
          :page-count="this.tableData.pages"
          :total="this.tableData.total"
        ></el-pagination>
      </div>
    </el-card>

    <!-- 新增角色的对话框 -->
    <el-dialog
      title="新增角色"
      :visible.sync="newRoleDialogVisible"
      width="30%"
      center
      v-if="newRoleDialogVisible"
      :before-close="closeNewRoleDialog"
    >
      <!-- 自定义的表单渲染器 -->
      <selfGenerateForm
        ref="addRoleForm"
        :formJson="newRoleFormData"
        @submit="submitNewRole(arguments)"
      ></selfGenerateForm>
    </el-dialog>

    <!-- 编辑角色的对话框 -->
    <el-dialog
      title="编辑角色信息"
      :visible.sync="editRoleDialogVisible"
      width="30%"
      center
      :before-close="closeEditRoleDialog"
    >
      <!-- 自定义的表单渲染器 -->
      <selfGenerateForm
        ref="editRoleForm"
        :formJson="editRoleFormData"
        @submit="submitEditRole(arguments)"
      ></selfGenerateForm>
    </el-dialog>

    <!-- 修改角色权限的对话框 -->
    <el-dialog
      :title="form.roleName +'-权限修改'"
      :visible.sync="changeAuthorityDialogVisible"
      width="30%"
    >
      <el-tree
        ref="tree"
        :data="authorityList"
        show-checkbox
        node-key="nodeId"
        :default-checked-keys="keys"
        :props="defaultProps"
        :default-expand-all="true"
        :check-strictly="true"
      ></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="changeAuthorityDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getAllRoleByPage,
  deleteRoleById,
  editRole
} from "@/api/systemAdmin/getRoleData";
import {
  getRelateAuthByRoleId,
  changeRoleAuthority
} from "@/api/systemAdmin/getRoleAuthorityData";
import newRoleJson from '@/json/Role/newRole';
import editRoleJson from '@/json/Role/editRole';
import selfFindRoleListComponent from "@/components/SystemAdmin/RoleAdmin/selfFindRoleListComponent";
import selfGenerateForm from "@/components/SystemAdmin/Form/selfGenerateForm";
selfFindRoleListComponent;
export default {
  data() {
    return {
      newRoleFormData: {},
      editRoleFormData: {},
      // 控制编辑角色信息的对话框是否可见
      editRoleDialogVisible: false,
      // 控制分配权限的对话框是否可见
      changeAuthorityDialogVisible: false,
      // 控制新增角色的对话框是否可见
      newRoleDialogVisible: false,
      // 角色表单的数据
      form: {},
      findUserInput: "",
      // 角色表格数据
      tableData: [],
      // 当前角色的菜单数据
      authorityList: [],
      defaultProps: {
        children: "children",
        label: "nodeName"
      },
      // 获取所有角色列表的请求数据
      requestAllRoleData: {
        pageNumber: "",
        keyword: "",
        systemIdentify: ""
      },
      // 更新角色权限的请求数据
      requestData: {
        roleId: "",
        authorityList: []
      },
      keys: []
    };
  },
  components: {
    selfFindRoleListComponent,
    selfGenerateForm
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      // 获取所有角色列表
      getAllRoleByPage(this.requestAllRoleData).then(res => {
        this.tableData = res.extend.pageData;
      });
      // 获取新增角色的表单数据
      this.newRoleFormData = newRoleJson;
      // 获取编辑角色信息的表单数据
      this.editRoleFormData = editRoleJson;
    },
    /**
     * @description 点击新增角色的按钮
     */
    newRole() {
      this.newRoleDialogVisible = true;
    },
    /**
     * @description 点击编辑按钮
     * @param
     */
    edit(row) {
      this.editRoleDialogVisible = true;
      this.$nextTick(() => {
        this.$refs.editRoleForm.setParams("roleId", row.roleId);
        this.$refs.editRoleForm.setFormData(row);
      });
    },
    /**
     * @description 点击分配权限按钮
     */
    editAuthority(row) {
      this.requestData.roleId = row.roleId;
      // 设置对话框的标题
      this.form.roleName = row.roleName;
      // 显示对话框
      this.changeAuthorityDialogVisible = true;
      // 获取菜单数据
      var jsonData = {};
      jsonData.roleId = row.roleId;
      getRelateAuthByRoleId(jsonData).then(res => {
        this.authorityList = res.extend.authorityList;
        // 设置选中的id数组
        var keys = [];
        for (var i in this.authorityList) {
          if (this.authorityList[i].checked == true) {
            keys.push(this.authorityList[i].nodeId);
          }
          for (var j in this.authorityList[i].children) {
            if (this.authorityList[i].children[j].checked == true) {
              keys.push(this.authorityList[i].children[j].nodeId);
            }
          }
        }
        this.keys = keys;
      });
    },
    /**
     * @description 提交新增角色的申请
     */
    submitNewRole(arg) {
      var jsonData = {};
      for (var key in arg[0]) {
        jsonData[key] = arg[0][key];
      }
      jsonData.roleId = this.$refs.editRoleForm.getParams("roleId");
      editRole(jsonData).then(res => {
        this.$message({
          type: "success",
          message: "新增成功！"
        });
        this.initData();
        this.newRoleDialogVisible = false;
      });
    },
    /**
     * @description 提交修改角色信息
     */
    submitEditRole(arg) {
      var jsonData = {};
      for (var key in arg[0]) {
        jsonData[key] = arg[0][key];
      }
      editRole(jsonData).then(res => {
        this.$message({
          type: "success",
          message: "新增成功！"
        });
        this.initData();
        this.newRoleDialogVisible = false;
      });
    },
    /**
     * @description 关闭新增角色的对话框
     */
    closeNewRoleDialog() {
      this.newRoleDialogVisible = false;
    },
    /**
     * @description 关闭编辑角色信息的对话框
     */
    closeEditRoleDialog() {
      this.editRoleDialogVisible = false;
    },
    /**
     * @todo
     * @description 当复选框被点击的时候触发的事件
     * @param currentNode 该节点所对应的对象
     * @param isChecked 节点本身是否被选中
     * @param isChildHasChecked 节点的子树中是否有被选中的节点
     */
    clickTree(currentNode, isChecked, isChildHasChecked) {},
    /**
     * @description 提交数据，更新角色权限信息
     */
    submit() {
      // 获取当前用户选择的子节点
      var keys = this.$refs.tree.getCheckedKeys();
      // 清空原来的节点记录
      this.requestData.authorityList.splice(
        0,
        this.requestData.authorityList.length
      );
      for (var i in keys) {
        var jsonData = {};
        jsonData.nodeId = keys[i];
        this.requestData.authorityList.push(jsonData);
      }
      this.$confirm("确定要修改该角色的权限吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        changeRoleAuthority(this.requestData).then(res => {
          // 请求成功后关闭对话框，弹出提示
          this.changeAuthorityDialogVisible = false;
          this.$message({
            message: "修改权限成功",
            type: "success"
          });
          // 重新获取列表，相当于刷新
          this.initData();
        });
      });
    },
    /**
     * @description 翻页，获取分页数据
     */
    handleCurrentChange(val) {
      this.requestAllRoleData.pageNumber = val;
      this.initData();
    },
    /**
     * @description 删除角色
     * @param roleId id
     */
    deleteRole(roleId) {
      this.$confirm("请问确定要删除该角色吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      }).then(() => {
        // 请求删除用户接口
        var jsonData = {};
        jsonData.roleId = roleId;
        deleteRoleById(jsonData).then(res => {
          // 弹出成功提示
          this.$message({
            message: "删除成功",
            type: "success"
          });
          // 刷新数据
          this.initData();
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.table_container {
  padding: 20px;
}
.editUserInfoForm {
  .el-input {
    width: 70%;
  }
  .el-select {
    width: 70%;
  }
}
.findCard {
  margin-bottom: 1em;
}
</style>