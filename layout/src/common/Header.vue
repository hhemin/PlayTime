<template>
  <KFlex class="bg-blue content headerbox">
    <div class="headerbtn" v-show="back" @click="Back">
      <span class="iconfont icon-back c-white"></span>
    </div>
    <KFlexItem class="main">
      <KView class="placeholder center c-white">
        <slot name="main"></slot>
      </KView>
    </KFlexItem>
    <div class="headerbtn">
      <!-- <span class="iconfont icon-tianjia"></span> -->
    </div>
  </KFlex>
</template>

<script>
export default {
  props: {
    back: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    Back() {
      if (process.env.isMiniprogram) {
        wx.navigateBack()
      } else {
        window.history.go(-1)
      }
    }
  }
}
</script>

<style lang="less">
.headerbox {
  width: 100%;
  top: 0;
  .box {
    .headerbtn {
      width: 10rem !important;
      height: 10rem !important;
    }
  }
}
</style>
