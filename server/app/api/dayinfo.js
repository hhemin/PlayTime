const Router = require('koa-router');
const {Auth} = require('../../middlewares/auth')
const {DayInfo} = require('../model/dayinfo')
const {successResponse} = require('../../lib/tool')

const router = new Router({
  prefix:'/api/dayinfo'
})

router.get('/', new Auth().m ,async (ctx,next) =>{
  ctx.body = {
    ok:'hm'
  }
})

router.post('/add',new Auth().m, async (ctx,next) => {
  await DayInfo.add(ctx);
  console.log(ctx.header)
  successResponse({ctx,msg:"添加成功"})
  // console.log(ctx)
})

module.exports = router