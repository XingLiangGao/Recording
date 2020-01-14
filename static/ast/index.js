// 功能：使用 AST 改变一个函数的输出值

const generator = require("@babel/generator"); // AST 抽象语法树 ---->>> 新的js代码
const parser = require("@babel/parser"); // 将 js 代码 ---->>> AST 抽象语法树
const traverse = require("@babel/traverse"); // 对 AST 节点进行递归遍历
const types = require("@babel/types") // 对具体的 AST 节点进行修改

function compile(code) {
  // 1. parse 将代码解析为抽象语法树（AST）
  const ast = parser.parse(code);

  // 2. traverse 转换代码
  const visitor = {
    CallExpression(path) {
      // 获取 callee 数据
      const { callee } = path.node;
      // 通过三个条件判断是否调用了 console.log 方法
      // 1. 判断是否是成员表达式节点
      // 2. 判断是否是 console 对象
      // 3. 判断对象的属性是否是 log
      const isConsoleLog = types.isMemberExpression(callee) &&
        callee.object.name === "console" &&
        callee.property.name === "log";
      if (isConsoleLog) {
        // 如果是 console.log 的调用 找到上一个父节点是函数
        const funcPath = path.findParent(p => {
          return p.isFunctionDeclaration();
        });
        // 取函数的名称
        const funcName = funcPath.node.id.name;
        // 将名称通过 types 来放到函数的参数前面去
        path.node.arguments.unshift(types.stringLiteral(funcName));
      }
    }
  }
  traverse.default(ast, visitor);

  //3. generator 将 AST 转回成代码
  return generator.default(ast, {}, code);
}

const code = `
function getData() {
  console.log("data")
}
`;
const newCode = compile(code)
console.log(newCode)