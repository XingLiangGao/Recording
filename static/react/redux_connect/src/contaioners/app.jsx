/* 包含App组件的容器组件 */
//引入连接组件
import {connect} from 'react-redux'

//引入action函数
import {increment, decrement, async} from '../redux/actions'
import Counter from '../views/counter'

//向外暴露连接Counter组件的包装组件
export default connect(
  state => ({count: state.counter}),
  {increment, decrement, async}
)(Counter)