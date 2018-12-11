import * as constants from './constants';
import {login,logout} from '../../../apis';
import {message} from 'antd';

const changeLogin = (data) => ({
    type: constants.LOGIN,
    data
});
const changeLogout = (data) => ({
    type: constants.LOGOUT,
    data
});
const ReadsStorageUserInfo = JSON.parse(sessionStorage.getItem('userInfo'));
const storageUserInfo = (data) => ({
    type: constants.LOAD_STORAGE_USER_INFO,
    data
});
export const LoadUserInfo = () => {
    return (dispatch) => {
        dispatch(storageUserInfo(ReadsStorageUserInfo))
    }
}
export const Login = (userName, password) => {
    return (dispatch) => {
        login({
            userName: userName,
            password: password
        }).then((res) => {
            if (res.code === 0) {
                const result = res.data;
                message.success(res.message);
                dispatch(changeLogin(result));
            } else {
                message.success(res.message);
            }
        }).catch((err) => {
            // console.log(JSON.stringify(err));
            message.error('请求异常,请稍后重试！')
        })
    }
}

export const Logout=(userName)=>{
    return (dispatch) => {
        logout({
            userName: userName,
        }).then((res) => {
            if (res.code === 0) {
                const result = res.data;
                message.success(res.message);
                dispatch(changeLogout(result));
            } else {
                message.success(res.message);
            }
        }).catch((err) => {
            // console.log(JSON.stringify(err));
            message.error('请求异常,请稍后重试！')
        })
    }
};