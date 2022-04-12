## 后端给十万条数据怎么优化

1. requestAnimationFrame
2. 文档碎片 document.createDocumentFragment() 先放进文档碎片，最后统一appendChild进DOM
3. 懒加载
4. 虚拟列表
