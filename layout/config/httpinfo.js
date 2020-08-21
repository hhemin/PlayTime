const URL  = process.env.NODE_ENV == 'development' ? 'http://192.168.1.102:3000' :'http://192.168.1.102:3000'
const TOKEN = localStorage.getItem('token')

export {
  URL,
  TOKEN
}