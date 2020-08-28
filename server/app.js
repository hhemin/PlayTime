const Koa = require('koa')
const app = new Koa();
const convert = require('koa-convert')
const cors = require('koa-cors');
const parser = require('koa-bodyparser');
const InitManager = require('./core/init');
const catchError = require('./middlewares/exception'); // 捕获错误的中间件

app.use(convert(cors()))
app.use(catchError);
app.use(parser());
InitManager.initCore(app);

// app.listen(3000,'0.0.0.0');
module.exports = app