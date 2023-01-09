<template>
  <view class="app-container">
    <!-- 顶部选项卡 -->
    <scroll-view class="scroll-view" scroll-x :scroll-into-view="scrollInto" scroll-with-animation>
      <view v-for="(item, index) in tabBars" :key="item.classname" class="item" :class="{checked: tabIndex === index}"
        @click="changeTab(index)" :id="'tab' + index">{{item.classname}}</view>
    </scroll-view>
    <!-- 选项卡列表 -->
    <swiper :duration="150" :current="tabIndex" @change="onChangeTab" :style="'height:' + tabListHeight + 'px;'">
      <swiper-item v-for="(item, index) in tabList" :key="index" class="swiper-item">
        <scroll-view scroll-y="true" :style="'height:' + tabListHeight + 'px;'" @scrolltolower="upLoading">
          <block v-for="(item1, index1) in item" :key="index1">
            <ArticleList :item="item1" @setUpDownData="setUpDownData" @getIndex="getIndex(index, index1)">
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
  import {
    getTabBars,
    getAssignTopicCategoryList
  } from '@/api/allApi.js'
  import ArticleList from '@/components/ArticleList.vue'
  export default {
    data() {
      return {
        // 顶部选项卡分类列表
        tabBars: [],
        // 当前选项卡索引
        tabIndex: 0,
        // 当前选项卡标记
        scrollInto: '',
        // 选项卡列表高度
        tabListHeight: 600,
        // 选项卡列表数据
        tabList: [],
        // 请求的页数
        page: 1,
        // 上拉加载更多，文本
        upLoaderText: '加载中...',
        // 是否为上拉加载
        isUpLoading: false,
        // tabList 一维数组下标
        oneWeiArrayIndex: null,
        // tabList 二维数组下标
        twoWeiArrayIndex: null
      }
    },
    methods: {
      // 获取顶部选项卡分类列表
      async getTabBars() {
        const result = await getTabBars()
        this.tabBars = result.data.list
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
        this.getTabList()
      },
      // 获取选项卡列表数据
      async getTabList() {
        // 当前选项卡列表没有数据 || 当前为上拉加载
        if ( this.tabList[this.tabIndex].length == 0 || this.isUpLoading ) {
          const result = await getAssignTopicCategoryList( this.tabBars[this.tabIndex].id, this.page )
          this.$set( this.tabList, this.tabIndex, [...this.tabList[this.tabIndex], ...result.data.list] )
        }
      },
      // 初始化选项卡列表数据（解决 tabList 长度只为 1，导致选项卡不能左右滑动的问题）
      initTabList() {
        for ( let i = 0; i < this.tabBars.length; i++ ) {
          this.tabList[i] = []
        }
      },
      // 上拉刷新
      async upLoading() {
        this.upLoaderText = '加载中...'
        this.isUpLoading = true
        this.page = ++this.page
        await this.getTabList()
        // 是否没有下一页数据了
        if ( this.isPageNull ) {
          this.upLoaderText = '已经没有数据了'
        } else {
          this.upLoaderText = '上拉加载更多'
        }
      },
      // 修改顶踩数据
      setUpDownData( type, item, isTwoWeiArray ) {
        // 当前是否点击踩
        if ( type ) {
          ++this.tabList[this.oneWeiArrayIndex][this.twoWeiArrayIndex].cai_count
          // 值是否不为 0【解决当值为 0 时，出现负值的为题】
          if ( this.tabList[this.oneWeiArrayIndex][this.twoWeiArrayIndex].ding_count ) {
            --this.tabList[this.oneWeiArrayIndex][this.twoWeiArrayIndex].ding_count
          }
        } else {
          ++this.tabList[this.oneWeiArrayIndex][this.twoWeiArrayIndex].ding_count
          // 值是否不为 0【解决当值为 0 时，出现负值的为题】
          if ( this.tabList[this.oneWeiArrayIndex][this.twoWeiArrayIndex].cai_count ) {
            --this.tabList[this.oneWeiArrayIndex][this.twoWeiArrayIndex].cai_count
          }
        }
      },
      // 获取当前文章数据的下标
      getIndex( oneWeiArrayIndex, twoWeiArrayIndex ) {
        this.oneWeiArrayIndex = oneWeiArrayIndex
        this.twoWeiArrayIndex = twoWeiArrayIndex
      }
    },
    components: {
      ArticleList
    },
    async onLoad() {
      await this.getTabBars()
      this.initTabList()
      await this.getTabList()
      // 异步获取系统信息
      uni.getSystemInfo( {
        success: res => {
          // 获取当前选项卡列表高度 // 100 为选项卡高度，单位为 rpx，需要转换成 px 进行计算，因为 res.windowHeight 的单位为 px
          this.tabListHeight = res.windowHeight - uni.upx2px( 100 )
        }
      } )
    },
    // 搜索栏输入框点击事件
    onNavigationBarSearchInputClicked() {
      uni.navigateTo( {
        url: '/pages/search/search'
      } )
    },
    onNavigationBarButtonTap() {
      uni.navigateTo( {
        url: '/pages/release/release'
      } )
    }
  }
</script>

<style lang="scss">
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

    .checked {
      font-size: 40rpx;
      font-weight: 900;
      color: #e82626;
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
</style>
