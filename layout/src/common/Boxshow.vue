<template>
  <div class="boxshow">
    <slot></slot>
  </div>
</template>

<script>
// @name 边框
export default {}
</script>

<style lang="less">
@import url('../static/css/color.css');
.boxshow {
  box-shadow: 0 .125rem 1.25rem 0 rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.3s ease-out, transform 0.3s ease-out,
    opacity 0.4s ease-out;
  transition-delay: 0.1s;
  transform: translateZ(0);
  // background-color: @white;
}
.boxshow:active {
  // background-color: @white;
  box-shadow: none;
  transform: translate(0, 0rem);
  // z-index: 999;
}
</style>
