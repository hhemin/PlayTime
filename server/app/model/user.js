const {Select,Insert} = require('../../core/mysql-core')
const MysqlDom = require('../../core/mysql-dom')

class User {
  // 查询
  static async query(value) {
    let data = await MysqlDom.query(Select.wherefn({
      tablename:'user',
      wherevalue:`username = '${value}'`
    }))
    return JSON.parse(JSON.stringify(data))
  }
  // 添加
  static async add(value) {
      // let sql = ''
      // for(let i in value) {
      //  i ===  Object.keys(value)[value.length -1]? sql+=`${i} = ${value[i]} `:sql+=`${i} = ${value[i]},`
      // }
      // console.log(sql)
      //  let data = await MysqlDom.query(Insert.fn('user',))
      let v = ''
      let item = ''
      for(let i  in value) {
        if(i == Object.keys(value)[Object.keys(value).length -1]) {
          v += `"${value[i]}"`;
          item += i;
        }else {
          v += `"${value[i]}",`;
          item += i+',';
        }
      }
      let data = await MysqlDom.query(Insert.fn('user',`(${v}, NOW())` ,`(${item},createtime)`))
      return JSON.parse(JSON.stringify(data))
  }
}

module.exports = {
  User
}



