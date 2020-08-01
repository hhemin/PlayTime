<template>
  <KFlex class="bg-blue content headerbox">
    <div class="headerbtn" v-show="back">返回按钮</div>
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
