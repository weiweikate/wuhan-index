const isDev = process.env.NODE_ENV !== 'production'; // 测试以及生产
const isDebug = isDev;
const isTest = process.env.VUE_APP_MODE === 'test';
const isProd = process.env.VUE_APP_MODE === 'production';
const keys = isTest ? [] : ['auth-brand', 'auth-invitation', 'auth-upgrade'];
// const keys = [];
module.exports = {
    title: '隐形战役',
    isDebug: isDev && isDebug,
    isDev,
    isTest,
    isProd,
    /**
     * todo
     * @type {string | array} 'production' | ['production', 'development']
     * @description Need show err logs component.
     * The default is only used in the production env
     * If you want to also use it in dev, you can pass ['production', 'development']
     */
    errorLog: 'production'
};
