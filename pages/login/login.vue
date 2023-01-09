<template>
  <!-- 登录页 -->
  <view class="login-container">
    <!-- 顶部 -->
    <view class="header">
      <!-- 关闭按钮 -->
      <view class="btn-closeempty">
        <uni-icons class="icon-closeempty" type="closeempty" size="30"></uni-icons>
      </view>
    </view>
    <!-- 手机号登录区 -->
    <view class="phone-login-area">
      <!-- 标题 -->
      <h1 class="title">手机号登录</h1>
      <!-- 手机号 -->
      <input class="phone" type="text" placeholder="手机号" v-model="phone">
      <view class="password-box">
        <!-- 验证码 -->
        <input class="password" type="text" placeholder="请输入验证码" v-model="code">
        <!-- 获取验证码 -->
        <view class="code" @click="clickCodeBtn">获取验证码</view>
      </view>
    </view>
    <!-- 登录按钮 -->
    <button class="login-btn" @click="phoneLogin">登录</button>
  </view>
</template>

<script>
  import {
    getCode,
  } from '@/api/allApi.js'
  export default {
    data() {
      return {
        // 手机号
        phone: '15288888888',
        // 验证码
        code: ''
      };
    },
    methods: {
      // 点击验证码按钮
      clickCodeBtn() {
        // 手机号验证是否通过
        const iphoneCheckingAdopt = this.phoneChecking
        if ( iphoneCheckingAdopt ) {
          this.getCode()
        }
      },
      // 获取验证码
      async getCode() {
        const result = await getCode( this.phone )
        const code = result.msg.slice( 4, 8 )
        this.code = code
      },
      // 手机号验证
      phoneChecking() {
        // 手机号正则
        const phoneRegular =
          /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/
        // 判断是否不符合手机号正则
        if ( !phoneRegular.test( this.phone ) ) {
          uni.showToast( {
            title: '请输入正确的手机号',
            icon: 'none'
          } );
          return false
        }
        return true
      },
      // 手机号登录
      async phoneLogin() {
        this.$store.dispatch( 'user/phoneLogin', {
          phone: this.phone,
          code: this.code
        } )
      }
    }
  }
</script>

<style lang="scss">
  .login-container {
    .header {
      height: 80rpx;

      .btn-closeempty {
        width: 100rpx;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        .icon-closeempty {}
      }
    }

    .username-login-area {
      .title {
        height: 200rpx;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      input {
        height: 90rpx;
        margin: 0 20rpx;
        border-bottom: 2rpx solid #E0E2E6;
      }

      .username {}
    }

    .phone-login-area {
      .title {
        height: 200rpx;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      input {
        height: 90rpx;
        border-bottom: 2rpx solid #E0E2E6;
      }

      .phone {
        margin: 0 20rpx;
      }

      .code {}

      .password-box {
        display: flex;
        margin: 0 20rpx;

        .password {
          width: 100%;
        }

        .code {
          width: 300rpx;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #fff;
          background: #FF4A6A;
        }
      }
    }

    .login-btn {
      margin-top: 60rpx;
    }

    .login-mode {}
  }
</style>
