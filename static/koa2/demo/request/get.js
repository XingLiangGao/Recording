const Koa = require('koa')
const app = new Koa()

app.use((ctx) => {
  let url = ctx.url
  let request = ctx.request
  let query = request.query
  let querystring = request.querystring

  ctx.body = {
    url,
    request,
    query,
    querystring
  }
})

app.listen(3000, () => {
  console.log('[demo] request get is starting at port 3000')
})