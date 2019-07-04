#### 获取URL的查询参数
> q={};location.search.replace(/([^?&=]+)=([^&]+)/g,(_,k,v)=>q[k]=v);q;
#### 生成随机十六进制代码（生成随机颜色）
> '#' + Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, '0');
#### 返回一个键盘
> (_=>[..."`1234567890-=~~QWERTYUIOP[]\\~ASDFGHJKL;'~~ZXCVBNM,./~"].map(x=>(o+=`/${b='_'.repeat(w=x<y?2:' 667699'[x=["BS","TAB","CAPS","ENTER"][p++]||'SHIFT',p])}\\|`,m+=y+(x+'    ').slice(0,w)+y+y,n+=y+b+y+y,l+=' __'+b)[73]&&(k.push(l,m,n,o),l='',m=n=o=y),m=n=o=y='|',p=l=k=[])&&k.join`
`)()
#### 移动端1px边框
```
div:before {
    content: "";
    position: absolute;
    width: 200%;
    height: 200%;
    border-width: 1px;
    border-style: solid;
    border-radius: 4px;
    -webkit-transform-origin: 0 0;
    -moz-transform-origin: 0 0;
    -ms-transform-origin: 0 0;
    -o-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scale(0.5, 0.5);
    -ms-transform: scale(0.5, 0.5);
    -o-transform: scale(0.5, 0.5);
    transform: scale(0.5, 0.5);
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    top: 0;
    z-index: -1;
    color: hsla(0, 0%, 100%, 0.4);
}
```
#### js监听目标元素内部变化
```
var container = document.querySelector("target")
container.addEventListener('DOMSubtreeModified',function() {
    ...someThin
}, false);
```
#### ajax get请求向现有URL的末尾添加查询字符串参数
```
function addURLParam(url, name, value) {
    url += (url.indexOf('?') == -1 ? "?" : "&");
    url += encodeURIComponent(name) + "=" + encodeURIComponent(value);
    return url;
}
```
#### 创建XHR对象
```
function createXHR() {
    if (typeof XMLHttpRequest != "undefined") {
      return new XMLHttpRequest();
    } else if (typeof ActiveXObject != "undefined") {
      if (typeof arguments.callee.activeXString != "string") {
        var versions = [ "MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp" ], i, len;
        for (i = 0,len=versions.length; i < len; i++) {
          try {
            new ActiveXObject(versions[i]);
            arguments.callee.activeXString = versions[i];
            break;
          } catch (ex) {
            //跳过
          }
        }
      }

      return new ActiveXObject(arguments.callee.activeXString);
    } else {
      throw new Error("No XHR object avaiable.");
    }
}
```
#### 使用XHR创建一个get请求
```
var xhr = createXHR();
xhr.onreadystatechange = function() {
if (xhr.readyState == 4) {
  if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
    alert(xhr.responseText);
  } else {
    alert("Request was unsuccessful: " + xhr.status);
  }
}
};
xhr.open("get", "example.php", true);
xhr.send(null);
```
#### 回到页面顶部（带动画）
```
backTop() {
    var _self = this;
    var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
    if (currentScroll > 0) {
      parent.window.requestAnimationFrame(_self.backTop);
      parent.window.scrollTo (0,currentScroll - (currentScroll/5));
    }
}
```
#### js判断移动端是Android还是IOS
```
getPhoneSystem() {
  var u = navigator.userAgent,system;
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
  var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  if (isAndroid) {
    system = 'android';
  }
  if (isIOS) {
    system = 'ios';
  }
  localStorage.setItem('system', system)
}
```
#### JavaScript调试
```
//防止展开数据获取到的数据是最新的状态
console.log(JSON.parse(JSON.stringify(arr)))

//查看DOM对象的JavaScript对象的结构
console.dir(document.getElementById('root))

//只查看对象中指定的key和value
console.table(userList, ['id', 'username', 'avator'])

//打印一段代码的性能或者一个异步需要的时间
console.time('timer1'
setTimeout(() => {
	console.timeEnd('timer1')
}, 1000)

```
