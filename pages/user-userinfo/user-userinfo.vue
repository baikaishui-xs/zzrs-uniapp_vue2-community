<template>
  <!-- 编辑资料页 -->
  <view class="user-userinfo-container">
    <!-- 头像 -->
    <uni-list-item class="userpic-box">
      <template v-slot:body>
        <view class="user-userinfo-box">
          <text class="title">头像</text>
          <image class="filled userpic" :src="$store.state.user.userInfo.userpic" mode="aspectFill"></image>
          <uni-icons class="icon-edit" type="compose" size="22"></uni-icons>
        </view>
      </template>
    </uni-list-item>
    <!-- 昵称 -->
    <uni-list-item class="username-box">
      <template v-slot:body>
        <view class="user-userinfo-box">
          <text class="title">昵称</text>
          <input type="text" class="filled username" value="15266666666" />
          <uni-icons class="icon-edit" type="compose" size="22"></uni-icons>
        </view>
      </template>
    </uni-list-item>
    <!-- 性别 -->
    <uni-list-item class="gender-box">
      <template v-slot:body>
        <view class="user-userinfo-box">
          <text class="title">性别</text>
          <text class="filled">男</text>
          <uni-icons class="icon-edit" type="compose" size="22"></uni-icons>
        </view>
      </template>
    </uni-list-item>
    <!-- 生日 -->
    <uni-list-item class="birthday-box">
      <template v-slot:body>
        <view class="user-userinfo-box">
          <text class="title">生日</text>
          <text class="filled">1998-06-16</text>
          <uni-icons class="icon-edit" type="compose" size="22"></uni-icons>
        </view>
      </template>
    </uni-list-item>
    <!-- 家乡 -->
    <uni-list-item class="hometown-box">
      <template v-slot:body>
        <view class="user-userinfo-box">
          <text class="title">家乡</text>
          <text class="filled">海南省-海口市-琼山区</text>
          <uni-icons class="icon-edit" type="compose" size="22"></uni-icons>
        </view>
      </template>
    </uni-list-item>
  </view>
</template>

<script>
  export default {
    data() {
      return {

      };
    }
  }
</script>

<style lang="scss">
  .user-userinfo-container {
    .user-userinfo-box {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .title {}

      .filled {
        margin: 0 20rpx 0 auto;
      }
    }

    .username {
      width: 195rpx;
    }

    .userpic {
      width: 100rpx;
      height: 100rpx;
      border-radius: 50%;
    }
  }
</style>
