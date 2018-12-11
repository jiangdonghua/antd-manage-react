import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(
    applyMiddleware(thunk)
));
export default store;

//store是唯一的，只有store能够改变自己的内容，Reducer必须是纯函数
//纯函数指的是，给定固定的输入，就一定会有固定的输出，而且不会有副作用
//redux-persist 数据持久化