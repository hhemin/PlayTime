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
          <h3>{{item.name}}</h3>
          <span>计划时间:{{item.time}}</span>
          <!-- <p>{{}}</p> -->
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
      <Active :item.sync="activedata" @close="close"></Active>
    </Screen>
  </div>
</template>

<script>
import Vue from 'vue'
import Header from '../common/Header.vue'
// import Footer from '../common/Footer.vue'
import Boxshow from '../common/Boxshow.vue'
// import Screen from '../common/Screen.vue'
import Active from '../components/active.vue'
import Web from 'reduce-loader!../common/Web.vue'
import 'reduce-loader!./web'
import {GetDayInfo} from '../../api/dayinfo'
const status = {
  '0': 'ready',
  '1': 'pause',
  '2': 'end'
}

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
      visible: false, // 显示与隐藏对话框
    }
  },
  components: {
    Header,
    // Footer,
    Web,
    Boxshow,
    // Screen,
    Active,
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
      // console.log(this)
      this.show()
      this.activedata = item
    },
    show() {
      this.visible = true
    },
    close(value) {
      this.visible = value
    },

    goAdd() {
      window.location.href = '/add'
    },

    formatdata(data) {
      let table = []
      data.forEach((item) => {
        let tableitem = {
          name:item.dayInfo_name,
          time:item.dayInfo_time,
          icon:`icon-${status[item.status]}`,
          status:status[item.status],
          ...item
        }
        table.push(tableitem)
      })
      return table
    },

    async getData() {
      try {
        let {data:{data}} = await GetDayInfo()
        this.listdata = this.formatdata(data);
      }catch(err) {
        console.log(err)
      }
    }

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
