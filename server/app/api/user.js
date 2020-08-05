const Router = require('koa-router')
const {User} = require('../model/user')
const {HttpException} = require('../../core/http-exception')
const {successResponse} = require('../../lib/tool')


const router = new Router({
  prefix:'/api/users'
})

router.get('/',async(ctx) => {
  if(true) {
    console.log('123')
    let error =  new HttpException()
    ctx.body = {
      error
    }
  }
//  try {
//   // let data = await User.query()
//   // successResponse(data)
//   // ctx.body = data
//  }catch(err) {
//    console.log(err+'mysql')
//  }
})

router.post('/register',async (ctx,next) => {
  let {username,password} = ctx.request.body
  let value = {
    username,
    password
  }
  try {
    let data = await User.add(value)
    console.log(data)
    // successResponse(data)
  }catch(err) {
    console.log(err+'/register')
  }
})

module.exports = router