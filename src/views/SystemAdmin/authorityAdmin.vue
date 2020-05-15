<template>
  <div class="table_container">
    <h3 class="headTitle">权限管理</h3>
    <!-- 操作组件 -->
    <el-row>
      <!-- 查找操作组件 -->
      <el-col :span="14">
        <!-- 查找操作组件 -->
        <findComponent @find="find(arguments)"></findComponent>
      </el-col>
    </el-row>
    <!-- 用户表格数据 -->
    <el-table
      :data="getAuthorityData"
      style="width: 100%"
      row-key="nodeId"
      :key="nodeId"
      :tree-props="{children:'children',hasChildren: 'hasChildren'}"
      default-expand-all
      size="mini"
      :row-class-name="tableRowClassName"
    >
      <el-table-column property="nodeName" label="权限名称"></el-table-column>
      <el-table-column property="nodeUrl" label="请求地址"></el-table-column>
      <el-table-column property label="类型"></el-table-column>
      <el-table-column property label="权限标识"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="success" plain size="mini" @click="edit(scope.row)">编辑</el-button>
          <el-popover placement="left-start" trigger="hover" class="moreButton">
            <div>
              <el-button size="mini" type="text" icon="el-icon-top" @click="moveNode(scope,'up')">上移</el-button>
              <el-button
                size="mini"
                type="text"
                icon="el-icon-bottom"
                @click="moveNode(scope,'down')"
              >下移</el-button>
              <el-button size="mini" type="text" icon="el-icon-plus" @click="newNode">新增</el-button>
              <el-button
                size="mini"
                type="text"
                icon="el-icon-minus"
                @click="deleteOneAuthority(scope.row.nodeId)"
              >删除</el-button>
            </div>
            <el-button slot="reference" size="mini" type="primary" plain>更多操作</el-button>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <!-- 编辑的对话框 -->
    <el-dialog title="修改权限信息" :visible.sync="dialogVisible" width="30%">
      <el-form
        :label-position="right"
        :label-width="100"
        :model="requestEditData"
        :size="small"
        ref="form"
      >
        <el-form-item label="权限名称" prop="nodeName">
          <el-input v-model="requestEditData.nodeName"></el-input>
        </el-form-item>
        <el-form-item label="请求地址" prop="nodeUrl">
          <el-input v-model="requestEditData.nodeUrl"></el-input>
        </el-form-item>
        <!-- <el-form-item label="权限标识" prop="">
          <el-input v-model="requestEditData.nodeName"></el-input>
        </el-form-item>-->
        <el-form-item label="显示图标" prop="icon">
          <el-select v-model="requestEditData.icon">
            <el-option
              :label="item.label"
              :value="item.value"
              v-for="item in iconOption"
              :key="item"
            >
              <i :class="item.value" class="icon"></i>
            </el-option>
          </el-select>
          <i :class="requestEditData.icon" class="icon"></i>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getUserList,
  getUserInfo,
  getAllRoleExceptAdmin
} from "@/api/getUserData";
import { getAuthorityList, deleteAuthority } from "@/api/getSystemAdminData";
import { isFirstChild, isLastChild, exchange } from "@/util/HandleTreeData";
import findComponent from "@/components/index/findComponent";
export default {
  components: {
    findComponent
  },
  data() {
    return {
      iconOption: [],
      // 控制编辑对话框的显示
      dialogVisible: false,
      // 请求修改权限信息的参数
      requestEditData: {},
      // 所有角色列表
      roleList: [],
      // 获取的用户数据
      getAuthorityData: [],
      // 请求权限列表数据的参数
      requestData: {}
    };
  },
  created() {
    this.initData();
    this.getIconOption();
  },
  methods: {
    initData() {
      getAuthorityList(this.requestData).then(res => {
        this.getAuthorityData = res.extend.authorityList;
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
     * @description 点击编辑按钮，弹出对话框
     */
    edit(row) {
      this.requestEditData = JSON.parse(JSON.stringify(row));
      this.dialogVisible = true;
    },
    /**
     * @description 点击删除按钮，删除当前的元素
     * @param nodeId 节点id
     */
    deleteOneAuthority(nodeId) {
      this.$confirm("请问确定要删除该节点吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      }).then(() => {
        // 请求删除接口
        var jsonData = {};
        jsonData.nodeId = nodeId;
        deleteAuthority(jsonData).then(res => {
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
     * @description 获取图标的下拉数据
     */
    getIconOption() {
      for (var i = 0; i < 100; i++) {
        this.iconOption.push({
          label: "el-icon-platform-eleme",
          value: "el-icon-platform-eleme"
        });
      }
    },
    /**
     * @description 新增一个节点
     */
    newNode(){

    },
    /**
     * @description 保存修改
     */
    save() {}
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
