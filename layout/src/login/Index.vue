<template>
  <div class="loginbox">
    <div class="formmian" :model="form">
      <div class="df inputitem">账号<input type="text" v-model="form.username"/></div>
      <div class="df inputitem">密码<input type="password" v-model="form.password"/></div>
      <a href="/register" class="c-blue" style="font-size:13px;">注册账号</a>
      <KButton type="primary"
      style="width:100%;max-width:360px;margin-top:20px"
      @click="onlogin">登录</KButton>
      <KToptips v-model="infoShow" :type="Tipsinfo" :duration="1000">
        {{tipstext}}
      </KToptips>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {GetToken} from '../../api/users'
import {Tip} from '../../config/util'

export default {
  name: 'login',
  data() {
    return {
      form: {
        username: '',
        password: '',
      },
      infoShow: false,
      Tipsinfo: 'info',
      tipstext: ''
    }
  },
  methods: {
    async onlogin() {
      try {
        let {data} = await GetToken({
          username: this.form.username,
          password: this.form.password
        })
        console.log(data)
        const {type,text,show} = new Tip('出错了','error').show()
        console.log(type,text,show)
        localStorage.setItem('token',data)
      }catch(err) {
        const t =  new Tip('出错了','error').show()
        console.log(t)
        console.log(err.response)
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
