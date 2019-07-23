function MyComponent() {
  return <h1>简单组件</h1>
}

class MyComponent2 extends React.Component {
  render() {
    return <h1>复杂组件</h1>
  }
}

ReactDOM.render(
  <MyComponent />,
  document.getElementById('app')
)
ReactDOM.render(
  <MyComponent2 />,
  document.getElementById('root')
)

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      todoList: ['吃饭', '睡觉']
    }

    this.add = this.add.bind(this)
  }
  
  add(value) {
    const {todoList} = this.state
    todoList.unshift(value)
    this.setState({
      todoList
    })
  }

  render() {
    const { todoList } = this.state
    const count = this.state.todoList.length
    return (
      <div>
        <Add add={this.add} count={count}/>
        <List todoList={todoList}/>
      </div>
    )
  }
}

class Add extends React.Component {
  constructor(props) {
    super(props)

    this.addTodo = this.addTodo.bind(this)
  }

  addTodo() {
    const value = this.input.value.trim()
    if (!value) {
      return
    }
    this.props.add(value)
    this.input.value = ''
  }

  render() {
    const {count} = this.props
    return (
      <div>
        <input ref={input => this.input = input }/>
        <button onClick={this.addTodo}>add #{count+1}</button>
      </div>
    )
  }
}
Add.propTypes = {
  add: PropTypes.func.isRequired
}

class List extends React.Component {
  render() {
    const { todoList } = this.props
    return (
      <ul>
        {
          todoList.map((item, index) => { 
            return <li key={index}>{item}</li> 
          })
        }
      </ul>
    )
  }
}
List.propTypes = {
  todoList: PropTypes.array.isRequired
}

ReactDOM.render(
  <App/>,
  document.getElementById('todolist')
)