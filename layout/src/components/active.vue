<template>
  <div class="activebox box-center">
    <div class="mian center">
      <h1>{{item.name || 'aaa'}}</h1>
      <time class="c-gray">计划{{item.time|| '时间'}}min</time>
      <br>
      剩下时间 <Time :time="item.time"></Time>
       {{lasttime}} 
       <!-- {{timestart}} -->
      <KButton v-show="visibletime" @click="stoptime">点我暂停</KButton>
      <KButton v-show="visible" @click="close">关闭</KButton>
    </div>
  </div>
</template>

<script>
/**
 * @name 运行状态计划
 * */
import Time from '../common/Time.vue'
import {UpdataStatus} from '../../api/dayinfo'
const status = {
  '0': 'ready',
  '1': 'pause',
  '2': 'end'
}

export default {
  name: 'active',
  components: {
    Time
  },
  props: {
    item: {
      type: Object,
    }
  },
  data() {
    return {
      lasttime: '时间开始',
      visible: false,
      visibletime: true
    }
  },
  watch: {
    lasttime(newvalue) {
      if (newvalue === 0) this.visibletime = false
    },
    visibletime(newvalue, oldvalue) {
      this.visible = oldvalue
    }
  },
  methods: {
    close() {
      this.$emit('close', false)
      this.visibletime = true
      this.visibletime = false
    },
    // 计算剩下时间
    hastime() {
      // if(lasttime == 0) {
      //   this.visibletime = false
      // }
    },
    // 运行
    runtime() {

    },
    // 改变icon图标
    changeicon(changestatus) {
      switch(changestatus) {
        case status[1] :
          this.item.status = 1 
          this.item.icon = `icon-${status[this.item.status]}`
          break
        case status[2] :
          this.item.status = 2 
          this.item.icon = `icon-${status[this.item.status]}`
          break
        default:
          throw new Error('没这个参数呀')
      }
    },
    // 暂停
    async stoptime() {
      this.visible = true
      this.changeicon('pause')
      //  console.log(this.item)
       let _v = {
         dayInfo_id:this.item.dayInfo_id,
         finishtime:'00:58:00',// 剩下时间
         status:1,//暂停设置1
       }
      try {
        let data = await UpdataStatus(_v)
      }catch(err) {
        console.log(err)
      }
    }
    // getTime(value) {
    //   let That = this;
    //   let Timevalue = value
    //   let fn = setInterval(() => {
    //     Time.RunTime(Timevalue,fn)
    //   },1000)
    // }
  },
  computed: {
    // timestart() {
    // let v = this.item.time
    // if(!v) return false
    // const That = this
    // let fn =  setInterval(()=> {
    //     --v
    //     That.lasttime = v
    //     if(v === 0) clearInterval(fn)
    //    console.log(v)
    //  },1000)
    // }
  }
}
</script>

<style lang="less">
.activebox {
  width: 100%;
  min-height: 100%;
  h1 {
    color: #f5222d;
  }
  // .main {
  // }
}
</style>
