<template>
  <view class="release-container">
    <!-- 自定义导航栏 -->
    <uni-nav-bar left-icon="back" left-text="返回" @clickLeft="goBack">
      <view class="uni-nav-bar">
        <text class="title">所有人可见</text>
        <uni-icons type="gear" size="26"></uni-icons>
      </view>
    </uni-nav-bar>
    <!-- 多行输入框 -->
    <textarea class="textarea" v-model="content" placeholder="说一句话吧~" />
    <!-- 多图上传 -->
    <view class="up-image">
      <uni-file-picker v-model="imageList" limit="9" @select="select">
      </uni-file-picker>
    </view>
    </uni-section>
    <!-- 底部 -->
    <view class="bottom-box">
      <view class="left-box">
        <view class="icon">
          <uni-icons type="bars" size="30"></uni-icons>
        </view>
        <view class="icon">
          <uni-icons type="chatboxes-filled" size="30"></uni-icons>
        </view>
        <view class="icon">
          <uni-icons type="image" size="30"></uni-icons>
        </view>
      </view>
      <view class="right-box">
        <button class="release-btn">发布</button>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 多行输入框内容
        content: '',
        // 多图上传列表
        imageList: [],
        // 是否显示模态弹框
        isShowModal: false
      };
    },
    methods: {
      // 图片上传成功时触发
      select( e ) {
        this.imageList = [...this.imageList, ...e.tempFiles]
      },
      // 返回上一页
      goBack() {
        uni.navigateBack( {
          delta: 1
        } );
      },
      // 保存操作
      confirmOp() {
        // 存储到本地的数据
        let data = {
          content: this.content,
          imageList: this.imageList
        }
        // 将数据存储到本地
        uni.setStorage( {
          key: 'release',
          data: JSON.stringify( data )
        } )
      },
      // 不保存操作
      noConfirmOp() {
        // 存储到本地的数据
        let data = {
          content: '',
          imageList: []
        }
        // 将数据存储到本地
        uni.setStorage( {
          key: 'release',
          data: JSON.stringify( data )
        } )
      }
    },
    onBackPress() {
      // (多行输入框为空 || 多图上传列表为空) && 模态弹框为 false
      if ( ( this.content !== '' || this.imageList.length > 0 ) && !this.isShowModal ) {
        uni.showModal( {
          content: '是否要保存为草稿',
          cancelText: '不保存',
          confirmText: '保存',
          success: res => {
            // 是否点击 保存 按钮
            if ( res.confirm ) this.confirmOp()
            // 是否点击 不保存 按钮
            if ( res.cancel ) this.noConfirmOp()
            uni.navigateBack( {
              delta: 1
            } )
          }
        } )
        // 解决调用 uni.navigateBack() 还会触发第 onBackPress 事件，导致一直提示模态弹框的问题
        this.isShowModal = true
        // 不允许返回
        return true
      }
    },
    // 监听页面加载
    onLoad() {
      // 从本地获取数据
      uni.getStorage( {
        key: 'release',
        success: res => {
          if ( res.data ) {
            let result = JSON.parse( res.data )
            this.content = result.content
            this.imageList = result.imageList
          }
        }
      } )
    }
  }
</script>

<style lang="scss">
  .release-container {
    .uni-nav-bar {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      .title {
        font-size: 30rpx;
      }
    }

    .textarea {
      width: 100%;
      padding: 18rpx;
    }

    .up-image {
      padding: 18rpx;
    }

    .bottom-box {
      width: 100%;
      height: 90rpx;
      padding: 0 27rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: fixed;
      left: 0;
      bottom: 0;

      .left-box {
        display: flex;
        height: 100%;

        .icon {
          width: 85rpx;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }

      .right-box {
        .release-btn {
          width: 140rpx;
          height: 60rpx;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #fff;
          background: #FC597C;
        }
      }
    }
  }
</style>
