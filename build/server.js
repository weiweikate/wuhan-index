const chalk = require('chalk');
const proxy = require('http-proxy-middleware');
const path = require('path');

const port = 8080;

const connect = require('connect');
const serveStatic = require('serve-static');
const app = connect();

app.use(
    '/',
    serveStatic(path.resolve(__dirname, '..', 'dist'), {
        index: ['index.html', '/']
    })
);
const target = 'http://172.18.10.233:18095';
app.use(
    '/api',
    proxy({ target: target, changeOrigin: true })
);

app.listen(port, function () {
    console.log(chalk.green(`> Preview at  http://localhost:${port}`));

});
