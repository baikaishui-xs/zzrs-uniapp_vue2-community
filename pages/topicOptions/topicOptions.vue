<template>
  <!-- 话题选项页 -->
  <view class="topic-options-container">
    <block v-for="item in topicOptionsList" :key="item.id">
      <TopicItem :item="item" :isReturnPreviousPage="true"></TopicItem>
    </block>
  </view>
</template>

<script>
  import {
    getTopicOptionsList
  } from '@/api/allApi.js'
  import TopicItem from '@/components/TopicItem.vue'
  export default {
    components: {
      TopicItem
    },
    data() {
      return {
        // 话题选项列表
        topicOptionsList: []
      };
    },
    methods: {
      // 获取话题选项列表
      async getTopicOptionsList() {
        const result = await getTopicOptionsList()
        this.topicOptionsList = result.data.list
      }
    },
    onLoad() {
      this.getTopicOptionsList()
    }
  }
</script>

<style lang="scss">
  .topic-options-container {}
</style>
