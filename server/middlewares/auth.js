const jwt = require('jsonwebtoken')
const basicAuth = require('basic-auth')
const {NoToken} = require('../core/http-exception')
// 以中间件的形式校验前端token
class Auth {
  constructor(level) {
    this.level = level || 1,
    Auth.USER = 1,
    Auth.ADMIN = 2
  }
  get m() {
    return async(ctx,next)=> {
      console.log(ctx)
      const userToken = basicAuth(ctx.req) // 获取客户端传过来的token
      let errMsg = 'token不合法'
      if(!userToken || !userToken.name) {
        throw new NoToken({msg:'未登录'})
      }
      let decode
      // 对token 合法进行校验证
      try {
        const secretKey = global.config.security.secretKey
        decode = jwt.verify(userToken.name, secretKey)// token 合法性检验
      } catch (error) {
        // 2种错误可能 1、token不合法 2、token过期
        if (error.name === 'TokenExpiredError') {
          errMsg = '请重新登录，之前登录已过期' //token已过期
        }
        console.log('错误啦')
        console.log(error)
        throw new NoToken(errMsg)
      }
      // 权限处理入口
      const { uid, scope } = decode
      if (scope < this.level) {
        errMsg = '权限不足'
        throw new NoToken(errMsg)
      }
      ctx.auth = { uid, scope }
      await next()
    }
  }
}

module.exports = {
  Auth
}