import Vue from 'vue';
const settings = require('../settings');
// 需要隐藏的点
Vue.prototype.$needHidden = function(value) {
    const epic = settings.epic || {};
    const keys = epic.keys || [];
    // const expired = epic.expired || 1;
    // const now = +new Date();
    // if (now > expired) {
    //     return false;
    // }
    return keys.includes(value);
};
