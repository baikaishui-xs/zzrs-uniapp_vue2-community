<template>
  <!-- 话题项组件 -->
  <view class="topic-item-container" @click="clickTopicOptionsListItem(item.id)">
    <!-- 图片 -->
    <image class="img" :src="item.titlepic"></image>
    <!-- 信息 -->
    <view class="info">
      <view class="title">#{{item.title}}#</view>
      <view class="subtitle">{{item.desc}}</view>
      <view class="other">动态：{{item.post_count}} 今日：{{item.todaypost_count}}</view>
    </view>
  </view>
</template>

<script>
  export default {
    props: {
      item: {
        type: Object
      },
      // 是否返回上一页
      isReturnPreviousPage: {
        type: Boolean
      }
    },
    methods: {
      // 点击话题选项列表项后触发
      clickTopicOptionsListItem( id ) {
        if ( this.isReturnPreviousPage ) {
          uni.$emit( 'getTopicId', id )
          uni.navigateBack( {
            delta: 1
          } );
        }
      }
    }
  }
</script>

<style lang="scss">
  .topic-item-container {
    height: 180rpx;
    padding: 0 20rpx;
    display: flex;
    align-items: center;

    .img {
      width: 150rpx;
      height: 140rpx;
      margin-right: 20rpx;
      border-radius: 10rpx;
    }

    .info {
      .title {
        font-size: 30rpx;
        color: #353941;
      }

      .subtitle {
        margin: 10rpx 0;
        color: #6E757D;
      }

      .other {
        color: #6E757D;
      }
    }
  }
</style>
