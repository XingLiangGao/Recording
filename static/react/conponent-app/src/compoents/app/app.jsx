import React from 'react'

import Search from '../search/search'
import List from '../list/list'

export default class App extends React.Component{
  state = {
    searchName: ''
  }

  getSearchName = (searchName) => {
    this.setState({searchName})
  }

  render() {
    const {searchName} = this.state
    return (
      <div style={{padding: "20px"}}>
        <Search getSearchName={this.getSearchName}/>
        <List searchName={searchName}/>
      </div>
    )
  }
}