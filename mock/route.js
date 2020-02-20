var path = require('path');
var libs = require('require-all')(path.join(__dirname, 'modules'));
const mocks = [];
for (let key in libs) {
    let target = libs[key];
    mocks.push(...target.default);
}

export default mocks;
