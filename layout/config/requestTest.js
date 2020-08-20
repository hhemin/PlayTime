import axios from 'axios';
import mpAdapter from 'axios-miniprogram-adapter';// 解决axios 在小程序能使用

const URL  = process.env.NODE_ENV == 'development' ? 'http://192.168.0.107:3000' :'http://192.168.0.107:3000'

const server = axios.create({
  baseURL: URL,
  timeout: 15000
})

if (process.env.isMiniprogram) {
  server.defaults.adapter = mpAdapter
}

// import server from './http'
// 添加请求拦截器
server.interceptors.request.use((config) => {
  // 在发送请求之前做些什么
  return config;
}, (error) => {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
server.interceptors.response.use((response) => {
  // 对响应数据做点什么
  console.log(response)
  return response;
},(error) => {
  console.log(error.response || error)
  // 对响应错误做点什么
  return Promise.reject(error);
});


async function getFn({url='',token = true} = {}) {
  try {
    let auth = token? {
      username:localStorage.getItem('token')
    }:''
    return await server({
      method: 'get',
      url,
      auth
    }) 
  } catch(err) {
    throw err
  }
}

async function postFn({url='',token = true,data = ''} ={}) {
  try {
    let auth = token? {
      username:localStorage.getItem('token')
    }:''
    return await server({
      method: 'post',
      url,
      auth,
      data
    })
  }catch(err) {
    throw err
  }
}

export {
  getFn,
  postFn
}