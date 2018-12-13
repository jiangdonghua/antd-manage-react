/*
 * http通用工具函数
 */
import axios from 'axios';
import qs from 'qs';
import JsonP from 'jsonp';


axios.defaults.timeout = 3000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

/**
 * 公用get请求
 */
export const get = (url, params) => {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data)
        })
    })
};
/**
 * 公用post请求
 */
export const post = (url, params) =>{
    return new Promise((resolve, reject) => {
        axios.post(url,qs.stringify(params))
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err)
            })
});
};

/*
 * 公用jsonp请求
 */

//对要与url拼接的data进行处理
const param=(data)=>{
    let url = '';
    for (var k in data) {
        let value = data[k] !== undefined ? data[k] : ''
        url += '&' + k + '=' + encodeURIComponent(value)
    }
    return url ? url.substring(1) : ''

}
// const options={
//     param: 'jsonpCallback'
// }
export const jsonp=(url, data)=> {
    // url没有？时要先添加一个
    url += (url.indexOf('?') < 0 ? '?' : '&') + param(data);

    return new Promise((resolve, reject) => {
        JsonP(url, (err, data) => {
            if (!err) {
                resolve(data)
            } else {
                reject(err)
            }
        })
    })
}

