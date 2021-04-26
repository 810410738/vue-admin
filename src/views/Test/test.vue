<template>
  <div></div>
</template>

<script>
export default {
  created() {
    this.init();
    // this.varAndLetTest();
  },
  components: {},
  data() {
    return {
      imgUrl: require("@/assets/img/bgs/bg.jpg"),
    };
  },
  methods: {
    init() {
      var Baby = {};
      Object.defineProperty(Baby, "name", {
        value: "rabbit",
        writable: true,
      });
      console.log(Baby);
      Baby.name = "jerry";
      console.log(Baby);
    },
    varAndLetTest(){
      for(var i =0;i<10000;i++){
        
        setTimeout(function(){
          console.log(i);
        },0);
      }
    }
  },
};
</script>
<style lang="scss" scoped>
img {
  width: 100px;
  height: 100px;
}
</style>
