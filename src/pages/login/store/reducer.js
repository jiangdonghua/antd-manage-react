import * as constants from './constants';
import {fromJS} from "immutable";

const defaultState=fromJS({
    userInfo:{},
});

export default (state=defaultState,action)=>{
    switch (action.type) {
        case constants.LOGIN:
          return state.set("userInfo",action.data);
        case constants.LOGOUT:
            return state.set("userInfo",action.data);
        case constants.LOAD_STORAGE_USER_INFO:
           return state.set("userInfo",action.data);
        default:
        return state;
    }
}