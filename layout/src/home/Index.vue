<template>
  <div class="home">
    <header class="fixed header" @click="goAdd">
      <Header>
        <div slot="main">TimePlay
          <span class="iconfont icon-tianjia"></span>
          <span style="font-size:13px">(点击添加)</span>
        </div>
      </Header>
    </header>
    <main class="mt-header content mb-footer">
      <Boxshow
      class="p10 boder-R mb10 df bg-white"
      v-for="(item,index) in listdata"
      :key="index"
      >
        <div class="fiex">
          <h3
            v-if="item.status === 1"
            @click="onDelete(item.dayInfo_id)">
            {{item.name}}
            <span class="iconfont icon-shanchu"></span>
          </h3>
          <h3 v-else-if="item.status === 0"
            @click="onEditor(item)">
            {{item.name}}
            <span class="iconfont icon-bianji"></span>
          </h3>
          <h3 v-else>
            {{item.name}}
          </h3>
          <span>计划时间:{{item.time}}</span>
          <p v-if="item.status != 2" class="c-verdant">{{item.status == 0? '未开始':`暂停中,剩下${item.finishtime}`}}</p>
        </div>
        <div class="btn box-center box"
        :class="[item.status]"
        @click="onGo(item)">
          <span class="iconfont" :class="item.icon"></span>
        </div>
      </Boxshow>
      <!-- <router-link to="/login">登录</router-link> -->
    </main>
    <!-- <div>
      <a href="/test/list/321">当前页跳转</a>
      <a href="/test/detail/123" target="_blank">新开页面跳转</a>
      <button @click="onClickJump">当前页跳转</button>
      <button @click="onClickOpen">新开页面跳转</button>
    </div> -->
    <!-- <Footer></Footer> -->
    <Screen :visible="visible" >
      <Active :item.sync="activedata" @close="close" ref="active"></Active>
    </Screen>
    <Screen :visible="editorvisible">
      <component :is="Editor" :item.sync="editordata" @close="close"></component>
    </Screen>
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
import Vue from 'vue'
import Header from '../common/Header.vue'
// import Footer from '../common/Footer.vue'
import Boxshow from '../common/Boxshow.vue'
// import Screen from '../common/Screen.vue'
import Active from '../components/active.vue'
// import Editor from '../components/editor.vue'
import Web from 'reduce-loader!../common/Web.vue'
import 'reduce-loader!./web'
import { GetDayInfo, DeleteInfo } from '../../api/dayinfo'
import { Tip, Dialog } from '../../config/util'
import constant from '../../config/constant'

// const status = {
//   0: 'ready',
//   1: 'pause',
//   2: 'end'
// }

export default Vue.extend({
  name: 'Home',
  data() {
    return {
      listdata: [
        // {
        //   name: 'javaScript',
        //   time: 5,
        //   status: 'ready', // 状态（3个）未开启
        //   icon: 'icon-ready'
        // },
        // {
        //   name: '数据结构',
        //   time: 30,
        //   status: 'pause', // 状态（3个）暂停
        //   icon: 'icon-pause'
        // },
        // {
        //   name: 'java',
        //   time: 10,
        //   status: 'end', // 状态（3个）结束
        //   icon: 'icon-end'
        // }
      ],
      activedata: {},
      visible: false, // 开始计划 显示与隐藏对话框
      editorvisible: false, // 编辑 显示与隐藏对话框
      editordata: {},
      Editor: null,
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
    }
  },
  components: {
    Header,
    // Footer,
    Web,
    Boxshow,
    // Screen,
    Active,
    // 'Editor':() => import('../components/editor.vue')
  },
  computed: {
    // 通过计算属性动态引入组件
    loaderWiew() {
      return () => import('../components/editor.vue')
    }
  },
  created() {
    window.addEventListener('wxload', query => console.log('page1 wxload', query))
    window.addEventListener('wxshow', () => console.log('page1 wxshow'))
    window.addEventListener('wxready', () => console.log('page1 wxready'))
    window.addEventListener('wxhide', () => console.log('page1 wxhide'))
    window.addEventListener('wxunload', () => console.log('page1 wxunload'))

    if (process.env.isMiniprogram) {
      console.log('I am in miniprogram')
    } else {
      console.log('I am in Web')
    }
    this.getData()
  },
  methods: {
    onClickJump() {
      // window.location.href = '/test/list/123'
      window.open('/test/detail/123')
    },
    onClickOpen() {
      window.open('/test/detail/123')
    },
    onGo(item) {
      if(item.status === 2) return false
      this.show()
      this.activedata = item
      this.$refs.active.runtime(item.time)
    },
    show() {
      this.visible = true
    },
    close(value) {
      this.visible = value
      this.editorvisible = value
    },
    goAdd() {
      window.location.href = '/add'
    },
    formatdata(data) {
      const table = []
      data.forEach((item) => {
        const tableitem = {
          name: item.dayInfo_name,
          time: item.dayInfo_time,
          icon: `icon-${constant.status[item.status]}`,
          status: constant.status[item.status],
          ...item
        }
        table.push(tableitem)
      })
      return table
    },
    async getData() {
      try {
        const { data: { data } } = await GetDayInfo()
        this.listdata = this.formatdata(data)
      } catch (err) {
        console.log(err)
      }
    },
    onEditor(value) {
      this.loaderWiew().then(() => {
        // 动态加载组件
        this.Editor = () => this.loaderWiew()
      })
      // .catch(() => {
      // 组件不存在时处理
      // this.renderView = () => import("@/components/EmptyView.vue");
      // })
      this.editordata = value
      this.editorvisible = true
      console.log(value)
    },
    async onDeleteData(id) {
      await DeleteInfo({
        dayInfo_id: id
      })
      this.tip = {
        ...new Tip('删除记录计划成功', 'success').show()
      }
      this.getData()
    },
    onDelete(id) {
      const v = Dialog.show({
        title: '是否进行删除当前计划',
        diaBtn: [
          {
            text: '确定',
            click: () => {
              this.onDeleteData(id)
              this.dislog.show = false
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
  },
})
</script>

<style lang="less">
.home {
  .header {
    width: 100%;
    top: 0;
    z-index: 10;
  }
  .btn {
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: -14px 4rem 19rem 11px rgb(0, 0, 0, 0.8);
    transition: box-shadow 0.3s ease-out, transform 0.3s ease-out,
    opacity 0.4s ease-out;
    transition-delay: 0.1s;
    transform: rotate(0.5turn);
  }
  .btn .iconfont {
    font-size: 3.5rem;
  }
  .ready {
    border: 10px solid #096dd9;
    color: #096dd9;;
  }
  .pause {
    border: 10px solid #00474f;
    color: #00474f;
  }
  .end {
    border: 10px solid #bfbfbf;
    color: #bfbfbf;
    transform: rotate(0);
  }
  .btn:active {
    box-shadow: none;
    transform: rotate(0);
    // transform: translate(0, 0rem);
  }
}
</style>
