const requireDirectory = require("require-directory");
const Router = require("koa-router");

class InitManager {
  static initCore(app) {
    InitManager.app = app;
    InitManager.InitRouter();
  }

  static InitRouter() {
    // path config 备注 process.cwd()：是node自带的语法，能读取文件根目录
    const apiDirectory = `${process.cwd()}/server/app/api`
    requireDirectory(module, apiDirectory, { 
      visit: whenLoadModule 
    });

    function whenLoadModule(obj) {
      if (obj instanceof Router) {
        InitManager.app.use(obj.routes());
      }
    }
  }

}

module.exports = InitManager