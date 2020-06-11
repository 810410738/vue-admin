<template>
  <div>
    <h3 class="headTitle">新增问卷</h3>
    <!-- 操作组件 -->
    <el-row>
      <el-col :span="6" :offset="1">
        <el-button type="warning" size="small">下载导入模板</el-button>
        <!--limit:最大上传数，on-exceed：超过最大上传数量时的操作  -->
        <el-upload
          class="upload-demo"
          action
          :on-change="handleChange"    
          accept="application/vnd.openxmlformats-    
        officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          :auto-upload="false"
        >
          <el-button type="success" size="small">上传模板</el-button>
        </el-upload>
      </el-col>
      <el-col :span="4" :offset="10">
        <el-button type="primary" size="small" @click="addQuestion">添加题目</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="18" :offset="1">
        <el-form ref="questionData" :model="questionData" label-width="80px" class="questionData">
          <el-form-item label="问卷名称">
            <el-input
              v-model="questionData.questionnaireName"
              placeholder="请输入问卷的标题"
              maxlength="50"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item label="标题内容">
            <el-input
              type="textarea"
              v-model="questionData.questionnaireName"
              :rows="2"
              maxlength="100"
              show-word-limit
            ></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <!-- 用户表格数据 -->
    <div class="table_container">
      <el-table
        size="medium"
        :data="questionData.questionList"
        highlight-current-row
        empty-text="暂无数据，请添加题目"
        style="width: 100%"
        stripe
      >
        <el-table-column type="index" :index="changeIndex" label="序号" width="100"></el-table-column>
        <el-table-column label="考评项目" width="200">
          <template slot-scope="scope">
            <el-input v-model="scope.row.questionTitle"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="考评要点" width="500">
          <template slot-scope="scope">
            <el-input type="textarea" v-model="scope.row.questionContent"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="danger" @click="deleteQuestion(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 提交 -->
    <el-button type="info" @click="turnBack">返回上一级</el-button>
    <el-button type="success" @click="submit">提交</el-button>
  </div>
</template>

<script>
import { addQuestionnaire } from "@/api/getQuestionData";
export default {
  data() {
    return {
      // 副标题，注意事项
      subTitle: "",
      // 问卷数据
      questionData: {
        questionnaireName: "",
        questionnaireTitle: "",
        questionList: []
      },
      currentRow: null,
      offset: 0,
      limit: 20,
      count: 0,
      currentPage: 1,
      // 上传的文件
      fileTemp: {}
    };
  },
  components: {},
  created() {},
  methods: {
    //上传文件时处理方法
    handleChange(file, fileList) {
      this.fileTemp = file.raw;
      if (this.fileTemp) {
        if (
          this.fileTemp.type ==
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
          this.fileTemp.type == "application/vnd.ms-excel"
        ) {
          // 解析excel数据
          this.importfxx(this.fileTemp);
          this.$message.success("上传成功！");
        } else {
          this.$message({
            type: "warning",
            message: "附件格式错误，请删除后重新上传！"
          });
        }
      } else {
        this.$message({
          type: "warning",
          message: "请上传附件！"
        });
      }
    },
    importfxx(obj) {
      var _this = this;
      var inputDOM = this.$refs.inputer;
      // 通过DOM取文件数据

      this.file = event.currentTarget.files[0];

      var rABS = false; //是否将文件读取为二进制字符串
      var f = this.file;

      var reader = new FileReader();
      //if (!FileReader.prototype.readAsBinaryString) {
      FileReader.prototype.readAsBinaryString = function(f) {
        var binary = "";
        var rABS = false; //是否将文件读取为二进制字符串
        var pt = this;
        var wb; //读取完成的数据
        var outdata;
        var reader = new FileReader();
        reader.onload = function(e) {
          var bytes = new Uint8Array(reader.result);
          var length = bytes.byteLength;
          for (var i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i]);
          }
          //此处引入，用于解析excel
          var XLSX = require("xlsx");
          if (rABS) {
            wb = XLSX.read(btoa(fixdata(binary)), {
              //手动转化
              type: "base64"
            });
          } else {
            wb = XLSX.read(binary, {
              type: "binary"
            });
          }
          outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
          console.log(wb.Sheets[wb.SheetNames[0]]);
          //outdata就是读取的数据（不包含标题行即表头，表头会作为对象的下标）
          _this.showExcelData(outdata);
        };
        reader.readAsArrayBuffer(f);
      };
      if (rABS) {
        reader.readAsArrayBuffer(f);
      } else {
        reader.readAsBinaryString(f);
      }
    },
    /**
     * 展示excel解析出来的数据
     * @param data
     */
    showExcelData(data){
      this.questionData.questionList = [];
      for(var i in data){
        var jsonData = {};
        jsonData.questionTitle =  data[i]['考评项目'];
        jsonData.questionContent =  data[i]['考评要点'];
        this.questionData.questionList.push(jsonData);
      }

    },
    handleCurrentChange(val) {},
    /**
     * @description 返回上一级
     */
    turnBack() {
      this.$router.go(-1);
    },
    /**
     * @description 删除一条问题
     */
    deleteQuestion(row) {
      this.questionData.questionList.splice(row.index - 1, 1);
    },
    /**
     * @description 增加一条问题
     */
    addQuestion() {
      this.questionData.questionList.push({
        questionTitle: "",
        questionContent: "",
        questionNum: ""
      });
    },
    /**
     * @description 修改序号
     */
    changeIndex(index) {
      this.questionData.questionList[index].questionNum = index + 1;
      return index + 1;
    },
    /**
     * @description 提交问卷
     */
    submit() {
      // 验证数据
      var showTips = "";
      if (this.questionData.questionList.length == 0) {
        showTips = "请添加问题";
      } else {
        for (var i in this.questionData.questionList) {
          if (this.questionData.questionList[i].questionTitle == "") {
            showTips = "考评项目不可以为空";
            break;
          }
          if (this.questionData.questionList[i].questionContent == "") {
            showTips = "考评要点不可以为空";
            break;
          }
        }
      }
      if (
        this.questionData.questionnaireName == null ||
        this.questionData.questionnaireName == ""
      ) {
        showTips = "请输入问卷标题";
      }
      if (
        this.questionData.questionnaireName != null &&
        this.questionData.questionnaireName.length > 50
      ) {
        showTips = "问卷标题过长，请重新输入";
      }
      if (showTips != "") {
        this.$alert(showTips, "提示", {
          type: "warning",
          center: true
        });
        return;
      }
      this.$confirm("确定要提交吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        // 验证通过后提交到服务器
        addQuestionnaire(this.questionData).then(res => {
          this.$alert("新增问卷成功", "提示", {
            center: true,
            callback: action => {
              this.$router.push({
                path: "/index/adminQuestion"
              });
            }
          });
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
h3 {
  color: #696d73;
  margin-left: 20px;
}
.table_container {
  padding: 0 0 10px 20px;
}

// 新建问卷的表单
.questionData {
  margin: 10px;
}
</style>
