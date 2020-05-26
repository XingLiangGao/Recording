# koa2

## [路由](./demo/router)

### 原生方法

1. 用 Promise 封装异步读取文件方法
2. 封装根据 URL 获取 HTML 内容的方法
3. 在 use 方法里获取页面 url 并传入获取 HTML 的方法

使用异步读取文件方法时，所有的上层函数都是异步。

### 使用 koa-router 中间件

在使用`koa-router`中间件时注意方法的调用。

## 请求数据获取

### get 请求

GET 请求数据源头是 koa 中 request 对象中的 query 方法或 querystring 方法，query 返回格式化的参数对象，querystring 返回请求字符串。由于 ctx 对 request 的 API 有直接引用的方式，所有 ctx.request.query = ctx.query

### post 请求
