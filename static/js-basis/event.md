# 事件

事件，就是文档或浏览器窗口中发生的一些特定的交互瞬间。可以使用侦听器（或处理程序）来预订事件，以便事件发生时执行相应的代码。

## 事件流

事件流描述的是从页面中接收事件的顺序。

IE 的事件流叫做**事件冒泡（event bubbling）**,即事件开始时由最具体的元素（target）接收，然后逐级向上传播到不具体（document）的节点。

Netscape 的事件流叫做**事件捕获（event capturing）**。事件捕获的用意在于在
事件到达预定目标之前捕获它。

“DOM2 级事件”规范要求事件应该从 document 对象开始传播，但这些浏览器都是从 window 对象开始捕获事件的。

**DOM事件流**

“DOM2级事件”规定的事件流包括三个阶段：事件捕获阶段、处于目标阶段和事件冒泡阶段。

事件捕获阶段为截获事件提供了机会。但 IE9、Safari、Chrome、Firefox 和 Opera 9.5 及更高版本都会在捕获阶段触发事件对象上的事件。结果，就是有两个机会在目标对象上面操作事件。

## 事件处理程序

事件就是用户或浏览器自身执行的某种动作。处理事件的函数就是事件处理程序。

### HTML事件处理程序

```html
<!-- 输出 "click" --> 
<input type="button" value="Click Me" onclick="alert(event.type)">

<!-- 输出 "Click Me" --> 
<input type="button" value="Click Me" onclick="alert(this.value)">
```

通过 event 变量，可以直接访问事件对象，你不用自己定义它，也不用从函数的参数列表中读取。在这个函数内部，this 值等于事件的目标元素。

这个动态创建的函数，可以像访问局部变量一样访问 document 及该元素本身的成员。这个函数使用 with 像下面这样扩展作用域：
```javascript
function(){ 
  with(document){ 
    with(this){ 
      //元素属性值
    } 
  } 
}
```
如果当前元素是一个表单输入元素，则作用域中还会包含访问表单元素（父元素）的入口。

在 HTML 中指定事件处理程序会有两个问题：
1. 如果用户再页面还没有加载完成事件处理程序之前点击了按钮，页面就会报错，还需要使用 try-catch 来抛出错误
2. HTML 与 JavaScript 代码紧密耦合，更换事件处理程序需要改动两个地方。

### DOM0 级事件处理程序

每个元素（包括 window 和 document）都有自己的事件处理程序属性，我们通过文档对象取得了一个按钮的引用，然后为它指定了 onclick 事件处理程序。

```javascript
var btn = document.getElementById("myBtn"); 
btn.onclick = function(){ 
  alert("Clicked"); 
};
```
这里的事件处理程序是在元素的作用域中运行；换句话说，程序中的 this 引用当前元素。将事件处理程序设置为 null 之后，再单击按钮将不会有任何动作发生。

### DOM2 级事件处理程序

“DOM2级事件”定义了两个方法，用于处理指定和删除事件处理程序的操作：addEventListener()和 removeEventListener()。所有 DOM 节点中都包含这两个方法，并且它们都接受 3 个参数：要处理的事件名、作为事件处理程序的函数和一个布尔值。最后这个布尔值参数如果是 true，表示在捕获阶段调用事件处理程序；如果是 false，表示在冒泡阶段调用事件处理程序。

```javascript
var btn = document.getElementById("myBtn"); 
var handler = function(){ 
  alert(this.id); 
}; 
btn.addEventListener("click", handler, false); 
btn.removeEventListener("click", handler, false);
```

特点：
1. 使用这种方式可以同时定义多条事件处理程序，会按照执行顺序执行。
2. 使用 addEventListener 监听的匿名函数无法移除。
3. 不建议在事件捕获阶段注册事件处理程序（兼容性不好）。
4. 与 DOM0 级方法一样，这里添加的事件处理程序也是在其依附的元素的作用域
中运行。

注意：在同一个元素上写两个不同阶段的事件处理，是按顺序执行的，而不是依据第三个参数确定执行顺序。捕获阶段早于冒泡阶段执行指的是外层元素和内层元素的事件处理顺序。

### IE事件处理程序

IE 实现了与 DOM 中类似的两个方法：attachEvent()和 detachEvent()。这两个方法接受相同的两个参数：事件处理程序名称与事件处理程序函数。

```javascript
var btn = document.getElementById("myBtn"); 
var handler = function(){ 
  alert("Clicked"); 
}; 
btn.attachEvent("onclick", handler);
btn.detachEvent("onclick", handler);
```

特点：
1. attachEvent()的第一个参数是"onclick"，而非 DOM 的 addEventListener()方法中的"click"。
2. 这里的事件处理程序会在全局作用域中运行，所以这里的 this 等于 window。
3. 可以添加多条事件处理程序，但执行顺序是相反的。

## 事件对象

常见的事件对象：

**cancelable**    表明是否可以取消事件的默认行为
**currentTarget**    表明是否可以取消事件的默认行为
**preventDefault()**    取消事件的默认行为。
**stopPropagation()**    取消事件的进一步捕获或冒泡。
**target**    事件的目标
**type**    被触发的事件的类型

只有在事件处理程序执行期间，event 对象才会存在；一旦事件处理程序执行完
成，event 对象就会被销毁。

**IE中的事件对象**

在使用 DOM0 级方法添加事件处理程序时，event 对象作为 window 对象的一个
属性存在。

```javascript
var btn = document.getElementById("myBtn"); 
btn.onclick = function(){ 
  var event = window.event; 
  alert(event.type); //"click" 
};
```

常见的事件对象：

**cancelBubble**    默认值为false，但将其设置为true就可以取消事件冒泡
**returnValue**    默认值为true，但将其设置为false就可以取消事件的默认行为
**srcElement()**    事件的目标
**type**    被触发的事件的类型

## 事件类型
“DOM3级事件”规定了以下几类事件。

 UI（User Interface，用户界面）事件，当用户与页面上的元素交互时触发；
 焦点事件，当元素获得或失去焦点时触发；
 鼠标事件，当用户通过鼠标在页面上执行操作时触发；
 滚轮事件，当使用鼠标滚轮（或类似设备）时触发；
 文本事件，当在文档中输入文本时触发；
 键盘事件，当用户通过键盘在页面上执行操作时触发；
 合成事件，当为 IME（Input Method Editor，输入法编辑器）输入字符时触发；
 变动（mutation）事件，当底层 DOM 结构发生变化时触发。

### UI事件
UI 事件指的是那些不一定与用户操作有关的事件。

1. load：当页面完全加载后在 window 上面触发，当所有框架都加载完毕时在框架集上面触发，当图像加载完毕时在 img 元素上面触发，或者当嵌入的内容加载完毕时在 object 元素上面
触发。
2. unload：当页面完全卸载后在 window 上面触发，当所有框架都卸载后在框架集上面触发，或者当嵌入的内容卸载完毕后在 object 元素上面触发。
3. abort：在用户停止下载过程时，如果嵌入的内容没有加载完，则在 object 元素上面触发。
4. error：当发生 JavaScript 错误时在 window 上面触发，当无法加载图像时在 img 元素上面触发，当无法加载嵌入内容时在 object 元素上面触发，或者当有一或多个框架无法加载时在框架集上面触发。
5. select：当用户选择文本框（ input 或 texterea ）中的一或多个字符时触发。
6. resize：当窗口或框架的大小变化时在 window 或框架上面触发。
7. scroll：当用户滚动带滚动条的元素中的内容时，在该元素上面触发。 body 元素中包含所加载页面的滚动条。

多数这些事件都与 window 对象或表单控件相关。

## 内存和性能

1. 有必要限制一个页面中事件处理程序的数量，数量太多会导致占用大量内存，而且也会让用户
感觉页面反应不够灵敏。
2. 建立在事件冒泡机制之上的事件委托技术，可以有效地减少事件处理程序的数量。
3. 建议在浏览器卸载页面之前移除页面中的所有事件处理程序。