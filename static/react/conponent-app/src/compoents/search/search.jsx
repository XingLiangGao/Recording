import React,{Component} from 'react'
import PropTypes from 'prop-types'
import PubSub from 'pubsub-js'

export default class Search extends Component {

  // static propTypes = {
  //   getSearchName: PropTypes.func.isRequired
  // }

  handleClick = () => {
    const {getSearchName} = this.props
    const searchName = this.input.value.trim()

    if (searchName) {
      // getSearchName(searchName)
      //发布消息
      PubSub.publish('search', searchName)
    }
    
  }

  render() {
    return (
      <div>
        <input type="text" ref={input => this.input = input}/>
        <button style={{marginLeft: "10px"}} onClick={this.handleClick}>搜索</button>
      </div>
    )
  }
} 