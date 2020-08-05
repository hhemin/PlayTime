// 验证成功回复
function successResponse({
  ctx,
  status = 201,
  data = 'ok',
  msg = 'ok',
  errorCode = 0
}) {
  ctx.status = status
  ctx.body = {
    status:status,
    error_code: errorCode,
    msg,
    data,
    request: `${ctx.method} ${ctx.path}`
  }
}



module.exports = { successResponse }