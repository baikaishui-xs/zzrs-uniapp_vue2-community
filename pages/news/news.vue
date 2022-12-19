<template>
  <view class="news-container">
    <!-- 顶部选项卡 -->
    <scroll-view class="scroll-view" scroll-x>
      <view class="scroll-view-box">
        <view v-for="(item, index) in tabBars" :key="item.name" class="item" :class="{checked: tabIndex === index}"
          @click="changeTab(index)">{{item.name}}</view>
      </view>
    </scroll-view>
    <!-- 选项卡列表 -->
    <swiper :duration="150" :current="tabIndex" @change="onChangeTab" :style="'height:' + tabListHeight + 'px;'">
      <swiper-item v-for="(item, index) in tabBars" :key="index" class="swiper-item">
        <scroll-view scroll-y="true" :style="'height:' + tabListHeight + 'px;'">
          <block v-for="(item1, index1) in dataList[index]" :key="index1">
            <ArticleList class="items" :item="item1" :index="index1" @getAssignTopicCategoryList="getDataList"
              @setDingCaiOperation="setDingCaiOperation">
            </ArticleList>
          </block>
        </scroll-view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
  import {
    getFollowOpenArticleList
  } from '@/api/allApi.js'
  import ArticleList from '@/components/ArticleList.vue'
  export default {
    data() {
      return {
        // 选项卡列表
        tabBars: [{
            name: '关注'
          },
          {
            name: '话题'
          },
        ],
        // 当前选项卡索引
        tabIndex: 0,
        // 选项卡列表高度
        tabListHeight: 600,
        // 数据列表
        dataList: [],
        // 当前是否为顶踩操作
        isDingCaiOperation: false
      };
    },
    methods: {
      // 切换选项卡
      changeTab( index ) {
        this.tabIndex = index
      },
      // 监听滑动
      onChangeTab( e ) {
        // 获取当前选项卡列表索引
        this.changeTab( e.detail.current )
      },
      // 获取数据列表
      async getDataList() {
        // 获取我关注的人的公开文章列表
        const result = await getFollowOpenArticleList( 1 )

        this.dataList[0] = result.data.list
      },
      setDingCaiOperation() {
        this.isDingCaiOperation = true
      }
    },
    components: {
      ArticleList
    },
    async onLoad() {
      // 异步获取系统信息
      uni.getSystemInfo( {
        success: res => {
          // 获取当前选项卡列表高度 // 100 为选项卡高度，单位为 rpx，需要转换成 px 进行计算，因为 res.windowHeight 的单位为 px
          this.tabListHeight = res.windowHeight - uni.upx2px( 100 )
        }
      } )
      await this.getDataList()
    },
  }
</script>

<style lang="scss">
  .news-container {
    // height: 100%;
    // .title-box {
    //   height: 120rpx;
    //   display: flex;
    //   justify-content: center;
    //   align-items: center;

    //   .items {
    //     font-size: 40rpx;
    //     color: #969696;
    //     font-weight: 900;

    //     &:first-child {
    //       margin-right: 20rpx;
    //     }
    //   }

    //   .checked {
    //     color: #FD5A7D;
    //     font-size: 50rpx;
    //   }
    // }

    .scroll-view {
      .scroll-view-box {
        width: 750rpx;
        display: flex;
        justify-content: center;
        white-space: nowrap;
        background: #fff;

        .item {
          width: 200rpx;
          height: 100rpx;
          display: inline-block;
          font-size: 35rpx;
          font-weight: 900;
          text-align: center;
          line-height: 100rpx;
        }

        .checked {
          font-size: 45rpx;
          color: #e82626;
        }
      }
    }

    .swiper {
      display: flex;
      // height: 100%;
      background: pink;
    }
  }
</style>
