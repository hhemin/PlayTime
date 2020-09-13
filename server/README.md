# 后台

## npm 包
* [moment](http://momentjs.cn/) 时间

## 路径问题
文件：server/core/init.js

如果是.vscode 启动

'/server/config/index.js'
'/server/app/api'
一定要用到/server

如果用nodemon or node 启动则要去掉
/server

否则会出现文件找不到问题

## pm2 配置
文件：server/core/init.js 路径问题和上面一样
app.js 去除了app.listen(),写在bin/www里面了
```
终端sever文件使用就等于开始运行pm2
yarn run prd
```
## 项目运行
```
方法1

yarn run dev 

方法2

⚠️ 全局配置了安装了nodemon 可以使用这个方法运行
yarn run nodemon
```

## server项目部署
步骤1
yarn 下载全部依赖
步骤2
yarn run prd （pm2 运行）
