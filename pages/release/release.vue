<template>
  <!-- 发布页 -->
  <view class="release-container">
    <!-- 自定义导航栏 -->
    <!-- <uni-nav-bar left-icon="back" left-text="返回" @clickLeft="goBack">
      <view class="uni-nav-bar" @click="switchSee">
        <text class="title">{{releaseArticleApiParameter.isopen === 0 ? '仅自己可见' : '所有人可见' }}</text>
        <uni-icons type="gear" size="26"></uni-icons>
      </view>
    </uni-nav-bar> -->
    <!-- 多行输入框 -->
    <textarea class="textarea" v-model="releaseArticleApiParameter.text" placeholder="说一句话吧~" />
    <!-- 多图上传 -->
    <view class="up-image" v-show="releaseArticleApiParameter.imglist !== '[]'">
      <uni-file-picker ref="files" v-model="releaseArticleApiParameter.imageList" limit="9" @select="select">
      </uni-file-picker>
    </view>
    </uni-section>
    <!-- 底部 -->
    <view class="bottom-box">
      <view class="left-box">
        <!-- 分类 -->
        <view class="icon">
          <picker mode="selector" :range="categoryOptional" @change="choosePostClass">
            <uni-icons type="bars" size="30"></uni-icons>
          </picker>
        </view>
        <!-- 话题 -->
        <view class="icon" @click="clickTopic">
          <uni-icons type="chatboxes-filled" size="30"></uni-icons>
        </view>
        <!-- 图片 -->
        <view class="icon" @click="clickUploadImage">
          <uni-icons type="image" size="30"></uni-icons>
        </view>
      </view>
      <view class="right-box">
        <!-- 发布 -->
        <button class="release-btn" @click="releaseArticle">发布</button>
      </view>
    </view>
  </view>
</template>

<script>
  import {
    releaseArticle,
    getTabBars
  } from '@/api/allApi.js'
  export default {
    data() {
      return {
        // 是否显示模态弹框
        isShowModal: false,
        // 发布文章 api 参数
        releaseArticleApiParameter: {
          // 上传的图片列表
          imglist: '[]',
          // 内容
          text: '',
          // 可见状态（仅自己可见：0）（所有人可见：1）
          isopen: 1,
          // 话题 id
          topic_id: null,
          // 分类 id
          post_class_id: null,
        },
        // 分类可选项
        categoryOptional: [],
      };
    },
    methods: {
      async getCategoryOptional() {
        const result = await getTabBars()
        this.categoryOptional = result.data.list.map( ( item ) => {
          return item.classname
        } );
      },
      // 图片上传成功时触发
      select( e ) {
        console.log( '图片上传成功，（因为没有云盘，这里就模拟成功的提示即可）' )
        // 假数据，这里是为了让图片显示
        this.releaseArticleApiParameter.imglist = '[1]'
        // this.releaseArticleApiParameter.imglist = [...this.releaseArticleApiParameter, ...e.tempFiles]
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
      },
      // 切换可见状态
      switchSee() {
        // 显示操作菜单
        uni.showActionSheet( {
          itemList: ['仅自己可见', '所有人可见'],
          success: async ( res ) => {
            if ( res.tapIndex === 0 ) {
              // 当前选中的是 仅自己可见
              this.releaseArticleApiParameter.isopen = 0
            } else if ( res.tapIndex === 1 ) {
              // 当前选中的是 所有人可见
              this.releaseArticleApiParameter.isopen = 1
            }
          },
          fail: ( res ) => {}
        } );
      },
      // 选择一个分类可选项时触发
      choosePostClass( e ) {
        this.releaseArticleApiParameter.post_class_id = ++e.target.value
      },
      // 点击话题后触发
      clickTopic() {
        uni.navigateTo( {
          url: '/pages/topicOptions/topicOptions'
        } )
      },
      // 点击图片上传图标后触发
      clickUploadImage() {
        // 调用选择图片上传窗口
        this.$refs.files.choose()
      },
      // 发布文章
      async releaseArticle() {
        console.log( this.releaseArticleApiParameter )
        const result = await releaseArticle( this.releaseArticleApiParameter );
        if ( result.msg === '发布成功' ) {
          uni.navigateBack( {
            delta: 1
          } );
        }
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
      this.getCategoryOptional()
      // 获取话题 id
      uni.$on( 'getTopicId', ( id ) => {
        this.releaseArticleApiParameter.topic_id = id
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
