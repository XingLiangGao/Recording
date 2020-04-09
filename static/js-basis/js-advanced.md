## 高级技巧

### 高级函数

**安全类型检测**

检测某个对象到底是原生对象还是开发人员自定义的对象

解决办法：在任何值上调用 Object 原生的 toString()方法，都会返回一个[object NativeConstructorName]格式的字符串。每个类在内部都有一个[[Class]]属性，这个属性中就指定了上述字符串中的构造函数名。

```javascript
function isFunction(value){ 
  return Object.prototype.toString.call(value) == "[object Function]"; 
} 
function isRegExp(value){ 
  return Object.prototype.toString.call(value) == "[object RegExp]"; 
}
```

**作用域安全的构造函数**

当没有使用 new 操作符来调用该构造函数,由于该 this 对象是在运行时绑定的，所以直接调用 Person()，this 会映射到全局对象 window 上，导致错误对象属性的意外增加。

```javascript
function Person(name, age, job){ 
  this.name = name; 
  this.age = age; 
  this.job = job; 
} 
var person = new Person("Nicholas", 29, "Software Engineer");
```

解决办法：作用域安全的构造函数在进行任何更改前，首先确认 this 对象是正确类型的实例。如果不是，那么会创建新的实例并返回。

```javascript
function Person(name, age, job){ 
  if (this instanceof Person){ 
    this.name = name; 
    this.age = age; 
    this.job = job; 
  } else { 
    return new Person(name, age, job); 
  } 
}
```

实现这种模式后，如果你使用构造函数窃取模式的继承且不使用原型链，那么这个继承很可能被破坏。例：
```javascript
function Dog(variety){ 
  Person.call(this, 'jack', 4, 'bray');
  this.variety = variety; 
  this.getVariety = function(){ 
    return this.variety; 
  }; 
}
```

由于 Person 构造函数是作用域安全的，this 对象并非 Person 的实例，所以会创建并返回一个新的 Person 对象。

解决办法：构造函数窃取结合使用原型链或者寄生组合则可以解决这个问题。

```javascript
Dog.prototype = new Person();
```

**惰性载入函数**

因为浏览器之间行为的差异，多数 JavaScript 代码包含了大量的 if 语句，将执行引导到正确的代码中。

解决办法：

```javascript
//第一种
function returnLink() {
  if (ua === 'android') {
    returnLink = function() {
      return 'www.baidu.com'
    }
  } else {
    returnLink = function() {
      return 'www.weibo.com'
    }
  }
  return returnLink()
}

//第二种
var returnLink = (function() {
  if (ua === 'android') {
    return function() {
      return 'www.baidu.com'
    }
  } else {
    return function() {
      return 'www.weibo.com'
    }
  }
})()
```

**函数绑定**

函数绑定要创建一个函数，可以在特定的 this 环境中以指定参数调用另一个函数。

```javascript
var handler = { 
  message: "Event handled", 
  handleClick: function(event){ 
    alert(this.message); 
  } 
}; 
var btn = document.getElementById("my-btn"); 
btn.addEventListener("click", handler.handleClick); //弹出 undefined
```

问题在于没有保存handler.handleClick()的环境，所以 this 对象最后是指向了 DOM 按钮而非 handler（在 IE8 中，
this 指向 window。）

解决办法：

1. 闭包
```javascript
btn.addEventListener("click", (event) => {handler.handleClick(event)} );
```
2. bind()函数
```javascript
function bind(fn, context){ 
  return function(){ 
    return fn.apply(context, arguments); 
  }; 
}

btn.addEventListener("click", bind(handler.handleClick, handler));
btn.addEventListener("click", handler.handleClick.bind(handler));
```

不能使用call 和 apply 是因为这两个是直接调用， 从上面 bind 函数可以看出 bind 是通过返回一个新函数，在函数调用时执行这个新函数。

**函数柯里化**

是把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数而且返回结果的新函数的技术。

柯里化函数通常由以下步骤动态创建：调用另一个函数并为它传入要柯里化的函数和必要参数。通用方式如下：

```javascript
function curry(fn){ 
  var args = Array.prototype.slice.call(arguments, 1); //从参数中取出第一位之后的所有参数，因为第一个参数是要进行柯里化的函数
  return function(){ 
    var innerArgs = Array.prototype.slice.call(arguments); 
    var finalArgs = args.concat(innerArgs); 
    return fn.apply(null, finalArgs); 
  }; 
}

//应用
function add(num1, num2){ 
  return num1 + num2; 
} 
var curriedAdd = curry(add, 5); 
alert(curriedAdd(3)); //8
```

### 防篡改对象

**注意：一旦把对象定义为防篡改，就无法撤销了。**

**不可扩展对象**

在调用了 Object.preventExtensions()方法后，就不能给对象添加新属性和方法了。
Object.istExtensible()方法可以确定对象是否可以扩展。

**密封的对象**

使用 Object.seal()方法可以密封对象。不可扩展，不能删除属性和方法，可以修改。
使用 Object.isSealed()方法可以确定对象是否被密封了。

**冻结的对象**

Object.freeze()方法可以用来冻结对象。不可扩展，不能删除属性和方法，也不能修改。
Object.isFrozen()方法用于检测冻结对象。

### 高级定时器

**重复的定时器**

>使用 setInterval()创建的定时器确保了定时器代码规则地插入队列中。
>这个方式的问题在于，定时器代码可能在代码再次被添加到队列之前还没有完成执行，结果导致定时器代码连续运行好几次，而之间没有任何停顿。
>幸好，JavaScript 引擎够聪明，能避免这个问题。当使用 setInterval()时，仅当没有该定时器的任何其他代码实例时，才将定时器代码添加到队列中。

如果定时器里的代码执行所需时间大于定时器设置的间隔时间，就有可能会产生跳过执行代码阶段，因为 JavaScript 引擎会判断上一次的代码还没有执行完，所以就会忽略这一次的代码执行。

解决办法：使用链式setTimeout()调用

```javascript
setTimeout(function(){ 
  //处理中
  setTimeout(arguments.callee, interval); //arguments.callee 来获取对当前执行的函数的引用
}, interval);
```

**数组分块（array chunking）**

chunk()方法接受三个参数：要处理的项目的数组，用于处理项目的函数，以及可选的运行该函数的环境。

```javascript
function chunk(array, process, context){ 
  setTimeout(function(){ 
    var item = array.shift(); 
    process.call(context, item); 
    if (array.length > 0){ 
      setTimeout(arguments.callee, 100); 
    } 
  }, 100); 
}
```

数组分块的重要性在于它可以将多个项目的处理在执行队列上分开，在每个项目处理之后，给予其他的浏览器处理机会运行，这样就可能避免长时间运行脚本的错误。

**函数节流**

throttle()函数接受两个参数：要执行的函数以及在哪个作用域中执行。

```javascript
function throttle(method, context) { 
clearTimeout(method.tId); 
method.tId= setTimeout(function(){ 
  method.call(context); 
}, 100); 
}
```
