const URL  = process.env.NODE_ENV == 'development' ? 'http://192.168.0.107:3000' :'http://192.168.0.107:3000'
const TOKEN = localStorage.getItem('token')

export {
  URL,
  TOKEN
}