import {INCREMENT, DECREMENT} from './action-types'

export function counter(state = 0, action) {
  /**
   * @description: 计算方法
   * @param {param}   state   旧的state
   * @param {object}  action  执行操作的type和传入的值
   * @return: 新的state
   */
  console.log(state, action);
  switch (action.type) {
    case INCREMENT:
      return state + action.number
    case DECREMENT:
      return state - action.number
    default:
      return state
  }
}