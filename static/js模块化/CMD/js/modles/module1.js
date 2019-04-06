define(function(require, exports, module) {
  let msg = 'module1'
  module.exports = {
    name: 'gyxyl',
    getName: function() {
      console.log(this.getName);
    }
  }
  exports.getMsg = function() {
    return msg;
  }
});