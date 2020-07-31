<template>
  <!-- 
  角色管理页面
  -->
  <div>
    <h3 class="headTitle">子系统信息</h3>
    <el-card class="primaryCard topCard">
      <!-- 搜索组件 -->
      <selfFindChildSystemComponent @find="find(arguments)"></selfFindChildSystemComponent>
    </el-card>
    <el-card class="primaryCard">
      <el-row>
        <el-button type="warning" size="small" icon="el-icon-plus" @click="newRole">新增</el-button>
      </el-row>
      <!-- 用户表格数据 -->
      <el-table :data="tableData.records" highlight-current-row style="width: 100%" stripe>
        <el-table-column type="index" width="100"></el-table-column>
        <el-table-column property="systemIdentify" label="子系统编码" width="150"></el-table-column>
        <el-table-column property="systemName" label="子系统名称" width="150"></el-table-column>
        <el-table-column property="businessDept" label="所属业务部门" width="150"></el-table-column>
        <el-table-column property="systemUrl" label="子系统URL" width="180"></el-table-column>
        <el-table-column property="remark" label="备注" width="150"></el-table-column>
        <el-table-column property="modifyTime" label="修改时间" width="150"></el-table-column>
        <el-table-column property="systemStatus" label="状态" width="100">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.systemStatus"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-value="1"
              inactive-value="0"
              @change="changeUserStatus($event, scope.$index, scope.row.systemId)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="success" plain size="mini" @click="edit(scope.row)">编辑</el-button>
            <el-button
              v-if="scope.row.systemStatus == '0'"
              type="danger"
              plain
              size="mini"
              @click="deleteRole(scope.row.systemId)"
            >删除</el-button>
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

    <!-- 新增子系统的对话框 -->
    <el-dialog
      title="新增子系统"
      :visible.sync="newDialogVisible"
      width="30%"
      center
      v-if="newDialogVisible"
      :before-close="closeNewDialog"
    >
      <selfGenerateForm
        ref="addForm"
        :formJson="newFormData"
        @submit="submitNewChildSystem(arguments)"
      ></selfGenerateForm>
    </el-dialog>

    <!--编辑子系统信息的对话框 -->
    <el-dialog
      title="编辑子系统信息"
      :visible.sync="editDialogVisible"
      width="30%"
      center
      :before-close="closeEditDialog"
    >
      <selfGenerateForm
        ref="editRoleForm"
        :formJson="editFormData"
        @submit="submitEditRole(arguments)"
      ></selfGenerateForm>
    </el-dialog>
  </div>
</template>

<script>
import {
  edit,
  deleteById,
  getByPage,
  updateSystemStatus,
} from "@/api/systemAdmin/getChildSystemData";

import newChildSystemJson from "@/assets/JSON//ChildSystem/newChildSystem";
import editChildSystemJson from "@/assets/JSON//ChildSystem/editChildSystem";
import selfFindChildSystemComponent from "@/components/SystemAdmin/ChildSystem/selfFindChildSystemComponent";
import selfGenerateForm from "@/components/SystemAdmin/Form/selfGenerateForm";
export default {
  data() {
    return {
      newFormData: {},
      editFormData: {},
      // 控制编辑信息的对话框是否可见
      editDialogVisible: false,
      // 控制新增的对话框是否可见
      newDialogVisible: false,
      // 角色表单的数据
      form: {},
      findUserInput: "",
      // 角色表格数据
      tableData: [],
      // 当前角色的菜单数据
      authorityList: [],
      defaultProps: {
        children: "children",
        label: "nodeName",
      },
      // 获取所有子系统的请求数据
      requestData: {
        pageNumber: "1",
        keyword: "",
        systemStatus: "",
      },
    };
  },
  components: {
    selfFindChildSystemComponent,
    selfGenerateForm,
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      // 获取所有子系统列表
      getByPage(this.requestData).then((res) => {
        this.tableData = res.extend.pageData;
      });
      // 获取新增角色的表单数据
      this.newFormData = newChildSystemJson;
      // 获取编辑角色信息的表单数据
      this.editFormData = editChildSystemJson;
    },
    /**
     * 查找组件触发的查找事件
     */
    find(arg) {
      this.requestData.keyword = arg[0].keyword;
      this.requestData.systemStatus = arg[0].systemStatus;
      this.initData();
    },
    /**
     * @description 改变用户状态
     * @param $event 改变后的用户状态值 （0，1）
     * @param index 用户信息的索引，代表第几个用户
     * @param adminId 用户id
     */
    changeUserStatus($event, index, systemId) {
      this.$confirm("请问确定要修改状态吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(() => {
          // 请求修改用户状态接口
          var jsonData = {};
          jsonData.systemStatus = $event;
          jsonData.systemId = systemId;
          updateSystemStatus(jsonData).then((res) => {
            // 弹出成功提示
            this.$message({
              message: "修改状态成功",
              type: "success",
            });
            // 刷新数据
            this.initData();
          });
        })
        .catch(() => {
          // 恢复状态为未修改之前的
          this.tableData.records[index].systemStatus =
            $event == "1" ? "0" : "1";
        });
    },
    /**
     * @description 点击新增角色的按钮
     */
    newRole() {
      this.newDialogVisible = true;
    },
    /**
     * @description 点击编辑按钮
     * @param
     */
    edit(row) {
      this.editDialogVisible = true;
      this.$nextTick(() => {
        this.$refs.editRoleForm.setParams("systemId", row.systemId);
        this.$refs.editRoleForm.setFormData(row);
      });
    },
    /**
     * @description 提交新增的申请
     */
    submitNewChildSystem(arg) {
      var jsonData = {};
      for (var key in arg[0]) {
        jsonData[key] = arg[0][key];
      }
      edit(jsonData).then((res) => {
        this.$message({
          type: "success",
          message: "新增成功！",
        });
        this.initData();
        this.newDialogVisible = false;
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
      jsonData.systemId = this.$refs.editRoleForm.getParams("systemId");
      edit(jsonData).then((res) => {
        this.$message({
          type: "success",
          message: "修改成功！",
        });
        this.initData();
        this.editDialogVisible = false;
      });
    },
    /**
     * @description 关闭新增角色的对话框
     */
    closeNewDialog() {
      this.newDialogVisible = false;
    },
    /**
     * @description 关闭编辑角色信息的对话框
     */
    closeEditDialog() {
      this.editDialogVisible = false;
    },
    /**
     * @description 翻页，获取分页数据
     */
    handleCurrentChange(val) {
      this.requestData.pageNumber = val;
      this.initData();
    },
    /**
     * @description 删除
     * @param roleId id
     */
    deleteRole(systemId) {
      this.$confirm("请问确定要删除该子系统吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      }).then(() => {
        // 请求删除接口
        var jsonData = {};
        jsonData.systemId = systemId;
        deleteById(jsonData).then((res) => {
          // 弹出成功提示
          this.$message({
            message: "删除成功",
            type: "success",
          });
          // 刷新数据
          this.initData();
        });
      });
    },
  },
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