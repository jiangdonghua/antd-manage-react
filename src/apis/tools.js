/*
 * http通用工具函数
 */
import axios from 'axios';
import qs from 'qs';


axios.defaults.timeout = 3000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

/**
 * 公用get请求
 */
export const get = ({url, params}) => {
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
}