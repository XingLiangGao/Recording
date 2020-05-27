const Koa = require('koa')
const app = new Koa()

app.use(async (ctx) => {
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
    let postData = await parsePostData(ctx)
    ctx.body = postData
  } else {
    let html = `
      <h1>404</h1>
    `
    ctx.body = html
  }
})


// 解析上下文里node原生请求的POST参数
function parsePostData(ctx) {
  return new Promise((resolve, reject) => {
    try {
      let postdata = ""
      ctx.req.addListener('data', (data) => {
        postdata += data
      })
      ctx.req.addListener('end', () => {
        let parseData = parseQueryStr(postdata)
        resolve(parseData)
      })
    } catch (err) {
      reject(err)
    }
  })
}

// 将POST请求参数字符串解析成JSON
function parseQueryStr(queryStr) {
  let queryData = {}
  let queryStrList = queryStr.split('&')
  for (const [index, queryStr] of queryStrList.entries()) {
    let itemList = queryStr.split('=')
    queryData[itemList[0]] = decodeURIComponent(itemList[1])
  }
  return queryData
}

app.listen(3000, () => {
  console.log('[demo] request post is starting at port 3000')
})