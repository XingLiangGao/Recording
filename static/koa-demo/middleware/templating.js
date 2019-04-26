const nunjucks = require('nunjucks');

function createEnv(path, opts) {
  var autoescape = opts.autoescape === undefined ? true : opts.autoescape,
      noCache = opts.noCache || false, //noCache  不使用缓存，每次都重新编译
      watch = opts.watch || false, //watch 当模板变化时重新加载
      throwOnUndefined = opts.throwOnUndefined || false,
      pathName = path === undefined ? path : 'views',
      env = new nunjucks.Environment( // nunjucks 配置项
        //创建文件系统加载器
        new nunjucks.FileSystemLoader(pathName, {
          noCache: noCache,
          watch: watch
        }), {
          autoescape: autoescape, //autoescape 控制输出是否被转义
          throwOnUndefined: throwOnUndefined //throwOnUndefined 当输出为 null 或 undefined
        }
      );
  //过滤器
  if (opts.filters) {
    for(var f in opts.filters) {
      env.addFilter(f, opts.filters[f]);
    }
  }
  return env;
}

function templating(path, opts) {
  //创建Nunjuck的env对象
  var env = createEnv(path, opts);
  return async (ctx, next) => {
    //给ctx绑定render函数
    ctx.render = function(view, model) {
      //把render后的内容赋值给response.body
      ctx.response.body = env.render(view, Object.assign({}, ctx.state || {}, model || {}));
      //设置Content-Type
      ctx.response.type = 'text/html'
    };
    //继续处理请求
    await next();
  }
}

module.exports = templating;