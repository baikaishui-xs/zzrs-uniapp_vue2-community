<template>
  <view>
    <!-- animation 类名请到官网上点击复制按钮进行获取 -->
    <h1 class="animate__animated animate__fadeInUp">An animated element</h1>
    <button @click="show">显示</button>
  </view>
</template>
<script>
  export default {
    data() {
      return {
        isShow: false
      }
    },
    methods: {
      show() {
        console.log( 1 )
        this.isShow = true
      }
    }
  }
</script>
<style lang="scss">
  .animate__flipInY {
    animation-direction: reverse
  }
</style>
