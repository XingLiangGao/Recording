define(function(require, exports, module) {
  //同步
  const module1 = require('./module1');
  //异步
  require.async('./module3', function(res) {
    console.log(res)
  })
  exports.exports = {module1};
})