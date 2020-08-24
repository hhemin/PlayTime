<template>
  <div class="activebox box-center">
    <div class="main center">
      <music ref="music"></music>
      <span class="iconfont icon-end" v-show="showend"></span>
      <h1>{{item.name || 'aaa'}}</h1>
      <time style="coloe:#002766">计划消耗{{item.time|| '时间'}}</time>
      <h3 style="font-size:50px;">{{lasttime}}</h3>
      <!-- <Time :time="item.time" ></Time> -->
      <div class="active-btnwarp df">
        <div class="active-btn" v-show="showbtnA">
          <span class="iconfont icon-pause" @click="stoptime"></span>
        </div>
        <div v-show="showbtnB" class="df" style="width:100%">
          <div class="active-btn" v-show="!showend">
            <span class="iconfont icon-ready" @click="onkeep"></span>
          </div>
          <div class="active-btn">
            <span class="iconfont icon-close" @click="close"></span>
          </div>
        </div>
      </div>
      <KToast
        :type="toast.type"
        v-model="toast.show"
        :duration="toast.time"
      >{{toast.title}}</KToast>
    </div>
  </div>
</template>

<script>
/**
 * @name 运行状态计划
 * */
import Vue from 'vue'
import axios from 'axios'
// import mpAdapter from 'axios-miniprogram-adapter'// 解决axios 在小程序能使用

// import { UpdataStatus } from '../../api/dayinfo'
import { GetTime } from '../static/js/getTime'
import constant from '../../config/constant'
import music from './music.vue'
import { mapActions } from 'vuex'
import { TOKEN, URL } from '../../config/httpinfo'
import { Toast } from '../../config/util'

export default Vue.extend({
  name: 'active',
  props: {
    item: {
      type: Object,
    }
  },
  components: {
    music
  },
  data() {
    return {
      lasttime: '时间开始',
      showbtnA: true,
      showend: false, // 结束提示 true，暂停 false
      toast: {
        type: 'success',
        title: '',
        show: false,
        time: 2000
      }
    }
  },
  watch: {
    lasttime(newvalue) {
      if (newvalue === '00:00:00') {
        this.showend = true
        this.stoptime({ statusvalue: 2 })
      }
    }
  },
  methods: {
    ...mapActions('home', ['getListdata']),
    close() {
      if (this.showend) {
        this.$refs.music.stop()
      }
      this.$emit('close', false)
      this.showbtnA = true
      this.getListdata()
    },
    // 运行
    runtime(time) {
      // time 格式 hhmmss
      this.lasttime = time
      GetTime.startTime(time)
      this.showend = this.$options.data.showend // 重置end
      this.$refs.music.playcontrol(time)
      const t = setInterval(() => {
        if (this.lasttime === '00:00:01') {
          clearInterval(t)
          this.showbtnA = false
        }
        this.lasttime = GetTime.getValue()
      }, 1000)
    },
    // 改变icon图标
    changeicon(changestatus) {
      switch (changestatus) {
        case constant.status[1]:
          this.item.status = 1
          this.item.icon = `icon-${constant.status[1]}`
          break
        case constant.status[2]:
          this.item.status = 2
          this.item.icon = `icon-${constant.status[2]}`
          break
        default:
          throw new Error('没这个参数呀')
      }
    },
    // 暂停
    stoptime({ statusvalue = 1 } = {}) {
      if (statusvalue === 1) {
        this.$refs.music.stop()
      }
      GetTime.stopTime()
      console.log(constant.status)
      this.changeicon(constant.status[statusvalue])// 放在GetTime.stopTime() 前面会导致小程序无法继续暂停
      const v = {
        dayInfo_id: this.item.dayInfo_id,
        finishtime: this.lasttime, // 剩下时间
        status: statusvalue, // 暂停设置1
      }
      this.toast = Toast.show({
        type: 'loading',
        title: '暂停中'
      })
      axios({
        method: 'POST',
        url: `${URL}/api/dayinfo/updataStatus`,
        data: v,
        auth: {
          username: TOKEN
        }
      }).then(() => {
        const That = this
        const time = 2000
        this.toast = Toast.show({
          title: '操作成功',
          time
        })
        // this.$set(this.toast,'time',time)// 无法触发
        setTimeout(() => {
          That.toast = Toast.hide()
        }, 2000)
      })
      this.showbtnA = false
      // try {
      //   await UpdataStatus(v)
      // } catch (err) {
      //   console.log(err)
      // }
    },
    onkeep() {
      this.runtime(this.lasttime)
      this.showbtnA = true
    }
  },
  computed: {
    showbtnB() {
      return !this.showbtnA
    }
  }
})
</script>

<style lang="less">
.activebox {
  width: 100%;
  min-height: 100%;
  .main {
     position: relative;
    .icon-end {
      position: absolute;
      top: -200px;
      right: -60px;
      z-index: -1;
      font-size: 200px;
      color: #ff4d4f;
      animation:mymove 3s ease-out ;
    }
  }
  h1 {
    color: #002329;
  }
  .active-btnwarp {
    transform: translateY(100px);
    max-width: 360px;
    .active-btn {
      padding: 10px 40px;
      flex: 1;
      display: flex;
      justify-content: center;
      span {
        font-size: 60px;
      }
      // width: 80px;
    }
  }
  @keyframes mymove {
    0%  {top:-180px;opacity: 0;}
    100% {top:-200px;opacity: 1;}
  }
  // .main {
  // }
}
</style>
