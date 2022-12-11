<template>
  <view>
    我的页
    <input type="text" v-model="phone">
    <button @click="getCode">获取验证码</button>
    <button @click="phoneLogin">登录</button>
  </view>
</template>

<script>
  import {
    getCode,
    phoneLogin,
    getAllArticleCategory
  } from '@/api/allApi.js'
  import {
    mapState
  } from 'vuex'
  export default {
    data() {
      return {
        // 验证码
        code: null,
        // 手机号
        phone: 15266666666
      };
    },
    methods: {
      // 获取验证码
      async getCode() {
        const result = await getCode( this.phone )
        this.code = result.msg.slice( 4, 8 )
      },
      // 手机登录
      async phoneLogin() {
        this.$store.dispatch( 'user/phoneLogin', {
          phone: this.phone,
          code: this.code
        } )
        uni.showToast( {
          title: '登录成功',
        } );
      }
    },
    async created() {
      await getAllArticleCategory()
    },
  }
</script>

<style lang="scss">

</style>
