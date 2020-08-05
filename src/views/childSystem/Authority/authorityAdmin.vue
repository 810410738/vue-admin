<template>
  <div>
    <h3 class="headTitle">权限管理</h3>
    <!-- 操作组件 -->
    <el-card class="primaryCard topCard">
      <el-row>
        <el-col :span="6">
          <!-- 所有子系统 -->
          <selfFindSystemComponent :isDefaultShowAll="false" ref="findSystem" @changeSystemId="find(arguments)"></selfFindSystemComponent>
        </el-col>
        <el-col :span="6">
          <el-button type="success" size="small" @click="save">保存修改</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="primaryCard">
      <!-- 用户表格数据 -->
      <el-table
        :data="getAuthorityData"
        style="width: 100%"
        row-key="authorityId"
        :key="authorityId"
        :tree-props="{children:'children',hasChildren: 'hasChildren'}"
        default-expand-all
        size="mini"
        :row-class-name="tableRowClassName"
      >
        <el-table-column property="authorityName" label="权限名称">
          <template slot-scope="scope">
            <i :class="scope.row.authorityIcon"></i>
            <span> {{scope.row.authorityName}} </span>
          </template>
        </el-table-column>
        <el-table-column property="authorityUrl" label="请求地址"></el-table-column>
        <el-table-column property="authorityType" label="类型"></el-table-column>
        <el-table-column property="authorityKey" label="权限标识"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="success" plain size="mini" @click="edit(scope.row)">编辑</el-button>
            <el-popover placement="left-start" trigger="hover" class="moreButton">
              <div>
                <el-button
                  size="mini"
                  type="text"
                  icon="el-icon-top"
                  @click="moveNode(scope,'up')"
                >上移</el-button>
                <el-button
                  size="mini"
                  type="text"
                  icon="el-icon-bottom"
                  @click="moveNode(scope,'down')"
                >下移</el-button>
                <el-button
                  size="mini"
                  type="text"
                  icon="el-icon-plus"
                  @click="newNode(scope.row)"
                >新增</el-button>
                <el-button
                  size="mini"
                  type="text"
                  icon="el-icon-minus"
                  @click="deleteOneAuthority(scope.row.authorityId)"
                >删除</el-button>
              </div>
              <el-button slot="reference" size="mini" type="primary" plain>更多操作</el-button>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 编辑的对话框 -->
    <el-dialog
      title="编辑权限"
      :visible.sync="editDialogVisible"
      width="40%"
      :destroy-on-close="true"
      center
    >
      <selfGenerateForm ref="editForm" :formJson="editFormData" @submit="editSubmit(arguments)"></selfGenerateForm>
    </el-dialog>

    <!-- 新增权限的对话框 -->
    <el-dialog
      title="新增权限"
      :visible.sync="addDialogVisible"
      width="40%"
      :destroy-on-close="true"
      center
    >
      <selfGenerateForm ref="addForm" :formJson="addFormData" @submit="addSubmit(arguments)"></selfGenerateForm>
    </el-dialog>
  </div>
</template>

<script>
import {
  getUserList,
  getUserInfo,
  getAllRoleExceptAdmin
} from "@/api/childSystemAdmin/getUserData";
import editAuthorityJson from "@/assets/JSON/Authority/editAuthority";
import {
  getAuthorityTree,
  deleteAuthorityById,
  updateOrderNum,
  editAuthority
} from "@/api/systemAdmin/getAuthorityData";
import { isFirstChild, isLastChild, exchange } from "@/util/HandleTreeData";
import selfFindSystemComponent from "@/components/SystemAdmin/selfFindSystemComponent";
import selfGenerateForm from "@/components/SystemAdmin/Form/selfGenerateForm";
export default {
  components: {
    selfFindSystemComponent,
    selfGenerateForm
  },
  data() {
    return {
      // 控制新增权限的对话框是否显示
      addDialogVisible: false,
      // 控制编辑对话框的显示
      editDialogVisible: false,
      // 请求修改权限信息的参数
      requestEditData: {},
      // 所有角色列表
      roleList: [],
      // 获取的用户数据
      getAuthorityData: [],
      // 请求权限列表数据的参数
      requestData: {
        systemId: ""
      },
      // 标志已经移动过节点元素
      isMoved: false,
      // 新增和编辑权限的表单配置数据
      addFormData: {},
      editFormData: {}
    };
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      this.$nextTick(() => {
        this.requestData.systemId = this.$refs.findSystem.getSystemIdentify();
        getAuthorityTree(this.requestData).then(res => {
          this.getAuthorityData = res.extend.dataList;
        });
      });

      // 获取新增权限的表单数据
      this.addFormData = editAuthorityJson;
      this.editFormData = editAuthorityJson;

    },
    /**
     * 查找组件触发的事件
     * @param arg[0] 系统id
     */
    find(arg){
      this.initData();
    },
    /**
     * @description 新增权限点击提交回调的方法
     * @param arg[0] 包含表单所有元素的值的对象
     */
    addSubmit(arg) {
      var jsonData = {};
      for (var key in arg[0]) {
        jsonData[key] = arg[0][key];
      }
      jsonData.parentId = this.$refs.addForm.getParams("parentId");
      jsonData.systemId = this.$refs.addForm.getParams("systemId");
      editAuthority(jsonData).then(res => {
        this.$message({
          type: "success",
          message: "新增成功"
        });
        this.initData();
        this.addDialogVisible = false;
      });
    },
    /**
     * @description 编辑权限点击提交回调的方法
     * @param arg[0] 包含表单所有元素的值的对象
     */
    editSubmit(arg) {
      var jsonData = {};
      for (var key in arg[0]) {
        jsonData[key] = arg[0][key];
      }
      jsonData.authorityId = this.$refs.editForm.getParams("authorityId");
      jsonData.systemId = this.$refs.editForm.getParams("systemId");
      editAuthority(jsonData).then(res => {
        this.$message({
          type: "success",
          message: "修改成功"
        });
        this.initData();
        this.editDialogVisible = false;
      });
    },
    /**
     * @description 移动表单元素
     * @parma scope 行节点对象
     * @parma type 移动类型（up:上移，down：下移）
     */
    moveNode(scope, type) {
      var currentNode = scope.row;
      var index = scope.$index;
      switch (type) {
        // 上移
        case "up":
          if (isFirstChild(this.getAuthorityData, currentNode, index)) {
            this.$message({
              message: "该节点已经是当前层级第一个节点，无法继续上移",
              type: "error"
            });
            return;
          }
          exchange(this.getAuthorityData, currentNode, type);
          // 操作成功过的标志
          this.isMoved = true;
          break;
        case "down":
          if (isLastChild(this.getAuthorityData, currentNode, index)) {
            this.$message({
              message: "该节点已经是当前层级最后一个节点，无法继续下移",
              type: "error"
            });
            return;
          }
          exchange(this.getAuthorityData, currentNode, type);
          // 操作成功过的标志
          this.isMoved = true;
          break;
      }
    },
    /**
     @description 根据当前行是否为父节点，标志不同的颜色
     @param row 当前行的对象
     @param rowIndex 当前行的索引
     */
    tableRowClassName({ row, rowIndex }) {
      if (row.children) {
        return "table-green-row";
      }
    },
    /**
     * @description 获取查找组件的数据，请求用户数据
     * @param arg[0].keyword
     * @param arg[0].primaryClass
     * @param arg[0].secondaryClass
     */
    find(arg) {
      this.requestData.keyword = arg[0].keyword;
      this.requestData.primaryClass = arg[0].primaryClass;
      this.requestData.secondaryClass = arg[0].secondaryClass;
      this.initData();
    },
    /**
     * @description 点击删除按钮，删除当前的元素
     * @param authorityId 节点id
     */
    deleteOneAuthority(authorityId) {
      this.$confirm("请问确定要删除该节点吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      }).then(() => {
        // 请求删除接口
        var jsonData = {};
        jsonData.authorityId = authorityId;
        deleteAuthorityById(jsonData).then(res => {
          // 弹出成功提示
          this.$message({
            message: "删除成功",
            type: "success"
          });
          // 刷新数据
          this.initData();
        });
      });
    },
    /**
     * @description 点击编辑按钮，打开对话框，设置parentId和systemIdentify
     */
    edit(row) {
      this.editDialogVisible = true;
      this.$nextTick(() => {
        this.$refs.editForm.setFormData(row);
        this.$refs.editForm.setParams("authorityId", row.authorityId);
        this.$refs.editForm.setParams("systemId", row.systemId);
      });
    },
    /**
     * @description 点击新增按钮，打开对话框，设置parentId和systemIdentify
     */
    newNode(row) {
      this.addDialogVisible = true;
      this.$nextTick(() => {
        this.$refs.editForm.setParams("parentId", row.parentId);
        this.$refs.addForm.setParams("systemId", row.systemId);
      });
    },
    /**
     * @description 保存修改
     */
    save() {
      if (!this.isMoved) {
        this.$message({
          type: "warning",
          message: "当前没有改动，无需保存修改"
        });
        return;
      }
      // 向服务器发送保存请求
      var jsonData = {};
      jsonData.authorityTree = this.getAuthorityData;
      updateOrderNum(jsonData).then(res => {
        this.$message({
          type: "success",
          message: "保存修改成功"
        });
        this.isMoved = false;
        this.initData();
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

.icon {
  font-size: 2em;
  text-align: center;
  margin: 0 1em;
}
.moreButton {
  margin-left: 1em;
}
// 控制动画
.v-enter,
.v-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.v-leave-active {
  position: absolute;
}
</style>
