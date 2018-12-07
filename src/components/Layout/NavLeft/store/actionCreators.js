import * as constants from './constants';
import axios from 'axios';
import {fromJS} from "immutable";

const getMenuList = (result) => ({
    type: constants.GET_PERMISSION_MENU,
    menuList:fromJS(result)

});

export const getMenu = () => {
    return (dispatch) => {
        axios.get('/api/permission/adminMenu.json').then((res) => {
            const result = res.data.data;
            dispatch(getMenuList(result))
        }).catch(() => {
            console.log('error')
        })
    }
};
