<template>
  <!-- 我的页 -->
  <view class="my-container">
    <!-- 登录区 -->
    <view class="login-area" v-if="!$store.state.user.userInfo.id">
      <button @click="goLoginPage">登录，体验更多功能</button>
    </view>
    <!-- 用户信息区 -->
    <view class="userinfo-area" v-if="$store.state.user.userInfo.id">
      <!-- 用户头像 -->
      <image class="user-img" mode="aspectFill" :src="$store.state.user.userInfo.userpic"></image>
      <!-- 用户信息 -->
      <view class="userinfo">
        <view class="username">当前登录账号：{{$store.state.user.userInfo.username}}</view>
      </view>
    </view>
    <!-- 退出登录按钮 -->
    <button class="upLogin" v-if="$store.state.user.userInfo.id" @click="upLogin">退出登录</button>
  </view>
</template>

<script>
  import {
    getCode,
    phoneLogin,
  } from '@/api/allApi.js'
  import {
    mapState
  } from 'vuex'
  export default {
    data() {
      return {};
    },
    methods: {
      // 前往登录页
      goLoginPage() {
        uni.navigateTo( {
          url: '/pages/login/login'
        } )
      },
      // 退出登录
      upLogin() {
        this.$store.commit( 'user/setUserInfo', {} )
      }
    },
    async created() {},
    onNavigationBarButtonTap() {
      uni.navigateTo( {
        url: '/pages/user-set/user-set'
      } )
    }
  }
</script>

<style lang="scss">
  .my-container {
    .login-area {
      height: 200rpx;
      display: flex;
      justify-content: center;
      align-items: center;

      .login {
        margin-right: 10rpx;
        font-size: 30rpx;
      }

      .icon-forward {}
    }

    .userinfo-area {
      .user-img {}

      .userinfo {
        .username {}

        .article {}
      }
    }

    .upLogin {
      height: 92rpx;
    }
  }
</style>
