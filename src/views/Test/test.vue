<template>
  <div>
    <fm-generate-form
      :data="jsonData"
      :remote="remoteFuncs"
      :value="editData"
      :remote-option="dynamicData"
      ref="generateForm"
    ></fm-generate-form>
    <el-button type="primary" @click="handleSubmit">Submit</el-button>
  </div>
</template>

<script>
import { getAllPrimaryClass, getAllSecoByPrim } from "@/api/getCommonData";
export default {
  data() {
    return {
      jsonData: {
        list: [
          {
            type: "select",
            icon: "icon-select",
            options: {
              defaultValue: "",
              multiple: false,
              disabled: false,
              clearable: false,
              placeholder: "",
              required: false,
              requiredMessage: "",
              showLabel: false,
              width: "",
              options: [],
              remote: true,
              remoteType: "func",
              filterable: false,
              remoteOptions: [],
              props: { value: "value", label: "label" },
              remoteFunc: "getPrimaryClass",
              customClass: "",
              labelWidth: 100,
              isLabelWidth: false,
              hidden: false,
              dataBind: true
            },
            name: "一级机构",
            key: "1588900094391",
            model: "primaryClass",
            rules: []
          }
        ],
        config: {
          labelWidth: 100,
          labelPosition: "right",
          size: "small",
          customClass: "",
          ui: "element",
          layout: "horizontal",
          labelCol: 3,
          width: "100%"
        }
      },
      editData: {},
      remoteFuncs: {
        getPrimaryClass(resolve) {
          getAllPrimaryClass({}).then(res => {
            var primaryOption = [];
            var resultList = res.extend.classList;
            for (var i in resultList) {
              primaryOption.push({
                label: resultList[i],
                value: resultList[i]
              });
            }
            resolve(primaryOption);
          });
        }
      },
      dynamicData: {}
    };
  },
  methods: {
    handleSubmit() {
      this.$refs.generateForm
        .getData()
        .then(data => {
          // Data verification succeeded
          alert(JSON.stringify(data));
        })
        .catch(e => {
          // Data verification failed
        });
    }
  }
};
</script>