

import {post} from './tools';
import * as config from './config';


export const login=params=>(post(config.LOGIN,params));