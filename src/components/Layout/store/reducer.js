import * as constants from './constants';
import {fromJS} from "immutable";

const defaultState=fromJS({
    isMobile:false,
});

export default (state=defaultState,action)=>{
    switch (action.type) {
        case constants.IS_MOBILE:
          return state.set("isMobile",action.status);
        default:
        return state;
    }
}