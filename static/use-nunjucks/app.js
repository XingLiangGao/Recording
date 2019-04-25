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

var env = createEnv('views', {
  watch: true,
  noCache: false,
  filters: {
    hex: function(n) {
      return '0x' + n.toString(16);
    }
  }
})

//渲染
var s = env.render('hello.html', { 
  name: 'gyxyl',
  fruits: ['Apple', 'Pear', 'Banana'],
  count: 12000
});
console.log(s);
console.log(env.render('extend.html', {
  header: 'Hello',
  body: 'bla bla bla...'
}));