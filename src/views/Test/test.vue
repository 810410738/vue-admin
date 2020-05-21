<template>
  <div>{{this.$store.state.Form.formData}}</div>
</template>

<script>
export default {
  created() {
    this.init();
  },
  components: {},
  data() {
    return {};
  },
  methods: {
    init(b) {
      this.$store.commit("Form/increment");
      console.log(this.$store.state.Form.formData);
     
    }
  }
};
</script>