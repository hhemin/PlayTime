<template>
  <div class="loginbox">
    <div class="formmian" :model="form">
      <div class="df inputitem">账号<input type="text" v-model="form.username"/></div>
      <div class="df inputitem">密码<input type="password" v-model="form.password"/></div>
      <a href="/register" class="c-blue" style="font-size:13px;">注册账号</a>
      <KButton type="primary"
      style="width:100%;max-width:360px;margin-top:20px"
      @click="onlogin">登录</KButton>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'login',
  data() {
    return {
      form: {
        username: '',
        password: '',
      }
    }
  },
  methods: {
    onlogin() {
      axios.post('http://localhost:3000/api/users/login', {
        username: this.form.username,
        password: this.form.password
      }).then((response) => {
        console.log(response)
        let {data:{data}} = response
        localStorage.setItem('token',data);
        console.log(data)
      }).catch((error) => {
        console.log(error.response)
      })
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
