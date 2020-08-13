<template>
  <div class="loginbox">
    <div class="formmian" :model="form">
      <div class="df inputitem">账号<input type="text" v-model="form.username"/></div>
      <div class="df inputitem">密码<input type="password" v-model="form.password"/></div>
      <a href="/register" class="c-blue" style="font-size:13px;">注册账号</a>
      <KButton type="primary"
      style="width:100%;max-width:360px;margin-top:20px"
      @click="onlogin">登录</KButton>
      <KToptips v-model="tip.show" :type="tip.type" :duration="1000">
        {{tip.text}}
      </KToptips>
    </div>
  </div>
</template>

<script>
import { GetToken } from '../../api/users'
import { Tip } from '../../config/util'

export default {
  name: 'login',
  data() {
    return {
      form: {
        username: '',
        password: '',
      },
      tip: {
        show: false,
        type: 'info',
        text: ''
      }
    }
  },
  methods: {
    async onlogin() {
      try {
        const { data } = await GetToken({
          username: this.form.username,
          password: this.form.password
        })
        this.tip = {
          ...new Tip(data.msg || '', 'success').show()
        }
        localStorage.setItem('token', data.data)
        this.$router.push('/')
      } catch (err) {
        // console.log(err)
        this.tip = {
          ...new Tip(err.response.data.msg || '错误', 'error').show()
        }
      }
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
