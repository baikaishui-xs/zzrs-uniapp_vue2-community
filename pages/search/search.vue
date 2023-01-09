<template>
  <view class="search-container">
    <view class="header" v-if="tabList.length === 0">搜索历史</view>
    <view class="body" style="height: 1000rpx;">
      <block v-for="(item, index) in tabList" :key="index">
        <ArticleList :item="item" @setUpDownData="setUpDownData" @getIndex="getIndex(index)"></ArticleList>
      </block>
    </view>
  </view>
</template>

<script>
  import {
    searchArticle
  } from '@/api/allApi.js'
  import ArticleList from '@/components/ArticleList.vue'
  export default {
    data() {
      return {
        // 搜索的文章
        keyword: '',
        // 文章列表
        tabList: [],
        // tabList 一维数组下标
        oneWeiArrayIndex: null,
      };
    },
    methods: {
      // 搜索文章
      async searchArticle() {
        if ( this.keyword === '' ) {
          this.tabList = []
          return
        }
        const result = await searchArticle( this.keyword, 1 )
        this.tabList = result.data.list
      },
      // 修改顶踩数据
      setUpDownData( type, item, isTwoWeiArray ) {
        // 当前是否点击踩
        if ( type ) {
          ++this.tabList[this.oneWeiArrayIndex].cai_count
          // 值是否不为 0【解决当值为 0 时，出现负值的为题】
          if ( this.tabList[this.oneWeiArrayIndex].ding_count ) {
            --this.tabList[this.oneWeiArrayIndex].ding_count
          }
        } else {
          ++this.tabList[this.oneWeiArrayIndex].ding_count
          // 值是否不为 0【解决当值为 0 时，出现负值的为题】
          if ( this.tabList[this.oneWeiArrayIndex].cai_count ) {
            --this.tabList[this.oneWeiArrayIndex].cai_count
          }
        }
      },
      // 获取当前文章数据的下标
      getIndex( oneWeiArrayIndex ) {
        this.oneWeiArrayIndex = oneWeiArrayIndex
      }
    },
    components: {
      ArticleList
    },
    // 监听点击软件盘上的搜索事件
    onNavigationBarSearchInputConfirmed() {
      this.searchArticle()
    },
    // 监听输入框输入事件
    onNavigationBarSearchInputChanged( {
      text
    } ) {
      this.keyword = text
    },
    // 设置顶踩操作
    setDingCaiOperation() {
      this.isDingCaiOperation = true
    }
  }
</script>

<style lang="scss">
  .search-container {
    color: #737372;

    .header {
      padding: 20rpx;
    }

    .body {
      .item {}
    }
  }
</style>
