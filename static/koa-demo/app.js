//导入的是一个class，因此用大写
const Koa = require('koa');

//创建一个Koa对象便是web app本身
const app = new Koa();

/**
 * 每收到一个http请求，koa就会调用通过app.use()注册的async函数，并传入ctx和next参数。
 * 我们可以对ctx操作，并设置返回内容。但是为什么要调用await next()？
 * 原因是koa把很多async函数组成一个处理链，每个async函数都可以做一些自己的事情，然后用await next()来调用下一个async函数。我们把每个async函数称为middleware，这些middleware可以组合起来，完成很多有用的功能。
 */

//对于任何请求，app将调用异步函数处理请求
app.use(async (ctx, next) => {
	if (ctx.request.path === '/') {
		ctx.response.body = 'index page';
	} else {
		await next();
	}
});

app.use(async (ctx, next) => {
	if (ctx.request.path === '/test') {
		ctx.response.body = 'test page';
	} else {
		await next();
	}
});

app.use(async (ctx, next) => {
	if (ctx.request.path === '/error') {
		ctx.response.body = 'error page';
	} else {
		await next();
	}
})

app.listen(3030);
console.log('app strat 3030');