<template>
  <div>
    <!-- <div class="outer">
      <div class="inner"></div>
    </div>-->
    <!-- <div> 
     <div class="flexDiv">
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
   <div >
     <div class="circle">
       
     </div>
   </div> -->
  </div>
</template>

<script>
import iconBase from "@/components/icons/iconBase";
import iconImage from "@/components/icons/iconImage";

import { buildRandomArray, sortInsert, sortShell,sortSelect,sortBubble,sortQuick,sortMerge } from "@/util/Sort.js";

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
    test() {
      var n = 50000;
      console.log("数组长度为：" + n);
      //实验次数
      var times = 5;
      for (var i = 0; i < times; i++) {
        var data = buildRandomArray(n);
        // var data = [2,6,1,5,10,4];
        //冒泡排序
        // console.log("before 冒泡排序",data);
        // console.time("冒泡排序");
        // sortBubble(data.concat());
        // console.timeEnd("冒泡排序");
        // console.log("before 冒泡排序",data);
        
        // 选择排序
        // console.log("before 选择排序",data);
        // console.time("选择排序");
        // sortSelect(data.concat());
        // console.timeEnd("选择排序");
        // console.log("before 选择排序",data);


        //直接插入排序
        // console.log("before 直接插入",data);
        // console.time("直接插入排序");
        // sortInsert(data.concat());
        // console.timeEnd("直接插入排序");
        // console.log("after 直接插入",data);

        //希尔排序
        // console.log("before 希尔排序",data);
        console.time("希尔排序");
        sortShell(data.concat());
        console.timeEnd("希尔排序");
        // console.log("after 希尔排序",data);


        //快速排序
        // console.log("before 快速排序",data);
        console.time("快速排序");
        sortQuick(data.concat());
        console.timeEnd("快速排序");
        // console.log("after 快速排序",data);

         //随机选择枢纽数快速排序
        // console.log("before 快速排序",data);
        console.time("随机选择枢纽数快速排序");
        sortQuick(data.concat(),'asc',1);
        console.timeEnd("随机选择枢纽数快速排序");
        // console.log("after 快速排序",data);

         //归并排序
        // console.log("before 归并排序",data);
        console.time("归并排序");
        sortMerge(data.concat());
        console.timeEnd("归并排序");
        // console.log("after 归并排序",data);
        
        

        console.log("------------");
      }
    },
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

div.flexDiv {
  display: flex;
  display: -webkit-flex;
  display: -ms-flex;
  width: 300px;
  height: 100px;
  div {
    flex: 1;
    border: 1px solid black;
  }
}
div.circle {
  background-color: #d6d6ff;
  border-radius: 50%;
  width: 50px;
  height: 50px;
}
</style>
