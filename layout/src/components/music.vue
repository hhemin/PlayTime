<template>
  <div>
    <!-- <p @click="playcontrol">播放</p> -->
   <span v-show="show">正在播放音乐中</span>
    <audio
      :src="mp3"
      controls="controls"
      loop="loop"
      class="none"
      ref="audio">
      您的浏览器不支持 audio标签。
    </audio>
  </div>
</template>

<script>
import moment from 'moment'

let setfn = ''

export default {
  name: 'music',
  data() {
    return {
      mp3: '',
      show: false,
    }
  },
  methods: {
    playcontrol(time) {
      const timeForm = moment(time, 'hhmmss')
      const hour = Number(timeForm.format('HH'))
      const min = Number(timeForm.format('mm'))
      const second = Number(timeForm.format('ss'))
      const v = ((hour * 60 * 60) + (min * 60) + second) * 1000
      console.log('开始静')
      this.$refs.audio.src = 'http://cdn.hmepay.cn/TimePlay/mp3/music.mp3'
      const audio = this.$refs.audio
      const That = this
      audio.play()
      audio.muted = true
      // console.log(v)
      setfn = setTimeout(() => {
        console.log('播放')
        audio.currentTime = 0
        That.show = true
        audio.play()
        audio.muted = false
      }, v)
    },
    stop() {
      const audio = this.$refs.audio
      console.log('暂停')
      audio.pause()
      audio.muted = true
      this.show = false
      clearTimeout(setfn)
      setfn = ''
    }
  }
}
</script>

<style lang="less">
.none {
  display: none;
}
</style>
