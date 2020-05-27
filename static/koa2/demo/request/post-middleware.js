const Koa = require('koa')
const app = new Koa()
const bodyParse = require('koa-bodyparser')

// 解析中间件
app.use(bodyParse())

app.use((ctx) => {
  let { url, method } = ctx
  if (url === '/' && method === 'GET') {
    // 使用GET请求时返回首页内容
    let html = `
      <form action="/login" method="post">
        <div>
          <span>username</span>
          <input type="text" name="username">
        </div>
        <div>
          <span>password</span>
          <input type="password" name="password">
        </div>
        <button type="submit">submit</button>
      </form>
    `
    ctx.body = html
  } else if (url === '/login' && method === 'POST') {
    ctx.body = ctx.request.body
  } else {
    let html = `
      <h1>404</h1>
    `
    ctx.body = html
  }
})

app.listen(3000, () => {
  console.log('[demo] request post is starting at port 3000')
})