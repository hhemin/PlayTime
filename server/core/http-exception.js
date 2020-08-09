// @name http 状态
class HttpException extends Error {
  constructor(msg = '服务器异常', errorCode = 10000, code = 400) {
    super()
    this.msg = msg
    this.errorCode = errorCode
    this.code = code
  }
}

class ParameterException extends HttpException {
  constructor(msg = '参数错误', errorCode = 10001) {
    super()
    this.msg = msg
    this.errorCode = errorCode
    this.code = 400
  }
}

class NotFound extends HttpException {
  constructor(msg = '资源未找到', errorCode = 10002) {
    super()
    this.msg = msg
    this.errorCode = errorCode
    this.code = 404
  }
}

class RepeatUser extends HttpException {
  constructor(msg = '用户名存在', errorCode = 10003) {
    super()
    this.msg = msg
    this.errorCode = errorCode
    this.code = 200
  }
}

class NotUser extends HttpException {
  constructor(msg = '用户名不存在哦', errorCode = 10004) {
    super()
    this.msg = msg
    this.errorCode = errorCode
    this.code = 200
  }
}

class NoPassword extends HttpException {
  constructor(msg = '密码不正确哦', errorCode = 10005) {
    super()
    this.msg = msg
    this.errorCode = errorCode
    this.code = 400
  }
}

class NoToken extends HttpException {
  constructor(msg = '禁止访问', errorCode = 10006) {
    super()
    this.msg = msg
    this.errorCode = errorCode
    this.code = 403
  }
}

module.exports = {
  HttpException,
  ParameterException,
  NotFound,
  RepeatUser,
  NotUser,
  NoPassword,
  NoToken
}