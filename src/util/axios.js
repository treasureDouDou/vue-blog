//axios——设置请求
import iView from 'iview'
import axios from 'axios'
import { Message } from 'iview'
import store from '@/vuex/vuex.js'
import app from '../main.js'
var accessToken = localStorage.getItem('token')

const http = axios.create({
    baseURL: 'http://localhost:3000/api',
    timeout: 8000,
    data: {},
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
})
const qs = require('querystring')
var oldConfig = null
    // 请求前
http.interceptors.request.use(config => {
    if (config.url.indexOf('login') < 1 && !localStorage.getItem('adminName') && !localStorage.getItem('adminPassword')) {
        if (config.method == 'post' && localStorage.getItem('visit') && localStorage.getItem('visitPassword')) {
            return Promise.reject({ code: 0 });//0没有权限
        }
    }

    iView.LoadingBar.start();
    config.data = qs.stringify(config.data)
    if (accessToken != null) {
        config.headers['access-token'] = accessToken
    }
    return config;
}, err => {
    return Promise.reject(err);
});
//请求后
http.interceptors.response.use(res => {
    iView.LoadingBar.finish();
    if (res.data.code == 300) { //token过期
        Message.warning('您的会话已过期，请重新登录');
        localStorage.removeItem('token')
        app.$router.replace('/login')
        return Promise.reject();
    } else if (res.data.code != 200) {
        Message.error(res.data.msg);
        return Promise.reject();
    } else {
        if (res.data.token) {
            localStorage.setItem('token', res.data.token)
            accessToken = res.data.token
        }
        return res.data.data
    }
}, err => {
    if (err && err.code == 0) {
        Message.warning('您没有权限');
    } else {
        //正则判断超时
        let rg = /8000/g
        iView.LoadingBar.error();
        if (rg.test(err)) {
            Message.error('您的网络不给力喔,请刷新重试');
        } else {
            Message.error('服务器错误');
        }
    }

    store.state.loadErr = true
    return Promise.reject(err);
})

export default http
