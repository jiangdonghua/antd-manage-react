import * as constants from './constants';
import {fetch_chart_data} from '../../../apis';
 import {fromJS} from 'immutable';
// import {message} from 'antd';

const changeChartData = (data) => ({
    type: constants.FETCH_CHART_DATA,
    data:fromJS(data),
    loading:false
});

export const Fetch_chart_data = () => {
    return (dispatch) => {
        fetch_chart_data().then((res) => {
               // message.success(res.message);
                dispatch(changeChartData(res));
        }).catch((err) => {
            // console.log(JSON.stringify(err));
           // message.error('请求异常,请稍后重试！')
        })
    }
};