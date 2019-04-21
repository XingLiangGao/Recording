const express = require('express');

module.exports = function() {
  var router = express.Router();

  //检查登陆状态
  router.use((req, res, next) => {
    if (!req.session['admin_id'] && req.url != '/login') {
      res.redirect('/admin/login');
    } else {
      next();
    }

    router.get('/', (req, res) => {
      res.render('admin/index.ejs', {});
    })
    
    router.use('/login', require('./login')());
    router.use('/banners', require('./banner')());
    router.use('/custom', require('./custom')());
  })

  return router;
}