…… 
[TOC] 
……

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
#### touch.js 文件
```
export default function vueTouch(el,binding,type){//触屏函数
    var _this=this;
    this.obj=el;
    this.binding=binding;
    this.touchType=type;
    this.vueTouches={x:0,y:0};//触屏坐标
    this.vueMoves=true;
    this.vueLeave=true;
    this.vueCallBack=typeof(binding.value)=="object"?binding.value.fn:binding.value;
    this.obj.addEventListener("touchstart",function(e){
        _this.start(e);
    },false);
    this.obj.addEventListener("touchend",function(e){
        _this.end(e);
    },false);
    this.obj.addEventListener("touchmove",function(e){
        _this.move(e);
    },false);
};
vueTouch.prototype={
    start:function(e){//监听touchstart事件
        this.vueMoves=true;
        this.vueLeave=true;
        this.longTouch=true;
        this.vueTouches={x:e.changedTouches[0].pageX,y:e.changedTouches[0].pageY};
        this.time=setTimeout(function(){
            if(this.vueLeave&&this.vueMoves){
                this.touchType=="longtap"&&this.vueCallBack(this.binding.value,e);
                this.longTouch=false;
            };
        }.bind(this),1000);
    },
    end:function(e){//监听touchend事件
        var disX=e.changedTouches[0].pageX-this.vueTouches.x;//计算移动的位移差
        var disY=e.changedTouches[0].pageY-this.vueTouches.y;
        clearTimeout(this.time);
        if(Math.abs(disX)>10||Math.abs(disY)>100){//当横向位移大于10，纵向位移大于100，则判定为滑动事件
            this.touchType=="swipe"&&this.vueCallBack(this.binding.value,e);//若为滑动事件则返回
            if(Math.abs(disX)>Math.abs(disY)){//判断是横向滑动还是纵向滑动
                if(disX>10){
                    this.touchType=="swiperight"&&this.vueCallBack(this.binding.value,e);//右滑
                };
                if(disX<-10){
                    this.touchType=="swipeleft"&&this.vueCallBack(this.binding.value,e);//左滑
                };
            }else{
                if(disY>10){
                    this.touchType=="swipedown"&&this.vueCallBack(this.binding.value,e);//下滑
                };
                if(disY<-10){
                    this.touchType=="swipeup"&&this.vueCallBack(this.binding.value,e);//上滑
                };
            };
        }else{
            if(this.longTouch&&this.vueMoves){
                this.touchType=="tap"&&this.vueCallBack(this.binding.value,e);
                this.vueLeave=false
            };
        };
    },
    move:function(e){//监听touchmove事件
        this.vueMoves=false;
    }
};
```
#### main.js 文件
```
    import Vue from 'vue'
    
    import vueTouch from './assets/js/touch.js'
    Vue.directive("tap",{//点击事件
        bind:function(el,binding){
            new vueTouch(el,binding,"tap");
        }
    });
    Vue.directive("swipe",{//滑动事件
        bind:function(el,binding){
            new vueTouch(el,binding,"swipe");
        }
    });
    Vue.directive("swipeleft",{//左滑事件
        bind:function(el,binding){
            new vueTouch(el,binding,"swipeleft");
        }
    });
    Vue.directive("swiperight",{//右滑事件
        bind:function(el,binding){
            new vueTouch(el,binding,"swiperight");
        }
    });
    Vue.directive("swipedown",{//下滑事件
        bind:function(el,binding){
            new vueTouch(el,binding,"swipedown");
        }
    });
    Vue.directive("swipeup",{//上滑事件
        bind:function(el,binding){
            new vueTouch(el,binding,"swipeup");
        }
    });
    Vue.directive("longtap", {//长按事件
        bind: function (el, binding) {
            new vueTouch(el, binding, "longtap");
        }
    })
```
#### 时间戳的转化
 ```
function format(date, pattern) {
    pattern = pattern || 'yyyy-MM-dd';
    return pattern.replace(/([yMdhsm])(\1*)/g, function ($0) {
        switch ($0.charAt(0)) {
            case 'y': return padding(date.getFullYear(), $0.length);
            case 'M': return padding(date.getMonth() + 1, $0.length);
            case 'd': return padding(date.getDate(), $0.length);
            case 'w': return date.getDay() + 1;
            case 'h': return padding(date.getHours(), $0.length);
            case 'm': return padding(date.getMinutes(), $0.length);
            case 's': return padding(date.getSeconds(), $0.length);
        }
    });
}
function padding(s, len) {
    var len = len - (s + '').length;
    for (var i = 0; i < len; i++) { s = '0' + s; }
    return s;
};
```

#### 解决ios中软键盘不回弹的问题
```
$('input').blur(function(){
    setTimeout(function () {
        var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
        window.scrollTo(0, Math.max(scrollHeight - 1, 0));
    }, 100);
})
```
#### 解决安卓软键盘遮挡住input
```
if (/Android/gi.test(navigator.userAgent)) {
    window.addEventListener('resize', function () {
        if (document.activeElement.tagName == 'INPUT' || document.activeElement.tagName == 'TEXTAREA') {
            window.setTimeout(function () {     
                document.activeElement.scrollIntoViewIfNeeded();
            }, 0);
        }
    })
}
```

#### h5下载文件 适合各种文件类型
```
downloadFile(url , name , headers = {} , param = {}){
    let paramAll = Object.assign({_cache:Date.now()} , param);
    axios.get(url , {
        headers,
        responseType:'blob', // important
        params:paramAll
    }).then((response)=>{
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download',name);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    })
},
```

#### h5导出pdf文件
```
// 导出页面为PDF格式
import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'

export const  getPdf  = function (title,str) {
    html2Canvas(document.querySelector(str), {
        allowTaint: true
    }).then(function (canvas) {
        let contentWidth = canvas.width
        let contentHeight = canvas.height
        let pageHeight = contentWidth / 592.28 * 841.89
        let leftHeight = contentHeight
        let position = 0
        let imgWidth = 595.28
        let imgHeight = 592.28 / contentWidth * contentHeight
        let pageData = canvas.toDataURL('image/jpeg', 1.0)
        let PDF = new JsPDF('', 'pt', 'a4')
        if (leftHeight < pageHeight) {
            PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
        } else {
            while (leftHeight > 0) {
                PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
                leftHeight -= pageHeight
                position -= 841.89
                if (leftHeight > 0) {
                    PDF.addPage()
                }
            }
        }
        PDF.save(title + '.pdf')
    })
}

// 使用方法
getPdf('文件名','要导出的标签id名或class名')
```

#### h5添加水印
```
// 水印
'use strict'

let watermark = {}

let setWatermark = (str) => {
    let id = 'zxyxj'

    if (document.getElementById(id) !== null) {
        document.body.removeChild(document.getElementById(id))
    }

    let can = document.createElement('canvas')
    // 参数大小可调 水印的密集程度 
    can.width = 80
    can.height = 80

    let cans = can.getContext('2d')
    cans.rotate(-20 * Math.PI / 180)
    cans.font = '14px Vedana'
    cans.fillStyle = 'rgba(200, 200, 200, 0.20)'
    cans.textAlign = 'left'
    cans.textBaseline = 'Middle'
    cans.fillText(str, can.width / 5, can.height / 2)
    // 参数大小可调  目前是最多按四字显示

    let div = document.createElement('div')
    div.id = id
    div.style.pointerEvents = 'none'
    div.style.top = '20px'
    div.style.left = '0px'
    div.style.position = 'fixed'
    div.style.zIndex = '100000'
    div.style.width = document.documentElement.clientWidth + 'px'
    div.style.height = document.documentElement.clientHeight  + 'px'
    div.style.background = 'url(' + can.toDataURL('image/png') + ') left top repeat'
    document.body.appendChild(div)
    return id
}

// 该方法只允许调用一次
watermark.set = (str) => {
    let id = setWatermark(str)
    setInterval(() => {
        if (document.getElementById(id) === null) {
            id = setWatermark(str)
        }
    }, 500)
    window.onresize = () => {
        setWatermark(str)
    }
}

export default watermark
```
