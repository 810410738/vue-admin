<template>
  <div class="recharge--loading">
    <div class="spinner">
      <div class="rect1"></div>
      <div class="rect2"></div>
      <div class="rect3"></div>
      <div class="rect4"></div>
      <div class="rect5"></div>
    </div>
    <div v-if="text.length > 0" class="loading--text">
      {{ text }}
    </div>
  </div>
</template>

<script>

export default {
  components: {

  },
  props: {
    text: {
      type: String,
      default: '',
    },
  },
  data () {
    return {
    }
  },
  computed: {
  },
  watch: {

  },
  created () {

  },
  mounted () {

  },
  methods: {
  },
}
</script>

<style lang="scss">
.recharge--loading {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba($color: #000000, $alpha: 0.4);
  z-index: 1000;
  .spinner {
  margin: 319px auto 0;
  width: 50px;
  height: 40px;
  text-align: center;
  font-size: 10px;
  }
  .loading--text {
    color: #fff;
    margin: 20px auto;
    text-align: center;
  }

  .spinner > div {
    background-color: #fff;
    height: 100%;
    width: 6px;
    display: inline-block;
    -webkit-animation: sk-stretchdelay 1.2s infinite ease-in-out;
    animation: sk-stretchdelay 1.2s infinite ease-in-out;
  }

  .spinner .rect2 {
    -webkit-animation-delay: -1.1s;
    animation-delay: -1.1s;
  }

  .spinner .rect3 {
    -webkit-animation-delay: -1.0s;
    animation-delay: -1.0s;
  }

  .spinner .rect4 {
    -webkit-animation-delay: -0.9s;
    animation-delay: -0.9s;
  }

  .spinner .rect5 {
    -webkit-animation-delay: -0.8s;
    animation-delay: -0.8s;
  }

  @-webkit-keyframes sk-stretchdelay {
    0%, 40%, 100% { -webkit-transform: scaleY(0.4) }
    20% { -webkit-transform: scaleY(1.0) }
  }

  @keyframes sk-stretchdelay {
    0%, 40%, 100% {
      transform: scaleY(0.4);
      -webkit-transform: scaleY(0.4);
    }  20% {
      transform: scaleY(1.0);
      -webkit-transform: scaleY(1.0);
    }
  }
}
</style>
