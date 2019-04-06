'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var data = 'module2 data';
function fun1() {
  console.log('module2 fun1' + data);
}
function fun2() {
  console.log('module2 fun2' + data);
}
exports.default = { fun1: fun1, fun2: fun2 };