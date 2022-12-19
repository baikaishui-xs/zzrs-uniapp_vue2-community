<template>
  <view class="search-container">
    <view class="header" v-if="articleList.length === 0">搜索历史</view>
    <view class="body" style="height: 1000rpx;">
      <block v-for="(item, index) in articleList" :key="index">
        <ArticleList class="items" :item="item" :index="index" @getAssignTopicCategoryList="searchArticle"
          @setDingCaiOperation="setDingCaiOperation">
        </ArticleList>
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
        articleList: []
      };
    },
    methods: {
      // 搜索文章
      async searchArticle() {
        if ( this.keyword === '' ) {
          this.articleList = []
          return
        }
        const result = await searchArticle( this.keyword, 1 )
        this.articleList = result.data.list
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
