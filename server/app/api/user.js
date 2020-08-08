const bcrypt = require('bcrypt');
const Router = require('koa-router')
const {User} = require('../model/user')
// const {HttpException} = require('../../core/http-exception')
const {successResponse} = require('../../lib/tool')
const {RegisterValidator} = require('../../validator/user')

const router = new Router({
  prefix:'/api/users'
})

router.get('/',async(ctx) => {
  // await User.query('xxx')
  // successResponse({ctx})
  let d = ctx.request.query//JSON.stringify(ctx.query)
  console.log(d)
  const v = await new RegisterValidator().validateUser(ctx);
  // if(true) {
  //   console.log('123')
  //   let error =  new HttpException()
  //   ctx.body = {
  //     error
  //   }
  // }
})

// 用户注册
router.post('/register',async (ctx,next) => {
  let {username,password} = ctx.request.body;
  const salt = bcrypt.genSaltSync(10);//随机生成salt
  var hash = bcrypt.hashSync(password, salt);//获取hash值
  let value = {
    username,
    password:hash
  }
  await new RegisterValidator().validateUser(username);// 检测是否存在
  await new RegisterValidator().validate(ctx);
  await User.add(value)
  successResponse({ctx,msg:"用户注册成功"})
})

// 用户登录
router.post('/login',async (ctx,next) => {
  let {username,password} = ctx.request.body;
  await new RegisterValidator().isHasUser(username);// 检验是否存在用户
  let token =  await User.getToken(username,password);// 密码检测+token返回
  successResponse({ctx,data:token})
})

module.exports = router