# 剪贴板 Clipboard API

## Document.execCommand() 方法

`Document.execCommand()`是操作剪贴板的传统方法，各种浏览器都支持。

```js
document.execCommand(aCommandName, aShowDefaultUI, aValueArgument)

aCommandName: 命令的名称 例如：copy、cut、paste...

aShowDefaultUI: 是否展示用户界面，一般为false

aValueArgument: 额外的参数，例如图片的url
```

1. 复制

复制时，选中文本调用方法，文本就会被复制

```js
const inputElement = document.querySelector('#input');
inputElement.select();
document.execCommand('copy');
```

必须要选中文本才可复制成功，如果是文本标签，使用`document.createRange()`创建选中范围，使用 `window.getSelection()` 获得用户选择的文本范围

也可以动态创建 input 再选中复制

```js
const spanEle = document.getElementsByTagName('span')[0];
let selection = window.getSelection();
let range = document.createRange();

range.selectNode(spanEle);
selection.removeAllRanges();
selection.addRange(range);
document.execCommand('copy')
```

2. 粘贴

粘贴时，调用`document.execCommand('paste')`，就会将剪贴板里面的内容，输出到当前的焦点元素中。

```js
// 已废弃
const pasteText = document.querySelector('#output');
pasteText.focus();
document.execCommand('paste');
```

监听 paste 事件

```js
document.addEventListener('paste', event => {
  // 从event中读取clipboardData
  const pasteContent = (event.clipboardData || window.clipboardData).getData('text');
  // do whatever
});
```

## 异步 Clipboard API

有较高的安全限制，只能在 HTTPS 环境或者 localhost 环境使用，使用 read 和 write 必须获得用户的许可。

系统剪贴板暴露于全局属性 `Navigator.clipboard` 之中。

四种方法：`read()`、`readText()`、`write()`、`writeText()`、

```js
navigator.clipboard.writeText("123").then(function() {
  /* clipboard successfully set */
}, function() {
  /* clipboard write failed */
});
```