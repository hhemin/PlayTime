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
      class="none"
      >
      您的浏览器不支持 audio标签。
    </audio>
  </div>
</template>

<script>
import Vue from 'vue'
import moment from 'moment'
import WM from '../static/js/wm'

let setfn = ''
// const Audiomp = WM.obj({
//   mpobj: wx.createInnerAudioContext()
// })


export default Vue.extend({
  name: 'music',
  data() {
    return {
      mp3: 'http://cdn.hmepay.cn/TimePlay/mp3/music.mp3',
      show: false,
      Audiomp: ''
    }
  },
  created() {
    if (process.env.isMiniprogram) {
      this.Audiomp = wx.createInnerAudioContext()
    }
  },
  methods: {
    playcontrol(time) {
      const timeForm = moment(time, 'hhmmss')
      const hour = Number(timeForm.format('HH'))
      const min = Number(timeForm.format('mm'))
      const second = Number(timeForm.format('ss'))
      const v = ((hour * 60 * 60) + (min * 60) + second) * 1000
      const audio = this.$refs.audio
      WM.fn({
        webfn: () => {
          // console.log('web开始静音播放')
          audio.play()
          audio.muted = true
        },
        mpfn: () => {
          // mp 不用静音播放
          this.Audiomp.src = this.mp3
          this.Audiomp.obeyMuteSwitch = false // 即使用户打开了静音开关，也能继续发出声音
        }
      })
      const That = this
      setfn = setTimeout(() => {
        // console.log('播放')
        That.show = true
        WM.fn({
          webfn: () => {
            audio.currentTime = 0
            audio.muted = false
            audio.play()
          },
          mpfn: () => {
            // console.log('mp播放')
            That.Audiomp.play()
            That.Audiomp.onError((res) => {
              console.log(res.errMsg)
              console.log(res.errCode)
            })
          }
        })
      }, v)
    },
    stop() {
      const audio = this.$refs.audio
      console.log('暂停')
      WM.fn({
        webfn: () => {
          audio.pause()
        },
        mpfn: () => {
          this.Audiomp.stop()
        }
      })
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
