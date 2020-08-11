<template>
  <div class="addbox">
    <Header :back="true">
      <div slot="main">添加记录</div>
    </Header>
    <p class="center c-blue p10 box">今天计划时间有 {{time}} 小时</p>
    <div class="box">
      <KCells>
      <KInput label="活动名称"
      placeholder="填写活动名称"
      clearable
      v-model="name"/>
      <KCell
      :footer="timeactive">
        <div slot="title" @click="showChose" style="flex:1">
          重复时间
        </div>
      </KCell>
      <div style="padding:16px" class="box">
        分钟:<KSlider :show-value="true" :min="0" :max="60" bindchange="getMin" v-model="min"/>
        小时:<KSlider :show-value="true" :min="0" :max="24" bindchange="getHour" v-model="hour"/>
      </div>
      </KCells>
      <KButton type="primary" class="btn" @click="putFrom">提交</KButton>
    </div>
    <!-- 弹出选择 -->
    <KActionSheet
      :actions="dayvalue"
      v-model="isShowTitle"
      @click='actionChoose'
    />
     <KToptips v-model="tip.show" :type="tip.type" :duration="1000">
        {{tip.text}}
      </KToptips>
  </div>
</template>

<script>
import Vue from 'vue'
import Header from '@/common/Header.vue'
import {Tip} from '../../config/util'
import {AddDayInfo} from '../../api/dayinfo'

const dayvalue = ['永不', '每天', '每周', '每月']

export default Vue.extend({
  name: 'add',
  components: {
    Header
  },
  data() {
    return {
      time: 0,
      name: '',
      isShowTitle: false,
      timeactive: '永不',
      dayvalue,
      min: 0,
      hour: 0,
      tip: {
        show: false,
        type: 'info',
        text: ''
      }
    }
  },
  methods: {
    // 时间选择器
    actionChoose(e) {
      this.timeactive = e
      this.closeChose()
    },
    showChose() {
      this.isShowTitle = true
    },
    closeChose() {
      this.isShowTitle = false
    },
    getMin() {
      console.log(this.min)
    },
    async putFrom() {
      const alltime = Number(this.min) + (Number(this.hour) * 60)
      if (this.name === '') {
        this.tip = {
          ...new Tip('活动名称不能为空','error').show()
        }
        return false
      }
      if (alltime === 0) {
        this.tip = {
          ...new Tip('时间不能为空哦','error').show()
        }
        return false
      }
      const repeatValue = {
        '永不': () => 1,
        '每天': () => 2,
        '每周': () => 3,
        '每月': () => 4,
      }
      // let datavalue  = {
      //   dayInfo_name: this.name,
      //   dayInfo_repeat: repeatValue[this.timeactive](),
      //   dayInfo_time: this.min+this.hour*60,
      // }
      // axios({
      //   method: 'post',
      //   url: 'http://localhost:3000/api/dayinfo/add',
      //   data: data,
      //   auth: {
      //     username: localStorage.getItem('token')
      //   }
      // }).then((res) => {
      //   console.log(res)
      // }).catch((err) => {
      //  console.log(err.response)
      // })
      try {
        let data = await AddDayInfo({
        dayInfo_name: this.name,
        dayInfo_repeat: repeatValue[this.timeactive](),
        dayInfo_time: this.min+this.hour*60,
      })
        this.tip  = {
          ...new Tip(data.data.msg||'success','success').show()
        }
      }catch(err) {
        this.tip  = {
          ... new Tip(err.response.data.msg||'错误','error').show()
        }
      }
      return true
    }
  }
})
</script>

<style lang="less">
.addbox {
  .btn {
    position: fixed;
    bottom: 50px;
    left: 0;
    right: 0;
    width: 80%;
  }
}
</style>
