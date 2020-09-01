const URL  = process.env.NODE_ENV == 'development' ? 'http://192.168.1.102:3000' :'https://www.hmepay.cn'
// const URL = 'http://192.168.1.102:3000'
// const TOKEN = localStorage.getItem('token')
class TOKEN {
  static setvalue(value) {
    localStorage.setItem('token',value)
  }
  static getvalue() {
    return localStorage.getItem('token')
  }
}
export {
  URL,
  TOKEN
}