/**
 * Created by Administrator on 2018/11/19.
 */
import {createStore} from 'redux'
import reducer from './reducer'

const store=createStore(reducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;

//store是唯一的，只有store能够改变自己的内容，Reducer必须是纯函数
//纯函数指的是，给定固定的输入，就一定会有固定的输出，而且不会有副作用