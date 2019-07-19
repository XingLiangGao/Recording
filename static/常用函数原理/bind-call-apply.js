//bind
Function.prototype.mybind = function (context) {
  if(typeof this !== "function"){
    throw new TypeError("Error")
  }
  let _this = this
  
  let args = [...arguments].slice(1)
  console.log(args)
  return function Func() {
    if(this instanceof Func){
      return new _this(context, ...arguments)
    }else{
      return _this.apply(context, args.concat(...arguments))
    }
  }
}

//apply
Function.prototype.myapply = function(context){
  if(typeof this !== "function") {
    throw TypeError("Error")
  }
  context = context || window
  context.fn = this
  let result
  if(arguments[1]){
    result = context.fn(...arguments)
  }else{
    result = context.fn()
  }
  delete context.fn
  return result
}

//call
Function.prototype.prototype.mycall = function(context) {
  if(typeof this !== "function") {
    throw TypeError("Error")
  }
  context = context || window
  let args = [...arguments].slice(1)
  context.fn = this
  let result = context.fn(...args)
  delete context.fn
  return result
}