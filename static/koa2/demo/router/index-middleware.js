const Koa = require('koa')
const app = new Koa()

const Router = require('koa-router')

// 子路由1
let home = new Router()
home.get('/', async (ctx) => {
  let html = `
  <ul>
    <li><a href="/page/hello">/page/helloworld</a></li>
    <li><a href="/page/404">/page/404</a></li>
  </ul>
  `
  ctx.body = html
})

// 子路由2
let page = new Router()
page.get('/404', async (ctx) => {
  ctx.body = '404 page'
}).get('/hello', async (ctx) => {
  ctx.body = 'hello word'
})

// 挂载所有路由
let router = new Router()
router.use('/', home.routes(), home.allowedMethods())
router.use('/page', page.routes(), page.allowedMethods())

// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods())

app.listen(3000, () => {
  console.log('[demo] route-use-middleware is starting at port 3000')
})

/**
 * node -harmony index-middleware.js
 */