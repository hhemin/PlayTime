// @name http 状态
class HttpException extends Error {
  constructor(msg = '服务器异常', errorCode = 10000, code = 400) {
    super()
    this.msg = msg
    this.errorCode = errorCode
    this.code = code
  }
}

class NotFound extends HttpException {
  constructor(msg = '资源未找到', errorCode = 10000) {
    super()
    this.msg = msg
    this.errorCode = errorCode
    this.code = 404
  }
}

module.exports = {
  HttpException,
  NotFound
}