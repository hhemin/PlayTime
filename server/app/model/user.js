const {Select} = require('../../core/mysql-core')
const MysqlDom = require('../../core/mysql-dom')

class User {
  static async query() {
    try {
      let data = await MysqlDom.query(Select.fn('user',['uid','username']))
      return JSON.parse(JSON.stringify(data))
    }catch(err) {
      return JSON.parse(JSON.stringify(err))
    }
  }
}

module.exports = {
  User
}



