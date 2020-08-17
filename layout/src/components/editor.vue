<template>
  <div class="editorbox">
    <p class="center c-blue p10 box">今天计划时间有 {{time}} 小时</p>
    <div class="box" :model="formitem">
      <KCells>
      <KInput label="活动名称"
      placeholder="填写活动名称"
      clearable
      v-model="formitem.name"/>
      <KCell
      :footer="formitem.timeactive">
        <div slot="title" @click="showChose" style="flex:1">
          重复时间
        </div>
      </KCell>
      <div style="padding:16px" class="box">
        分钟:<KSlider
        :show-value="true"
        :min="0"
        :max="59"
        bindchange="getMin"
        v-model="formitem.min"/>
        小时:<KSlider
        :show-value="true"
        :min="0"
        :max="24"
        bindchange="getHour"
        v-model="formitem.hour"/>
      </div>
      </KCells>
      <div class="btnwarp">
        <KButton
        type="primary"
        class="editor-btn"
        @click="putFrom">提交</KButton>
        <KButton
        class="editor-btn"
        @click="cancel">取消</KButton>
        <KButton
        type="warn"
        class="editor-btn"
        :loading="deletetip"
        :disabled="deletetip"
        @click="onDelete">删除</KButton>
      </div>
    </div>
    <!-- 弹出选择 -->
    <KActionSheet
      :actions="dayvalue"
      v-model="isShowTitle"
      @click='actionChoose'
    />
    <!-- 提示 -->
     <KToptips v-model="tip.show" :type="tip.type" :duration="1000">
      {{tip.text}}
    </KToptips>
    <KDialog
      v-model="dislog.show"
      :buttons="dislog.diaBtn"
      :title="dislog.title"
    />
  </div>
</template>

<script>
import { Tip, Dialog } from '../../config/util'
import constant from '../../config/constant'
import { UpdateInfo, DeleteInfo } from '../../api/dayinfo'
import { mapActions } from 'vuex'

export default {
  props: {
    item: {
      type: Object
    }
  },
  data() {
    return {
      firstName: 'Foo',
      // formitem: {
      //   name: '',
      //   min: 0,
      //   hour: 0,
      //   repeat: 0,
      //   timeactive: '永不',
      // },
      dayvalue: constant.dayvalue,
      isShowTitle: false,
      time: 0,
      tip: {
        show: false,
        type: 'info',
        text: ''
      },
      dislog: {
        show: false,
        title: '',
        diaBtn: [],
      },
      deletetip: false,
    }
  },
  watch: {
    // item(newvalue,oldvalue) {
    //   console.log(123213)
    //   const itemdata = newvalue || oldvalue
    //   let _v = {
    //     min: itemdata.dayInfo_minute,
    //     hour: itemdata.dayInfo_hour,
    //     name: itemdata.dayInfo_name,
    //     repeat: itemdata.dayInfo_repeat,// 重复时间id
    //     timeactive: dayvalue[itemdata.dayInfo_repeat]
    //   }
    //   this.formitem = _v
    // }
  },
  methods: {
    ...mapActions('home', ['getListdata']),
    getData(value) {
      console.log(value)
    },
    // 时间选择器
    actionChoose(e, index) {
      // console.log(e,index)
      this.formitem.timeactive = e
      this.formitem.repeat = index
      this.closeChose()
    },
    showChose() {
      this.isShowTitle = true
    },
    closeChose() {
      this.isShowTitle = false
    },
    getMin() {
      console.log(this.formitem.min)
    },
    async putFrom() {
      const formdata = this.formitem
      const v = {
        dayInfo_hour: formdata.hour,
        dayInfo_name: formdata.name,
        dayInfo_time: `${formdata.hour}:${formdata.min}:00`,
        dayInfo_minute: formdata.min,
        dayInfo_id: formdata.dayInfo_id
      }
      const { data } = await UpdateInfo(v)
      this.getListdata()
      this.tip = {
        ...new Tip(data.msg, 'success').show()
      }
      const t = setTimeout(() => {
        this.cancel()
        clearTimeout(t)
      }, 1000)
    },
    onDelete() {
      const v = Dialog.show({
        title: '是否进行删除当前计划',
        diaBtn: [
          {
            text: '确定',
            click: () => {
              this.DeleteFn()
              this.deletetip = true
              this.dislog.show = false
              const t = setTimeout(() => {
                this.cancel()
                clearTimeout(t)
              }, 1000)
            }
          },
          {
            text: '取消',
            click: () => {
              this.dislog.show = false
            }
          }
        ]
      })
      this.dislog = v
    },
    async DeleteFn() {
      await DeleteInfo({
        dayInfo_id: this.formitem.dayInfo_id
      })
      this.tip = {
        ...new Tip('删除记录计划成功', 'success').show()
      }
    },
    cancel() {
      this.$emit('close', false)
      Object.assign(this.$data, this.$options.data())
    },
  },
  computed: {
    formitem() {
      const itemdata = this.item
      const v = {
        min: itemdata.dayInfo_minute,
        hour: itemdata.dayInfo_hour,
        name: itemdata.dayInfo_name,
        repeat: itemdata.dayInfo_repeat, // 重复时间id
        timeactive: constant.dayvalue[itemdata.dayInfo_repeat],
        dayInfo_id: itemdata.dayInfo_id
      }
      return v
    },
  }
}
</script>

<style lang="less">
.editorbox {
  .btnwarp {
    position: fixed;
    bottom: 50px;
    left: 0;
    right: 0;
    width: 80%;
    margin: auto;
    .editor-btn {
      width: 100%;
    }
  }
}
</style>
