module.exports = {
  environment:'dev',// 上线要改参数product
  database: {
    host     : 'localhost',
    user     : 'root',
    password : 'as123456',
    dbname : 'PlayTime',
    port: 3306,
  },
  security: {
    secretKey: '@2Wd%e9Cd3s.P,&1!',// jsonwebtoken设置key令牌，要保密，别人可以通过这个破解密码
    expiresIn: 60 * 60 * 24 * 7,//  token设置有效时间 单位是分钟
  },
}