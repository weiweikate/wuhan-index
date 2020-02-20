/**
 * @description: 项目入口文件
 */

import 'babel-polyfill';
import Vue from 'vue';
import App from './App.vue';
import router from './router/';
import './router/intercept';
import store from './store';
import * as filters from './filters/';
import '@/utils/directives';
import './api';
import 'lib-flexible';
import VueLazyload from 'vue-lazyload';
import components from './components';
import './styles/main.less';
import Vant, { Toast } from 'vant';
// import 'vant/lib/index.css';
import * as cloud from './utils/cloud-utils';

import VueWechatTitle from 'vue-wechat-title';
Vue.use(VueWechatTitle);

import VideoPlayer from 'vue-video-player'
import 'vue-video-player/src/custom-theme.css'
import 'video.js/dist/video-js.css'

Vue.use(VideoPlayer)

import Es6Promise from 'es6-promise';
Es6Promise.polyfill();

Vue.use(Vant);
Vue.use(VueLazyload, {
    // 提前加载高度（数字 1 表示 1 屏的高度）
    preLoad: 1,
    // 图片加载失败时显示的图片
    error: require('./assets/images/error.png'),
    // 图片加载状态下显示的图片
    // loading: require('./assets/images/loading.gif'),
    // 加载错误后最大尝试次数
    attempt: 1
});
Vue.prototype.$Toast = Toast;
Vue.config.errorHandler = (err, vm, info) => {
    console.error(err);
};
Vue.config.devtools = process.env.NODE_ENV === 'development';
Vue.config.productionTip = process.env.NODE_ENV === 'production';

window.EventBus = new Vue();

// 注册过滤器
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
});
// 注册基础组件
Object.entries(components).forEach(item => {
    Vue.component(item[0], item[1]);
});
Vue.prototype.$cloud = cloud;
Vue.prototype.$redirect = function(config, replace) {
    if (replace) {
        this.$router.replace(config);
    } else {
        this.$router.push(config);
    }
};
Vue.prototype.$reload = function() {
    let uri = location.href;
    // 假如微信授权登录出错则重新授权
    if (uri.indexOf('code=') > -1) {
        location.href = window.origin + '/login';
    } else {
        location.href = uri;
    }
};

window.myVue = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
