<template>
  <!-- 话题详情页 -->
  <view class="topic-detail-container">
    <!-- 话题信息 区 -->
    <view class="topic-info-area">
      <!-- 背景图 -->
      <image class="titlepic-bgc" :src="item.titlepic" mode="aspectFill"></image>
      <!-- 话题信息 盒子 -->
      <view class="topic-info-box">
        <image class="titlepic" :src="item.titlepic" mode="aspectFill"></image>
        <!-- 标题 -->
        <view class="title">#{{item.title}}#</view>
        <!-- 描述 -->
        <view class="describe style">动态：{{item.post_count}} 今日：{{item.todaypost_count}}</view>
        <!-- 副标题 -->
        <view class="subtitle style">{{item.desc}}</view>
      </view>
    </view>
    <!-- 公告 区 -->
    <view class="notice-area">
      <view class="text" hover-class="notice-area-click">❤️【推荐】碧蓝之海秘制乌龙茶</view>
      <view class="text" hover-class="notice-area-click">❤️【公告】为您的眼眸干杯</view>
    </view>
    <!-- 文章列表 -->
    <view class="articleList">
      <block v-for="(item, index) in topicList" :key="item.id">
        <ArticleList :item="item" @setUpDownData="setUpDownData" @getIndex="getIndex(index)"></ArticleList>
      </block>
    </view>
  </view>
</template>

<script>
  import ArticleList from '@/components/ArticleList.vue'
  import {
    getTopicList
  } from '@/api/allApi.js'
  export default {
    components: {
      ArticleList
    },
    data() {
      return {
        // 当前话题信息
        item: {},
        // 话题列表
        topicList: [],
        // 获取话题列表，页
        page: 1,
        // tabList 一维数组下标
        oneWeiArrayIndex: null,
      };
    },
    methods: {
      // 获取指定话题下的文章列表
      async getTopicList() {
        const result = await getTopicList( this.item.id, this.page )
        this.topicList = result.data.list
      },
      // 修改顶踩数据
      setUpDownData( type, item, isTwoWeiArray ) {
        // 当前是否点击踩
        if ( type ) {
          ++this.topicList[this.oneWeiArrayIndex].cai_count
          // 值是否不为 0【解决当值为 0 时，出现负值的问题】
          if ( this.topicList[this.oneWeiArrayIndex].ding_count ) {
            --this.topicList[this.oneWeiArrayIndex].ding_count
          }
        } else {
          ++this.topicList[this.oneWeiArrayIndex].ding_count
          // 值是否不为 0【解决当值为 0 时，出现负值的问题】
          if ( this.topicList[this.oneWeiArrayIndex].cai_count ) {
            --this.topicList[this.oneWeiArrayIndex].cai_count
          }
        }
      },
      // 获取当前文章数据的下标
      getIndex( oneWeiArrayIndex ) {
        this.oneWeiArrayIndex = oneWeiArrayIndex
      },
    },
    onLoad( option ) {
      this.item = JSON.parse( option.item )
      this.getTopicList()
    }
  }
</script>

<style lang="scss">
  .topic-detail-container {
    background: #F5F5F4;

    .topic-info-area {
      position: relative;
      margin-bottom: 15rpx;
      background: #fff;

      .titlepic-bgc {
        height: 300rpx;
      }

      .topic-info-box {
        height: 210rpx;
        padding: 0 20rpx;

        .style {
          font-size: 30rpx;
          color: #919292;
        }

        .titlepic {
          width: 150rpx;
          height: 140rpx;
          position: absolute;
          top: 250rpx;
          left: 20rpx;
          border-radius: 10rpx;
        }

        .title {
          margin: 20rpx 0 0 170rpx;
          font-size: 40rpx;
        }

        .describe {
          margin: 40rpx 0 10rpx 0;
        }

        .subtitle {}
      }
    }

    .notice-area {
      margin-bottom: 15rpx;
      background: #fff;

      .text {
        height: 100rpx;
        padding: 0 20rpx;
        display: flex;
        align-items: center;
        border-bottom: 2rpx solid #D6DAE1;
        font-size: 30rpx;
      }

      .notice-area-click {
        background: #F5F5F4;
      }
    }
  }
</style>
