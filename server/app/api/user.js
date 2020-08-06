const Router = require('koa-router')
const {User} = require('../model/user')
const {HttpException} = require('../../core/http-exception')
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

router.post('/register',async (ctx,next) => {
  let {username,password} = ctx.request.body
  let value = {
    username,
    password
  }
  await new RegisterValidator().validateUser(username)
  await new RegisterValidator().validate(ctx);
  await User.add(value)
  successResponse({ctx,msg:"用户注册成功"})
})

module.exports = router