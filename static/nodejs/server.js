const express = require('express');
const consolidate = require('consolidate');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const static = require('express-static');
const expressRoute = require('express-route');
const multer = require('multer');
const upload = multer({dest: './static/upload'});

var server = express();
server.listen(8080);

//1.获取请求数据
//get自带
server.use(upload.any());

//2.cookie、session
server.use(bodyParser.urlencoded());
server.use(cookieParser());
(function() {
  var keys = [];
  for(var i = 0; i < 10000; i++) {
    keys[i] = 'a_' + Math.random();
  }
  server.use(cookieSession({
    name: 'sess_id',
    keys: keys,
    maxAge: 20*60*1000 //20min
  }))
})()

//3.模板
server.engine('html', consolidate.ejs);
server.set('views', 'template');
server.set('view engine', 'html');

//4.route   use指所有请求
server.use('/', require('./route/web')());
server.use('/admin/', require('./route/admin')());

//5.detault: static
server.use(static('./static/'));