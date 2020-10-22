# vue3 change

## globalProperties

添加可以在应用程序内的任何组件实例中访问的全局 property。属性名冲突时，组件的 property 将具有优先权。

```js
const app = Vue.createApp({})
app.config.globalProperties.$http = () => {}
```

## provide / inject

当一个组价拥有深层嵌套时，子组件想要使用父组件中的某些内容。如果使用 `prop` 传递，那这个数据需要经过每一层组件的传递，有点繁琐。

这里就可以使用 `provide` 和 `inject` 对。父组件有一个 `provide` 选项来提供数据，子组件有一个 `inject` 选项来开始使用这个数据。

```js
// 父组件
provide: {
  user: 'John Doe'
}

// 子组件引入之后直接通过 this 访问值
inject: ['user']
```

如果要访问组件实例 property，需要将 `provide` 转换为返回对象的函数

```js
provide() {
  return {
    todoLength: this.todos.length
  }
}
```

`provide` 和 `inject` 绑定不是响应式的。不过，如果你向下传递一个响应式对象，这个对象上的 property 会保持响应式。或者使用 `ref` 或 `reactive`。

```js
provide() {
  return {
    todoLength: Vue.computed(() => this.todos.length)
  }
}

setup() {
  const location = ref('North Pole')
  const geolocation = reactive({
    longitude: 90,
    latitude: 135
  })

  provide('location', location)
  provide('geolocation', geolocation)
}
```

如果要确保通过 `provide` 传递的数据不会被注入的组件更改，我们建议对提供者的 property 使用 `readonly`。

```js
// readonly 需要从 vue 中引入
provide('location', readonly(location))
```

## defineComponent

具有组件选项的对象

```js
import { defineComponent } from 'vue'

const MyComponent = defineComponent({
  data() {
    return { count: 1 }
  },
  methods: {
    increment() {
      this.count++
    }
  }
})
```

或者是一个 setup 函数，函数名称将作为组件名称来使用

```js
import { defineComponent, ref } from 'vue'

const HelloWorld = defineComponent(function HelloWorld() {
  const count = ref(0)
  return { count }
})
```

## 生命周期

beforeCreate => use setup() => 初始化之后，data observer 和 event/watcher之前

created => use setup() => 所有数据都已初始化完成，还没有开始挂载

beforeMount => onBeforeMount => 挂载开始之前

mounted => onMounted => 实例挂载结束，但不保证所有子组件已经都被挂载，可以使用$nextTick

```js
mounted() {
  this.$nextTick(function () {
    // 仅在渲染整个视图之后运行的代码
  })
}
```

beforeUpdate => onBeforeUpdate => 更新时调用，发生在虚拟 DOM 打补丁之前

updated => onUpdated => 组件 DOM 已经更新，避免在这里更改状态，和 `mounted` 一样不会保证所有子组件都一起会重绘

beforeUnmount => onBeforeUnmount => 卸载组件实例之前，实例在这里仍然是正常的

unmounted => onUnmounted => 卸载组件实例后调用。

activated => 被 keep-alive 缓存的组件激活时调用。

deactivated => 被 keep-alive 缓存的组件停用时调用。

## setup

在创建组件实例时，在初始 prop 解析之后立即调用 `setup`。生命周期是在 `beforeCreate`之前调用的。

第一个参数是 prop。具有响应式，即会随着传入的 props 更新，可以通过 `watchEffect` 或 `watch` 进行观测和响应。并且不能解构 `props` 对象，因为会失去响应式。

第二个参数是一个上下文对象。该对象暴露了以前在 this 上暴露的 property。这里可以使用解构

```js
setup(props, context) {
  context.attrs
  context.slots
  context.emit
}
```

## watchEffect

立即执行传入的一个函数，同时响应式追踪依赖，并在其依赖变更时重新运行该函数。

```js
const count = ref(0)

watchEffect(() => console.log(count.value))
// -> logs 0

setTimeout(() => {
  count.value++
  // -> logs 1
}, 100)
```

`onTrack` 和 `onTrigger` 选项可用于调试侦听器的行为。

* 当响应式 property 或 ref 作为依赖项被追踪时，将调用 `onTrack`
* 当依赖项变更导致副作用被触发时，将调用 `onTrigger`

```js
watchEffect(
  () => {
    /* 副作用 */
  },
  {
    onTrigger(e) {
      debugger
    }
  }
)
```

## other change

vue 2.x key 不能设置在 `<template>` 标签上，vue 3.x 可以。

3.x 版本中 v-if 总是优先于 v-for 生效。

3.x 新的自定义指令 API

```js
const MyDirective = {
  beforeMount(el, binding, vnode, prevVnode) {}, // 绑定到元素之后调用。只发生一次。
  mounted() {}, // 元素插入父 DOM 后发生。
  beforeUpdate() {}, // 元素本身更新之前调用。
  updated() {}, // 组件和子级被更新，就会调用。
  beforeUnmount() {}, // 卸载元素之前。
  unmounted() {} // 卸载之后，只调用一次。
}
```

3.x 的 `data` 选项只能是 `function`，不再接受 `object`。和 `mixin` 合并时，将进行**浅层次**合并，即只合并组件内定义过的。

过渡类名 `v-enter` 修改为 `v-enter-from`、过渡类名 `v-leave` 修改为 `v-leave-from`。

`<template>` 没有特殊指令的标记 (`v-if/else-if/else`、`v-for` 或 `v-slot`) 现在被视为普通元素，并将生成原生的 `<template>` 元素，而不是渲染其内部内容。

`template`：内容模板元素，通过 js 在内容模板写入数据，然后插入到页面预留的结构当中。

![爱你](./assets/dog.png)
