import {foo, bar} from './module1';
import {arr} from './module1';
import module2 from './module2';
import $ from 'jquery';

foo();
bar();
console.log(arr);
console.log(module2);
$('body').css('background', 'red')