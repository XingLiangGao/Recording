const fs = require('fs')
const path = require('path')

// 封装读取文件内容
const file = require('./file')

// 封装读取目录内容
const dir = require('./dir')

/**
 * 获取静态资源内容
 * @param {object} ctx koa上下文
 * @param {string} 静态资源目录在本地的绝对路径
 * @return {string} 请求获取到的文件内容
 */
async function content (ctx, fullStaticPath) {

  // 封装请求资源的绝对路径
  let reqPath = path.join(fullStaticPath, ctx.url)

  // 判断请求路径是否存在目录或文件
  let exist = fs.existsSync(reqPath)

  // 返回请求内容，默认为空
  let content = ''
  if (!exist) {
    content = '404'
  } else {
    // 判断访问地址是目录还是文件
    let stat = fs.statSync(reqPath)

    if (stat.isDirectory()) {
      // 如果为目录，读取目录内容
      content = dir(ctx.url, reqPath)
    } else {
      // 如果是文件，读取文件内容
      content = await file(reqPath)
    }
  }

  return content
}

module.exports = content