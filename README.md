# 项目介绍

基于vue-cli3.0 + webpack 4+ vant ui + less + rem适配方案 + axios，构建手机端模板脚手架

### 介绍

 1. vuecli3.0      
 2. 多环境开发       
 3. axios封装         
 4. rem适配方案        
 5. 生产环境cdn优化首屏加速
 6. babel低版本浏览器兼容
 7. 环境发布脚本
 
### 目录结构
![](./public/目录结构.png)

## 构建命令
### 初始化依赖配置
```
npm install
```

### 开发环境 启动运行
```
npm run dev
```

### 生产环境 打包构建
```
npm run build

npm run build --report // 打包分析
```


### cli配置参考
See [CLI配置参考](https://cli.vuejs.org/zh/config/).


## 开发

### 页面布局
- 页面布局按照设计稿`375`开发
- h5第三方UI组件[Vant UI](https://youzan.github.io/vant/#/zh-CN/intro)


### 路由
模式: `history`, 配置地址： `src/routers/index.js`

### commit
格式`type: subject`

> 注意type后面跟一个空格

```javascript
[
    'docs', // Adds or alters documentation. 仅仅修改了文档，比如README, CHANGELOG, CONTRIBUTE等等
    'chore', // Other changes that don't modify src or test files. 改变构建流程、或者增加依赖库、工具等
    'feat', // Adds a new feature. 新增feature
    'fix', // Solves a bug. 修复bug
    'merge', // Merge branch ? of ?.
    'perf', // Improves performance. 优化相关，比如提升性能、体验
    'refactor', // Rewrites code without feature, performance or bug changes. 代码重构，没有加新功能或者修复bug
    'revert', // Reverts a previous commit. 回滚到上一个版本
    'style', // Improves formatting, white-space. 仅仅修改了空格、格式缩进、都好等等，不改变代码逻辑
    'test' // Adds or modifies tests. 测试用例，包括单元测试、集成测试等
]
```

### 环境全局变量

`.env`文件中配置
```bash

# 代码打包模式
NODE_ENV='production'
# 接口前缀
VUE_APP_BASE_API = '/api'
# 不同环境
VUE_APP_MODE = 'test'
# 是否开启移动端调试
VUE_APP_ERUDA = true

```

`vue.config.js`中配置
```javascript
{
    APP_VERSION: JSON.stringify(pkg.version), // 请求头中注入版本信息
    APP_TIME: JSON.stringify(new Date().toLocaleString()) // html源代码中注入发布时间
}
```


### 注意点

- 默认开发环境不会调用微信登录，如果需要则设置`settings.js`中的`isDebug`
- 支持全局`less`变量 `mixin.less` 以及 `variables.less`
- 自动将`vue`文件中的`style`中的px转为rem（此方法只能将.vue文件style标签中的px转成rem，不能将script标签和元素style里面定义的px转成rem）
- 如果不希望`px`转`rem`，可以将`px`写成`Px`
- `src/filter/index.js`中的函数已配成全局可用
- 除了`error`、`login` 其他路由都必须登录后才能访问，可以配置路由meta:{noAuth:true}强制不校验