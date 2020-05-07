<template>
  <div id="test">
    <div>
      this is a nice test from Mr.jerry, don't I look pretty?
    </div>
    
  </div>
</template>


<script>
import {testProxy} from '@/api/getCommonData'
export default {
  components: {},
  data() {
    return {
      data:''
    };
  },
  created() {
    testProxy().then(res=>{     
      console.log(res);
      this.data = res;
    })
  },
  methods: {}
};
</script>


<style lang="scss" scoped>
div#test {
  margin:auto;
  background: url("../../assets/img/gallery1.jpg");
  width: 14em;
  height:14em;
  div{
   margin:auto;
   background:hsla(0, 0%, 100%, .3);
   width: 10em;
   height:10em;
  }
}
</style>
