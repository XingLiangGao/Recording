/**
 * 常用js工具
 */



/**
 * 表单校验
 */

var strategies = { // 定义规则
  isNonEmpty: (value, errorMsg) => {
    if (value === '') return errorMsg;
  },
  minLength: (value, length, errorMsg) => {
    if (value.length < length) return errorMsg;
  },
  isMobile: (value, errorMsg) => {
    if (!/(^1[3|5|8][0-9]{9}$)/.test(value)) return errorMsg;
  }
}
var Validator = function() {
  this.cache = []; // 保存检验规则
}
/*示例
* validator.add(registerForm.password, 'minLength:6', '密码长度不能少于 6 位');
* validator.add(registerForm.phoneNumber, 'isMobile', '手机号码格式不正确');
*/
Validator.prototype.add = function(dom, rule, errorMsg) {
  var ary = rule.split(':');
  this.cache.push(function() {
    var strategy = ary.shift(); // 获取规则
    // 通过两个方法生成参数数组，使用apply整合传入
    ary.unshift(dom.value)
    ary.push(errorMsg)
    return strategies[strategy].apply(null, ary)
  })
}
/** 示例
 * validator.addArr(validator, registerForm.userName, [{
    strategy: 'isNonEmpty',
    errorMsg: '用户名不能为空'
  }, {
    strategy: 'minLength:6', 
    errorMsg: '用户名长度不能小于 10 位'
  }]);
*/
Validator.prototype.addArr = function(self, dom, rules) { // self 是创建出的实例
  for (let i = 0; i < rules.length; i++) {
    const item = rules[i];
    Validator.prototype.add.call(self, dom, item.strategy, item.errorMsg)
  }
}
Validator.prototype.start = function() { // 执行检验
  for (let i = 0; i < this.cache.length; i++) {
    const validatorFunc = this.cache[i];
    let msg = validatorFunc();
    if (msg) return msg; // 如果未通过检验，返回错误提示
  }
}