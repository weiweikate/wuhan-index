const apis = require('../../api.json');
const actions = [];
const prefix = '/h5';
const render = function (tpl, data) {
    return tpl.replace(/\{(.+?)\}/g, function (m, m1) {
        return data[m1];
    });
};
/*
{
    name: 'userOwnDetail',
    label: '查询当前用户的详情接口',
    path: '/user/ownDetails',
    method: 'post'
}
*/
apis.forEach(item => {
    const list = item.list || [];
    list.forEach(api => {
        const path = api.path || '';
        const method = api.method.toLowerCase();
        if (path.indexOf(prefix) === 0) {
            let name = path.replace(prefix, '').replace(/\{|\}/g, '');
            name = name.split('/').filter(item => item).reduce(function (prev, cur) {
                return prev.substr(0, 1).toUpperCase() + prev.substr(1) + cur.substr(0, 1).toUpperCase() + cur.substr(1);
            });
            // console.log(path, name);
            actions.push({
                force: true,
                type: 'add',
                path: `src/api/modules/${name}.js`,
                templateFile: 'plop-templates/api/index.hbs',
                data: {
                    name: name,
                    label: api.title || '',
                    path: path,
                    method: method
                }
            });
        }
    });
});
console.log(`总共接口数目:${actions.length}`);
module.exports = {
    description: 'generate api',
    prompts: [],
    actions: actions
};
