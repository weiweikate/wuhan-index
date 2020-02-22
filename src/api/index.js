import Vue from 'vue';
import Urls from './api.js';
import { Toast, Dialog } from 'vant';
import store from '@/store';
import HttpClient from './http/http-client';
import router from '@/router';

const Version = process.env.APP_VERSION || '0.0.0';

Vue.use(HttpClient, {
    timeout: 60000,
    transformRequest({ path, data, meta = {} }) {
        if (meta.isShowLoading) {
            Toast.loading({ duration: 0, message: '正在加载' });
        }
        console.log(`[HTTP请求:${path} start]`, data, meta);
    },
    // 全局接口请求数据成功条件
    getResponseSuccess(response) {
        console.log(response)
        if ([200, 0].includes(response.code)) {
            return true;
        }
        return false;
    },
    transformResponse({ response, path, meta = {} }) {
        response.message = response.message || response.msg || '网络走神了';
        console.log(`[HTTP请求:${path} end]`, response);
        if (meta.isShowLoading) {
            Toast.clear();
        }
        return response;
    },
    handleSuccess({ response, meta = {} }) {
        if (meta.isShowSuccess) {
            Toast(typeof meta.isShowSuccess === 'string' ? meta.isShowSuccess : '处理成功');
        }
    },
    handleError({ endpoint, data, response, url, meta = {} }) {
        const message = response.message;
        // 登录失效
        // if ([3].includes(response.code)) {
        //     store.commit('user/LOGOUT');
        //     Dialog.confirm({
        //         message: message
        //     })
        //         .then(() => {
        //             router.replace({
        //                 path: '/login',
        //                 query: {
        //                     href: encodeURIComponent(location.href)
        //                 }
        //             });
        //         })
        //         .catch(() => {
        //             // on cancel
        //         });
        //     return;
        // }

        if (meta.isShowError) {
            Toast(message);
        }
    },
    getAccessToken(config) {
        // const token = store.getters.token || '';
        // return { version: Version, token };
    }
});
const http = Vue.http;
const API = http.httpFactory(Urls);
Vue.prototype.$api = API;
export { API };
export default http;
