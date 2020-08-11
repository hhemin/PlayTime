import server from './http'

class Request {
  static async getFn({url='',token = true} = {}) {
    try {
      let auth = token? {
        username:localStorage.getItem('token')
      }:''
      return await server({
        method: 'get',
        url,
        auth
      }) 
    } catch(err) {
      throw err
    }
  }
  static async postFn({url='',token = true,data = ''} ={}) {
    try {
      let auth = token? {
        username:localStorage.getItem('token')
      }:''
      return await server({
        method: 'post',
        url,
        auth,
        data
      })
    }catch(err) {
      throw err
    }
  }
}

export default Request