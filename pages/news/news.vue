<template>
  <!-- 动态页 -->
  <view class="news-container">
    <!-- 顶部选项卡 -->
    <view class="topTab">
      <view v-for="(item, index) in tabBars" :key="item.classname" class="item" :class="{checked: tabIndex === index}"
        @click="changeTab(index)" :id="'tab' + index">{{item.classname}}</view>
    </view>
    <!-- 选项卡列表 -->
    <swiper :duration="150" :current="tabIndex" @change="onChangeTab" :style="'height:' + tabListHeight + 'px;'">
      <!-- 关注 选项卡 -->
      <swiper-item class="swiper-item">
        <scroll-view scroll-y="true" :style="'height:' + tabListHeight + 'px;'" @scrolltolower="upLoading">
          <block v-for="(item, index) in followTabList" :key="item.id">
            <ArticleList :item="item" @setUpDownData="setUpDownData" @getIndex="getIndex(index)"></ArticleList>
          </block>
          <!-- 上拉加载更多 -->
          <view class="upLoader">{{upLoaderText}}</view>
        </scroll-view>
      </swiper-item>
      <!-- 话题 选项卡 -->
      <swiper-item class="swiper-item">
        <scroll-view scroll-y="true" :style="'height:' + tabListHeight + 'px;'">
          <block v-for="item in hotTopicList" :key="item.id">
            <view @click="goTopicDetail(item)">
              <TopicItem :item="item" :isReturnPreviousPage="false"></TopicItem>
            </view>
          </block>
          <!-- <block v-for="(item1, index1) in item" :key="index1">
            {{item1}}
          </block> -->
        </scroll-view>
      </swiper-item>
    </swiper>
  </view>
</template>
<script>
  import {
    getFollowOpenArticleList,
    getHotTopic
  } from '@/api/allApi.js'
  import ArticleList from '@/components/ArticleList.vue'
  import TopicItem from '@/components/TopicItem.vue'
  export default {
    components: {
      ArticleList,
      TopicItem
    },
    data() {
      return {
        // 热门话题列表
        hotTopicList: [],
        // 顶部选项卡 列表
        tabBars: [{
            classname: '关注'
          },
          {
            classname: '话题'
          },
        ],
        // 关注 选项卡列表数据
        followTabList: [],
        // 关注 选项卡列表数据页
        followPage: 1,
        // 关注 选项卡列表数据是否有下一页数据
        isFollowPageNull: false,
        // 当前选项卡索引
        tabIndex: 0,
        // 当前选项卡标记
        scrollInto: '',
        // 选项卡列表高度
        tabListHeight: 600,
        // tabList 一维数组下标
        oneWeiArrayIndex: null,
        // 上拉加载更多，文本
        upLoaderText: '加载中...',
        // 是否为上拉加载
        isUpLoading: false
      }
    },
    methods: {
      // 获取热门话题
      async getHotTopic() {
        const result = await getHotTopic()
        this.hotTopicList = result.data.list
      },
      // 获取关注 选项卡列表
      async getFollowTabList() {
        // 关注 选项卡列表是否没有数据 || (是否为上拉加载 && 关注 选项卡列表是否没有下一页数据)
        if ( this.followTabList.length == 0 || ( this.isUpLoading && !this.isFollowPageNull ) ) {
          const result = await getFollowOpenArticleList( this.followPage )
          this.followTabList = [...this.followTabList, ...result.data.list]
          if ( result.data.list.length === 0 ) {
            this.isFollowPageNull = true
          }
        }
      },
      // 切换选项卡
      changeTab( index ) {
        this.tabIndex = index
        // 切换选项卡后，自动滚动到最左边
        this.scrollInto = 'tab' + index
      },
      // 监听滑动
      onChangeTab( e ) {
        // 获取当前选项卡列表索引
        this.changeTab( e.detail.current )
      },
      // 修改顶踩数据
      setUpDownData( type, item, isTwoWeiArray ) {
        // 当前是否点击踩
        if ( type ) {
          ++this.followTabList[this.oneWeiArrayIndex].cai_count
          // 值是否不为 0【解决当值为 0 时，出现负值的问题】
          if ( this.followTabList[this.oneWeiArrayIndex].ding_count ) {
            --this.followTabList[this.oneWeiArrayIndex].ding_count
          }
        } else {
          ++this.followTabList[this.oneWeiArrayIndex].ding_count
          // 值是否不为 0【解决当值为 0 时，出现负值的问题】
          if ( this.followTabList[this.oneWeiArrayIndex].cai_count ) {
            --this.followTabList[this.oneWeiArrayIndex].cai_count
          }
        }
      },
      // 获取当前文章数据的下标
      getIndex( oneWeiArrayIndex ) {
        this.oneWeiArrayIndex = oneWeiArrayIndex
      },
      // 上拉加载
      async upLoading() {
        this.upLoaderText = '加载中...'
        this.isUpLoading = true
        this.followPage = ++this.followPage
        await this.getFollowTabList()
        // 是否没有下一页数据了
        if ( this.isFollowPageNull ) {
          this.upLoaderText = '已经没有数据了'
        } else {
          this.upLoaderText = '上拉加载更多'
        }
      },
      // 前往话题详情页
      goTopicDetail( item ) {
        uni.navigateTo( {
          url: '/pages/topicDetail/topicDetail?item=' + JSON.stringify( item )
        } )
      }
    },
    onLoad() {
      // 异步获取系统信息
      uni.getSystemInfo( {
        success: res => {
          // 获取当前选项卡列表高度 // 100 为选项卡高度，单位为 rpx，需要转换成 px 进行计算，因为 res.windowHeight 的单位为 px
          this.tabListHeight = res.windowHeight - uni.upx2px( 100 )
        }
      } )
      this.getFollowTabList()
      this.getHotTopic()
    }
  }
</script>
<style lang="scss">
  .news-container {
    .topTab {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100rpx;
      color: #969696;

      >view {
        font-size: 35rpx;
        font-weight: 900;
      }

      >view:first-child {
        margin-right: 20rpx;
      }

      .checked {
        font-size: 40rpx;
        color: #e82626;
      }
    }



    .scroll-view {
      width: 750rpx;
      white-space: nowrap;
      border-bottom: 4rpx solid #F5F5F5;
      background: #fff;

      .item {
        width: 160rpx;
        height: 100rpx;
        display: inline-block;
        text-align: center;
        line-height: 100rpx;
        font-size: 30rpx
      }
    }

    .upLoader {
      height: 80rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #A39D9C;
      background: #fff;
    }
  }
</style>
