### 基础类型

布尔值、
```ts
let isDone: boolean = false;
```

数字、
```ts
// 支持十进制、十六进制、二进制和八进制
let math: number = 6;
```

字符串、
```ts
// 可以使用模板字符串
let name: string = "jack"
```

数组、
```ts
let list: number[] = [1, 2, 3];
// 数组泛型
let list: Array<number> = [1, 2, 3];
```

元组 Tuple、
```
// 已知元素数量和类型的数组
let x: [string, number];
```

枚举、
```
//为一组数值赋予名字，默认从0开始，也可以手动赋值
enum Color {Red, Green, Blue}
let c: Color = Color.Green;
```

Any、

`任何类型`

Void、

与 any 类型相反，没有任何类型，比如一个函数没有返回值。

Null、Undefined、

默认情况下 null 和 undefined 是所有类型的子类型。

Never、Object、