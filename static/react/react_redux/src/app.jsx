import React, {Component} from 'react'
import PropTypes from 'prop-types'

import * as actions from './redux/actions'

export default class App extends Component {

  static propTypes = {
    store: PropTypes.object.isRequired
  }

  increment = () => {
    const number = this.refs.numSelect.value * 1;
    // 通过调用dispatch函数修改state
    this.props.store.dispatch(actions.increment(number))
  }

  decrement = () => {
    const number = this.refs.numSelect.value * 1;
    this.props.store.dispatch(actions.decrement(number))
  }

  render() {
    const count  = this.props.store.getState()
    return (
      <div>
        <p>click me {count} numbers</p>
        <select ref="numSelect">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>&nbsp;
        <button onClick={this.increment}>add</button>&nbsp;
        <button onClick={this.decrement}>reduce</button>
      </div>
    )
  }
}