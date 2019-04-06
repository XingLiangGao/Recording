define([
  'module1',
  'jquery'
], function(module1, $) {
  let msg = "module2";
  function showMsg() {
    $('body').css('background', 'pink');
    console.log(module1.getMsg()+','+msg)
  }
  return {showMsg};
});