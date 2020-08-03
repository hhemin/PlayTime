<template>
  <div class="Screenbox bg-white" v-show="visible">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Screen',
  props: {
    visible: {
      type: Boolean
    },
  },
  data() {
    return {
      show: false,
    }
  },
  // watch: {
  //   visible(value) {
  //     console.log(value);
  //     if (val) {
  //       this.$emit('open');
  //       if (this.appendToBody) {
  //         document.body.appendChild(this.$el);
  //       }
  //       this.prevActiveElement = document.activeElement;
  //       this.$nextTick(() => {
  //         Utils.focusFirstDescendant(this.$refs.drawer);
  //       });
  //     } else {
  //       this.$nextTick(() => {
  //         if (this.prevActiveElement) {
  //           this.prevActiveElement.focus();
  //         }
  //       });
  //     }
  //   }
  // },
}
</script>

<style lang="less">
.Screenbox {
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 50;
}
</style>
