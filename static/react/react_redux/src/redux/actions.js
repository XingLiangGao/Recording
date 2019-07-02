import { INCREMENT, DECREMENT } from './action-types';

// dispatch内需要传入的对象，修改state的值
const increment = number => ({type: INCREMENT, number})
const decrement = number => ({type: DECREMENT, number})

export {increment, decrement}