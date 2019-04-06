(function() {
  requirejs.config({
    //基本路径
    baseUrl: 'js/',
    //模块标识名与模块路径映射
    paths: {
      'module2': 'modules/module2',
      'module1': 'modules/module1',
      'jquery': 'libs/jquery.min'
    }
  });
  //引入模块
  requirejs(['module2'], function(module2) {
    module2.showMsg();
  });
})()