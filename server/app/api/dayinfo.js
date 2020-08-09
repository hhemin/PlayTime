const Router = require('koa-router');
const {Auth} = require('../../middlewares/auth')

const router = new Router({
  prefix:'/api/dayinfo'
})

router.get('/', new Auth().m ,async (ctx,next) =>{
  ctx.body = {
    ok:'hm'
  }
})

module.exports = router