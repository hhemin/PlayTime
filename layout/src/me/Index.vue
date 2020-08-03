<template>
  <div class="mebox">
    <div class="photo box"  :style="{backgroundImage:`url(${src})`}" >
      <div class="myphoto"></div>
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
  </div>
</template>

<script>
export default {
  name: 'me',
  data() {
    return {
      src: '',
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
        }
      ]
    }
  },
  created() {
    const imgvalue = ['fdl.jpg', 'fdp.jpg', 'fgz.jpg']
    this.src = `http://cdn.hmepay.cn/TimePlay/${imgvalue[Math.floor((Math.random() * imgvalue.length))]}`
  },
  methods: {
    go(value) {
      console.log(value)
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
      border-radius: 50%;
      background-color: yellow;
      transform: translate(20px, 130px);
    }
  }
  .info {
    padding-left: 130px;
    height: 55px;
  }
}
</style>
