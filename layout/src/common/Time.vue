<template>
  <div>
    {{time}}
  </div>
</template>

<script>
// import GetTime from '../static/js/getTime'

export default {
  name: 'Time',
  props: {
    time: {
      type: [String, Number, Array],
      default: '倒计时'
    }
  },
  methods: {}
}
</script>

<style lang="less">

</style>
