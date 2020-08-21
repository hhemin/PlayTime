<template>
  <div class="loginbox">
    <div class="formmian" :model="form">
      <div class="df inputitem">账号<input type="text" v-model="form.username"/></div>
      <div class="df inputitem">密码<input type="password" v-model="form.password"/></div>
      <KButton type="primary"
      style="width:100%;max-width:360px;margin-top:20px"
      @click="onRegister">注册</KButton>
      <KButton
      style="width:100%;max-width:360px;margin-top:20px"
      @click="onCancel">取消</KButton>
      <KToptips v-model="tip.show" :type="tip.type" :duration="1000">
        {{tip.text}}
      </KToptips>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import mpAdapter from 'axios-miniprogram-adapter'// 解决axios 在小程序能使用

import { URL,TOKEN } from '../../config/httpinfo'
import { Tip } from '../../config/util'

if (process.env.isMiniprogram) {
  axios.defaults.adapter = mpAdapter
}

export default {
  name: 'register',
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
    onRegister() {
      // axios({
      //   method:'POST',
      //   url: `${URL}/api/users/login`,
      //   data: {
      //     username: this.form.username,
      //     password: this.form.username
      //   }
      // }).then((res) => {
      //   let { data } = res
      //   console.log(res)
      //   if(res.code === 201) {
      //     return this.tip = {
      //       ...new Tip(data.msg || '', 'success').show()
      //     }
      //   }
      //   this.tip = {
      //     ...new Tip(data.msg || '错误', 'error').show()
      //   }
      // }).catch((res) => {
      //   this.tip = {
      //     ...new Tip(res.data.msg || '错误', 'error').show()
      //   }
      //   console.log(res)
      // })
      axios({
        method:'POST',
        url: `${URL}/api/users/login`,
        data: {
          username: this.form.username,
          password: this.form.password
        }
      }).then((res) => {
        console.log(res)
        const { data } = res
        this.tip = {
          ...new Tip(data.msg || '', 'success').show()
        }
        localStorage.setItem('token', data.data)
        this.$router.push('/')
      }).catch((err) => {
        console.log(err)
        this.tip = {
          ...new Tip(err.response.data.msg || '错误', 'error').show()
        }
      })
    },
    onCancel() {
      this.$router.go(-1)
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
