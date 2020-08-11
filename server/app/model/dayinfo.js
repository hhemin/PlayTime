const MysqlDom = require('../../core/mysql-dom');
const moment = require('moment');

const {Select,Insert} = require('../../core/mysql-core')
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
    let tablename = 'DayInfo';
    let tableitem = `(${item},createtime)`
    let tablevalue = `(${v},NOW())` 
    let data = await MysqlDom.query(Insert.fn(tablename,tablevalue,tableitem))
    return JSON.parse(JSON.stringify(data))
  }
  // 查询
  static async query(ctx) {
    let {uid} = ctx.auth;
    let today = moment().format("YYYYMMDD");
    let tablename = 'DayInfo';
    let wherevalue = `uid = ${uid} and 
    DATE_FORMAT(createtime,'%Y%m%d') = '${today}' `
    let data = await MysqlDom.query(Select.wherefn({
      tablename,
      wherevalue
    }))
    console.log(data)
    return JSON.parse(JSON.stringify(data))
  }
}

module.exports = {
  DayInfo
}