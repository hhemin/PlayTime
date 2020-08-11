import Request from '../config/request'

const AddDayInfo = async (data) => {
  return await Request.postFn({url:'/api/dayinfo/add',data})
}

export {
  AddDayInfo
}