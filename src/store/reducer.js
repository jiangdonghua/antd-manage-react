import {combineReducers} from 'redux-immutable';

import {reducer as sideBarReducer} from '../components/Layout/NavLeft/store';
import {reducer as loginReducer} from '../pages/login/store';
const reducer=combineReducers({
    sideBar:sideBarReducer,
    login:loginReducer
});
export default reducer;