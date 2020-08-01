<template>
  <div class="footer fixed">
    <KFlex>
      <KFlexItem v-for="(item,index) in muneitem"
      :key="index" class="item bg-white"
      :class="[active === item.router ? 'c-blue':'c-gray']"
      >
        <KView class="placeholder" @click="goMenu(item)">
          <IconItem :text="item.text" :icon="item.icon"></IconItem>
        </KView>
      </KFlexItem>
    </KFlex>
  </div>
</template>

<script>
import IconItem from './iconitem.vue'

export default {
  name: 'Footer',
  components: {
    IconItem
  },
  data() {
    return {
      muneitem: [
        {
          text: '首页',
          icon: 'icon-home',
          router: '/'
        },
        {
          text: '状况',
          icon: 'icon-time',
          router: '/day'
        },
        {
          text: '我的',
          icon: 'icon-me',
          router: '/me'
        }
      ],
      active: '/'
    }
  },
  created() {
    // console.log(this.$route.path)
    this.active = this.$route.path
  },
  methods: {
    goMenu(value) {
      this.active = value.router
      window.location.href = value.router
    }
  }
}
</script>

<style lang="less">
@import url('../static/css/color.css');
.footer {
  margin-top: 10px;
  width: 100%;
  text-align: center;
  bottom: 0;
  height: 50px;
  box-shadow: 0px -13px 20px 0px rgba(0, 0, 0, 0.05);
  .item {
    cursor: pointer;
  }
  .item:active {
    background: #fbfbfb;
  }
}
</style>
