<template>
  <div class="mebox">
    <div class="photo box"  :style="{backgroundImage:`url(${src})`}" >
      <div class="myphoto box">
         <img :src="usresrc" alt="" class="userimg">
      </div>
      <div class="flex"></div>
    </div>
    <div class="info box">
       <p>ID:{{id}}</p>
    </div>
    <!-- <div class="list">
      <div class="item box" v-for="(item,index) in list" :key="index" @click="go(item)">
        {{item.name}}
      </div>
    </div> -->
    <KCells>
      <KCell
          value=""
          footer=""  v-for="(item,index) in list" :key="index">
          <div slot="title" style="flex:1;font-size: 13px;" @click="go(item)">{{item.name}}</div>
      </KCell>
    </KCells>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from '../common/Footer.vue'

export default {
  name: 'me',
  data() {
    return {
      src: '',
      usresrc: 'http://cdn.hmepay.cn/TimePlay/info.png',
      id: '1231231231',
      list: [
        {
          name: '微信绑定',
          router: '',
        },
        {
          name: '修改密码',
          router: '',
        },
        {
          name: '关于我们',
          router: ''
        },
        {
          name: '登录',
          router: '/login'
        }
      ]
    }
  },
  components: {
    Footer
  },
  created() {
    const imgvalue = ['fdl.jpg', 'fdp.jpg', 'fgz.jpg']
    this.src = `http://cdn.hmepay.cn/TimePlay/${imgvalue[Math.floor((Math.random() * imgvalue.length))]}`
  },
  methods: {
    go(value) {
      this.$router.push({ path: value.router })
      // console.log(value)
    }
  }
}
</script>

<style lang="less">
.mebox {
  background-color: #ffffff;
  box-shadow: 1px 4px 13px 0px #00000036;
  .photo {
    height: 250px;
    width: 100%;
    display: flex;
    align-items: center;
    background-repeat: no-repeat;
    object-fit:cover;
    background-size: cover;
    background-position: center;
    .myphoto {
      width: 100px;
      height: 100px;
      border-radius: 10px;
      overflow: hidden;
      transform: translate(20px, 130px);
      box-shadow: 0px 1px 5px 0px #868686;
      border: 5px solid #eaeaea;
      .userimg {
        width: 100%;
        height: 100%;
       transform:scaleX(1)
      }
    }
  }
  .info {
    padding-left: 130px;
    height: 55px;
  }
}
</style>
