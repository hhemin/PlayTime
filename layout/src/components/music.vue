<template>
  <div>
    <!-- <p @click="playcontrol">播放</p> -->
   <span v-show="show">正在播放音乐中</span>
    <audio
      src="http://cdn.hmepay.cn/TimePlay/mp3/music.mp3"
      controls
      loop
      ref="audio"
      type="audio"
      :action="audioAction"
      class="none"
      >
      您的浏览器不支持 audio标签。
    </audio>
  </div>
</template>

<script>
import Vue from 'vue'
import moment from 'moment'

let setfn = ''

export default Vue.extend({
  name: 'music',
  data() {
    return {
      mp3: 'http://cdn.hmepay.cn/TimePlay/mp3/music.mp3',
      show: false,
      audioAction: {
        method: 'pause'
      }
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
      // this.$refs.audio.src = 'http://cdn.hmepay.cn/TimePlay/mp3/music.mp3'
      const audio = this.$refs.audio
      const That = this
      // audio.play()
      this.audioAction.method = 'play'
      audio.muted = true
      // console.log(v)
      setfn = setTimeout(() => {
        console.log('播放')
        audio.currentTime = 0
        That.show = true
        // audio.play()
        this.audioAction.method = 'play'
        audio.muted = false
      }, v)
    },
    stop() {
      const audio = this.$refs.audio
      console.log('暂停')
      // audio.pause()
      this.audioAction.method = 'pause'
      audio.muted = true
      this.show = false
      clearTimeout(setfn)
      setfn = ''
    }
  }
})
</script>

<style lang="less">
.none {
  display: none;
}
</style>
