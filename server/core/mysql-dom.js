const {pool} = require('./db')

class MysqlDom {  
  // mysql query 查询
  static async query(select) {
    if(global.config.environment === 'dev') {
      // 打印sql语句在控制台
      console.log(select)
    }
    return new Promise(( resolve, reject ) => {
      pool.getConnection( (err, connection) => {
        if (err) {
          reject( err )
        } else {
          connection.query(select,( err, rows) => {
            if ( err ) {
              reject( err )
            } else {
              resolve( rows )
            }
            connection.release()
          })
        }
      })
    })
  }
}

module.exports = MysqlDom