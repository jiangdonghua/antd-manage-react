/**
 * Created by Administrator on 2018/11/19.
 */
import {CHANGE_INPUT_VALUE,ADD_LIST_VALUE,DELETE_TODO_ITEM} from './actionTypes'
export const getInputChangeAction=(value)=>({
type:CHANGE_INPUT_VALUE,
    value
});
export const getAddTodoItemAction=()=>({
    type:ADD_LIST_VALUE
})
export const getDeleteTodoItemAction=(index)=>({
    type:DELETE_TODO_ITEM,
    index
})