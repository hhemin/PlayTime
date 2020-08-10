import server from './http'

class Request {
  static async getFn({url='',token = true} = {}) {
    try {
      let auth = token? `auth:{
        username: ${localStorage.getItem('token')}
      }`:''
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
    console.log(url,data,)
    try {
      let auth = token? `auth: {
        username: ${localStorage.getItem('token')}
      }`:''
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