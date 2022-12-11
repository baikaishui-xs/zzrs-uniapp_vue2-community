<!-- 文章列表 -->
<template>
  <view class="artical-list-container">
    <view class="items">
      <view class="header">
        <!-- 用户信息 -->
        <view class="userinfo">
          <image class="img" :src="item.user.userpic" alt="" stylte="width: 100rpx; height: 100rpx"></image>
          <view class="userinfo-box">
            <text class="username">{{item.user.username}}</text>
            <text class="time">{{item.create_time}}</text>
          </view>
        </view>
        <!-- 关注 -->
        <view class="focus_on animate__animated" :class="item.isFollow ? 'followed': ''" hover-class="animate__tada"
          @click='clickFollow'>
          {{isFollow ? '已关注' : '关注' }}
        </view>
      </view>
      <view class="body">
        <view class="title">
          {{item.title}}
        </view>
        <!-- 封面 -->
        <image class="title_pic" :src="item.titlepic" v-if="item.titlepic"></image>
      </view>
      <view class="footer">
        <!-- 赞 -->
        <view class="praise animate__animated" :class="item.support[0] && item.support[0].type === 0 ? 'color' : ''"
          hover-class="animate__tada" @click="support(item.id, 0)">
          <i class="iconfont icon-zan"></i>
          <text class="text">{{item.ding_count}}</text>
        </view>
        <!-- 踩 -->
        <view class="step_on animate__animated" :class="item.support[0] && item.support[0].type === 1 ? 'color' : ''"
          hover-class="animate__tada" @click="unsupport(item.id, 1)">
          <i class="iconfont icon-cai"></i>
          <text class="text">{{item.cai_count}}</text>
        </view>
        <!-- 评论 -->
        <view class="comments animate__animated" hover-class="animate__tada">
          <i class="iconfont icon-liaotian"></i>
          <text class="text">{{item.comment_count}}</text>
        </view>
        <!-- 分享 -->
        <view class="share animate__animated" hover-class="animate__tada">
          <i class="iconfont icon-zhuanfa"></i>
          <text class="text">{{item.share_num}}</text>
        </view>
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
        type: Object,
      },
      index: {
        type: Number
      }
    },
    data() {
      return {
        // 当前用户 ID
        userID: this.$store.state.user.userInfo.id,
        // 是否关注
        isFollow: false
      }
    },
    methods: {
      // 点击关注按钮
      async clickFollow() {
        const result = this.item.user.fens.length !== 0 && this.userID == this.item.user.fens[0].id
        if ( result || this.isFollow ) {
          const result1 = await unfollow( this.item.user_id )
          if ( result1.msg === '取消关注成功' ) this.isFollow = false
        } else {
          const result2 = await follow( this.item.user_id )
          if ( result2.msg === '关注成功' ) this.isFollow = true
        }
      },
      // 赞
      async support( post_id, type ) {
        await topStepOperation( post_id, type )
        this.$emit( 'setDingCaiOperation' )
        this.$emit( 'getAssignTopicCategoryList' )
      },
      // 踩
      async unsupport( post_id, type ) {
        await topStepOperation( post_id, type )
        this.$emit( 'setDingCaiOperation' )
        this.$emit( 'getAssignTopicCategoryList' )
      },
    },
    created() {
      this.isFollow = this.item.user.fens.length !== 0 && this.userID == this.item.user.fens[0].id
    }
  }
</script>

<style lang="scss">
  .artical-list-container {
    .items {
      padding: 0 20rpx;

      .header {
        height: 130rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .userinfo {
          height: 70rpx;
          display: flex;
          justify-content: space-between;
          align-items: center;

          .img {
            width: 65rpx;
            height: 65rpx;
            margin-right: 20rpx;
          }

          .userinfo-box {
            display: flex;
            flex-direction: column;

            .username {
              font-size: 34rpx;
            }

            .time {
              color: #A39D9C;
              font-size: 28rpx;
            }
          }
        }

        .focus_on {
          width: 100rpx;
          height: 60rpx;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 6rpx;
          color: #fff;
          font-size: 32rpx;
          background: #FD597C;
        }

        .followed {
          background: #A39D9C;
        }

      }

      .body {
        font-size: 32rpx;

        .title {
          margin-bottom: 20rpx;
        }

        .title_pic {
          width: 100%;
          height: 350rpx;
        }
      }

      .footer {
        display: flex;

        >view {
          height: 80rpx;
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;

          .iconfont {
            font-size: 50rpx !important;
            margin-right: 10rpx;
          }
        }

        .praise {
          .icon-zan {}

          .text {}
        }

        .step_on {
          .icon-cai {}

          .text {}
        }

        .comments {
          .icon-liaotian {}

          .text {}
        }

        .share {
          .icon-zhuanfa {}

          .text {}
        }
      }
    }
  }
</style>
