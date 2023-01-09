<template>
  <!-- 设置页 -->
  <view class="user-set">
    <!-- 编辑资料 -->
    <uni-list-item showArrow title="编辑资料" clickable @click="goUserInfo" />
    </uni-list-item>
    <!-- 清除缓存 -->
    <uni-list-item class="clear-storage" title="清除缓存" clickable @click="clear" :rightText="currentSize|format">
    </uni-list-item>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 缓存大小
        currentSize: 0
      };
    },
    methods: {
      // 获取缓存大小
      getStorageInfo() {
        let res = uni.getStorageInfoSync()
        this.currentSize = res.currentSize
      },
      // 清除缓存
      clear() {
        uni.showModal( {
          title: '提示',
          content: '是否要清除所有缓存？',
          cancelText: '不清除',
          confirmText: '清除',
          success: res => {
            if ( res.confirm ) {
              // 同步清理本地数据缓存
              uni.clearStorageSync()
              this.getStorageInfo()
              uni.showToast( {
                title: '清除成功',
                icon: 'none'
              } );
            }
          },
        } );
      },
      // 前往编辑资料页
      goUserInfo() {
        uni.navigateTo( {
          url: '/pages/user-userinfo/user-userinfo'
        } )
      }
    },
    onLoad() {
      this.getStorageInfo()
    },
    filters: {
      // 值大于 1024 则转换为 MB，否则为 KB
      format( value ) {
        return value > 1024 ? ( value / 1024 ).toFixed( 2 ) + 'MB' : value.toFixed( 2 ) + 'KB';
      }
    },
  }
</script>

<style lang="scss">

</style>
