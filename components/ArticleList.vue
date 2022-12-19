<!-- 文章列表 -->
<template>
  <view class="artical-list-container">
    <view class="header">
      <!-- 用户信息 -->
      <view class="userInfo-box">
        <view class="userinfo">
          <image class="userpic" :src="item.user.userpic"></image>
          <view class="right-box">
            <view class="username">{{item.user.username}}</view>
            <view class="time">{{item.create_time}}</view>
          </view>
        </view>
        <!-- 关注 -->
        <view class="follow-box" :class="isFollow ? 'follow' : 'unFollow'" @click="clickFollow">
          {{isFollow ? '已关注' : '关注'}}
        </view>
      </view>
    </view>
    <view class="body">
      <view class="content">{{item.content}}</view>
      <image class="image" mode="aspectFill" :src="item.images[0].url" v-if="item.images.length !== 0"></image>
    </view>
    <view class="footer">
      <!-- 顶 -->
      <view class="up" :class="isUpDown === 0 ? 'checked' : ''" @click="upDownOperation(0)">
        <uni-icons class="icon" type="hand-up" size="30" :color="isUpDown === 0 ? '#FD597B' : ''"></uni-icons>
        <text class="text">{{item.ding_count}}</text>
      </view>
      <!-- 踩 -->
      <view class="down" :class="isUpDown === 1 ? 'checked' : ''" @click="upDownOperation(1)">
        <uni-icons class="icon" type="hand-down" size="30" :color="isUpDown === 1 ? 'FD597B' : ''"></uni-icons>
        <text class="text">{{item.cai_count}}</text>
      </view>
      <!-- 评论 -->
      <view class="chat">
        <uni-icons class="icon" type="chat" size="30"></uni-icons>
        <text class="text">{{item.comment_count}}</text>
      </view>
      <!-- 分享 -->
      <view class="redo">
        <uni-icons class="icon" type="redo" size="30"></uni-icons>
        <text class="text">分享</text>
      </view>
    </view>
  </view>
</template>

<script>
  import {
    topStepOperation,
    follow,
    unfollow
  } from '@/api/allApi.js'
  export default {
    props: {
      item: {
        type: Object
      },
      oneWeiArrayIndex: {
        type: Number
      },
      twoWeiArrayIndex: {
        type: Number
      }
    },
    data() {
      return {
        // 是否关注
        isFollow: false,
        // 用户是否进行顶踩操作（null：没有操作 | 0：顶 | 1：踩）
        isUpDown: null
      }
    },
    methods: {
      // 判断文章是否关注
      ifFollow() {
        if ( this.item.user.fens[0] && this.$store.state.user.userInfo.id === this.item.user.fens[0].id ) {
          this.isFollow = true
        }
      },
      // 判断文章是否进行顶踩操作
      ifUpDown() {
        // 用户是否进行了顶操作
        if ( this.item.support[0] && this.item.support[0].type === 0 ) {
          this.isUpDown = 0
        }
        // 用户是否进行了踩操作
        if ( this.item.support[0] && this.item.support[0].type === 1 ) {
          this.isUpDown = 1
        }
      },
      // 点击关注
      async clickFollow() {
        // 当前是否为关注状态
        if ( this.isFollow ) {
          await unfollow( this.item.user_id )
          this.isFollow = false
        } else {
          await follow( this.item.user_id )
          this.isFollow = true
        }
      },
      // 顶踩操作（type：0 是顶；1是踩）
      async upDownOperation( type ) {
        const result = await topStepOperation( this.item.id, type )
        // 是否成功进行顶踩操作
        if ( result.msg === 'ok' ) {
          this.$emit( 'setUpDownData', type, this.item, this.oneWeiArrayIndex, this.twoWeiArrayIndex )
          this.isUpDown = type
        } else {
          uni.showToast( {
            title: '请勿重复操作！',
          } );
        }
      }
    },
    created() {
      this.ifFollow()
      this.ifUpDown()
    }
  }
</script>

<style lang="scss">
  .artical-list-container {
    border-bottom: 16rpx solid #F5F5F5;
    padding: 0 20rpx;

    .header {
      height: 120rpx;
      display: flex;
      align-items: center;

      .userInfo-box {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .userinfo {
          display: flex;
          justify-content: space-between;
          align-items: center;

          .userpic {
            width: 65rpx;
            height: 65rpx;
            margin-right: 20rpx;
            border-radius: 50%;
          }

          .right-box {
            .username {
              font-size: 35rpx;
            }

            .time {
              font-size: 30rpx;
              color: #908F8C;
            }
          }
        }

        .follow-box {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100rpx;
          height: 50rpx;
          color: #fff;
          font-size: 30rpx;
          border-radius: 8rpx;
        }

        .follow {
          background: #CCCCCC;
        }

        .unFollow {
          background: #FC5A7C;
        }
      }
    }

    .body {
      .content {
        margin-bottom: 10rpx;
      }

      .image {
        height: 350rpx;
        border-radius: 10rpx;
      }
    }

    .footer {
      display: flex;
      height: 90rpx;

      >view {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;

        >.icon {
          margin-right: 10rpx;
        }
      }

      .checked {
        color: #FD597B;
      }

      .up {
        .icon {}

        .text {}
      }

      .down {
        .icon {}

        .text {}
      }

      .chat {
        .icon {}

        .text {}
      }

      .redo {
        .icon {}

        .text {}
      }
    }
  }
</style>
