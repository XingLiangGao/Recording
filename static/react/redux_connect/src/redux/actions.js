/* 包含了所有的action creator(action的工厂函数) */
import {INCREMENT, DECREMENT} from './action-types'

const increment = number => ({type: INCREMENT, data: number})
const decrement = number => ({type: DECREMENT, data: number})
//异步
const async = number => {
  return dispatch => {
    setTimeout(() => {
      dispatch(increment(number))
    }, 1000)
  }
}

export {increment, decrement, async}