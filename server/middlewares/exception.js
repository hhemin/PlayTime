// @name 异常
const {HttpException} = require('../core/http-exception');

const catchError = async (ctx,next) => {
  try {
    // 正确继续运行
    await next()
  } catch (error) {
    // 错误就进行错误处理
    // 开发环境 不是HttpException
    const isHttpException = error instanceof HttpException;
    const isDev = global.config.environment === 'dev'
    if(isDev && !isHttpException) {
      throw error;
    }
     if(error instanceof HttpException) {
      ctx.body = {
        msg: error.msg,
        error_code: error.errorCode,
        request:`${ctx.method} ${ctx.path}` // 获取到请求方式+请求api路径；error.requestUrl 
      }
      ctx.status = error.code;
     }
     else {
      // 未知的错误
      ctx.body = {
        msg:'we made a mistake ~',
        errorCode:999,
        request:`${ctx.method} ${ctx.path}` // 获取到请求方式+请求api路径；error.requestUrl 
      }
      ctx.status = 500
    }
  }
}

module.exports = catchError;