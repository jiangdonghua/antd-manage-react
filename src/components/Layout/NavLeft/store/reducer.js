import * as constants from './constants';
import { fromJS } from "immutable";

const defaultState=fromJS({
    permissionMenu:[]
});
//

export default (state=defaultState,action)=>{
    switch (action.type) {
        case constants.GET_PERMISSION_MENU :
            return state.set("permissionMenu",action.menuList);
        default:
            return state;
    }
}