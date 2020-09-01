<template>
  <div class="loginbox">
    <div class="formmian" :model="form">
      <div class="df inputitem">账号<input type="text" v-model="form.username"/></div>
      <p
       style="color:#2196F3;font-size:13px;transform:translateY(-5px);">
       提示:账号要4~32位数英语+数字都可以
      </p>
      <div class="df inputitem">密码<input type="password" v-model="form.password"/></div>
      <p
      style="color:#2196F3;font-size:13px;transform:translateY(-5px);">
        提示:密码需要要6～32位数要英语+数字或符号结合
      </p>
      <KButton type="primary"
      style="width:100%;max-width:360px;margin-top:20px"
      @click="onRegister">注册</KButton>
      <KButton
      style="width:100%;max-width:360px;margin-top:20px"
      @click="onCancel">取消</KButton>
    </div>
    <KToptips v-model="tip.show" :type="tip.type" :duration="1000">
        {{tip.text}}
      </KToptips>
  </div>
</template>

<script>
/**
 * @name 注册页面
 * */
import axios from 'axios'
import mpAdapter from 'axios-miniprogram-adapter'// 解决axios 在小程序能使用

import { URL } from '../../config/httpinfo'
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
      axios({
        method: 'POST',
        url: `${URL}/api/users/register`,
        data: {
          username: this.form.username,
          password: this.form.password
        }
      }).then((res) => {
        const { data } = res
        console.log(res)
        if (res.status === 201) {
          return this.tip = {
            ...new Tip(data.msg || '', 'success').show()
          }
        }
        this.tip = {
          ...new Tip(data.msg || '错误', 'error').show()
        }
      }).catch((res) => {
        if(!res.response) {
          return this.tip = {
            ...new Tip('出现未知错误！！！', 'error').show()
          }
        }
        const data = res.response.data || '出现未知错误～'
        const tipvalue = data.hasOwnProperty('msg') ? data.msg[0] : '出现未知错误~'
        this.tip = {
          ...new Tip(tipvalue, 'error').show()
        }
        console.log(res)
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
