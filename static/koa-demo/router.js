//导入的是一个class，因此用大写
const Koa = require('koa');
//koa-router返回的是函数
const router = require('koa-router')();
//post请求通常会发送一个表单，或者JSON，它作为request的body发送，但无论是Node.js提供的原始request对象，还是koa提供的request对象，都不提供解析request的body的功能！
const bodyParser = require('koa-bodyparser');
//创建一个Koa对象便是web app本身
const app = new Koa();

router.get('/hello/:name', async (ctx, next) => {
	var name = ctx.params.name;
	ctx.response.body = `<h1>Hello, ${name}</h1>`;
});

router.get('/', async (ctx, next) =>{
	ctx.response.body = `<h1>Index</h1>
			<form action="/signin" method="post">
				<p>Name: <input name="name" value="koa"></p>
				<p>Password: <input name="password" type="password"></p>
				<p><input type="submit" value="Submit"></p>
			</form>`;;
});

router.post('/signin', async (ctx, next) => {
	var name = ctx.request.body.name || '',
			password = ctx.request.body.password || '';
	console.log(`signin with name: ${name}, password: ${password}`);
	if (name === 'koa' && password === '12345') {
		ctx.response.body = `<h1>Welcome, ${name}!</h1>`
	} else {
		ctx.response.body = `<h1>Login failed</h1>
				<p><a href='/'>Try again</a></p>`
	}
})

app.use(bodyParser());	//必须在router之前被注册到app对象上
app.use(router.routes());

app.listen(3030);
console.log('app strat 3030');