# js 循环语句

## for 语句

```js
for ([initialization]; [condition]; [final-expression]) statement
```

initialization  一个表达式或变量声明，用于初始化。使用 var 声明的变量是与 for 循环处在同样的作用域中。用 let 声明的变量是语句的局部变量。

condition  一个表达式用于确定循环能否被执行。

final-expression  每次循环的最后都要执行的表达式。在 condition 之前执行。

statement condition  为 true 就会被执行的语句

## for...in 语句

遍历对象的可枚举属性（除Symbol）

```js
for (variable in object) statement
```

variable  每次迭代都会赋值不同的属性名

object  非Symbol类型的可枚举属性被迭代的对象

如果你只要考虑对象本身的属性，而不是它的原型，那么使用 getOwnPropertyNames() 或执行 hasOwnProperty() 来确定某属性是否是对象本身的属性（也能使用propertyIsEnumerable）。

## for...of 语句

在可迭代对象（包括 Array，Map，Set，String，TypedArray，arguments 对象等等）上创建一个迭代循环

```js
for (variable of iterable) statement
```

variable  将不同属性的值赋值给变量

iterable  枚举其属性的对象

对于**for...of**的循环，可以由**break, throw  continue 或return**终止。在这些情况下，迭代器关闭。

## for...of 与 for...in 的区别

**for...in** 语句以任意顺序迭代对象的可枚举属性。(key，包含原型上的属性)

**for...of** 语句遍历可迭代对象定义要迭代的数据。(value)

## 迭代器

迭代器（iterator）是一种对象，它能够用来遍历容器中的部分或全部元素

Iterator 的作用有三个：一是为各种数据结构，提供一个统一的、简便的访问接口；二是使得数据结构的成员能够按某种次序排列；三是 ES6 创造了一种新的遍历命令for...of循环，Iterator 接口主要供for...of消费。

```js
var it = makeIterator(['a', 'b']);

it.next() // { value: "a", done: false }
it.next() // { value: "b", done: false }
it.next() // { value: undefined, done: true }

function makeIterator(array) {
  var nextIndex = 0;
  return {
    next: function() {
      return nextIndex < array.length ?
        {value: array[nextIndex++], done: false} :
        {value: undefined, done: true};
    }
  };
}
```

每一次调用next方法，都会返回数据结构的当前成员的信息。具体来说，就是返回一个包含value和done两个属性的对象。其中，value属性是当前成员的值，done属性是一个布尔值，表示遍历是否结束。

## froEach()

返回值是 undefined

```js
arr.forEach(callback(currentValue [, index [, array]])[, thisArg]);
```

- callback  为数组中每个元素执行的函数，有三个参数
  - currentValue  当前元素
  - index  当前元素索引
  - array  遍历的数组

- thisArg  执行 callback 时，this 的值

除了抛出异常以外，没有办法中止或跳出 forEach() 循环。
如果需要提前终止循环，可以使用 every() some() find() findIndex()

## map()

创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。

```js
var new_array = arr.map(function callback(currentValue[, index[, array]]) {
  // Return element for new_array
}[, thisArg])
```

- callback  生成新数组元素的函数，有三个参数
  - currentValue  当前元素
  - index  当前元素索引
  - array  遍历的数组

- thisArg  执行 callback 时，this 的值
