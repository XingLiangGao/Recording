## require.js使用教程
1. 下载require.js, 并引入
  * 官网: http://www.requirejs.cn/
  * github : https://github.com/requirejs/requirejs
  * 将require.js导入项目: js/libs/require.js 
2. 创建项目结构
  ```
  |-js
    |-libs
      |-require.js
    |-modules
      |-alerter.js
      |-dataService.js
    |-main.js
  |-index.html
  ```
3. 定义require.js的模块代码
  * dataService.js
    ```
    define(function () {
      let msg = 'atguigu.com'
    
      function getMsg() {
        return msg.toUpperCase()
      }
    
      return {getMsg}
    })
    ```
  * alerter.js
    ```
    define(['dataService', 'jquery'], function (dataService, $) {
      let name = 'Tom2'
    
      function showMsg() {
        $('body').css('background', 'gray')
        alert(dataService.getMsg() + ', ' + name)
      }
    
      return {showMsg}
    })
    ```
4. 应用主(入口)js: main.js
  ```
  (function () {
    //配置
    require.config({
      //基本路径
      baseUrl: "js/",
      //模块标识名与模块路径映射
      paths: {
        "alerter": "modules/alerter",
        "dataService": "modules/dataService",
      }
    })
    //引入使用模块
    require( ['alerter'], function(alerter) {
      alerter.showMsg()
    })
  })()
  ```
        
5. 页面使用模块:
  <script data-main="js/main" src="js/libs/require.js"></script>
    
------------------------------------------------------------------------

6. 使用第三方基于require.js的框架(jquery)
  * 将jquery的库文件导入到项目: 
    * js/libs/jquery-1.10.1.js
  * 在main.js中配置jquery路径
    ```
    paths: {
              'jquery': 'libs/jquery-1.10.1'
          }
    ```
  * 在alerter.js中使用jquery
    ```
    define(['dataService', 'jquery'], function (dataService, $) {
        var name = 'xfzhang'
        function showMsg() {
            $('body').css({background : 'red'})
            alert(name + ' '+dataService.getMsg())
        }
        return {showMsg}
    })
    ```
------------------------------------------------------------------------

7. 使用第三方不基于require.js的框架(angular/angular-messages)
  * 将angular.js和angular-messages.js导入项目
    * js/libs/angular.js
    * js/libs/angular-messages.js
  * 在main.js中配置
    ```
    (function () {
      require.config({
        //基本路径
        baseUrl: "js/",
        //模块标识名与模块路径映射
        paths: {
          //第三方库
          'jquery' : 'libs/jquery-1.10.1',
          'angular' : 'libs/angular',
          'angular-messages' : 'libs/angular-messages',
          //自定义模块
          "alerter": "modules/alerter",
          "dataService": "modules/dataService"
        },
        /*
         配置不兼容AMD的模块
         exports : 指定导出的模块名
         deps  : 指定所有依赖的模块的数组
         */
        shim: {
          'angular' : {
            exports : 'angular'
          },
          'angular-messages' : {
            exports : 'angular-messages',
            deps : ['angular']
          }
        }
      })
      //引入使用模块
      require( ['alerter', 'angular', 'angular-messages'], function(alerter, angular) {
        alerter.showMsg()
        angular.module('myApp', ['ngMessages'])
        angular.bootstrap(document,["myApp"])
      })
    })()
    ```
  * 页面:
    ```
    <form name="myForm">
      用户名: <input type="text" name="username" ng-model="username" ng-required="true">
      <div style="color: red;" ng-show="myForm.username.$dirty&&myForm.username.$invalid">用户名是必须的</div>
    </form>
    ```