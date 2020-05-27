# koa2

因为node.js v7.6.0开始完全支持async/await，不需要加flag，所以node.js环境都要7.6.0以上。

node 7.x 版本需要加 `-harmony`支持 async

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

koa2 没有封装获取参数的方法，需要通过解析上下文 context 中的原生 nodejs 请求对象 req，将 POST 表单数据解析成 querystring，再将 querystring 解析成 JSON 格式

> 注意：ctx.request是context经过封装的请求对象，ctx.req是context提供的node.js原生HTTP请求对象，同理ctx.response是context经过封装的响应对象，ctx.res是context提供的node.js原生HTTP响应对象。

#### koa-bodyparser 中间件

对于POST请求的处理，koa-bodyparser中间件可以把koa2上下文的formData数据解析到ctx.request.body中

## 访问静态资源服务器

一个http请求访问web服务静态资源，一般响应结果有三种情况

* 访问文本，例如js，css，png，jpg，gif
* 访问静态目录
* 找不到资源，抛出404错误

### 代码目录

```text
├── static # 静态资源目录
│   ├── css/
│   ├── image/
│   ├── js/
│   └── index.html
├── util # 工具代码
│   ├── content.js # 读取请求内容
│   ├── dir.js # 读取目录内容
│   ├── file.js # 读取文件内容
│   ├── mimes.js # 文件类型列表
│   └── walk.js # 遍历目录内容
└── index.js # 启动入口文件
```

### koa-static中间件使用

通过 use 解析中间件，传入绝对路径
