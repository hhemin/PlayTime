<template>
  <div class="iconitem">
     <span class="iconfont" :class="[icon]"></span>
     <p>{{text}}</p>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="less">
.iconitem {
  p {
    font-size: 14px;
  }
}
</style>
