# vue-kbone

使用 vue 多端开发(小程序和Web)，基于 [kbone](https://github.com/wechat-miniprogram/kbone) 的 element 和 render。

## 特性

* 一键接入，立即使用
* 支持更完整的 vue 语法及特性
* webpack、es6、babel、hot reload、cli、vue-router、vuex，你想要的都有

## 开发
* 项目安装依赖
```
yarn 或 npm i
```
* Web 端：直接浏览器访问 localhost:8080/ 即可看到效果。

```
npm run web  or yarn run web
```

* 小程序端：使用开发者工具打开 dist/mp 目录即可。

```
npm run mp
```

## 构建

* Web 端：构建完成会生成 dist/web 目录

```
npm run build
```

* 小程序端：构建完成会生成 dist/mp 目录

```
npm run build:mp
```

## 小程序端打开

需要先进入 dist/mp 目录执行 `npm install` 安装相关的依赖包，然后用开发者工具打开 dist/mp 目录后再进行 npm 构建（关于 npm 构建可[点此查看官方文档](https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html)）。

## 目录说明

此模板 Web 端使用单入口，通过 vue-router + 动态 import 的方式来运行；小程序端则按照业务分拆成多个页面，同属一个业务的页面则通过 vue-router 来组织。

```
├─ api                       // api，由于kbone在网络请求方面，这个拆分不能实现页面更新，能请求成功数据（个人发表，如果可以可以提issues哦！！）
│  ├─ dayinfo.js             
│  └─ users.js              
├─ build
│  ├─ miniprogram.config.js  // mp-webpack-plugin 配置
│  ├─ webpack.base.config.js // Web 端构建基础配置
│  ├─ webpack.dev.config.js  // Web 端构建开发环境配置
│  ├─ webpack.mp.config.js   // 小程序端构建配置
│  └─ webpack.prod.config.js // Web 端构建生产环境配置
├─ dist
│  ├─ mp                     // 小程序端目标代码目录，使用微信开发者工具打开，用于生产环境
│  └─ web                    // web 端编译出的文件，用于生产环境
├─ src
│  ├─ common                 // 通用组件
│  ├─ mp                     // 小程序端入口目录
│  │  ├─ home                // 小程序端 home 页面
│  │  │  └─ main.mp.js       // 小程序端入口文件
│  │  └─ other               // 小程序端 other 页面
│  │     └─ main.mp.js       // 小程序端入口文件
│  ├─ detail                 // detail 页面
│  ├─ home                   // home 页面
│  ├─ list                   // list 页面
│  ├─ router                 // vue-router 路由定义
│  ├─ store                  // vuex 相关目录
│  ├─ App.vue                // Web 端入口主视图
│  └─ main.js                // Web 端入口文件
└─ index.html                // Web 端入口模板
```

## 其他说明

如果要使用 ts，则在 vue 的 script 标签上加上 `lang="ts"`，具体可参考 src/list/Index.vue。如果要使用 reduce-loader，就不能使用 ts，因为 ts 目前没有支持内联 loader。

## Safari 和 微信 浏览器音乐播放不能自动播放
/components/music.vue 
通过倒计时来控制播放

## 适配日志
1、网络请求
axios在小程序用不了要通过 ‘axios-miniprogram-adapter’来适配兼容
```
if (process.env.isMiniprogram) {
  axios.defaults.adapter = mpAdapter
}
```
同时网络axios请求要写在当vue文件里面，本人尝试通过vuex数据请求成功，小程序页面无法更新;axios封装也无法给小程序页面数据data更新（个人的的发现，不知道其他方法如何）
2、异步组件问题
由于kbone不支持异步组件开发，所以编辑页面原来是异步组件，现在拆分为多一个页面开发
3、音频播放
小程序只能采用官方的现有的 [InnerAudioContext](https://developers.weixin.qq.com/miniprogram/dev/api/media/audio/InnerAudioContext.html)，组件在 components/music.vue 里面

## 网络请求
1、首页的列表数据是通过vuex来获取数据的




