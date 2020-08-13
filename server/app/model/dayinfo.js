const MysqlDom = require('../../core/mysql-dom');
const moment = require('moment');

const {Select,Insert,Updata,DELETE} = require('../../core/mysql-core')
class DayInfo {
  // 添加
  static async add(ctx) {
    let {uid} = ctx.auth;
    let value = {uid:uid,...ctx.request.body};
    let v = ''
    let item = ''
    for(let i in value) {
      if(i == Object.keys(value)[Object.keys(value).length -1]) {
        v += `"${value[i]}"`;
        item += i;
      }else {
        v += `"${value[i]}",`;
        item += i+',';
      }
    }
    let tablename = 'dayInfo';
    let tableitem = `(${item},createtime)`
    let tablevalue = `(${v},NOW())` 
    let data = await MysqlDom.query(Insert.fn(tablename,tablevalue,tableitem))
    return JSON.parse(JSON.stringify(data))
  }
  // 查询
  static async query(ctx) {
    let {uid} = ctx.auth;
    let today = moment().format("YYYYMMDD");
    let tablename = 'dayInfo';
    let wherevalue = `uid = ${uid} and 
    DATE_FORMAT(createtime,'%Y%m%d') = '${today}' `
    let data = await MysqlDom.query(Select.wherefn({
      tablename,
      wherevalue
    }))
    return JSON.parse(JSON.stringify(data))
  }
  // 修改
  static async updata(ctx,type) {
    let tablename = 'dayInfo';
    switch(type) {
      case 'updatavalue':
        return this.updatavalue(ctx,tablename); // 修改值
        break;
      case 'updataStatus':
        return this.updataStatus(ctx,tablename);// 修改计划状态
        break;
      default:
        throw new Error('没这个参数呀函数呀')
    }
  }
  static async updatavalue(ctx,tablename) {
    let _bodyvalue = {...ctx.request.body};
    let wherevalue = ` dayInfo_id = ${_bodyvalue.dayInfo_id} `
    delete _bodyvalue.dayInfo_id
    let v = ''
    for(let i in _bodyvalue) {
      v += `${i} = '${_bodyvalue[i]}',`
    }
    v += ` updatetime = NOW() `
    let data = await MysqlDom.query(Updata.fn(tablename,v,wherevalue))
    return JSON.parse(JSON.stringify(data))
  }
  static async updataStatus(ctx,tablename) {
    let _bodyvalue = {...ctx.request.body}
    let wherevalue = ` dayInfo_id = ${_bodyvalue.dayInfo_id} `
    delete _bodyvalue.dayInfo_id
    let v = ''
    for(let i in _bodyvalue) {
      v += `${i} = '${_bodyvalue[i]}',`
      // if(i == Object.keys(_bodyvalue)[Object.keys(_bodyvalue).length -1]) {
      //   v += `${i} = '${_bodyvalue[i]}'`
      // } else {
      //   v += `${i} = '${_bodyvalue[i]}',`
      // }
    }
    v += ` f_uptime = NOW() `
    // f_uptime:NOW(),
    let data = await MysqlDom.query(Updata.fn(tablename,v,wherevalue))
    return JSON.parse(JSON.stringify(data))
  }
  // 删除
  static async delete(ctx) {
    let _bodyvalue = {...ctx.request.body}
    let tablename = 'dayInfo';
    let wherevalue = ` dayInfo_id = ${_bodyvalue.dayInfo_id} `
    let data = await MysqlDom.query(DELETE.fn(tablename,wherevalue))
    return JSON.parse(JSON.stringify(data))
  }
}

module.exports = {
  DayInfo
}