'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.foo = foo;
function foo() {
  console.log('module1 foo');
}
var arr = exports.arr = [1, 2, 3];
var bar = exports.bar = function bar() {
  console.log('module1 bar');
};