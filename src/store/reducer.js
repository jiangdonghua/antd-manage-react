// import {combineReducers} from 'redux';
 import {combineReducers} from 'redux-immutable';

import {reducer as sideBarReducer} from '../components/Layout/NavLeft/store';
import {reducer as loginReducer} from '../pages/login/store';
import {reducer as homeReducer} from '../pages/home/store';
import {reducer as layoutReducer} from '../components/Layout/store';
const reducer=combineReducers({
    sideBar:sideBarReducer,
    login:loginReducer,
    layout:layoutReducer,
    home:homeReducer
});
export default reducer;