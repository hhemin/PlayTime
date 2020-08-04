const Router = require('koa-router')
const {User} = require('../model/user')


const router = new Router({
  prefix:'/api/user'
})

router.get('/',async(ctx) => {
 try {
  let data = await User.query()
  ctx.body = data
  console.log('>>>>>>')
  console.log(data)
  console.log('>>>>>>')
 }catch(err) {
   console.log(err+'mysql')
 }
})

module.exports = router