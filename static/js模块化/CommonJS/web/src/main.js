const $ = require('jquery');

const module1 = require('./modules1');
const module2 = require('./modules2');
const module3 = require('./modules3');

module1();
module2.foo();
module3.foo();
module3.bar();

// $('body').css('background','pink');