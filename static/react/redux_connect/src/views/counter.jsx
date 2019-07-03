import React,{Component} from 'react'
import PropTypes from 'prop-types'

export default class Counter extends Component {

  static propTypes = {
    count: PropTypes.number.isRequired,
    increment: PropTypes.func.isRequired,
    decrement: PropTypes.func.isRequired,
    async: PropTypes.func.isRequired
  }

  increment = () => {
    const number = this.refs.selectName.value * 1
    this.props.increment(number)
  }

  decrement = () => {
    const number = this.refs.selectName.value * 1
    this.props.decrement(number)
  }

  async = () => {
    const number = this.refs.selectName.value * 1
    this.props.async(number)
  }

  render() {
    const {count} = this.props
    return (
      <div>
        <p>click me {count} number</p>
        <select ref="selectName">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>&nbsp;
        <button onClick={this.increment}>+</button>&nbsp;
        <button onClick={this.decrement}>-</button>&nbsp;
        <button onClick={this.async}>async</button>
      </div>
    )
  }
} 