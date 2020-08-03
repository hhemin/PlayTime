<template>
  <div class="loginbox">
    <div class="formmian" :model="form">
      <div class="df inputitem">账号<input type="text" v-model="form.name"/></div>
      <div class="df inputitem">密码<input type="password" v-model="form.password"/></div>
      <KButton type="primary"
      style="width:100%;max-width:360px;margin-top:20px"
      @click="onRegister">注册</KButton>
    </div>
  </div>
</template>

<script>
export default {
  name: 'register',
  data() {
    return {
      form: {
        name: '',
        password: '',
      }
    }
  },
  methods: {
    onRegister() {
      console.log('123')
    }
  }
}
</script>

<style lang="less">
.loginbox {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .formmian {
    width: 80%;
    max-width: 360px;
    .inputitem {
      align-items: center;
      margin-bottom: 10px;
    }
    input {
      margin-left: 10px;
      outline: none;
      padding: 10px;
      display: block;
      flex: 1;
    }
  }
}
</style>
