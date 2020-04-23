<template>
  <div class="table_container">
    <h3 class="headTitle">角色权限分配</h3>
    <!-- 用户表格数据 -->
    <el-table :data="tableData" highlight-current-row style="width: 100%" stripe>
      <el-table-column type="index" width="100"></el-table-column>
      <el-table-column property="roleName" label="角色名称" width="150"></el-table-column>
      <el-table-column property="roleDescr" label="描述" width="400"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" plain size="mini" @click="handleEdit(scope.row)">修改权限</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 修改角色权限的对话框 -->
    <el-dialog title="修改角色权限" :visible.sync="dialogVisible" width="30%">
      <el-form :model="form" class="editUserInfoForm">
        <el-form-item label="角色">
          <el-input v-model="form.roleName" autocomplete="off" disabled size="small"></el-input>
        </el-form-item>
      </el-form>
      <el-tree
        ref="tree"
        :data="authorityList"
        show-checkbox
        node-key="nodeId"
        :default-checked-keys="keys"
        :props="defaultProps"
        :default-expand-all="true"
        @check="clickTree"
      ></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getRoleList,
  getChangeAuthorityList,
  updateRoleAuthority
} from "@/api/getSystemAdminData";
export default {
  data() {
    return {
      // 控制对话框是否可见
      dialogVisible: false,
      // 角色表单的数据
      form: {},
      findUserInput: "",
      tableData: [],
      // 当前角色的菜单数据
      authorityList: [],
      defaultProps: {
        children: "children",
        label: "nodeName"
      },
      // 更新角色权限的请求数据
      requestData: {
        roleId: "",
        authorityList: []
      },
      keys: []
    };
  },
  components: {},
  created() {
    this.initData();
  },
  methods: {
    initData() {
      getRoleList({}).then(res => {
        this.tableData = res.extend.roleList;
      });
    },
    /**
     * @description 点击修改权限按钮
     */
    handleEdit(row) {
      this.requestData.roleId = row.roleId;
      // 设置对话框的标题
      this.form.roleName = row.roleName;
      // 显示对话框
      this.dialogVisible = true;
      // 获取菜单数据
      var jsonData = {};
      jsonData.roleId = row.roleId;
      getChangeAuthorityList(jsonData).then(res => {
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
     * @description 当复选框被点击的时候触发的事件
     */
    clickTree(currentData, checkData) {
      // currentData.
    },
    /**
     * @description 提交数据，更新角色权限信息
     */
    submit() {
      // 获取当前用户选择的子节点
      var keys = this.$refs.tree.getCheckedKeys(true);
      // 清空原来的节点记录
      this.requestData.authorityList.splice(0, this.requestData.authorityList.length );
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
        updateRoleAuthority(this.requestData).then(res => {
          // 请求成功后关闭对话框，弹出提示
          this.dialogVisible = false;
          this.$message({
            message: "修改权限成功",
            type: "success"
          });
          // 重新获取列表，相当于刷新
          this.initData();
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
h3 {
  font-style: normal;
  font-weight: normal;
  color: #696d73;
  margin-left: 20px;
}
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
</style>
