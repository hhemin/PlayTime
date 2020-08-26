class HttpError {
  static getError(error) {
    const fn = {
      '403':() => {this.NoToken()},
      'default':() => {throw new Error('未知参数'+err.response)}
    }
    const errorFn = fn[error.response.status] || fn['default']
    return errorFn()
  }
  static NoToken() {
   localStorage.removeItem('token')
   if (process.env.isMiniprogram) {
      console.log('小程序要登录啦')
    } else {
      // window.location.href = '/login'
    }
  }
}

export default HttpError