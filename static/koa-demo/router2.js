const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const controller = require('./middleware/controller');
const templating = require('./middleware/templating');

const isProduction = process.env.NODE_ENV === 'production';

const app = new Koa();

//记录URL以及页面执行时间
app.use(async (ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
  var
      start = new Date().getTime(),
      execTime;
  await next();
  execTime = new Date().getTime() - start;
  ctx.response.set('X-Response-Time', `${execTime}ms`);
});

//处理静态文件
if (! isProduction) {
  let staticFiles = require('./middleware/static-files');
  app.use(staticFiles('/static/', __dirname + '/static'));
}

//解析POST请求
app.use(bodyParser());

//负责给ctx加上render()来使用Nunjucks
app.use(templating('/views', {
  noCache: !isProduction,
  watch: !isProduction
}));

//处理URL路由
app.use(controller('../controllers'));

app.listen(3030);
console.log('app strat 3030');