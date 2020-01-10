var Logger = {
  maxRouterNum: 5,
  getCookie: function (name) {
    var arr;
    var reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
    if ((arr = document.cookie.match(reg))) return decodeURIComponent((arr[2]));
    else return '';
  },
  dataStructChange: function (data) {
    var element = data.srcElement || data.target || {};
    var error = data.reason || data.error || {};
    var domPath = '';
    var router = Logger.getRouter();
    // cookie 解析
    var cookies = document.cookie ? document.cookie.split('; ').reduce(function (total, currentValue, currentIndex, arr) {
      var cookieArr = currentValue.split('=');
      total[cookieArr[0]] = cookieArr[1];
      return total;
    }, {}) : {};

    data.path && (domPath = data.path.map(function (item) {
      return item.nodeName || 'window';
    }).join(', '));

    var p = Logger.getCookie('package');
    var version = Logger.getCookie('version');
    var userId = Logger.getCookie('userId');

    // 基本数据结构
    var deviceInfo = {
      'c': 'website', // 客户端类别
      'p': p, // 客户端包名
      'l': 'error', // 日志级别
      't': new Date().getTime(), // 事件发生时间
      'v': version, // 客户端版本号
      'uid': userId,
      'ua': navigator.userAgent
    };
    var logs = [{
      'tag': data.tag || window.location.pathname, // tag 默认为网页路由
      'message': data.message || error.message || '',
      'url': window.location.href, // 网址
      'filename': data.filename || '', // 若全局捕获,文件名
      'lineno': data.lineno || 0, // 若全局捕获,行号
      'colno': data.colno || 0, // 若全局捕获,列号
      'domPath': domPath, // 若全局捕获页面dom问题,dom路径
      'element': element.outerHTML || '', // 若全局捕获页面dom问题,出错html代码
      'error': {
        'name': error.name || '',
        'message': error.message || '',
        'stack': error.stack || ''
      },
      'router': router, // 用户访问路径
      'cookies': cookies
    }];

    // console.log({deviceInfo: deviceInfo, logs: logs});

    return 'deviceInfo=' + JSON.stringify(deviceInfo) + '&logs=' + JSON.stringify(logs);
  },
  // 请求
  request: function (data, url) {
    try {
      // gulp-replace
      var requestUrl = Logger.getCookie('env') == 'production' ? 'production' : 'staging';
      url = url || requestUrl;
      // gulp-replace end

      // 创建异步对象
      var xhr = new XMLHttpRequest();
      // 设置请求的类型及url
      xhr.open('post', url, true);
      // post请求一定要添加请求头才行不然会报错
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      // 发送请求,此调用可能失败catch
      xhr.send(data);
      xhr.onreadystatechange = function () {
        // 这步为判断服务器是否正确响应
        if (xhr.readyState == 4 && xhr.status == 200) {
          // console.log(xhr.responseText);
        }
      };
    } catch (e) {
      console.log(e);
    }
  },
  errorReport: function (data) {
    Logger.request(Logger.dataStructChange(data));
  },
  error: function (error, tag, message) {
    Logger.errorReport({tag: tag, error: error, message: message});
  },
  setRouter: function () {
    var maxNum = Logger.maxRouterNum;
    var router = sessionStorage.getItem('router');
    var routerArr = [];

    if (router) {
      // 每个记录之间用|分割
      routerArr = router.split('|');
      // 只记录最近的5个访问
      routerArr.length >= maxNum && (routerArr = routerArr.slice(routerArr.length - maxNum + 1));
    }

    routerArr.push(JSON.stringify({path: window.location.href, date: new Date().getTime()}));
    sessionStorage.setItem('router', routerArr.join('|'));
  },
  getRouter: function () {
    var router = sessionStorage.getItem('router');
    return router || '';
  }
};

if (!window.errorListenerStatus) { // 避免多次监听
  if (window.addEventListener) { // 所有主流浏览器，除了 IE 8 及更早版本
    // 全局error监听
    window.addEventListener('error', Logger.errorReport, true);
  } else if (window.attachEvent) { // IE 8 及更早版本
    window.attachEvent('onerror', Logger.errorReport);
  }

  // 全局promise no catch error监听
  // 支持性不太好,火狐不支持
  window.addEventListener('unhandledrejection', Logger.errorReport, true);
  window.errorListenerStatus = true;
}

// 用户访问记录
Logger.setRouter();

// 设备信息
// 手机型号, 手机系统

// 浏览器信息
// 浏览器类型

// 错误信息
// 页面路径, 文件名称, 错误行列号, 错误类型, 错误信息, 错误栈(DOM树), 时间戳,

// 用户信息
// cookie
