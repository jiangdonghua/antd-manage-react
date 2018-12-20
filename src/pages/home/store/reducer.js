import * as constants from './constants';
import {fromJS} from "immutable";

const defaultState=fromJS({
    chart:[],
    loading:true
});

export default (state=defaultState,action)=>{
    switch (action.type) {
        case constants.FETCH_CHART_DATA:
          return state.merge({
              chart:action.data,
              loading:action.loading
          });
        default:
        return state;
    }
}