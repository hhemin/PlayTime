/***
 * @name api文件接口导入配置
 * */ 
const requireDirectory = require('require-directory');
const Router = require('koa-router');

// 初始话管理器
class InitManager {
  static initCore(app) {
    // 入口方法
    InitManager.app = app;
    InitManager.InitRouter();
    InitManager.loadHttpException();
    InitManager.loadConfig();
  }
  static loadConfig(path = '') {
    // 配置config全局化
    const configPath = path || process.cwd() + '/config/index.js'
    const config = require(configPath);
    global.config = config;
  }

  static InitRouter() {
    // path config 备注 process.cwd()：是node自带的语法，能读取文件根目录
    const apiDirectory = `${process.cwd()}/app/api`
    requireDirectory(module, apiDirectory, { 
      visit: whenLoadModule 
    });

    function whenLoadModule(obj) {
      if (obj instanceof Router) {
        InitManager.app.use(obj.routes());
      }
    }
  }

  static loadHttpException() {
    // 处理全局变量导入 errors
    const errors = require('./http-exception');
    global.errs = errors;
  }
}

module.exports = InitManager;