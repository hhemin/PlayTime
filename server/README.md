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

