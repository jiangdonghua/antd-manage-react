

import {get,post,jsonp} from './tools';
import * as config from './config';

// const WEATHER_URL=`http://api.map.baidu.com/telematics/v3/weather?location=${encodeURIComponent(city)}&output=json&ak=Q7j40dXdwHANaGOic7G3qPOKIYna8d0M'`
export const login=params=>(post(config.LOGIN,params));

export const logout=params=>(post(config.LOGOUT,params));

export const weather=(city)=>(jsonp(config.WEATHER,{
    location:city,
    output:'json',
    ak:'3p49MVra6urFRGOT9s8UBWr2'
}));
//tips 百度天气api不开放 只好用老哥的ak
const GIT_OAUTH='https://github.com/login/oauth';
export const gitOauthLogin=()=>get(`${GIT_OAUTH}/authorize?client_id=Iv1.948e8fbade4c5ce2&redirect_uri=http://localhost:2019/&&scope=user&state=reactAdmin`);

// export const gitOauthToken=()=>post()