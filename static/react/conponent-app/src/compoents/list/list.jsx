import React,{Component} from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

import './list.css'
import PubSub from 'pubsub-js'

export default class List extends Component {

  // static propTypes = {
  //   searchName: PropTypes.string.isRequired
  // }

  state = {
    userList: []
  }

  componentDidMount() {
    //订阅消息
    PubSub.subscribe('search', (msg, searchName) => {
      const url = `https://api.github.com/search/users?q=${searchName}`
      axios.get(url)
        .then((response) => {
          this.setState({
            userList: response.data.items
          })
        })
        .catch((err) => {
          alert(err.message)
        })
    })
  }

  // componentWillReceiveProps(nextProps) {
  //   let searchName = nextProps.searchName
  //   const url = `https://api.github.com/search/users?q=${searchName}`
  //   axios.get(url)
  //     .then((response) => {
  //       this.setState({
  //         userList: response.data.items
  //       })
  //     })
  //     .catch((err) => {
  //       alert(err.message)
  //     })
  // }

  render() {
    const {userList} = this.state
    return (
      <ul>
        {
          userList.map((item, index) =>(
            <a href={item.html_url} target="_blank" key={index}>
              <li>
                <img width="100" height="100" src={item.avatar_url} alt={item.login}/>
                <p>{item.login}</p>
              </li>
            </a>
          ))
        }
      </ul>
    )
  }
}