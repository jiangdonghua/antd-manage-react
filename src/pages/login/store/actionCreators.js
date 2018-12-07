import * as constants from './constants';
import {login} from '../../../apis';
import {message} from 'antd';

const changeLogin=(data)=>({
    type:constants.LOGIN,
    data
});

    export const Login=(userName,password)=>{
    return (dispatch)=>{
        login({
            userName:userName,
            password:password
        }).then((res)=>{
            if(res.code===0){
                const result=res.data;
                message.success(res.message);
                dispatch(changeLogin(result));
            }else{
                message.success(res.message);
            }
        }).catch((err)=>{
            // console.log(JSON.stringify(err));
            message.error('请求异常,请稍后重试！')
        })
    }
}