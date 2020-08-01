<template>
  <div>
    <router-view/>
    <Fooder></Fooder>
  </div>
</template>

<script>
import Fooder from '@/common/Footer.vue'

export default {
  name: 'menu',
  components: {
    Fooder
  }
}
</script>

<style lang="less"></style>
