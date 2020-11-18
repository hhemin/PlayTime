const Router = require('koa-router');
const {Auth} = require('../../middlewares/auth')
const {DayInfo} = require('../model/dayinfo')
const {successResponse} = require('../../lib/tool');
const {WXGET} = require('../../core/wx.js');

const router = new Router({
  prefix:'/api/dayinfo'
})

// wx获取token和id
router.post('/wx/login',async(ctx,next) => {
  let {code} = ctx.request.body;
  await WXGET.getOpenId(code);
  await WXGET.getAccessToken();
  successResponse({ctx,msg:code})
})
// 获取信息推送
router.post('/wx/pullinfo',async (ctx,next) => {
  WXGET.sendMessage()
  successResponse({ctx})
})

router.get('/', new Auth().m ,async (ctx,next) =>{
  ctx.body = {
    ok:'hm'
  }
})

// 添加计划
router.post('/add',new Auth().m, async (ctx,next) => {
  await DayInfo.add(ctx);
  console.log(ctx.header)
  successResponse({ctx,msg:"添加成功"})
})

// 当天计划的列表
router.get('/list',new Auth().m, async (ctx,next) => {
  let data = await DayInfo.query(ctx);
  successResponse({ctx,data})
})

// 编辑计划表
router.post('/updatavalue',new Auth().m, async (ctx,next) => {
  let data = await DayInfo.updata(ctx,'updatavalue');
  successResponse({ctx,msg:'修改成功',data})
})

// 计划状态更改
router.post('/updataStatus',new Auth().m ,async (ctx,next) => {
  let data = await DayInfo.updata(ctx,'updataStatus');
  successResponse({ctx,msg:'暂停中',data})
})

// 删除计划
router.post('/delete',new Auth().m, async(ctx,next) => {
  let data = await DayInfo.delete(ctx);
  successResponse({ctx,msg:'删除成功',data})
})

module.exports = router