const MysqlDom = require('../../core/mysql-dom');

const {Insert} = require('../../core/mysql-core')
class DayInfo {
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
}

module.exports = {
  DayInfo
}