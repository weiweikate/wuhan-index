const path = require('path');
const merge = require('webpack-merge');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TerserPlugin = require('terser-webpack-plugin');
const ForceCaseSensitivityPlugin = require('force-case-sensitivity-webpack-plugin');
const pkg = require('./package');

// require('vue-cli-plugin-style-resources-loader')

function resolve(dir) {
    return path.join(__dirname, dir);
}

const externals = {
    vue: 'Vue',
    'vue-router': 'VueRouter',
    vuex: 'Vuex',
    vant: 'vant',
    axios: 'axios'
};
// cdn
const cdn = {
    // 开发环境
    dev: {
        css: [
            '/static/js/vant@2.2/lib/index.css',
        ],
        js: [
            'https://res.wx.qq.com/open/js/jweixin-1.6.0.js',
            'https://elis-ecocdn.pingan.com.cn/m/cdn/PALifeOpenH5/1.2/PALifeOpenH5.min.js',
            'https://elis-ecocdn.pingan.com.cn/lilith/lib/PALifeOpen.1.5.min.js'
        ]
    },
    // 生产环境
    build: {
        css: [
            //'https://cdn.jsdelivr.net/npm/vant@2.2/lib/index.css',
            '/static/js/vant@2.2/lib/index.css'
        ],
        js: [
            // 'https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/7.4.4/polyfill.js',
            'https://res.wx.qq.com/open/js/jweixin-1.6.0.js',
            '/static/js/vue.min.js',
            '/static/js/vue-router.min.js',
            '/static/js/axios.min.js',
            '/static/js/vuex.min.js',
            '/static/js/vant@2.2/lib/vant.min.js',
            'https://elis-ecocdn.pingan.com.cn/m/cdn/PALifeOpenH5/1.2/PALifeOpenH5.min.js',
            'https://elis-ecocdn.pingan.com.cn/lilith/lib/PALifeOpen.1.5.min.js'
            //'https://cdn.jsdelivr.net/npm/vant@2.2/lib/vant.min.js'
        ]
    }
};
const port = process.env.VUE_APP_PORT ? parseInt(process.env.VUE_APP_PORT) : 9933;
const proxyTarget = process.env.VUE_APP_BASE_TARGET ? process.env.VUE_APP_BASE_TARGET : `http://localhost:${port}/mock`;
if (process.env.NODE_ENV !== 'production') {
    console.log('proxyTarget', proxyTarget);
}

module.exports = {
    lintOnSave: false,
    productionSourceMap: false,
    outputDir: 'dist',
    assetsDir: 'static',
    devServer: {
        open: true, // 是否自动打开浏览器页面
        host: process.env.VUE_APP_DOMAIN || '0.0.0.0', // 指定使用一个 host，默认是 localhost
        port, // 端口地址
        disableHostCheck: true,
        // proxy: {
        //     // change xxx-api/login => mock/login
        //     // detail: https://cli.vuejs.org/config/#devserver-proxy
        //     [process.env.VUE_APP_BASE_API]: {
        //         target: proxyTarget,
        //         changeOrigin: true,
        //         pathRewrite: {
        //             ['^' + process.env.VUE_APP_BASE_API]: ''
        //         }
        //     }
        // },
        proxy: {
            '/api': {
                target: proxyTarget,
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': '/api'
                }
            }
        },
        after: require('./mock/mock-server.js')
    },
    publicPath: '/', // 打包后引用的资源路径
    // webpack自定义配置
    configureWebpack: (config) => {
        // 检查文件引用的大小是否正确
        config.entry.app = ["babel-polyfill", "./src/main.js"];
        config.plugins.push(new ForceCaseSensitivityPlugin());
        Object.assign(config, {
            // 初始化index.html的title
            name: ''
        });
        // 生产环境打包分析体积
        if (process.env.NODE_ENV === 'production' && process.env.npm_config_report) {
            return {
                plugins: [
                    new BundleAnalyzerPlugin()
                ]
            };
        }
        // 测试、生产环境
        if (process.env.NODE_ENV === 'production') {
            // externals里的模块不打包
            Object.assign(config, {
                externals: externals
            });
        }
        // 生产环境去除console\debugger
        if (process.env.VUE_APP_MODE === 'production') {
            config.optimization = {
                minimizer: [
                    new TerserPlugin({
                        terserOptions: {
                            compress: {
                                drop_debugger: true,
                                drop_console: true
                            }
                        }
                    })
                ]
            };
        }
    },
    chainWebpack: config => {
        // CLI内部webpack配置
        config.plugins.delete('preload'); // TODO: need test
        config.plugins.delete('prefetch'); // TODO: need test
        const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
        types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)));

        /**
         * 添加CDN参数到htmlWebpackPlugin配置中， 详见public/index.html 修改
         */
        config.plugin('html').tap(args => {
            if (process.env.NODE_ENV === 'production') {
                args[0].cdn = cdn.build;
            }
            if (process.env.NODE_ENV === 'development') {
                args[0].cdn = cdn.dev;
            }
            return args;
        });
        // 把动态配置合并到process.env
        config.plugin('define')
            .tap(args => {
                const name = 'process.env';
                // 使用 merge 合并，保证原始值不变
                args[0][name] = merge(args[0][name], {
                    APP_VERSION: JSON.stringify(pkg.version),
                    APP_TIME: JSON.stringify(new Date().toLocaleString())
                });
                return args;
            });
    }

};

// 全局样式 变量、函数
function addStyleResource(rule) {
    rule.use('style-resource')
        .loader('style-resources-loader')
        .options({
            patterns: [
                resolve('src/styles/variables.less'),
                resolve('src/styles/mixin.less')
            ]
        });
}
