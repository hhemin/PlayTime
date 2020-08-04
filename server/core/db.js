const mysql = require('mysql');

const {host,user,password,dbname,port} = require('../config/index').database;
const pool = mysql.createPool({
  host,
  user,
  password,
  port,
  database : dbname
});
 
// pool.connect(); // 调用开始连接

// connection.query(Select.fn('user',['uid','username']),function(err,res) {
//   if (err) { //失败就报个错。
//     console.log('[SELECT ERROR] - ', err.message);
//     return;
//   }
//   console.log("数据库查的结果：");
//   let data = JSON.stringify(res)
//   console.log(JSON.parse(data)); //成功就输出下结果
// })

// connection.end();

module.exports = {
  pool
}