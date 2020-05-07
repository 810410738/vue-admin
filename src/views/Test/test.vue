<template>
  <div>
    <fm-generate-form :data="jsonData" :remote-option="dynamicData" ref="generateForm"></fm-generate-form>
    <el-button type="primary" @click="handleSubmit">Submit</el-button>
    <el-button @click="handleLoadOption">Load Option</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      jsonData: {
        list: [
          {
            type: "radio",
            icon: "icon-radio-active",
            options: {
              inline: false,
              defaultValue: "",
              showLabel: false,
              options: [
                { value: "Option 1", label: "Option 1" },
                { value: "Option 2", label: "Option 2" },
                { value: "Option 3", label: "Option 3" }
              ],
              required: false,
              width: "",
              remote: true,
              remoteType: "option",
              remoteOption: "option",
              remoteOptions: [],
              props: { value: "value", label: "label" },
              remoteFunc: "func_1575969479252",
              customClass: "",
              labelWidth: 100,
              isLabelWidth: false,
              hidden: false,
              dataBind: true,
              disabled: false
            },
            name: "单选框组",
            key: "1575969479252",
            model: "option",
            rules: []
          }
        ],
        config: {
          labelWidth: 100,
          labelPosition: "right",
          size: "small",
          customClass: ""
        }
      },
      dynamicData: {
        option: [] // 单选框组 option data
      }
    };
  },
  methods: {
    handleSubmit() {
      this.$refs.generateForm
        .getData()
        .then(data => {
          alert(JSON.stringify(data));
        })
        .catch(e => {});
    },

    handleLoadOption() {
      // 模拟数据请求
      setTimeout(() => {
        this.dynamicData.option = [
          { value: "1111", label: "1111" },
          { value: "2222", label: "2222" },
          { value: "3333", label: "3333" }
        ];
      }, 500);
    }
  }
};
</script>