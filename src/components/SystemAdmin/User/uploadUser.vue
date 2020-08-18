<template>
  <el-upload
    class="upload-demo"
    action="string"
    name="wenjian"
    :show-file-list="true"
    :limit="1"
    :before-upload="beforeUploadUser"
    :http-request="uploadUser"
  >
    <el-button class="button-middle" type="warning" size="small" icon="el-icon-upload2">导入</el-button>
    <!-- <div slot="tip" class="el-upload__tip">只能上传xls或xlsx文件，且不超过5M</div> -->
  </el-upload>
</template>

<script>
import { importUser } from "@/api/childSystemAdmin/getUserData";
export default {
  components: {},
  props: {},
  data() {
    return {};
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {},
    /**
     * 上传文件到服务器之前触发的事件；检查文件大小和类型是否符合要求
     * @param file 上传的文件
     */
    beforeUploadUser(file){
      var isExcel = false;
      if(file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.type === 'application/vnd.ms-excel' ){
        isExcel = true;
      }
      var isOutSize = file.size / 1024/1024 > 5;
      if(!isExcel){
        this.$message.warning('只能上传excel文件');
      }
      if(isOutSize){
        this.$message.warning('上传文件的大小需小于5M');
      }
      return isExcel && !isOutSize;
    },
    /**
     * 上传文件到服务器
     */
    uploadUser(param){
      var formData = new FormData();
      formData.append('file', param.file);
      importUser(formData).then(res=>{
        this.$message.success('上传成功');
        this.$emit('uploadSuccess');
      })
      .catch(res=>{
        this.$message.error("上传失败");
      })
    }
  },
};
</script>

<style lang="scss" scoped>
</style>
