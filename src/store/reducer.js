/**
 * Created by Administrator on 2018/11/19.
 */
import {CHANGE_INPUT_VALUE,ADD_LIST_VALUE,DELETE_TODO_ITEM} from './actionTypes'
const defaultState = {
    inputValue: '',
    list: [1, 2]
}
//reducer 可以接收state 但是绝对不能改变state
export default (state = defaultState, action) => {

    if (action.type === CHANGE_INPUT_VALUE) {
        const newState=JSON.parse(JSON.stringify(state));//深拷贝
        newState.inputValue=action.value;
        return newState
    }
    if (action.type === ADD_LIST_VALUE) {
        const newState=JSON.parse(JSON.stringify(state));//深拷贝
        newState.list.push(newState.inputValue);
        newState.inputValue='';
        return newState
    }
    if (action.type === DELETE_TODO_ITEM) {
        const newState=JSON.parse(JSON.stringify(state));//深拷贝
        newState.list.splice(action.index,1);
        return newState
    }
    return state;
}