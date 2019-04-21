const express = require('express');

module.exports = function() {
  var router = express.Router();

  router.get('/web/', function(req, res) {
    res.send('web').end();
  })

  return router;
}