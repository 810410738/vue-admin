<template>
  <div>
    <selfFindSystemComponent
      ref="systemComponent"
      @changeSystemId="getRoleList(arguments)"
    ></selfFindSystemComponent>
    <div class="roleDiv">
      <label>选择角色：</label>
      <el-select size="small" v-model="submitData.roleId">
        <el-option
          v-for="item in roleList"
          :key="item.label"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
    <div class="buttonDiv">
      <el-button type="primary" size="small" @click="changeRoleSubmit()">确定分配</el-button>
    </div>
  </div>
</template>

<script>
import { getActiveRoleBySystemId } from "@/api/getCommonData";
import { getUserRoleByCond ,bindUserRole} from "@/api/childSystemAdmin/getUserData";

import selfFindSystemComponent from "@/components/SystemAdmin/selfFindSystemComponent.vue";
export default {
  components: {
    selfFindSystemComponent,
  },
  props: {
    userId: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      submitData: {
        userId: "",
        systemId: "",
        roleId: "",
      },
      roleList: [],
    };
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
     this.submitData.userId = this.userId;
     this.submitData.systemId = "";
     this.submitData.roleId = "";
    },
    /**
     * 选择子系统后触发的事件
     * @param arg[0] 系统id
     */
    getRoleList(arg){
      this.submitData.systemId = arg[0];
      // 根据userId和systemId获取当前该用户所属的角色
      getUserRoleByCond(this.submitData).then(res =>{
        this.submitData.roleId = res.extend.data.roleId;
      });
       // 获取当前系统的所有角色
      getActiveRoleBySystemId(this.submitData).then((res) => {
        this.roleList = res.extend.classList;
      });
      this.submitData.roleId = "";
    },
    /**
     * 分配角色
     */
    changeRoleSubmit(){
      if(this.submitData.systemId == ""){
        this.$message.warning('请选择子系统');
        return ;
      }
      if(this.submitData.roleId == ""){
        this.$message.warning('请选择要修改的角色');
        return ;
      }
      bindUserRole(this.submitData).then(res=>{
        this.$message.success('分配角色成功');
        this.$emit('finishChange');
      })
    }
  },
};
</script>

<style lang="scss" scoped>
div.roleDiv {
  margin-top: 1em;
}
div.buttonDiv {
  margin-top: 1em;
}
</style>
