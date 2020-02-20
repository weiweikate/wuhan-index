/* eslint-disable */
import router from './index';
import request from 'axios';
import store from '@/store';
// 本地联调默认不校验权限
const { isDebug } = require('../settings');

// 路由导航守卫
router.beforeEach((to, from, next) => {
    // 假如缓存页面跳转到其他页面则不缓存
    if (from.meta.keepAlive && from.meta.aliveOnlyTo) {
        if (!from.meta.aliveOnlyTo.includes(to.name)) {
            console.log(2, '不缓存');
            store.commit('exclude/ADD_EXCLUDE_VIEW', from);
        }
    }
    const noAuth = !!to.meta.noAuth;
    console.log(noAuth, 'noAuth', isDebug, 'isDebug');
    // 登录权限
    if (!noAuth) {
        // 判断是否校验登录权限
        if (!store.getters.token) {
            // 判断是否登录，根据实际业务处理
            let redirect_uri = location.origin + to.fullPath;
            next({
                path: '/login',
                query: {
                    href: redirect_uri, // 未登录，跳转到登录页，登录后跳转回当前页。
                    ...to.query,
                    ...to.params
                }
            });
            return;
        }
    }
    next();
});

router.afterEach((to, from) => {
    const title = to.meta.title || '';
    let _url = window.location.origin + to.fullPath;
    let body = document.body;
    setDocumentTitle(title);
    // 只要跳转到缓存页面则默认缓存
    if (to.meta.keepAlive && to.meta.aliveOnlyTo) {
        // 假如回退则缓存
        console.log(1, '缓存');
        store.commit('exclude/DEL_EXCLUDE_VIEW', to);
    }
    if (to.meta.bodyClass) {
        body.className = to.meta.bodyClass;
    } else {
        body.className = '';
    }
    // if (!(from.path === '/' && from.name === null)) {
    //     setLocalRoute(to, from);
    // }
});

function share() {
    // ios 设备进入页面则进行js-sdk签名
    if (window.__wxjs_is_wkwebview === true) {
        let _url = window.location.href.split('#')[0];
        request.get('/api/jssdk?url=' + encodeURIComponent(_url)).then(function(res) {
            let _lists = res;
            wx.config({
                debug: false,
                appId: _lists.appId,
                timestamp: _lists.timestamp,
                nonceStr: _lists.nonceStr,
                signature: _lists.signature,
                jsApiList: ['chooseImage', 'uploadImage', 'previewImage', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareTimeline', 'chooseWXPay']
            });

            // 微信分享配置
            wx.ready(function() {
                wx.onMenuShareTimeline({});
                wx.onMenuShareAppMessage({});
            });
        });
    }
}

function setLocalRoute(to, from) {
    // 本地已访问页面路由,存5条
    const localRoute = (window.myVue.localRoute = window.myVue.localRoute || []);
    const from_index = localRoute.indexOf(from.path);
    const to_index = localRoute.indexOf(to.path);
    if (from_index < 0) {
        localRoute.unshift(from.path);
        to_index >= 0 && localRoute.splice(to_index, 1);
    }
    if (localRoute.length > 5) {
        localRoute.splice(0, 1);
    }
}

function isWeiXin() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) === 'micromessenger') {
        return true;
    } else {
        return false;
    }
}

function setDocumentTitle(title) {
    document.title = title;
    const ua = navigator.userAgent;
    if (/ip(hone|od|ad)/i.test(ua)) {
        var i = document.createElement('iframe');
        i.src = 'javascript:void(0)';
        i.style.display = 'none';
        i.onload = function() {
            setTimeout(function() {
                i.remove();
            }, 9);
        };
        document.body.appendChild(i);
    }
}
