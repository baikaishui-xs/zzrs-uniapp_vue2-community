<template>
  <view class="app-container">
    <!-- 顶部选项卡 -->
    <scroll-view class="scroll-view" scroll-x :scroll-into-view="scrollInto" scroll-with-animation>
      <view v-for="(item, index) in tabBars" :key="item.name" class="item" :class="{checked: tabIndex === index}"
        @click="changeTab(index)" :id="'tab' + index">{{item}}</view>
    </scroll-view>
    <!-- 选项卡列表 -->
    <swiper class="tabList" :duration="150" :current="tabIndex" @change="onChangeTab"
      :style="'height:' + tabListHeight + 'px;'">
      <swiper-item v-for="(item, index) in tabBars" :key="index" class="swiper-item">
        <scroll-view scroll-y="true" :style="'height:' + tabListHeight + 'px;'" @scrolltolower="upLoading">
          <!-- 文章列表 -->
          <block v-for="(item1, index1) in list[index]" :key="index1">
            <ArticleList class="items" :item="item1" :index="index1" @support="support" @unsupport="unsupport"
              @getAssignTopicCategoryList="getAssignTopicCategoryList" @setDingCaiOperation="setDingCaiOperation">
            </ArticleList>
          </block>
          <!-- 上拉加载更多 -->
          <view class="upLoader">{{upLoaderText}}</view>
        </scroll-view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
  import ArticleList from './components/ArticleList.vue'
  import {
    getAllArticleCategory,
    getAssignTopicCategoryList
  } from '@/api/allApi.js'
  export default {
    data() {
      return {
        // 文章列表
        list: [],
        // 顶部选项卡 列表
        tabBars: [],
        // 当前选项卡索引
        tabIndex: 0,
        // 当前选项卡标记
        scrollInto: '',
        // 选项卡列表高度
        tabListHeight: 600,
        // 所有选项卡请求数据的页数
        allPage: [],
        // 当前是否为上拉刷新状态
        isUpLoading: false,
        // 上拉加载更多文本
        upLoaderText: '加载中...',
        // 是否没有下一页数据了
        isPageNull: false,
        // 当前是否为顶踩操作
        isDingCaiOperation: false
      }
    },
    methods: {
      // 切换选项卡
      changeTab( index ) {
        this.tabIndex = index
        // 切换选项卡后，自动滚动到最左边
        this.scrollInto = 'tab' + index
        if ( !this.list[this.tabIndex] ) {
          console.log( 1 )
          this.upLoaderText = '加载中...'
        }
      },
      // 监听 滑动
      onChangeTab( e ) {
        // 获取 当前选项卡列表索引
        this.changeTab( e.detail.current )
        this.getAssignTopicCategoryList()
      },
      onLoad() {
        uni.getSystemInfo( {
          success: res => {
            // 获取当前选项卡列表高度 // 100 为选项卡高度，单位为 rpx，需要转换成 px 进行计算，因为 res.windowHeight 的单位为 px
            this.tabListHeight = res.windowHeight - uni.upx2px( 100 )
          }
        } )
      },
      // 获取所有文章分类
      async getAllArticleCategory() {
        let result = await getAllArticleCategory()
        let newResult = result.data.list.map( ( item, index ) => {
          return item.classname
        } );
        this.tabBars = newResult
        for ( var i = 0; i < newResult.length; i++ ) {
          this.allPage[i] = 1
        }
      },
      // 指定文章分类下的文章列表
      async getAssignTopicCategoryList() {
        if ( this.list.length === 0 || !this.list[this.tabIndex] || this.isUpLoading || this.isDingCaiOperation ) {
          const result = await getAssignTopicCategoryList( this.tabIndex + 1, this.allPage[this.tabIndex] )
          let newResult = result.data.list
          if ( this.list[this.tabIndex] && !this.isDingCaiOperation ) {
            newResult = [...this.list[this.tabIndex], ...result.data.list]
          }
          if ( !result.data.list.leng ) {
            this.isPageNull = true
          }
          this.$set( this.list, this.tabIndex, newResult )
          this.isUpLoading = false
          this.isDingCaiOperation = false
        }
      },
      // 上拉刷新
      async upLoading() {
        this.upLoaderText = '加载中...'
        this.allPage[this.tabIndex] = ++this.allPage[this.tabIndex]
        this.isUpLoading = true
        await this.getAssignTopicCategoryList()
        if ( this.isPageNull ) {
          this.upLoaderText = '已经没有数据了'
        } else {
          this.upLoaderText = '上拉加载更多'
        }
      },
      setDingCaiOperation() {
        this.isDingCaiOperation = true
      }
    },
    async created() {
      await this.getAllArticleCategory()
      this.getAssignTopicCategoryList()
    },
    components: {
      ArticleList
    }
  }
</script>

<style lang="scss">
  .tabList {
    .items {
      border-bottom: 6rpx solid #F5F4F4;
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

  .checked {
    color: #e82626;
  }

  .scroll-view {
    width: 750rpx;
    white-space: nowrap;
    background: #fff;
    border-bottom: 8rpx solid #F5F4F4;

    .item {
      width: 200rpx;
      height: 100rpx;
      display: inline-block;
      text-align: center;
      line-height: 100rpx;
    }
  }
</style>
