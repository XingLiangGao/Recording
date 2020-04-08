## 错误处理与调试

### 错误处理

#### try-catch
```javascript
try{ 
 // 可能会导致错误的代码
} catch(error){ 
 // 在错误发生时怎么处理
}
```

如果 try 块中的任何代码发生了错误，就会立即退出代码执行过程，然后接着执行 catch 块。此时，catch 块会接收到一个包含错误信息的对象。即使你不想使用这个错误对象，也要给它起个名字。

**finally语句**

```javascript
function testFinally(){ 
  try { 
    return 2; 
  } catch (error){ 
    return 1; 
  } finally { 
    return 0; 
  } 
}
```

使用 finally 语句，不管代码是否正常执行，最后都会执行 finally 语句。return 语句也会被忽略。

**错误类型**

Error 
基类型，其他错误类型都继承自该类型。

EvalError 
eval()函数发生异常时被抛出。

RangeError 
数值超出相应范围时触发。

ReferenceError 
访问不存在的变量时，就会发生这种错误

SyntaxError 
把语法错误的 JavaScript 字符串传入 eval()函数时，就会导致此类错
误。

TypeError 
在变量中保存着意外的类型时，或者在访问不存在的
方法时，都会导致这种错误。

URIError
在使用 encodeURI()或 decodeURI()，而 URI 格式不正确时出现

```javascript
try { 
  someFunction(); 
} catch (error){ 
  if (error instanceof TypeError){ 
  //处理类型错误
  } else if (error instanceof ReferenceError){ 
  //处理引用错误
  } else { 
  //处理其他类型的错误
  } 
}
```

使用 throw 来抛出错误
```javascript
throw new SyntaxError("I don’t like your syntax."); 
throw new TypeError("What type of variable do you take me for?"); 
throw new RangeError("Sorry, you just don’t have the range."); 
throw new EvalError("That doesn’t evaluate."); 
throw new URIError("Uri, is that you?"); 
throw new ReferenceError("You didn’t cite your references properly.");
```

#### 错误事件（error）
```javascript
window.onerror = function(message, url, line){ 
  alert(message); 
};
```
只要发生错误，无论是不是浏览器生成的，都会触发 error 事件，并执行这个事件处理程序。

#### 常见的错误类型
**类型转换错误**
1. 在对比是建议使用全等操作符，而不是相等操作符。
2. 使用 if 语句，建议在控制语句中使用确切的布尔值。
```javascript
function concat(str1, str2, str3){ 
  var result = str1 + str2; 
  if (str3){ //绝对不要这样!!! 这里可以使用 typeof 确定传入值的类型
    result += str3; 
  } 
  return result; 
}
```

**数据类型错误**
在任何函数中，如果使用了特定类型才能使用的方法，就必须要执行特性检测。

```javascript
function logError(sev, msg){ 
  var img = new Image(); 
  img.src = "log.php?sev=" + encodeURIComponent(sev) + "&msg=" + 
  encodeURIComponent(msg); 
}
```
优势：
1. 所有浏览器都支持 Image 对象
2. 可以避免跨域限制。
3. 在记录错误的过程中出问题的概率比较低。