<template>
  <div>
    <div class="wrap">
      <a href="#" class="btn-11">test</a>
    </div>
  </div>
</template>

<script>
import iconBase from "@/components/icons/iconBase"
import iconImage from "@/components/icons/iconImage"
export default {
  created() {
    this.init();
  },
  components: {
    iconBase,
    iconImage
  },
  data() {
    return {
     
    };
  },
  methods: {
    init() {
     
      }
    
  }
}; 
</script>
<style lang="scss" scoped>

$btn-width: 250px !default;
$btn-height: 80px !default;
$btn-full: $btn-height+$btn-width !default;
$btn-half: $btn-full/2 !default;
$bg-color: #eeeeee !default;
$btn-color:#65016b;

*:before,
*:after {
  z-index: -1;
}


a {
  text-decoration: none;
  line-height: $btn-height;
  color: black;
}


@media (min-width: 600px) {
  .wrap {
    width: 50%;
    float: left;
  }
}

[class^="btn-"] {
  position: relative;
  display: block;
  overflow: hidden;
  // @include size(100%, $btn-height);
  max-width: $btn-width;
  margin: 1rem auto;
  text-transform: uppercase;
  border: 1px solid currentColor;
}

@keyframes criss-cross-left {
  0% {
    left: -20px;
  }
  50% {
    left: 50%;
    // @include size(20px);
  }
  100% {
    left: 50%;
    // @include size($btn-width*1.5);
  }
}

@keyframes criss-cross-right {
  0% {
    right: -20px;
  }
  50% {
    right: 50%;
    // @include size(20px);
  }
  100% {
    right: 50%;
    // @include size($btn-width*1.5);
  }
}

.btn-11 {
  position: relative;
  color: #7c2781;
  &:before,
  &:after {
    // @include absolute(50%);
    content: '';
    // @include size(20px);
    background-color: $btn-color;
    border-radius: 50%;
  }
  
  &:before {
    left: -20px;
    transform: translate(-50%, -50%);
    // animation: criss-cross-left 0.8s reverse;
  }
  
  &:after {
    right: -20px;
    transform: translate(50%, -50%);
    // animation: criss-cross-right 0.8s reverse;
  }
  
  &:hover {
    color: tint($btn-color, 75%);

    &:before,
    &:after {
      // @include size($btn-width);
    }
    
    &:before {
      animation: criss-cross-left 0.8s both;
      animation-direction: alternate;
    }
    
    &:after {
      animation: criss-cross-right 0.8s both;
      animation-direction: alternate;
    }
  }
}
</style>
