'use strict';

var _module = require('./module1');

var _module2 = require('./module2');

var _module3 = _interopRequireDefault(_module2);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _module.foo)();
(0, _module.bar)();
console.log(_module.arr);
console.log(_module3.default);
(0, _jquery2.default)('body').css('background', 'red');