

import {get,post,jsonp} from './tools';
import * as config from './config';

//登录
export const login=params=>(post(config.LOGIN,params));
//登出
export const logout=params=>(post(config.LOGOUT,params));
//天气 tips 百度天气api不开放 只好用老哥的ak
export const weather=(city)=>(jsonp(config.WEATHER,{
    location:city,
    output:'json',
    ak:'3p49MVra6urFRGOT9s8UBWr2'
}));
//更新记录

export const updateRecords=()=>(get(config.GET_UPDATE_RECORDS));









const GIT_OAUTH='https://github.com/login/oauth';
export const gitOauthLogin=()=>get(`${GIT_OAUTH}/authorize?client_id=Iv1.948e8fbade4c5ce2&redirect_uri=http://localhost:2019/&&scope=user&state=reactAdmin`);

// export const gitOauthToken=()=>post()