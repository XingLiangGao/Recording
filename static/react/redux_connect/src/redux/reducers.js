/* 包含n个reducer函数(根据老的state和action返回新的state) */
import {INCREMENT, DECREMENT, CHANGE_LOGIN} from './action-types'
import {combineReducers} from 'redux'

const count = 2
const counter = (state = count, action) => {
  switch (action.type) {
    case INCREMENT:
      return state + action.data
    case DECREMENT:
      return state - action.data
    default:
      return state
  }
}

const login = (state = false, action) => {
  switch (action.type) {
    case CHANGE_LOGIN:
      return action.data
    default:
      return state
  }
}

export default combineReducers({
  counter,
  login
})