# meta标签

> 通常所说的META标签，是在HTML网页源代码中一个重要的html标签。META标签用来描述一个HTML网页文档的属性，例如作者、日期和时间、网页描述、关键词、页面刷新等。

meta 元素定义的元数据的类型包括以下几种：

* 如果设置了 name 属性，meta 元素提供的是文档级别（document-level）的元数据，应用于整个页面。
* 如果设置了 http-equiv 属性，meta 元素则是编译指令，提供的信息与类似命名的HTTP头部相同。
* 如果设置了 charset 属性，meta 元素是一个字符集声明，告诉文档使用哪种字符编码。
* 如果设置了 itemprop 属性，meta 元素提供用户定义的元数据。

## 常用meta标签

### charset

声明文档使用的字符编码，解决乱码问题。`一定要写在第一行`

```html
<meta charset="utf-8">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
```

### SEO优化

```html
<!-- 页面标题<title>标签(head 头部必须) -->
<title>your title</title>
<!-- 页面关键词 keywords -->
<meta name="keywords" content="your keywords">
<!-- 页面描述内容 description -->
<meta name="description" content="your description">
<!-- 定义网页作者 author -->
<meta name="author" content="author,email address">
<!-- 定义网页搜索引擎索引方式，robotterms 是一组使用英文逗号「,」分割的值，通常有如下几种取值：none，noindex，nofollow，all，index和follow。 -->
<meta name="robots" content="index,follow">
```

### viewport

设置移动端页面布局。

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

content 参数：

* width viewport 宽度(数值/device-width)
* height viewport 高度(数值/device-height)
* initial-scale 初始缩放比例
* maximum-scale 最大缩放比例
* minimum-scale 最小缩放比例
* user-scalable 是否允许用户缩放(yes/no)

### other

```html
<!-- 禁止自动翻译 -->
<meta name="google" value="notranslate">
<!-- 忽略页面中的数字识别为电话，忽略email识别 -->
<meta name="format-detection" content="telphone=no, email=no" />
<!-- 删除苹果默认的工具栏和菜单栏 -->
<meta name="apple-mobile-web-app-capable" content="yes" />
<!-- 设置苹果工具栏颜色 -->
<meta name="apple-mobile-web-app-status-bar-style" content="black" />
```
