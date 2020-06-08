const Koa = require('koa')
const app = new Koa()

app.use(async ctx => {
  ctx.cookies.set(
    'cid',
    '123456',
    {
      domain: 'localhost', //cookie所在的域名
      path: '/index', //cookie所在的路径
      maxAge: 10 * 60 * 100, //cookie有效时长
      expires: new Date('2020-05-29'), //cookie失效时间
      httpOnly: false, //是否只用于http请求中
      overwrite: false, //是否允许重写
    }
  )
  ctx.body = 'cookie is setted'
})