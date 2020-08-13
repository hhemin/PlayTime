import Request from '../config/request'

// 添加当天计划信息
const AddDayInfo = async (data) => {
  return await Request.postFn({url:'/api/dayinfo/add',data})
}

// 获取当天列表信息
const GetDayInfo = async () => {
  return await Request.getFn({url:'/api/dayinfo/list'})
}

// 编辑计划表
const UpdateInfo =  async (data) => {
  return await Request.postFn({url:'/api/dayinfo/updatavalue',data})
}
//  计划状态更改
const UpdataStatus = async (data) => {
  return await Request.postFn({url:'/api/dayinfo/updataStatus',data})
}

export {
  AddDayInfo,
  GetDayInfo,
  UpdateInfo,
  UpdataStatus
}