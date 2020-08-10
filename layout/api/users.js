import Request from '../config/request'

const GetToken = async (data) => {
  return await Request.postFn({url:'/api/users/login',token:false,data})
}

export {
  GetToken
}