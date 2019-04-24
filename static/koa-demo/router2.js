//导入的是一个class，因此用大写
const Koa = require('koa');
//post请求通常会发送一个表单，或者JSON，它作为request的body发送，但无论是Node.js提供的原始request对象，还是koa提供的request对象，都不提供解析request的body的功能！
const bodyParser = require('koa-bodyparser');
const controller = require('./controller');

//创建一个Koa对象便是web app本身
const app = new Koa();

app.use(bodyParser());	//必须在router之前被注册到app对象上
app.use(controller());

app.listen(3030);
console.log('app strat 3030');