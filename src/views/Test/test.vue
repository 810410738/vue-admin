<template>
  <div>
    <!-- <div class="outer">
      <div class="inner"></div>
    </div>-->
  <div> 
     <div class="flexDiv">
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
   <div >
     <div class="circle">
       
     </div>
   </div>
  </div>
</template>

<script>
import iconBase from "@/components/icons/iconBase";
import iconImage from "@/components/icons/iconImage";
export default {
  created() {
    // this.init();
    this.test();
  },
  components: {
    iconBase,
    iconImage,
  },
  data() {
    return {
      Baby: {},
    };
  },
  methods: {
    init() {
      var value = "rabbit";
      Object.defineProperty(this.Baby, "name", {
        get: function () {
          return "<" + value + ">";
        },
        set: function (x) {
          value = x;
        },
      });

      console.log(this.Baby.name);
      this.Baby.name = "123";
      console.log(this.Baby.name);
      console.log(typeof this.Baby.name);
    },
    test() {},
  },
};
</script>
<style lang="scss" scoped>
div.outer {
  width: 100px;
  height: 100px;
  border: 1px solid green;
  div.inner {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 50px;
    height: 50px;
    border: 1px solid red;
  }
}

div.flexDiv{
  display:flex;
  display: -webkit-flex;
  display: -ms-flex;
  width: 300px;
  height: 100px;
  div{
    flex:1;
    border: 1px solid black;
  }
}
div.circle{
  background-color: #d6d6ff;
  border-radius: 50%;
  width: 50px;
  height: 50px;
}
</style>
