<template>
  <div>
    <el-input v-model="testObject.testString"></el-input>
    <el-button @click="add">添加</el-button>
  </div>
</template>

<script>
import { getAllPrimaryClass, getAllSecoByPrim } from "@/api/getCommonData";
export default {
  watch: {
    testObject:{
      deep:true,
      immediate:true,
      handler(newVal, oldVal){
        this.$message({
          type:'success',
          message:newVal.testString
        });
      }
    }
  },
  data() {
    return {
     testObject:{
       testString:'',
       Item:[
         {
           options:[]
         }
       ]
     }
    };
  },
  methods: {
    add(){
      var josnData = {
          label:'1',
        value:'1'
      }
      this.testObject.Item[0].options.push(josnData);
    }
  }
};
</script>