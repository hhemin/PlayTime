const Koa = require('koa');
const cors = require('koa-cors');
const parser = require('koa-bodyparser');
const InitManager = require('./core/init');
const catchError = require('./middlewares/exception'); // 捕获错误的中间件

const app = new Koa();
app.use(cors());
app.use(catchError);
app.use(parser());
InitManager.initCore(app);

app.listen(3000);