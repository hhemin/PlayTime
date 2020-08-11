import Request from '../config/request'

const AddDayInfo = async (data) => {
  return await Request.postFn({url:'/api/dayinfo/add',data})
}

const GetDayInfo = async () => {
  return await Request.getFn({url:'/api/dayinfo/list'})
}

export {
  AddDayInfo,
  GetDayInfo
}