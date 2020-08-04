const Koa = require('koa');
const parser = require('koa-bodyparser');
const InitManager = require('./core/init')

const app = new Koa();
require('./core/db')
app.use(parser());
InitManager.initCore(app);

app.listen(3000);