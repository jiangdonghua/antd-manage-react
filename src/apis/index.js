

import {get,post} from './tools';
import * as config from './config';


export const login=params=>(post(config.LOGIN,params));

export const logout=params=>(post(config.LOGOUT,params));


const GIT_OAUTH='https://github.com/login/oauth';
export const gitOauthLogin=()=>get(`${GIT_OAUTH}/authorize?client_id=Iv1.948e8fbade4c5ce2&redirect_uri=http://localhost:2019/&&scope=user&state=reactAdmin`);

// export const gitOauthToken=()=>post()